$(function(){
	
	var addUser={
		maxNum:''
	}


	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
		config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.shopDetail.shopbalance,function(data){
		console.log(data);
			var tempHtml=shophis.innerHTML;
			//console.log(tempHtml);
			
			$('#purchaselist').html('');
			laytpl(tempHtml).render(data,function(html){
					$('#purchaselist').append(html);
				});
			
		
		layui.use('form',function(){
			
		});
	});


	});


	

	$('.idCard').on('blur',function(){
		console.log($(this).val());
		if(CheckIdCard($(this).val())=='验证通过!'){
			var area=getarea($(this).val());
			var bir=GetBirthday($(this).val());
			var sex=Getsex($(this).val());
			$('.addressInfo').val(area);
			$('.birthdayInfo').val(bir);
			$('.sexInfo').val(sex);
		}else{
			// layer.open({
			// 	type:1,
			// 	content:CheckIdCard($(this).val())
			// })
			layer.msg(CheckIdCard($(this).val()));
		}
	});

	/*$('.addUserInfo').on('click',function(){
		config.formSubmit('#adminInfo',config.ajaxAddress.addshopUser,function(data){
			console.log(data);
			if(data.code==200){
                layer.msg('添加成功');
                setTimeout(function(){
                    open('shop-user.html','_self');
                },500)
                
            }else{
                layer.msg('网络错误，请稍后重试');
                setTimeout(function(){
                    open('shop-user.html','_self');
                },500)
            }
		});
	})*/

});
