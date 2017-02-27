$(function(){
	var laytpl;
	var element;
	var StoreHouse={
		data:{
			detailPrice:0,
			cacheArr:[]
		},
		//更新商品数据
		updateGoodsInfo:function(data){
			this.data.cacheArr.push(data.typeid);
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
		},
		//判断是否存在缓存
		isCacheFound:function(typeid){
			for (var i = 0; i < this.data.cacheArr.length; i++) {
				if(this.data.cacheArr[i]==typeid){
					return true;
				}
			};
			return false;
		},
		selectAll:function(){
			$('#goodsWraper').find('li').addClass('active');
			$('#goodsWraper li .saveIntoMart').each(function(){
				var gId=$(this).data('id')
				var gInfo=$(this).data('info')
				$(this).next('input').val(JSON.stringify({goodid:gId,pro:gInfo.split(',')}));
			})
		},
		slectShiftAll:function(){
			$('#goodsWraper').find('li').removeClass('active');
			$('#goodsWraper li .saveIntoMart').each(function(){
				
				$(this).next('input').val('');
			})
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
	//侧边菜单栏
	$('#sliderPage').on('click','dd a',function() {
		var typeid=$(this).data('id');
		//判断是否存在此缓存,不存在再加载
		console.log(typeid)
		if(!StoreHouse.isCacheFound(typeid)){
			config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.getTypeInfo,function(data){
				console.log(data);
				data.typeid=typeid;
				StoreHouse.updateGoodsInfo(data);

			},{name:'typeid',value:typeid});
		}else{
			$('#goodsWraper .wd-list').each(function(){
				if($(this).data('id')==typeid){
					$(this).show();
				}else{
					$(this).hide();
				}
			})
		}
					
	});
	//
	$('.intoShopList').on('click',function(){
		var title=$(this).data('title');
		config.formSubmit('#goodsWraper',config.ajaxAddress.publicAddress+config.ajaxAddress.addMart,function(data){
			console.log(data);
			if(data.code=='200'){
				layer.msg('添加成功');
				var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
				parent.layer.close(index);
				closeTaskapp(title);
				//$().removeClass("disabled")
			}else{
				closeTaskapp(title);
			}
		});
	});

	function closeTaskapp(title){
		//关闭底部tab栏
		$(".desktop-app",parent.document).each(function() {
			var a = $(this);
			if(a.data('title')==title){
				a.removeClass('disabled');
			}
		})
		
		$(".taskbar-app",parent.document).each(function() {
			var a = $(this);
			if(a.attr('title')==title){
				a.remove();
			}
		})
	}

	//点击添加至进货单(判断规格是否为一个,如果为一个不用选择直接选中)
	$('#goodsWraper').on('click','.selectStandard',function(){
		
		$(this).parent('.shop-mask').siblings('.mutiCode').animate({
			bottom:0,
			zIndex:10
		},100);

		
	});
	//confirmSelect
	//点击确认,再次点击取消
	$('#goodsWraper').on('click','.confirmSelect',function(){
		//选中此商品
		var pro=$(this).data('info');
		var goodid=$(this).data('id');
		var isSelected=$(this).data('selected');
		if(!isSelected){
			$(this).parents('li').addClass('active');
			$(this).parent('.shop-mask').prev().prev().find('input').val(JSON.stringify({goodid:goodid,pro:pro.split(',')}))
		}else{
			$(this).parents('li').removeClass('active');
			$(this).parent('.shop-mask').prev().prev().find('input').val('');
		}
		
	});

	$('#goodsWraper').on('click','.mutiCode span',function(){
		
		$(this).addClass('sele-this');

	});
	//确认添加到购物车
	$('#goodsWraper').on('click','.saveIntoMart',function(){
		var arrMuti=[];
		var goodid=$(this).data('id');
		$(this).prev().find('span').each(function(index,item){
			if($(this).hasClass('sele-this')){
				arrMuti.push($(this).text())
			}
		})
		$(this).next('input').val(JSON.stringify({goodid:goodid,pro:arrMuti}));
		$(this).parents('.mutiCode').animate({bottom:'-108px'},1000);
		$(this).parents('li').addClass('active');
	});

	//全选/取消全选
	$('.checkall').on('click',function(){
		$(this).find('i').html('&#xe617;');
		StoreHouse.selectAll();
	})

	$('.checkshift').on('click',function(){
		$(this).prev().find('i').html('&#xe63f;');
		StoreHouse.slectShiftAll();
	})


	//弹出支付窗口，输入支付密码




});