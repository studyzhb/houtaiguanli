require(['jquery','jquery-form','main','ajaxAddress','lay-model','image-upload','log'],function($,jf,myObj,ajaxAddress,layObj,upload,log){

    var common=myObj.load();

    var form;

    /**
     * 获取地址栏中参数信息
     */
    var params=function(){

        var paraData=location.href.split('?')||[];
        var readyData=paraData[1]?paraData[1]:'';
        var arrData=readyData.split('&')||[];
        log.d(location.href);
        var obj={};

        $.each(arrData,function(index,item){

            var arr=item.split('=')||[];
            
            obj[arr[0]]=arr[1];
            
        })

        return obj;
    }();



    var formData={
        title:'111111',
        position:'1',
        slide_src:'',
        cityid:params.cityid
    }


    setTimeout(function(){
        form=layObj.form();
        form.verify({
            username: function(value){
                if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                return '用户名不能有特殊字符';
                }
                if(/(^\_)|(\__)|(\_+$)/.test(value)){
                return '用户名首尾不能出现下划线\'_\'';
                }
                if(/^\d+\d+\d$/.test(value)){
                return '用户名不能全为数字';
                }
            }
            
            ,pass: [
                /^[\S]{6,12}$/
                ,'密码必须6到12位，且不能出现空格'
            ],
            isChangeValue:function(value,a){
                if($(a).data('info')==value){
                    $(a).val('');
                }  
            }
            });

            form.on('submit(shopInfo)',function(paraData){
                log.d(paraData.field)
                paraData.field.cityid=params.cityid;
                paraData.field.navid=params.navid;
                log.d(formData);
                var arr=[];
                arr.push('http://enclosure.wandlm.net/user-release/android_1489550372150.png');
                // arr.push('http://enclosure.wandlm.net/user-release/android_1489550372150.png');
                // arr.push('http://enclosure.wandlm.net/user-release/android_1489550372150.png');
                formData.slide_src=JSON.stringify(arr);
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.banner.addBanner,function(data){
                        log.d(data);
                        if(data.code==200){
                            layer.msg('添加成功');
                            setTimeout(function(){
                                
                            },1000);
                            
                        }else{
                            layer.msg('网络错误，请稍后重试');
                            setTimeout(function(){
                                
                            },1000);
                        }
                    },formData);
                    
                return false;
            });
    },1000)
  

    

    /**
     * 图片上传
     */
    $('.imageadd').on('click',function(){
        upload.uploadImage(this,function(arrImage){
            log.d(arrImage);
            var arr=[];
            $.each(arrImage,function(index,item){
                log.d(common.tools.formatTemplate({imgsrc:item.src},$('#image-suolve').html()));
                // $(this).before();
                arr.push(item.src);
            })
            $(this).parent('image-suolve').next('input').val(JSON.stringify(arr));
        });
    });

});