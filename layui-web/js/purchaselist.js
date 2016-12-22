$(function(){
	var purchasePage={
		arrOrder:[],
		selectedindex:'',
		zongjia:'',
		del:''
	}
	var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
		config.ajax('get',config.ajaxAddress.getOrderList,function(data){
			updateList(data,laytpl);
		},{status:0});
	});

	$('.nshenhe').on('click',function(){
		console.log('nshenhe');
		config.ajax('get',config.ajaxAddress.getOrderList,function(data){

			updateList(data,laytpl);
		},{status:0});
	});

	$('.shenhe').on('click',function(){
		console.log('shenhe');
		config.ajax('get',config.ajaxAddress.getOrderList,function(data){
			updateList(data,laytpl);
		},{status:1});
	});

	$('.jujue').on('click',function(){
		console.log('jujue');
		config.ajax('get',config.ajaxAddress.getOrderList,function(data){
			updateList(data,laytpl);
		},{status:10});
	});

	function updateList(data,laytpl){
		var tempHtml=supplierList.innerHTML;
		console.log(data);
		$('#purchaselist').html('');
		$.each(data,function(index,item){
			item.selectedindex=index;
			console.log(item);
			laytpl(tempHtml).render(item,function(html){
				$('#purchaselist').append(html);
			});
		});
	}



$('#purchaselist').on('click','.lookorderInfo',function(){
	config.ajax('get',config.ajaxAddress.editOrderList,function(data){
		console.log(data);
		var tempHtml=singleOrderList.innerHTML;
		$('#singleOrderWrapper').html('');
		$.each(data.lst,function(index,item){
			purchasePage.zongjia=item.dposit;
			item.singlePrice=item.price*item.number;
			item.selectedindex=index;
			purchasePage.arrOrder.push(item);
			laytpl(tempHtml).render(item,function(html){
				$('#singleOrderWrapper').append(html);
			});
		});

	},{id:$(this).data('id')});
	layer.open({
		type:1,
		content: $('#alertDemo'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'1000px',
      maxmin: true
	})
});
var index;
$('#singleOrderWrapper').on('click','.editorSingGood',function(){
	purchasePage.selectedindex=$(this).data('id');
	var nnn=$(this).data('id')-0;
	purchasePage.zongjia-=purchasePage.arrOrder[nnn].singlePrice-0;
	
	index=layer.open({
		type:1,
		content: $('#goodsNum'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'400px',
      maxmin: false
	})
	
});

$('#singleOrderWrapper').on('click','.deleteSingGood',function(){
	purchasePage.selectedindex=$(this).data('id');
	var nnn=$(this).data('id')-0;
	var ind=purchasePage.selectedindex-0;
	purchasePage.zongjia-=purchasePage.arrOrder[nnn].singlePrice-0;
	purchasePage.del+=purchasePage.arrOrder[ind].id;
	var tempHtml=singleOrderList.innerHTML;
	layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(i){
  			//do something
  			purchasePage.arrOrder.splice(ind,1);
  			
  			$('#singleOrderWrapper').html('');
  			$.each(purchasePage.arrOrder,function(index,item){
				laytpl(tempHtml).render(item,function(html){
					$('#singleOrderWrapper').append(html);
				});
			});
		  layer.close(i);
		});
	
});

$('.saveGoodsNum').on('click',function(){
	
	
	var num=$('.singleNum').val();
	var ind=purchasePage.selectedindex-0;
	console.log(num);
	purchasePage.arrOrder[ind].unm=num;
	purchasePage.arrOrder[ind].singlePrice=(num*purchasePage.arrOrder[ind].price).toFixed(2);
	purchasePage.zongjia+=purchasePage.arrOrder[ind].singlePrice-0;
	var tempHtml=singleOrderList.innerHTML;
	if(num==0){
		purchasePage.del+=purchasePage.arrOrder[ind].id;
		console.log(purchasePage.del);
		layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(i){
  			//do something
  			purchasePage.arrOrder.splice(ind,1);
  			$('#singleOrderWrapper').html('');
  			$.each(purchasePage.arrOrder,function(index,item){
				laytpl(tempHtml).render(item,function(html){
					$('#singleOrderWrapper').append(html);
				});
			});
		  layer.close(i);
		});
	}else{
		$('#singleOrderWrapper').html('');
		$.each(purchasePage.arrOrder,function(index,item){
			laytpl(tempHtml).render(item,function(html){
				$('#singleOrderWrapper').append(html);
			});
		});
	}
	
	layer.close(index);
});

$('#confirmorder').on('click',function(){
	var arr=[];
	$.each(purchasePage.arrOrder,function(index,item){
		// console.log(item);
		arr.push({id:item.id,price:item.price,buyerDetId:item.buyerDetId,del:purchasePage.del,buyer_id:item.buyer_id,unm:item.number,dposit:purchasePage.zongjia});
	});
	// console.log(arr);
	$('#goods').val(JSON.stringify(arr));
	// console.log($('#goods').val());
	config.formSubmit('#purchaselistForm',config.ajaxAddress.editOrderList,function(data){
		console.log(data);
		if(data.code==200){
                layer.msg('提交成功');
                setTimeout(function(){
                    open('purchaselist.html','_self');
                },500)
                
            }else{
                layer.msg('网络错误，请稍后重试');
                setTimeout(function(){
                    open('purchaselist.html','_self');
                },500)
            }
	});



});



});