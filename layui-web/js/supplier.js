$(function(){
	$('.addSupplier').on('click',function(){
		layer.open({
			type: 1,
		      content: $('#alertDemo'), //这里content是一个DOM
		      shade:[0.8,'#000'],
		      area:'900px',
		      maxmin: true
		})
	});
});