$(function(){
	var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
		config.ajax('get',config.ajaxAddress.showshopUser,function(data){
		console.log(data);
		var tempHtml=menulistContent.innerHTML;
		$('#adminUserList').html('');
		$.each(data,function(index,item){
				console.log(item);
				laytpl(tempHtml).render(item,function(html){
					$('#adminUserList').append(html);
				});
			});
	})	
	});
	

	



});