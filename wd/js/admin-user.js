$(function(){
	var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;

		config.ajax('get',config.ajaxAddress.showUserInfo,function(data){
			console.log(data);
		var tempHtml=menulistContent.innerHTML;
		$('#adminUserList').html('');
		$.each(data,function(index,item){
				console.log(item);
				laytpl(tempHtml).render(item,function(html){
					$('#adminUserList').append(html);
				});
			});
		});

	});
		

	$('#all-author-list').on('click','.editor-role',function(){
		console.log($(this).data('id'));
		location.href='editor-author.html?id='+$(this).data('id');
	});



});