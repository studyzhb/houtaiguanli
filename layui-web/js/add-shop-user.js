$(function(){
	
	var addUser={
		maxNum:''
	}
	//config.ajaxAddress.addshopUser
	config.ajax('get','http://192.168.1.150/shop/shop/public/index.php/admin/Shop/bAdd',function(data){
		console.log(data);
		if(data.coding.length<=0){
			addUser.maxNum=80000;
		}else{
			addUser.maxNum=data.jobNum[0]['job_num'];
		}

		$('.userCard').val(addUser.maxNum-0+1);
		$.each(data.dept,function(index,item){
			$('<option>').appendTo($('.deptlist')).attr('value',item.id).html(item.name);
		});
		$.each(data.role,function(index,item){
			$('<option>').appendTo($('.rolelist')).attr('value',item.id).html(item.name);
			
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
		});
	})

});
