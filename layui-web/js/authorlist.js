$(function(){
	var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
		config.ajax('get',config.ajaxAddress.getUserRoleList,function(data){
		var tempHtml=userRole.innerHTML;
		//console.log(tempHtml);
			$('#all-author-list').html('');
			$.each(data.data,function(index,item){
				console.log(item);
				item.selectedindex=index;
				laytpl(tempHtml).render(item,function(html){
					$('#all-author-list').append(html);
				});
			});
		})
	});
	
	$('#all-author-list').on('click','.editor-role',function(){
		console.log($(this).data('id'));
		location.href='editor-author.html?id='+$(this).data('id');
	});

});