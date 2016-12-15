$(function(){
	// http://localhost/shop/shop/public/index.php/admin/Shop/getIngo
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

	config.ajax('get',config.ajaxAddress.addshopList,function(data){
		console.log(data);
		$('.parCom').html('<option value="0">一级机构</option>');
		$.each(data.area,function(index,item){
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
	});

	

	





	$("#date").jeDate({
	    isinitVal:true,
	    festival:true,
	    ishmsVal:false,
	    minDate: '2016-06-16 23:59:59',
	    maxDate: $.nowDate(0),
	    format:"hh:mm:ss",
	    zIndex:3000,
	    choosefun:function(elem, val) {

	    },     
	    //选中日期后的回调, elem当前输入框ID, val当前选择的值
		clearfun:function(elem, val) {},      
		//清除日期后的回调, elem当前输入框ID, val当前选择的值
		okfun:function(elem, val) {
			console.log(val);
			addShopPage.worktime.start=val;
		},        
		//点击确定后的回调, elem当前输入框ID, val当前选择的值
		success:function(elem) {},            
		//层弹出后的成功回调方法, elem当前输入框ID
	});
	$("#date01").jeDate({
	    isinitVal:true,
	    festival:true,
	    ishmsVal:false,
	    minDate: '2016-06-16 23:59:59',
	    maxDate: $.nowDate(0),
	    format:"hh:mm:ss",
	    zIndex:3000,
	    okfun:function(elem, val) {
			console.log(val);
			addShopPage.worktime.end=val;
		}
	})
	//提交菜单
	$('.commitMenu').on('click',function(){
		$('.worktimesae').val(addShopPage.worktime.start+'-'+addShopPage.worktime.end);
		layer.open({type:3});
		config.formSubmit('.menuForm',config.ajaxAddress.addshopList,function(data){
			console.log(data);
			if(data.code==200){
                layer.msg('添加成功');
                setTimeout(function(){
                    open('shop.html','_self');
                },500)
                
            }else{
                layer.msg('网络错误，请稍后重试');
                setTimeout(function(){
                    open('shop.html','_self');
                },500)
            }
		});
	});





});



