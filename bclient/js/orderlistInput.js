$(function(){
	var laytpl;
	var element;
	var StoreHouse={
		data:{
			detailPrice:0
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
	layui.use(['laytpl','element'],function(){
		laytpl = layui.laytpl;
		element= layui.element();
		config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.getTypeInfo,function(data){
			
			StoreHouse.updateList(data,laytpl);
			StoreHouse.updateGoodsInfo(data);

			$.each(data.goodinfo,function(index,item){
				// item.pro.length>1?
			});

		},{name:'typeid',value:3});
	});

	$('#sliderPage').on('click','dd a',function() {
		var typeid=$(this).data('id');

		config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.getTypeInfo,function(data){
			console.log(data);
			StoreHouse.updateGoodsInfo(data);

		},{name:'typeid',value:typeid});			
	});
	//
	$('.intoShopList').on('click',function(){
		config.formSubmit('#goodsWraper',config.ajaxAddress.publicAddress+config.ajaxAddress.addMart,function(data){
			console.log(data);
			if(data.code=='200'){
				layer.msg('添加成功');
				var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
				parent.layer.close(index);
			}else{

			}
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

	



	//弹出支付窗口，输入支付密码



});