$(function(){
	

	config.ajax('get',config.ajaxAddress.addAdminOrigin,function(data){
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
