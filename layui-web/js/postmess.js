$(function(){
	layui.use('form',function(){
			
		});
	$('.commit-author').on('click',function(){
		layer.open({type:3});
		config.formSubmit('#authorForm',config.ajaxAddress.postmessage,function(data){
			console.log(data);
			if(data.code==200){
				layer.msg('发送成功');
				layer.closeAll();
			}else{
				layer.msg('网络错误，请稍后重试');
				
			}
		});
	});
});
