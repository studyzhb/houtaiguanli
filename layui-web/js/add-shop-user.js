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
			addUser.maxNum=data.coding[0]['loginname'];
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
		if($(this).ValidateIdCard()){
			var area=getIcardaddress($(this).val().substr(0, 6));
			var bir=$(this).IdCardBirthday();
			var sex=$(this).IdCardSex()?'男':'女';
			var age=$(this).IdCardAge(bir);
			$('.addressInfo').val(area);
			$('.birthdayInfo').val(bir);
			$('.sexInfo').val(sex);
			$('.sexInfoId').val($(this).IdCardSex());
			$('.ageInfo').val(age);

			console.log(area);
		}else{
			// layer.open({
			// 	type:1,
			// 	content:CheckIdCard($(this).val())
			// })
			layer.msg('身份证信息不正确');
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
