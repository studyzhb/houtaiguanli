$(function(){

	var storeId=location.href.split('?')[1].split('=')[1]||'8';
	
	config.ajax('get','/index/public/index.php/index/index/details',function(data){
		var tmp=$('#updatePage').html();
		console.log(data);
		$('#pageContent').append(config.formatTemplate(data.data.gooddetail,tmp));


	},{id:storeId});

	/*
	 * 购物车
	 */
	$("#pageContent").on("click",'.buynow',function(){
		$(".hidden-area").show();
		$(".alert-area").css({width:"80%",height:"80%",left:"20%",top:"20%"}).show().animate({left:"50%",top:"50%",width:"440px",height:"300px",opacity:0.9},500,function(){
			$(this).css("display","block");
			$(".hidden-area .wait").hide();
		});
		//添加购物车
		//detailPage.addShoppingCar();
	});
	$("#pageContent").on("click",'.addCar',function(){
		$(".hidden-area").show();
		$(".alert-area").css({width:"80%",height:"80%",left:"20%",top:"20%"}).show().animate({left:"50%",top:"50%",width:"440px",height:"300px",opacity:0.9},500,function(){
			$(this).css("display","block");
			$(".hidden-area .wait").hide();
		});
		//添加购物车
		//detailPage.addShoppingCar();
	});

})
