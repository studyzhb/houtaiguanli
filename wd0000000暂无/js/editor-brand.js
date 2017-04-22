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
		if(data[0].pic){
			$('.imageadd').attr('src',data[0].pic);
		}
		
	},{id:brandId[1].split('=')[1]});
	$('.commit-author').on('click',function(){
		config.formSubmit('#authorForm',config.ajaxAddress.editgoodsbrand,function(data){
			if(data.code==200){
				setTimeout(function(){
					alert('编辑成功');
                    open('goodsbrand.html',"_self");
                },500)
				
			}else{
				setTimeout(function(){
					alert('网络错误，请稍后重试');
                    open('goodsbrand.html',"_self");
                },500)
				
			}
		});
	});
});