$(function(){
	config.ajax('get',config.ajaxAddress.addGoodsSort,function(data){
		console.log(data);
		$('.parCom').html('<option value="0">一级机构</option>');
		$.each(data,function(index,item){
			$('<option>').appendTo($('.parCom')).html(item.type).attr('value',item.id);
			$.each(item.children,function(i,its){
				$('<option>').appendTo($('.parCom')).html(' ---- '+its.type);
			});
			
		});
		
		layui.use('form',function(){
			
		});
	})


	//提交菜单
	$('.commit-author').on('click',function(){
		layer.open({type:3});
		config.formSubmit('#authorForm',config.ajaxAddress.addGoodsSort,function(data){
			if(data.code==200){
				open('goodsSort.html',"_self");
			}else{
				layer.msg('网络错误，请稍后重试');
			}
		});
	});


});
