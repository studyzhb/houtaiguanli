$(function(){
	var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;	
		
		config.ajax('get',config.ajaxAddress.expressList,function(data){

		var tempHtml=sortContent.innerHTML;
		$('#all-sort-list').html('');
		$.each(data.data,function(index,item){
			item.index=index;
			if(!item.status){
				item.status=1;
			}
			laytpl(tempHtml).render(item,function(html){
				$('#all-sort-list').append(html);
			});
		});
	});	
	});

	//±‡º≠∑÷¿‡
	$('#all-sort-list').on('click','.editor-brand',function(){

		var bname=escape($(this).data('name'));
		location.href='editor-express-sort.html?id='+$(this).data('id')+'?brandname='+bname;
	});


});