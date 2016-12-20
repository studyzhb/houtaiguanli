$(function(){
	
	var addUser={
		maxNum:''
	}
	config.ajax('get',config.ajaxAddress.addUserInfo,function(data){
		console.log(data);
		if(data.jobNum.length<=0){
			addUser.maxNum=80000;
		}else{
			addUser.maxNum=data.jobNum[0]['job_num']!=0?data.jobNum[0]['job_num']:80000;
		}
		$('.userCard').val(addUser.maxNum-0+1);
		$.each(data.dept,function(index,item){
			$('<option>').appendTo($('.deptlist')).html(item.name);
			$.each(item.z,function(i,ites){
				$('<option>').appendTo($('.deptlist')).attr('value',ites.id).html('----'+ites.name);
			})
		});
		$.each(data.role,function(index,item){
			$('<option>').appendTo($('.rolelist')).attr('value',item.id).html(item.name);
			
		});
		layui.use('form',function(){
			
		});
	})

	$('.idCard').on('blur',function(){
		console.log($(this).val());
		// console.log($(this));
		if($(this).ValidateIdCard()){
			var area=getIcardaddress($(this).val().substr(0, 6));


			var bir=$(this).IdCardBirthday();
			var sex=$(this).IdCardSex()?'男':'女';
			var age=$(this).IdCardAge(bir);
			$('.addressInfo').val(area);
			$('.birthdayInfo').val(bir);
			$('.sexInfo').val(sex);
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
		config.formSubmit('#adminInfo',config.ajaxAddress.addUserInfo,function(data){
			console.log(data);
			if(data.code==200){
                layer.msg('添加成功');
                setTimeout(function(){
                    open('admin-user.html','_self');
                },1000);
                
            }else{
                layer.msg('网络错误，请稍后重试');
                setTimeout(function(){
                    open('admin-user.html','_self');
                },1000);
            }
		});
	})

});
