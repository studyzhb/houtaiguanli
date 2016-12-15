$(function(){
	var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
		config.ajax('get',config.ajaxAddress.shopList,function(data){
			console.log(data);
			var tempHtml=menulistContent.innerHTML;
			//console.log(tempHtml);
			
				$('#menulist-wraper').html('');
				$.each(data,function(index,item){
					console.log(item);
					
					laytpl(tempHtml).render(item,function(html){
						$('#menulist-wraper').append(html);
					});
				});
		})
	
	});
	$('#all-author-list').on('click','.editor-role',function(){
		
	});

});