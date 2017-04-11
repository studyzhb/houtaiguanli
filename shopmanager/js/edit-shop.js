require(['jquery','jquery-form','main','ajaxAddress','lay-model','log'],function($,jf,myObj,ajaxAddress,layObj,log){

    var common=myObj.load();

    var form;
    
    var formData={

    }
    renderForm();
    var ShopObj={
        data:{

        },
        methods:{
            updateShopInfo:function(data){
                var tpl=$('#formCon').html();
                layObj.laytpl(tpl).render(data,function(html){
                    $('.formWrapper').append(html);
                });
            }
        }
    }


    /**
     * 获取地址栏中参数信息
     */
    var params=function(){

        var paraData=location.href.split('?')||[];

        var obj={};

        $.each(paraData,function(index,item){

            var arr=item.split('=')||[];
            
            arr.length==2?obj[arr[0]]=arr[1]:'';
            
        })

        return obj;
    }();

    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.label.getLabelListByNavId,function(data){
        log.d(data);
        var tmpl=$('#labelCon').html();
        layObj.laytpl(tmpl).render(data,function(){
            
        })

    },params);

    formData['id']=params.id;
    /**
     * 获取店铺信息
     */
    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.shop.getShopInfoById,function(data){
        log.d(data);
        if(data.code==200){
            
            ShopObj.methods.updateShopInfo(data.data);
            
           
        }
    },params);

    function renderForm(){
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
                }else{
                    formData[$(a).attr('name')]=value;
                }  
            }
            });

            form.on('submit(shopInfo)',function(){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.shop.updateShop,function(data){
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
            })
        },1000);
    }
    


    



    


});