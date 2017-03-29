$(function(){
	

	config.ajax('get',config.ajaxAddress.addMenulist,function(data){
		console.log(data);
		$('.parCom').html('<option value="0">一级机构</option>');
		$.each(data,function(index,item){
			$('<option>').appendTo($('.parCom')).html(item.name).attr('value',item.id);
			$.each(item.children,function(i,its){
				$('<option>').appendTo($('.parCom')).html(' ---- '+its.name);
			});
			
		});
		layui.use('form',function(){
			
		});
	})


	//提交菜单
	$('.commitMenu').on('click',function(){
		config.formSubmit('.menuForm',config.ajaxAddress.addMenulist,function(data){
			console.log(data);
		});
	});
});