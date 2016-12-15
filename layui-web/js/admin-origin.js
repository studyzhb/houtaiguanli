$(function(){
	var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;

	
	config.ajax('get',config.ajaxAddress.showAdminOrigin,function(data){
		console.log(data);
		var tempHtml=menulistContent.innerHTML;
		//console.log(tempHtml);
		
			$('#menulist-wraper').html('');
			$.each(data,function(index,item){
				console.log(item);
				item.selectedindex=index;
				laytpl(tempHtml).render(item,function(html){
					$('#menulist-wraper').append(html);
				});
			});
	})
});
	$('#all-author-list').on('click','.editor-role',function(){
		console.log($(this).data('id'));
		location.href='editor-author.html?id='+$(this).data('id');
	});

});