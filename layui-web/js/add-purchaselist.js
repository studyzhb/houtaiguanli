
$(function(){
	$('#goods-coding').on('click',function(){
	console.log('sss');
	var val=$(this).prev().find('input').val();
	console.log(val);
});
$('#goods-barcode').on('click',function(){
	console.log('sss');
	var val=$(this).prev().find('input').val();
	console.log(val);
});
// console.log(goodsName);
$('#goodsName').on('click',function(){
	console.log('sss');
	var val=$(this).prev().find('input').val();
	console.log(val);

	layer.open({
      type: 1,
      content: $('#alertDemo'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'900px',
      maxmin: true
    })
});
})

