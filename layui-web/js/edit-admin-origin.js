$(function(){
	
	var href=location.href.split('?')?location.href.split('?')[1]:'';
	var userId=href.split('=')[1];

	var form;
var addShopPage={
		area_p:config.area_num.root,
		area:{pro:''},
		worktime:{
			start:'',
			end:''
		},
		addProvince:function(){
            //创建省份类select
            $('#province-list').html('');
            var me=this;
            $('.provinceswrap').html('');
            $.each(this.area_p.province,function(index,item){
                $('<option>').appendTo($('.provinceswrap')).html(item['-Name']).attr('value',item['-Name']);
                
            });
        },
        addCity:function(parVal){
            $('#city-list').html('');
             var me=this;
             // console.log('111 css');
             $('.cityswrap').html('');
            $.each(this.area_p.province,function(index,item){
                if(item['-Name']==parVal){
                	console.log('111 css');
                    $.each(item.city,function(i,cityO){
                    	// console.log(cityO);
                    	$('<option>').appendTo($('.cityswrap')).html(cityO['-Name']).attr('value',cityO['-Name']);
                       
                    })
                }
            });
            // layui.use('form',function(){});
        },
        addCountry:function(parP,parC){
            $('#contry-list').html('');
             var me=this;
             console.log('111');
             $('.counwrap').html('');
            $.each(this.area_p.province,function(index,item){
                if(item['-Name']==parP){
                    $.each(item.city,function(i,cityO){
                        if(cityO['-Name']==parC){
                            $.each(cityO.district,function(a,contryO){
                            	//console.log(contryO['-Id']);
                            	$('<option>').appendTo($('.counwrap')).html(contryO['-Name']).attr('value',contryO['-Name']);
                               
                                
                            })
                        }
                    })
                }
            });
            // layui.use('form',function(){});
        },
	}


	


	layui.use('laytpl',function(){
        laytpl = layui.laytpl;
        config.ajax('get',config.ajaxAddress.editAdminOrigin,function(data){
			console.log(data);
			var edithtml=$('#editusercontent').html();
			// $('.edituserwrap').append(config.formatTemplate(data.data,edithtml));
			var obj=data.data;
			obj.dept=data.dept;
			laytpl(edithtml).render(obj,function(html){
                $('.edituserwrap').append(html);
            });
			/*$.each(data.dept,function(index,item){
				$('<option>').appendTo($('.deptlist')).html(item.name);
				$.each(item.z,function(i,ites){
					$('<option>').appendTo($('.deptlist')).attr('value',ites.id).html('----'+ites.name);
				})
			});
			$.each(data.role,function(index,item){
				$('<option>').appendTo($('.rolelist')).attr('value',item.id).html(item.name);
				
			});*/
        	addShopPage.addProvince();
			layui.use('form',function(){
			form = layui.form();
			form.on('select(city)', function(data){
			  console.log(addShopPage.area.pro);
			  addShopPage.addCountry(addShopPage.area.pro,data.value);
			  form.render();
			});

			form.on('select(pro)', function(data){
			  console.log(data);
			  addShopPage.area.pro=data.value;
				addShopPage.addCity(data.value);
				form.render();
			});
		});
		},{id:userId});

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
		config.formSubmit('#adminInfo',config.ajaxAddress.editAdminOrigin,function(data){
			console.log(data);
			if(data.code==200){
                layer.msg('添加成功');
                setTimeout(function(){
                    open('admin-origin.html','_self');
                },1000);
            }else{
                layer.msg('网络错误，请稍后重试');
                setTimeout(function(){
                    open('admin-origin.html','_self');
                },1000);
            }
		});
	})

});
