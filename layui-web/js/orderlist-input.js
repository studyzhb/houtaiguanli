$(function(){
	var purchasePage={
		arrOrder:[],
		selectedindex:'',
		zongjia:''
	}
var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
		config.ajax('get',config.ajaxAddress.goodsInput,function(data){
			updateorderlist(data,laytpl);
		});
	});


	$('.nshenhe').on('click',function(){
		console.log('nshenhe');
		config.ajax('get',config.ajaxAddress.goodsInput,function(data){

			updateorderlist(data,laytpl);
		},{status:1});
	});

	$('.shenhe').on('click',function(){
		console.log('shenhe');
		config.ajax('get',config.ajaxAddress.goodsInput,function(data){
			updateorderlist(data,laytpl);
		},{status:2});
	});

	$('.jujue').on('click',function(){
		console.log('jujue');
		config.ajax('get',config.ajaxAddress.goodsInput,function(data){
			updateorderlist(data,laytpl);
		},{status:10});
	});


function updateorderlist(data,laytpl){
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
	config.ajax('get',config.ajaxAddress.editInput,function(data){
		console.log(data);
		var tempHtml=singleOrderList.innerHTML;
		$('#singleOrderWrapper').html('');
		$.each(data.data,function(index,item){
			purchasePage.zongjia=item.dposit;
			item.singlePrice=item.price*item.unm;
			item.selectedindex=index;
			purchasePage.buyerid=item.id;
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
      area:'900px',
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

$('.saveGoodsNum').on('click',function(){
	$('#singleOrderWrapper').html('');
	
	var num=$('.singleNum').val();
	var ind=purchasePage.selectedindex-0;
	purchasePage.arrOrder[ind].unm=num;
	purchasePage.arrOrder[ind].singlePrice=num*purchasePage.arrOrder[ind].price;
	purchasePage.zongjia+=purchasePage.arrOrder[ind].singlePrice-0;
	var tempHtml=singleOrderList.innerHTML;
	$.each(purchasePage.arrOrder,function(index,item){
		laytpl(tempHtml).render(item,function(html){
			$('#singleOrderWrapper').append(html);
		});
	});
	
	layer.close(index);
});

$('.confirmorder').on('click',function(){
	$('.orderlistId').val(purchasePage.buyerid);
	$('.orderToF').val($(this).data('id'));
	console.log($(this).data('id'));
	config.formSubmit('#purchaselistForm',config.ajaxAddress.goodsInput,function(data){
		// console.log(data);
		if(data.code==200){
                layer.msg('操作成功');
                setTimeout(function(){
                    open('orderlistInput.html','_self');
                },500)
                
            }else{
                layer.msg('网络错误，请稍后重试');
                setTimeout(function(){
                    open('orderlistInput.html','_self');
                },500)
            }
	});

	

});



});