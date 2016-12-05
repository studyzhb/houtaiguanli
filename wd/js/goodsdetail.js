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
      $("#box div").mousedown(function(e){
        var that = this;
        var disX=e.offsetX, disY=e.offsetY;
        var $clone = $("<div>");
        $clone.addClass("draging").css("left",$(this).position().left).css("top",$(this).position().top).html($(this).html());
        $(this).addClass("moving").html("");
        $clone.appendTo($(this).parent());
        $("#box").on("mousemove",function(e){
          //悬浮层跟随鼠标移动
          $clone.css("left",e.clientX-$(this).offset().left-disX).css("top",e.clientY-$(this).offset().top-disY);
        });
        $clone.mouseup(function(){
          //取消拖拽事件
          $("#box").off("mousemove");
          //判断最小距离，进行交换
          var swapIndex = $(that).index();
          var minDistance = 1000;
          $("#box div:not(:last)").each(function(){
            var dis = Math.sqrt(Math.pow($clone.position().left-$(this).position().left, 2) +
              Math.pow($clone.position().top-$(this).position().top, 2));
            
            if(dis<minDistance){
              minDistance = dis;
              swapIndex = $(this).index();
            }
          });
          
          if(swapIndex == $(that).index() ){
            //恢复原位
            $clone.animate($(that).position(),200,function(){
              $(that).removeClass("moving").html($clone.html());
              $clone.remove();
            })
          } else {
            //交换位置元素
            var $swapEle = $("#box div").eq(swapIndex);
            //生成第二个需要运动的复制元素
            var $clone2 = $("<div>");
            //将复制元素的位置设定在交换元素上
            $clone2.addClass("draging").css("left", $swapEle.position().left ).css("top", $swapEle.position().top ).html($swapEle.html());
            //将交换元素的样式暂时改为移动状态
            $swapEle.addClass("moving").html("");
            //将复制元素2加入九宫格
            $("#box").append($clone2);
            //交换位置, 复制元素1移动至交换元素处
            $clone.animate($swapEle.position(),400, function(){
              $swapEle.removeClass("moving").html( $clone.html() ); 
              $clone.remove(); //消失，同时交换元素恢复状态
            });
            //复制元素2移动至初始元素处
            $clone2.animate( $(that).position(),400, function(){
              $(that).removeClass("moving").html( $clone2.html() );
              $clone2.remove();//消失，同时初始元素恢复状态
              
            });
          }
        });
      });




