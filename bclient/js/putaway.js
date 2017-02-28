
var element;
var laytpl;

$(function(){
	var putaway={
		data:{
			status:0,
			typeid:'-1',
			typepid:''
		},
		//更新商品数据
		updateGoodsCon:function(data){
			$('#goodsWraper').find('.wd-list').hide();
			var tempHtml=goodsContent.innerHTML;

				typeof data==='object'?data.status=this.data.status:'';
				console.log(data.status);
				laytpl(tempHtml).render(data,function(html){
					$('#goodsWraper').append(html);
				});
			// element.init();
		},
		updateList:function(data,laytpl){
			var tempHtml=slider.innerHTML;
			$('#sliderPage').html('');
			$.each(data.shopType,function(index,item){
				item.selectedindex=index;
				laytpl(tempHtml).render(item,function(html){
					$('#sliderPage').append(html);
				});
			});
			this.data.typeid=$('#sliderPage dd').hasClass('layui-this')?$('#sliderPage dd.layui-this').find('a').data('id'):'';
			this.data.typepid=$('#sliderPage dd').hasClass('layui-this')?$('#sliderPage dd.layui-this').find('a').data('pid'):'';
			console.log(this.data.typeid);
			this.updateGoodsInfo(this.data.status,this.data.typeid);
			element.init();
		},
		updateGoodsInfo:function(sta,tyId){
			var me=this;
			config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.showShopGoods,function(data){
				me.updateGoodsCon(data);

			},{status:sta,typeid:tyId});
		},
		//上架商品或者批量上架商品
		putawayGoods:function(name,gId,sta,pid,istype){
			var me=this;
			config.ajax('post',config.ajaxAddress.publicAddress+config.ajaxAddress.addPutaway,function(data){
				if(data.code=='200'){
					$('.layui-tab-title li').each(function(){
						if($(this).hasClass('layui-this')){

							putaway.data.status=$(this).siblings().data('status');
							$(this).removeClass('layui-this').siblings().addClass('layui-this');

							return false;
						}
						
					});
					//console.log(putaway.data.status);
					putaway.updateGoodsInfo(putaway.data.status,putaway.data.typeid);
				}

			},{name:name,id:gId,pid:pid,status:sta});
		},
		editGoodsPrice:function(goodid,price){
			config.ajax('post',config.ajaxAddress.publicAddress+config.ajaxAddress.editgoodsprice,function(data){
				console.log(data);

			},{id:goodid,price:price});
		}
	}


	layui.use(['laytpl','element'],function(){
		laytpl = layui.laytpl;
		element= layui.element();
		config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.showShopGoods,function(data){
			console.log(data);
			putaway.updateList(data,laytpl);

		},{status:0,typeid:'-1'});
	});

	$('#sliderPage').on('click','dd a',function() {
		var typeid=$(this).data('id');
		var typepid=$(this).data('pid');
		putaway.data.typeid=typeid;
		putaway.data.typepid=typepid;
		putaway.updateGoodsInfo(putaway.data.status,typeid);
					
	});

	$('.layui-tab-title li').on('click',function(){
		// console.log('this click');
		// $(this).addClass('layui-this').siblings().removeClass('layui-this');
		putaway.data.status=$(this).data('status');
		putaway.updateGoodsInfo(putaway.data.status,putaway.data.typeid);
	});


	//上下架
	$('#goodsWraper').on('click','.addOrder',function(){
		var sta=$(this).data('status');
		var goodid=$(this).data('id');

		putaway.putawayGoods('good',goodid,sta,putaway.data.typeid);
	});

	//修改价格（上架前才能修改价格）
	
	$('#goodsWraper').on('blur','.editPrice',function(){

		var goodid=$(this).data('id');
		var price=$(this).val();
		putaway.editGoodsPrice(goodid,price);
	});

	//批量上架
	$('.moreAdd').on('click',function(){
		console.log(putaway.data.typepid);
		putaway.putawayGoods('type',putaway.data.typeid,1,putaway.data.typepid);
	})
	//

})