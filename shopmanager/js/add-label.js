require(['jquery','jquery-form','main','ajaxAddress','lay-model','log'],function($,jf,myObj,ajaxAddress,layObj,log){

    var common=myObj.load();

    var form;


    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.nav.getPrimaryNav,function(data){
        
        if(data.code==200){
            $('.navWrapper').html('');
            $.each(data.data,function(index,item){
                $('<input type="checkbox" name="navid">').appendTo($('.navWrapper')).attr('title',item.name).val(item.id);
            })

            form=layObj.form();
            form.render('checkbox');
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

                    form.on('submit(addLabel)',function(){
                        common.tools.formSubmit('#authorForm',ajaxAddress.preFix+ajaxAddress.label.addLabelType,function(data){
                                log.d(data);
                                if(data.code==200){
                                    layer.msg('添加成功');
                                    setTimeout(function(){
                                        open('label.html','_self');
                                    },1000);
                                    
                                }else{
                                    layer.msg('网络错误，请稍后重试');
                                    setTimeout(function(){
                                        open('label.html','_self');
                                    },1000);
                                }
                            });
                            
                        return false;
                    })

           
        }
    })


   


})