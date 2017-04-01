define(['jquery','main'],function($,main){
    var common=main.load();
    var self;
    var isMuti=true
    var o_ueditorupload = UE.getEditor('j_ueditorupload',
      {
        autoHeightEnabled:false
      });

    //   function toDoUp(obj,isMuti){
          o_ueditorupload.ready(function ()
            {
            
            o_ueditorupload.hide();//隐藏编辑器
            
            //监听图片上传
            o_ueditorupload.addListener('beforeInsertImage', function (t,arg)
            {
                console.log(isMuti);
                // console.log(ImageWrapper.imgArr);
                // console.log('这是图片地址：'+arg[0].src+'test111'+arg[1].src);
                    // setTimeout(function(){
                    if(isMuti){
                        var arr=[];
                        var arrInfo=[];
                        $.each(arg,function(index,item){
                            arrInfo.push(common.tools.formatTemplate({imgsrc:item.src},$('#image-suolve').html()));
                            arr.push(item.src);
                        })
                        
                        $(self).before(arrInfo.join(''));
                        var $oldInfo=$(self).parent('.image-suolve').next('input');

                        // arr=arr.concat($oldInfo.data('info')?JSON.parse($oldInfo.data('info'))||[]:[]);
                        arr=arr.concat($oldInfo.data('info')?eval($oldInfo.data('info'))||[]:[]);
                        
                        $(self).parent('.image-suolve').next('input').data('info',JSON.stringify(arr)).val(JSON.stringify(arr));
                    }else{
                        var arr01=[];
                        $(self).prevAll().remove();

                        $(self).before(common.tools.formatTemplate({imgsrc:arg[0].src},$('#image-suolve').html()));
                        
                        var $oldInfo=$(self).parent('.image-suolve').next('input');

                        arr01.push(arg[0].src);
                        
                        $oldInfo.data('info',JSON.stringify(arr01)).val(JSON.stringify(arr01));

                        $(self).hide();
                    }
                // },1000);
                
                

            });


            
            /* 文件上传监听
            * 需要在ueditor.all.min.js文件中找到
            * d.execCommand("insertHtml",l)
            * 之后插入d.fireEvent('afterUpfile',b)
            */
                o_ueditorupload.addListener('afterUpfile', function (t, arg)
                {
                alert('这是文件地址：'+arg[0].url);
                });
            });
    //   }

      

      //弹出图片上传的对话框
      function upImage(obj,isMuti)
      {
        self=obj;
        isMuti=isMuti;
        // console.log(isMuti);
        // toDoUp(obj,isMuti)
        var myImage = o_ueditorupload.getDialog("insertimage");
        myImage.open();
      }
      //弹出文件上传的对话框
      /*function upFiles()
      {
        //var myFiles = o_ueditorupload.getDialog("attachment");
        //myFiles.open();
      } */

      var uploadImage=function(obj,isMuti){

          upImage(obj,isMuti);
           
      }

    return {
        uploadImage:uploadImage
    }
})