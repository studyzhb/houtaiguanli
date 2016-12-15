$(function(){
	var purchasePage={
		arrOrder:[]
	}
var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
		config.ajax('get',config.ajaxAddress.getOrderList,function(data){
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
	});
	});
$('#purchaselist').on('click','.lookorderInfo',function(){
	config.ajax('get',config.ajaxAddress.editOrderList,function(data){
		console.log(data);
		var tempHtml=singleOrderList.innerHTML;
		$('#singleOrderWrapper').html('');
		$.each(data.lst,function(index,item){
			arrOrder.push(item);
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



$('#confirmorder').on('click',function(){
	$('.ruku1').val('1');
	config.formSubmit('#purchaselistForm',config.ajaxAddress.editOrderList,function(data){
		console.log(data);
	});
});



});