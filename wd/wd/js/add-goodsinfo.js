$('.checkNumValidate').on('blur',function(){
	// alert($(this).val());
	if(Number($(this).val())){

	}else{
		alert("请输入数字,不包含汉字");
	}


})

//商品编码,商品条形码判断

$('#goods-code').on('blur',function(){
	// config.ajax('',config.ajaxAddress.)
})

$('#goods-barcode').on('blur',function(){
	// config.ajax('post',config.ajaxAddress.goodsI18Num,function(data){
	// 	console.log(data);
	// },{barcode:$(this).val()})
})