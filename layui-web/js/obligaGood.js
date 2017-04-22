var ImageWrapper={
  temp:'',
  imgArr:[],
  suolveImg:[],
  detailImg:[],
  pcImgArr:[],
  status:'',
  page:'',
  pcStr:''
}
var layedit;
var editorIndex;



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

        /*for(var i=arg.length-1;i>=0;i--){
          ImageWrapper.imgArr.push({imgsrc:item.src});
        }*/

        if(ImageWrapper.temp=="image-suolve"){

        	$.each(ImageWrapper.imgArr,function(index,item){
              if(ImageWrapper.suolveImg.length<3){
        		    ImageWrapper.suolveImg.push(item.imgsrc);
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
            $('.image-suolve').append(config.formatTemplate({imgsrc:item,selectIndex:index},$('#image-suolve').html()));

        });

         if(ImageWrapper.suolveImg.length<3){
        $('<div class="detail-image-col-2 imageadd" id="imageadd">').appendTo($('.image-suolve'));

       }
//          ImageWrapper.suolveImg=ImageWrapper.imgArr;
        }else if(ImageWrapper.temp=="img-pc"){
          console.log('img-pc');
          var $imgPcWrap=$('<div class="img-content-pc" >').appendTo($('#demo'));
          ImageWrapper.pcStr+=layedit.getContent(editorIndex);
          $.each(ImageWrapper.imgArr,function(index,item){
              // ImageWrapper.pcImgArr.push(item.imgsrc);
              ImageWrapper.pcStr+=config.formatTemplate(item,$('#img-content').html());
          });
          $imgPcWrap.append(ImageWrapper.pcStr);
          // layedit.sync(editorIndex);
          // console.log(layedit.set);
          $('.layui-layedit iframe').contents().find('body').html(ImageWrapper.pcStr);
          layedit.sync(editorIndex);


          console.log($('.layui-layedit iframe').contents());
        }else{
          // ImageWrapper.imgArr.reverse();
        	$.each(ImageWrapper.imgArr,function(index,item){
        		ImageWrapper.detailImg.push(item.imgsrc);
        	})

        }


        $.each(ImageWrapper.imgArr,function(index,item){

            if(ImageWrapper.temp=="img-content"){
              $('.'+ImageWrapper.temp).append(config.formatTemplate(item,$('#'+ImageWrapper.temp).html()));
            }
            
        });

       


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
        console.log(str);

        var myImage = o_ueditorupload.getDialog("insertimage");
        myImage.open();
      }
      //弹出文件上传的对话框
      function upFiles()
      {
        var myFiles = o_ueditorupload.getDialog("attachment");
        myFiles.open();
      } 