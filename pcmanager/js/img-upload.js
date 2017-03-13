require(['jquery','jquery-form','main','ajaxAddress','log'],function($,jf,myObj,ajaxAddress,log){

    var common=myObj.load();
    var ImageWrapper={
    temp:'',
    imgArr:[],
    suolveImg:[],
    detailImg:[]
    };
    var o_ueditorupload = UE.getEditor('j_ueditorupload',
      {
        autoHeightEnabled:false
      });
      o_ueditorupload.ready(function ()
      {
     
    o_ueditorupload.hide();//隐藏编辑器
     
    //监听图片上传
    o_ueditorupload.addListener('beforeInsertImage', function (t,arg)
    {
        
        $.each(arg,function(index,item){
          // console.log(item.src);
          ImageWrapper.suolveImg.push({imgsrc:item.src});
          ImageWrapper.imgArr.push(item.src);
        });

        // console.log(ImageWrapper.imgArr);
        // console.log('这是图片地址：'+arg[0].src+'test111'+arg[1].src);

          
         $.each(ImageWrapper.suolveImg,function(index,item){
            
            console.log(item);
            // if(ImageWrapper.temp=="image-suolve"&&ImageWrapper.suolveImg.length<3){
            //   $('#imageadd').show();
            // }else{
            //    $('#imageadd').hide();
            // }
            if(index<=4){

              $('.image-suolve').append(config.formatTemplate(item,$('#image-suolve').html()));

            }

        });
         if(ImageWrapper.suolveImg.length<5){
          $('<div class="detail-image-col-2 imageadd">').appendTo($('.image-suolve'));

         }
         $('.shopinput').val(JSON.stringify(ImageWrapper.imgArr));
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
       
      //弹出图片上传的对话框
      function upImage($s)
      {
        ImageWrapper.temp=$s;
        // console.log(str);
        var myImage = o_ueditorupload.getDialog("insertimage");
        myImage.open();
      }
      //弹出文件上传的对话框
      /*function upFiles()
      {
        //var myFiles = o_ueditorupload.getDialog("attachment");
        //myFiles.open();
      } */

      /**
       * 图片上传
       */
      $('.imageadd').on('click',function(){
          upImage($(this));
      })


})