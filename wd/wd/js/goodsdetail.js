var ImageWrapper={
  temp:'',
  imgArr:[],
  suolveImg:[],
  detailImg:[]
}

//实例化编辑器
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
        ImageWrapper.imgArr.length=0;
        $.each(arg,function(index,item){
          // console.log(item.src);
          ImageWrapper.imgArr.push({imgsrc:item.src});
        });
        if(ImageWrapper.temp=="image-suolve"){

        	$.each(ImageWrapper.imgArr,function(index,item){
              if(ImageWrapper.suolveImg.length<3){
        		    ImageWrapper.suolveImg.push(item.imgsrc);
              }
        	})
//          ImageWrapper.suolveImg=ImageWrapper.imgArr;
        }else{
        	$.each(ImageWrapper.imgArr,function(index,item){
        		ImageWrapper.detailImg.push(item.imgsrc);
        	})
//          ImageWrapper.detailImg=ImageWrapper.imgArr;
        }


        $.each(ImageWrapper.imgArr,function(index,item){

            if(ImageWrapper.temp!="image-suolve"){
              $('.'+ImageWrapper.temp).append(config.formatTemplate(item,$('#'+ImageWrapper.temp).html()));
            }
            
        });
        $('.image-suolve').html('');
         $.each(ImageWrapper.suolveImg,function(index,item){
            
            console.log(item);
            // if(ImageWrapper.temp=="image-suolve"&&ImageWrapper.suolveImg.length<3){
            //   $('#imageadd').show();
            // }else{
            //    $('#imageadd').hide();
            // }
            $('.image-suolve').append(config.formatTemplate({imgsrc:item},$('#image-suolve').html()));

        });

       if(ImageWrapper.suolveImg.length<3){
        $('<div class="detail-image-col-2 imageadd">').appendTo($('.image-suolve'));

       }


        // console.log(ImageWrapper.imgArr);
        // $()
          // console.log('这是图片地址：'+arg[0].src+'test111'+arg[1].src);
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
      function upImage(str)
      {
        ImageWrapper.temp=str;
        // console.log(str);

        var myImage = o_ueditorupload.getDialog("insertimage");
        myImage.open();
      }
      //弹出文件上传的对话框
      function upFiles()
      {
        var myFiles = o_ueditorupload.getDialog("attachment");
        myFiles.open();
      } 



      $('.image-suolve').on('click','.imageadd',function(){
          upImage('image-suolve');
        })



      // 拖拽
      




