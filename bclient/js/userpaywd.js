layui.use('form',function(){
	form = layui.form();

	form.verify({
	  username: function(value){
	    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
	      return '用户名不能有特殊字符';
	    }
	    if(/(^\_)|(\__)|(\_+$)/.test(value)){
	      return '用户名首尾不能出现下划线\'_\'';
	    }
	    
	  }
	  
	  //我们既支持上述函数式的方式，也支持下述数组的形式
	  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
	  ,pass: [
	    /^[\S]{6,12}$/
	    ,'密码必须6到12位，且不能出现空格'
	  ] 
	});

	//监听提交
  form.on('submit(demo1)', function(data1){
    /*layer.alert(JSON.stringify(data.field), {
      title: '最终的提交信息'
    })*/
    console.log('ceshi')
    //验证验证码是否正确checkoutCodeBypayTel
  	config.formSubmit('#userinfo',config.ajaxAddress.publicAddress+config.ajaxAddress.checkoutCodeBypayTel,function(data){
	 console.log(data);
		if(data.code==200){
          layer.msg('添加成功');
           $('#userinfo').hide();
           $('#userpayinfo').show();
            
        }else{
            layer.msg('网络错误，请稍后重试');
            setTimeout(function(){
               location.reload(true);
            },1000);
        }
	});

    return false;
  });

  //监听提交
  form.on('submit(demo2)', function(data1){
    /*layer.alert(JSON.stringify(data.field), {
      title: '最终的提交信息'
    })*/
  
  	config.formSubmit('#userinfo',config.ajaxAddress.publicAddress+config.ajaxAddress.updateLoginPassByOld,function(data){
	console.log(data);
		if(data.code==200){
            layer.msg('添加成功');
            setTimeout(function(){
                location.reload(true);
            },1000);
            
        }else{
            layer.msg('网络错误，请稍后重试');
            setTimeout(function(){
                location.reload(true);
            },1000);
        }
	});

    return false;
  });
var telNum=cookieUtil.getCookie('tel');
  //获取手机验证码
$('.getTelCode').on('click',function(){
  config.ajax('post',config.ajaxAddress.publicAddress+config.ajaxAddress.updateloginpass,function(data){
    console.log(data);
      if(data.code=='200'){
        layer.msg('获取验证码成功')
      }else{
        layer.msg('获取验证码失败,请稍后重试')
      }
  },{type:'updatepay',tel:telNum})
})

$('.telName').val(telNum);
  

});