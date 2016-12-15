$(function(){
	
	var addUser={
		maxNum:''
	}
	//config.ajaxAddress.addshopUser
	config.ajax('get',config.ajaxAddress.addshopUser,function(data){
		console.log(data);
		if(data.coding.length<=0){
			addUser.maxNum=90000;
		}else{
			addUser.maxNum=data.coding[0]['tel'];
		}

		$('.userCard').val(addUser.maxNum-0+1);
		$.each(data.shop,function(index,item){
			$('<option>').appendTo($('.deptlist')).attr('value',item.coding).html(item.name);
		});
		
		layui.use('form',function(){
			
		});
	})

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

	$('.addUserInfo').on('click',function(){
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
	})

});
