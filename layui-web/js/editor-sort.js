$(function(){
	// console.log(laytpl);
	var url=location.href.split('?');
	if(!!url.length){
		var brandId=url;
	}
	var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
	});
	
	console.log(brandId);
	$('.brandId').val(brandId[1].split('=')[1]);
	$('.brandName').val(unescape(brandId[2].split('=')[1]));
	
	// $('.commit-author').on('click',function(){
	// 	config.formSubmit('#authorForm',config.ajaxAddress.getAuthorRole,function(data){
	// 		console.log(data);
	// 	});
	// });
});