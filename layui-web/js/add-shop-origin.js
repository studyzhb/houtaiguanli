$(function(){
	// http://localhost/shop/shop/public/index.php/admin/Shop/getIngo

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
		layui.use('form',function(){
			
		});
	})


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
	})
	//提交菜单
	$('.commitMenu').on('click',function(){
		config.formSubmit('.menuForm',config.ajaxAddress.addshopList,function(data){
			console.log(data);
		});
	});
});