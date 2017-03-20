require(['jquery','main','ajaxAddress','lay-model','log','image-upload'],function($,myObj,ajaxAddress,layObj,log,upload){

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
        goodsname:'111',
        goodsnum:'111',
        shopid:'22',
        goods_pic:"['http://enclosure.wandlm.net/user-release/android_1489550372150.png']",
        cityid:'1',
        navid:'1',
        introduce:'1111',
        goods_logo:"['http://enclosure.wandlm.net/user-release/android_1489550372150.png']",
        price_pay:'111',
        pricrc_sell:'111',
        classifyid:'1',
        validity_time:'11111111',
        bespoke:'1',
        refund:'1',
        renew:'1'
    }


    log.d(params);
    $('.cityInput').val(params.cityid);
    $('.navInput').val(params.navid);
    $('.shopInput').val(params.shopid);

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

            form.on('submit(shopInfo)',function(formParams){
                
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.shopGoods.addShopGoods,function(data){
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
                    },formParams.field);
                    
                return false;
            })
    },300);

    
    $('.imageadd').on('click',function(){
        upload.uploadImage(this);
    })


});