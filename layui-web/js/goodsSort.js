$(function(){
	var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;		
	});


	config.ajax('get',config.ajaxAddress.showGoodsSort,function(data){
		// console.log(data);
		var tempHtml=sortContent.innerHTML;
		$('#all-sort-list').html('');
		$.each(data,function(index,item){
			console.log(item);
			laytpl(tempHtml).render(item,function(html){
				$('#all-sort-list').append(html);
			});
		});
	});
});