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

	$('#menulist-wraper').on('click','.editorShopInfo',function(){
		// layer.open();
		console.log($(this).data('id'));
		config.ajax('get',config.ajaxAddress.shopprice,function(data){
			console.log(data);
			var tempHtml=shopPriceContent.innerHTML;
			//console.log(tempHtml);
			
			$('.shop-price-wrapper').html('');
			$.each(data,function(index,item){
				console.log(item);
				laytpl(tempHtml).render(item,function(html){
					$('.shop-price-wrapper').append(html);
				});
			});

		},{id:$(this).data('id')});
		layui.use('form',function(){

		});
		layer.open({
	        type:1,
	        content: $('#alertDemo'), //这里content是一个DOM
	      shade:[0.8,'#000'],
	      area:'900px',
	      maxmin: true
	    })
	});

	$('#menulist-wraper').on('click','.lookShopInfo',function(){
		open('shopprice-his.html?id='+$(this).data('id'),'_self');
	});

	$('.addUserInfo').on('click',function(){
		
		$('#order-time').val(new Date().getTime());
		config.formSubmit('#adminInfo',config.ajaxAddress.shopprice,function(data){
			if(data.code==200){
                layer.msg('添加成功');
                setTimeout(function(){
                    open('shop-price.html','_self');
                },500)
                
            }else{
                layer.msg('网络错误，请稍后重试');
                setTimeout(function(){
                    open('shop-price.html','_self');
                },500)
            }
		});
	});

});