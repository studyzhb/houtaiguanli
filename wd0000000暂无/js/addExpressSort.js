$(function(){

	//提交菜单
	$('.commit-author').on('click',function(){
		layer.open({type:3});
		var expressName=$('.expressName').val();
		var con=codefans_net_CC2PY(expressName);
		$('.szm').val(con.substr(0,1));
		config.formSubmit('#authorForm',config.ajaxAddress.addExpress,function(data){
			console.log(data);
			if(data.code==200){
				layer.msg('添加成功');
				//open('taskSort.html',"_self");
				
			}else{
				layer.msg('网络错误，请稍后重试');
				//open('taskSort.html',"_self");
				
			}
		});
		

		
	});


});
