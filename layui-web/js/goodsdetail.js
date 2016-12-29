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

var goodsHouse={
            goodsType:{
                cata1:'',
                cata2:''
            },
            goodsData:{
                goodsName:'',
                goodsCode:''
            },
            goodsId:'2'
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

        /*for(var i=arg.length-1;i>=0;i--){
          ImageWrapper.imgArr.push({imgsrc:item.src});
        }*/

        if(ImageWrapper.temp=="image-suolve"){

        	$.each(ImageWrapper.imgArr,function(index,item){
              if(ImageWrapper.suolveImg.length<3){
        		    ImageWrapper.suolveImg.push(item.imgsrc);
              }
        	});
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


          console.log($('.layui-layedit iframe').contents());
        }else{
          // ImageWrapper.imgArr.reverse();
        	$.each(ImageWrapper.imgArr,function(index,item){
        		ImageWrapper.detailImg.push(item.imgsrc);
        	})
//          ImageWrapper.detailImg=ImageWrapper.imgArr;
        }


        $.each(ImageWrapper.imgArr,function(index,item){

            if(ImageWrapper.temp=="img-content"){
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
            $('.image-suolve').append(config.formatTemplate({imgsrc:item,selectIndex:index},$('#image-suolve').html()));

        });



       if(ImageWrapper.suolveImg.length<3){
        $('<div class="detail-image-col-2 imageadd" id="imageadd">').appendTo($('.image-suolve'));

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

      $('.image-suolve').on('click','#imageadd',function(){
          upImage('image-suolve');
        });



      // 拖拽
//      $(".image-suolve").on('mousedown','.detail-banner-split',function(e){
//    	  console.log('ssss');
//        var that = this;
//        var disX=e.offsetX, disY=e.offsetY;
//        var $clone = $("<div>");
//        $clone.addClass("draging").css("left",$(this).position().left).css("top",$(this).position().top).html($(this).html());
//        $(this).addClass("moving").html("");
//        $clone.appendTo($(this).parent());
//        $(".image-suolve").on("mousemove",function(e){
//          //悬浮层跟随鼠标移动
//          $clone.css("left",e.clientX-$(this).offset().left-disX).css("top",e.clientY-$(this).offset().top-disY);
//        });
//        $clone.mouseup(function(){
//          //取消拖拽事件
//          $(".image-suolve").off("mousemove");
//          //判断最小距离，进行交换
//          var swapIndex = $(that).index();
//          var minDistance = 1000;
//          $(".image-suolve .detail-banner-split").each(function(){
//            var dis = Math.sqrt(Math.pow($clone.position().left-$(this).position().left, 2) +
//              Math.pow($clone.position().top-$(this).position().top, 2));
//            
//            if(dis<minDistance){
//              minDistance = dis;
//              swapIndex = $(this).index();
//            }
//          });
//          
//          if(swapIndex == $(that).index() ){
//            //恢复原位
//            $clone.animate($(that).position(),200,function(){
//              $(that).removeClass("moving").html($clone.html());
//              $clone.remove();
//            })
//          } else {
//            //交换位置元素
//            var $swapEle = $(".image-suolve .detail-banner-split").eq(swapIndex);
//            //生成第二个需要运动的复制元素
//            var $clone2 = $("<div>");
//            //将复制元素的位置设定在交换元素上
//            $clone2.addClass("draging").css("left", $swapEle.position().left ).css("top", $swapEle.position().top ).html($swapEle.html());
//            //将交换元素的样式暂时改为移动状态
//            $swapEle.addClass("moving").html("");
//            //将复制元素2加入九宫格
//            $("#box").append($clone2);
//            //交换位置, 复制元素1移动至交换元素处
//            $clone.animate($swapEle.position(),400, function(){
//              $swapEle.removeClass("moving").html( $clone.html() ); 
//              $clone.remove(); //消失，同时交换元素恢复状态
//            });
//            //复制元素2移动至初始元素处
//            $clone2.animate( $(that).position(),400, function(){
//              $(that).removeClass("moving").html( $clone2.html() );
//              $clone2.remove();//消失，同时初始元素恢复状态
//              
//            });
//          }
//        });
//      });


var getCon=window.location.href.split('?')[1]||'';
var fname=window.location.href.split('?')[2]||'';
goodsHouse.goodsId=getCon?getCon.split('=')[1]:'';







$('.fullname').text(unescape(fname));
    $('#confirmsavetext').on('click',function(){
            layer.closeAll();
            $('.img-content').append(config.formatTemplate({text:$('.singleNum').val()},$('#img-text').html()));
            
        })

        $('#btnSubmit').on('click',function(){
            console.log($('.img-content').html());
            $('#appHtml').val($('.img-content').html());
            var arr=[];
            $('.detail-banner-split').each(function(){
                arr.push($(this).data('imgsrc'));
            })
            // console.log($('.detail-banner-split').data('imgsrc'));
            $('#slImg').val(JSON.stringify(arr));
            // console.log(arr);
            $('.add-alert-area').show();
            //console.log(goodsHouse.goodsId);
            $('#goodsId').val(goodsHouse.goodsId);
            $('#pcContent').val($('#demo').html());
            // console.log(config.ajaxAddress.goodsaddDetail);
            console.log($('#demo').html());
            config.formSubmit('#detailContent',config.ajaxAddress.goodsaddDetail,function(data){
              console.log(data);
               /*if(data.code==200){
                 alert('添加成功');
                 location.href="editorgoodsInfo.html?status=";
               }else{
                 alert('添加失败');
                 location.href="editorgoodsInfo.html?status="; 
               }*/
            })
        });


        config.ajax('get',config.ajaxAddress.goodsDetail+'/id/'+goodsHouse.goodsId,function(data){
          console.log(goodsHouse.goodsId,data.info.spic);

          // $('.image-suolve').append(config.formatTemplate({imgsrc:item},$('#image-suolve').html()));
          // $('.image-suolve').html('');

          if(data.info){
            var arr=eval(data.info.spic)?eval(data.info.spic):'';
            if(arr instanceof Array){
              $('.image-suolve').html('');
              ImageWrapper.suolveImg=arr;
              $.each(arr,function(index,item){
                
                $('.image-suolve').append(config.formatTemplate({imgsrc:item,selectIndex:index},$('#image-suolve').html()));
              });
            }
            
            console.log(arr.length);
            if(arr.length<3){
              $('<div class="detail-image-col-2" id="imageadd" >').appendTo($('.image-suolve'));
             }else{
              console.log(arr.length,'else');
              $('#imageadd').remove();
             }

             
              if(data.info.apptext){
                $('.img-content').html(data.info.apptext);
              }
            

            if(data.info.text){
                $('#demo').html(data.info.text);
             }
          }
          
          /* var ue = UE.getEditor('container',{
            toolbars: [
                   ['source','undo', 'bold','underline','simpleupload','insertimage','cleardoc','imagecenter','justifyleft','justifycenter','justifyright']
                ],
                autoHeight: false,
                autoHeightEnabled: false

        }).setHeight(300).focus(true);*/


        });

    $('.content-tab-ul-wrap ul li').on('click',function(){
            $(this).find('a').addClass('selected').end().siblings().find('a').removeClass();
            if($(this).data('info')=='base'){
                $('.base').css('display','block');
                $('.detail').css('display','none');
            }else{
                $('.base').css('display','none');
                $('.detail').css('display','block');
            }
        });


//鼠标滑过显示删除
$('.image-suolve').on('mouseover','.detail-banner-split',function(){
$(this).find('.deleteAvata').show();

});
$('.image-suolve').on('mouseout','.detail-banner-split',function(){
$(this).find('.deleteAvata').hide();

});

//手机端页面显示删除
$('.img-content').on('mouseover','.img-single',function(){
  console.log('wu11',$(this).children('.deleteAvata'));
  if(!$(this).children('.deleteAvata').length){
    console.log('wu');
    $('<div class="deleteAvata" >').appendTo($(this));
  }
  $(this).find('.deleteAvata').show();
});
$('.img-content').on('mouseout','.img-single',function(){
  $(this).find('.deleteAvata').hide();
});
$('.img-content').on('mousedown','.deleteAvata',function(){
  $(this).parents('.img-single').remove();
  return false;
});




$('.image-suolve').on('mousedown','.deleteAvata',function(){
  
  return false;
});

$('.image-suolve').on('click','.deleteAvata',function(){
  layer.confirm('确定删除？',{},function(index){
    layer.close(index);
    var n=$(this).data('index');
    ImageWrapper.suolveImg.splice(n,1);
    $('.image-suolve').html('');
    $.each(ImageWrapper.suolveImg,function(index,item){
      
      $('.image-suolve').append(config.formatTemplate({imgsrc:item,selectIndex:index},$('#image-suolve').html()));
    });
    if(ImageWrapper.suolveImg.length<3){
        $('<div class="detail-image-col-2 imageadd" id="imageadd">').appendTo($('.image-suolve'));
      }
  })
  
  return false;
});

/*index=layer.open({
    type:1,
    content: $('#goodsNum'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'400px',
      maxmin: false
  })*/


/**
富文本编辑器

*/

layui.use('layedit', function(){
  layedit = layui.layedit;
  editorIndex=layedit.build('demo',{
    tool: ['left', 'center', 'right', '|', 'face']
  }); //建立编辑器
  console.log(layedit.set);
});


