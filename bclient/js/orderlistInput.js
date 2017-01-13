$(function(){
	var laytpl;
	var element;
	layui.use(['laytpl','element'],function(){
		laytpl = layui.laytpl;
		element= layui.element();
		config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.getTypeInfo,function(data){
			
			StoreHouse.updateList(data,laytpl);
			StoreHouse.updateGoodsInfo(data);

		},{name:'typeid',value:3});
	});

	$('#sliderPage').on('click','dd a',function() {
		var typeid=$(this).data('id');

		config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.getTypeInfo,function(data){
			console.log(data);
			StoreHouse.updateGoodsInfo(data);

		},{name:'typeid',value:typeid});			
	});

	$('.intoShopList').on('click',function(){
		config.formSubmit('#goodsWraper',config.ajaxAddress.publicAddress+config.ajaxAddress.addMart,function(data){
			
		});
	});

	//点击添加至进货单
	$('#goodsWraper').on('click','.addOrder',function(){
		$(this).parent('.shop-mask').siblings('.mutiCode').animate({
			bottom:0,
			zIndex:10
		},1000);

		
	});

	$('#goodsWraper').on('click','.mutiCode span',function(){
		
		$(this).addClass('sele-this');
	});

	$('#goodsWraper').on('click','.saveIntoMart',function(){
		var arrMuti=$(this).data('info');
		var goodid=$(this).data('id');

		$(this).next('input').val(JSON.stringify({goodid:goodid,pro:arrMuti.split(',')}));
		$(this).parents('.mutiCode').animate({bottom:'-108px'},1000);

	});

	var StoreHouse={
		data:{

		},
		//更新商品数据
		updateGoodsInfo:function(data){
			$('#goodsWraper').find('.wd-list').hide();
			var tempHtml=goodsContent.innerHTML;
				
				laytpl(tempHtml).render(data,function(html){
					$('#goodsWraper').append(html);
				});
		},
		updateList:function(data,laytpl){
			var tempHtml=slider.innerHTML;
			$('#sliderPage').html('');
			$.each(data.type,function(index,item){
				item.selectedindex=index;
				laytpl(tempHtml).render(item,function(html){
					$('#sliderPage').append(html);
				});
			});
			element.init();
		}
	}




});