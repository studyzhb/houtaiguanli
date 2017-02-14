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
			var form = layui.form();
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
		  	// console.log(data1);
		  	var pwd=$('.passwordAddMD5').val();
		  	pwd=hex_md5(pwd+'5f843e288bb1cabb834b9d20eea3d8c0');
		  	// console.log(pwd);
		  	$('.passwordAddMD5').val(pwd);
		  	console.log(pwd);
		  	config.formSubmit('#adminInfo',config.ajaxAddress.addshopUser,function(data){
			// console.log(data);
				if(data.code==200){
	                layer.msg('添加成功');
	                setTimeout(function(){
	                    open('shop-user.html','_self');
	                },1000);
	                
	            }else{
	                layer.msg('网络错误，请稍后重试');
	                setTimeout(function(){
	                    open('shop-user.html','_self');
	                },1000);
	            }
			});

		    return false;
		  });
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
