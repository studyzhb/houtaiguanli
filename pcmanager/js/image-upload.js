define(function(){

    var o_ueditorupload = UE.getEditor('j_ueditorupload',
      {
        autoHeightEnabled:false
      });

      function toDoUp(obj,fn){
          o_ueditorupload.ready(function ()
            {
            
            o_ueditorupload.hide();//隐藏编辑器
            
            //监听图片上传
            o_ueditorupload.addListener('beforeInsertImage', function (t,arg)
            {
                
                // console.log(ImageWrapper.imgArr);
                // console.log('这是图片地址：'+arg[0].src+'test111'+arg[1].src);
                console.log(arg);
                fn.call(obj,arg);

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
      }

      

      //弹出图片上传的对话框
      function upImage(obj,fn)
      {
        var myImage = o_ueditorupload.getDialog("insertimage");
        myImage.open();
      }
      //弹出文件上传的对话框
      /*function upFiles()
      {
        //var myFiles = o_ueditorupload.getDialog("attachment");
        //myFiles.open();
      } */

      var uploadImage=function(obj,fn){

          toDoUp(obj,fn);
          upImage(obj,fn);
           
      }

    return {
        uploadImage:uploadImage
    }
})