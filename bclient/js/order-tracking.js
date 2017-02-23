$(function(){
	var sN=location.href.split('?')[1].split('=')[1];
	//购物车页面
	var orderTracking={
		data:{
			//采购单号
			coding:'',
			pass:'',
			total:0
		},
		updateShoppingList:function(carid,num,pro,$obj,price){
			config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.updateShoppingList,function(data){
				console.log(data);
				layer.closeAll('loading');
				if(data.code=='200'){
					$obj.val(num);
					orderTracking.data.total+=(num*price).toFixed(2);
					$obj.parents('td').next('td.dPrice').text(num*price.toFixed(2));
					$('.detailPrice').text(orderTracking.data.total);
				}
			},{id:carid,num:num,pro:pro});
		},
		deleteSingleGoods:function(carid,pro,$obj){
			config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.deleteSingleGoods,function(data){
				console.log(data);
				
				if(data.code=='200'){
					$obj.parents('tr').remove();
					layer.closeAll('loading');
					
				}else{
					layer.msg('删除失败');
				}
			},{id:carid,pro:pro});
		},
		payOrder:function(){
			config.ajax('post',config.ajaxAddress.publicAddress+config.ajaxAddress.payOrderList,function(data){
				console.log(data);
				if(data.code=="200"){
					layer.msg('支付成功');
					location.reload();
				}
			},{paypassword:this.data.pass,orderid:this.data.coding,total:this.data.total});
		},
		//打印小票或配送
		showOrderlist:function(){
			
			config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.userOrderDetail,function(data){
				console.log(data);
				layer.closeAll('loading');
				if(data.code=='200'){
					
					var tempHtml=singleOrderList.innerHTML;					
					// var tempHtml2=info.innerHTML;
					$('.purchaselist').html('');
					
					laytpl(tempHtml).render(data.orderinfo,function(html){
						
						$('.purchaselist').append(html);
					});
					

					// laytpl(tempHtml2).render(data.time,function(html){
						
					// 	$('.user-mess').append(html);
					// });

					updateGoods(data.time);
				}

				layer.open({
			        type:1,
			        content: $('#alertMessage1'), //这里content是一个DOM
			          shade:[0.8,'#000'],
			          area:'800px',
			          maxmin: true,
			          end:function(){
			            // console.log('end');
			          }
			        })

			},{id:orderTracking.data.coding,status:orderTracking.data.status});
	}

	layui.use(['laytpl','element'],function(){
		laytpl = layui.laytpl;
		element= layui.element();
		config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.borderList,function(data){
			console.log(data);
			var tempHtml=supplierList.innerHTML;
			$('#purchaselist').html('');
			
			laytpl(tempHtml).render(data,function(html){
				
				$('#purchaselist').append(html);
			});
		},{status:sN});
	});

	$('#purchaselist').on('click','.payPreLook',function() {
		$('.payInput').val('');
		layer.load();
		orderTracking.data.total=$(this).data('pri');
		orderTracking.data.coding=$(this).data('id');
		
		layer.open({
	        type:1,
	        content: $('#alertMessage'), //这里content是一个DOM
	          shade:[0.8,'#000'],
	          area:'80%',
	          maxmin: true,
	          end:function(){
	            // console.log('end');
	          }
	        })
		$('.payInput').eq(0).focus();
	})

	//支付
	$('.payInput:not(.payInput:last)').each(function(){
			$(this).on('focus',function(){
				$(this).on('keyup',function(){
					this.blur();
					$(this).next('input').focus();
				})
				
			})
	})

	$('#purchaselist').on('click','.lookinfo',function() {
		// layer.load();
		// orderTracking.data.total=$(this).data('pri');
		orderTracking.data.coding=$(this).data('id');
		orderTracking.showOrderlist();
	})

	$('.payInput:last').on('keyup',function(){
		console.log('zhifu');
		$('.payInput').each(function(){
			orderTracking.data.pass+=$(this).val().trim();

		})
		orderTracking.data.pass=hex_md5(orderTracking.data.pass+config.accessKey);
		layer.load();
		orderTracking.payOrder();
	})

	
})