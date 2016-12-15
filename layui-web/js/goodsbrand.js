$(function(){
	var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;	
		config.ajax('get',config.ajaxAddress.showgoodsbrand,function(data){
		// console.log(data);
			var tempHtml=sortContent.innerHTML;
			$('#all-sort-list').html('');
			$.each(data,function(index,item){
				laytpl(tempHtml).render(item,function(html){
					$('#all-sort-list').append(html);
				});
			});
		});	
	});

	


	//编辑品牌
	$('#all-sort-list').on('click','.editor-brand',function(){
		console.log($(this).data('id'));
		var bname=escape($(this).data('name'));
		location.href='editor-brand.html?id='+$(this).data('id')+'?brandname='+bname;
	});
});