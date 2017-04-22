$(function(){
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


	addShopPage.addProvince();

	config.ajax('get',config.ajaxAddress.addAdminOrigin,function(data){
		console.log(data);
		$('.parCom').html('<option value="0">一级机构</option>');
		$.each(data.cata,function(index,item){
			$('<option>').appendTo($('.parCom')).html(item.name).attr('value',item.id);
			$.each(item.children,function(i,its){
				$('<option>').appendTo($('.parCom')).html(' ---- '+its.name);
			});
			
		});
		$('.con_type').html('');
		$.each(data.code,function(index,item){
			$('<option>').appendTo($('.con_type')).html(item.name).attr('value',item.id);
			$.each(item.children,function(i,its){
				$('<option>').appendTo($('.con_type')).html(' ---- '+its.name);
			});
			
		});
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
	})


	//提交菜单
	$('.commitMenu').on('click',function(){
		config.formSubmit('.menuForm',config.ajaxAddress.addAdminOrigin,function(data){
			layer.open({type:3});
			if(data.code==200){
				open('admin-origin.html',"_self");
			}else{
				layer.msg('网络错误，请稍后重试');
				open('admin-origin.html',"_self");
			}
		});
	});
});
