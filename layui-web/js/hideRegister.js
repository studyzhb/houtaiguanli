require(['jquery','main','ajaxAddress','lay-model','log'],function($,myObj,ajaxAddress,layObj,log){
    
    var common=myObj.load();
    var regisObj={
        data:{
            isCanSend:true,
            defaultValue:60
        },
        methods:{
            changeMessCon:function(){
                regisObj.data.defaultValue--;
                if(regisObj.data.defaultValue<1){
                    $('.getMessCode').text('获取短信验证码');
                    return;
                }else{
                    $('.getMessCode').text(regisObj.data.defaultValue+'秒后重新发送');
                }
                setTimeout(function(){
                    regisObj.methods.changeMessCon();
                },1000);
            }
        }
    }
    $('.getPicCode').on('click',function(){
        $(this).find('img').attr('src',ajaxAddress.preFix+ajaxAddress.hideRegister.getPicCode+'?v='+new Date().getTime());
    });

    $('.getMessCode').on('click',function(){
        if(regisObj.data.isCanSend){
            regisObj.isCanSend=false;
            var obj={
                tel:$('.telRegister').val(),
                code:$('.picCode').val()
            }
            if(!obj.tel){
                layObj.layer.msg('手机号不能为空');
                return;
            }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(obj.tel))){
                layObj.layer.msg('手机号格式不正确');
            }
            if(!obj.code){
                layObj.layer.msg('图片验证码不能为空');
                return;
            }
            obj.type='regis';
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.hideRegister.sendPhoneCode,function(data){
                log.d(data);
                layObj.layer.msg(data.message);
                if(data.code==200){

                }else{
                    regisObj.isCanSend=true;
                }
            },obj);
        }else{
            layObj.layer.msg('请稍后再试');
        }
        
    });


    setTimeout(function(){
        form=layObj.form();
        /**
         *注册 
         */
        form.on('submit(registerOne)',function(formParams){
            log.d(formParams.field)
            layObj.layer.load();

            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.hideRegister.register,function(data){
                log.d(data);
                layObj.layer.msg(data.message);
                if(data.code==200){
                    layObj.layer.closeAll('loading');
                    $('form').each(function(){
                        this.reset();
                    })
                }else{
                    layObj.layer.closeAll('loading');
                }
            },formParams.field);
                
            return false;
        })







    },1000);






})