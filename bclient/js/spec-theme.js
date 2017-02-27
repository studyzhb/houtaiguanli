$(function(){
      var specWrapper={
        data:{
            $o:''
        }
      }
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
       

        // console.log(ImageWrapper.imgArr);
        // $()
          console.log('这是图片地址：'+arg[0].src+'test111');

          specWrapper.data.$o.find('img').attr('src',arg[0].src);
          uploadImagePath(specWrapper.data.$o.data('id'),arg[0].src);
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
        // ImageWrapper.temp=str;
        // console.log(str);
          specWrapper.data.$o=str;
        var myImage = o_ueditorupload.getDialog("insertimage");
        myImage.open();
      }
      //弹出文件上传的对话框
      /*function upFiles()
      {
        //var myFiles = o_ueditorupload.getDialog("attachment");
        //myFiles.open();
      } */
    function uploadImagePath(id,src){
        config.ajax('post',config.ajaxAddress.publicAddress+config.ajaxAddress.specApi.updateSpecPic,function(data){
              console.log(data);
              if(data.code==200){
                layer.msg('添加图片成功');
              }
        },{shopspecialId:id,pic:src});
    }

    layui.use('laytpl', function(){
        
        var laytpl = layui.laytpl;
        config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.specApi.specManage,function(data){
            var tempHtml=specBox.innerHTML;
            
            console.log(data);
            if(data.code==200){
                $.each(data.shop_special,function(index,item){
                    laytpl(tempHtml).render(item,function(html){
                        $('.specWrapper').append(html);
                    });
                })
                $('.specWrapper').on('click','.singlePic',function(){
                  
                  upImage($(this));
                })
                $('.specWrapper').on('hover','.singlePic',function(){
                  
                  upImage($(this));
                })
                //鼠标滑过显示删除
              $('.specWrapper').on('mouseover','.singlePic',function(){
              $(this).find('.addSelect').show();

              });
              $('.specWrapper').on('mouseout','.singlePic',function(){
              $(this).find('.addSelect').hide();

              });
              $('.specWrapper').on('mousedown','.addSelect',function(){
                
                return false;
              });
              $('.specWrapper').on('click','.addSelect',function(){
                var tml=specContent.innerHTML;
                var item={};
                item.id=$(this).data('info');
                item.pic=$(this).siblings('img').attr('src');
                item.title=$(this).prev().text();
                laytpl(tml).render(item,function(html){
                        $('.gridly').append(html);
                    });
                $(this).parents('.singlePic').remove();
                return false;
              });
            }

        })
  
    });


    $('.gridly').gridly({
        base: 60, // px 
        gutter: 20, // px
        columns: 8
      });
    function updateSortSpec(arrData){

      arrData.sort(function(a,b){
        console.log(a,b);
        return parseInt(a.left)-parseInt(b.left);
      })
    }

    //添加paixu
    $('.saveSortSpec').on('click',function(){
          var index=0;
          var arrData=[];
        $('.gridly').find('.brick').each(function(){
            index++;
            arrData.push({id:$(this).find('span').data('id'),left:$(this).css('left')})
        })
        updateSortSpec(arrData)
        $.each(arrData,function(ind,item){
            item.sort=ind+1;
        })
        $('.specWrapper').find('.singlePic').each(function(){
          index++;
          arrData.push({id:$(this).find('span').data('id'),sort:index})
        })
      config.ajax('post',config.ajaxAddress.publicAddress+config.ajaxAddress.specApi.sortSpec,function(data){
        console.log(data);
        if(data.code==200){
          layer.msg('排序成功');
        }
      },{specManage:JSON.stringify(arrData)});
    })

})