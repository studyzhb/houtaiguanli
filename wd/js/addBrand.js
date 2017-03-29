$(function(){
	$('.commit-author').on('click',function(){
		layer.open({type:3});
		config.formSubmit('#authorForm',config.ajaxAddress.addgoodsbrand,function(data){
			console.log(data);
			if(data.code==200){

				setTimeout(function(){
                    layer.msg('添加成功');
				open('goodsbrand.html','_self');
                },500)

				
			}else{
				setTimeout(function(){
                   layer.msg('网络错误，请稍后重试');
					open('goodsbrand.html','_self');
                },500)
				
			}
		});
	});
});
