$(function(){
var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
	});
$('#purchaselist').on('click','.lookorderInfo',function(){
	layer.open({
		type:1,
		content: $('#alertDemo'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'900px',
      maxmin: true
	})
});

config.ajax('get',config.ajaxAddress.getOrderList,function(data){
	var tempHtml=supplierList.innerHTML;
	
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