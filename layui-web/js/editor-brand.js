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
	config.ajax('get',config.ajaxAddress.editgoodsbrand,function(data){
		console.log(data);
	},{id:brandId[1].split('=')[1]});
	$('.commit-author').on('click',function(){
		config.formSubmit('#authorForm',config.ajaxAddress.editgoodsbrand,function(data){
			if(data.code==200){
				open('goodsbrand.html',"_self");
			}else{
				layer.msg('网络错误，请稍后重试');
			}
		});
	});
});