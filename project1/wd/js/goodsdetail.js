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
          ImageWrapper.suolveImg=ImageWrapper.imgArr;
        }else{
          ImageWrapper.detailImg=ImageWrapper.imgArr;
        }

        $.each(ImageWrapper.imgArr,function(index,item){
            $('.'+ImageWrapper.temp).append(config.formatTemplate(item,$('#'+ImageWrapper.temp).html()));
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







