
$(function(){
	console.log(laytpl);
	var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
	});
	config.ajax('get',config.ajaxAddress.getAuthorRole,function(data){
		console.log(data);
		//authorList authorContent
		$('#authorList').html('');
		var tempHtml=authorContent.innerHTML;
		$.each(data,function(index,item){
			item.selectedindex=index;
			laytpl(tempHtml).render(item,function(html){
				$('#authorList').append(html);
			});
		});
		layui.use('form',function(){

		});
	});

	$('.commit-author').on('click',function(){
		config.formSubmit('#authorForm',config.ajaxAddress.getAuthorRole,function(data){
			console.log(data);
		});
	});
	
	
});