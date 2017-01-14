$(function(){
	//购物车页面
	var purchaselist={
		data:{
			//采购单号
			coding:'',
			pass:'',
			total:0
		},
		updateShoppingList:function(carid,num,pro,$obj,price){
			config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.updateShoppingList,function(data){
				console.log(data);
				layer.closeAll('loading');
				if(data.code=='200'){
					$obj.val(num);
					purchaselist.data.total+=(num*price).toFixed(2);
					$obj.parents('td').next('td.dPrice').text(num*price.toFixed(2));
					$('.detailPrice').text(purchaselist.data.total);
				}
			},{id:carid,num:num,pro:pro});
		},
		deleteSingleGoods:function(carid,pro,$obj){
			config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.deleteSingleGoods,function(data){
				console.log(data);
				
				if(data.code=='200'){
					$obj.parents('tr').remove();
					layer.closeAll('loading');
					
				}else{
					layer.msg('删除失败');
				}
			},{id:carid,pro:pro});
		},
		payOrder:function(){
			config.ajax('post',config.ajaxAddress.publicAddress+config.ajaxAddress.payOrderList,function(data){
				console.log(data);
				
				
			},{paypassword:this.data.pass,orderid:this.data.coding,total:this.data.total});
		}
	}

	layui.use(['laytpl','element'],function(){
		laytpl = layui.laytpl;
		element= layui.element();
		config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.showShoppingList,function(data){
			console.log(data);
			var tempHtml=supplierList.innerHTML;
			$('#purchaselist').html('');
			$.each(data.goodinfo,function(index,item){
				purchaselist.data.total+=(item.minsell*item.wholesale*item.carnum).toFixed(2)-0;
			})
			laytpl(tempHtml).render(data,function(html){
				$('#purchaselist').append(html);
			});
			$('.detailPrice').text(purchaselist.data.total);
		})
	});

	//购物车数量+ -
	$('#purchaselist').on('click','.addNum',function(){
		layer.load(1);
		purchaselist.data.total-=$(this).parents('td').next('td.dPrice').text()-0;
		var price=$(this).parents('td').prev('td').text()-0;
		var $obj=$(this).next();
		var num=$obj.val()-0;
		num++;
		purchaselist.updateShoppingList($(this).data('id'),num,$(this).data('pro'),$obj,price);
	});

	$('#purchaselist').on('click','.reduce',function(){
		layer.load(2);
		var $obj=$(this).prev();
		var num=$(this).prev().val()-0;
		purchaselist.data.total-=$(this).parents('td').next('td.dPrice').text()-0;
		var price=$(this).parents('td').prev('td').text()-0;
		num=--num==0?1:--num;
		purchaselist.updateShoppingList($(this).data('id'),num,$(this).data('pro'),$obj,price);
	});

	$('#purchaselist').on('blur','.inputNum',function(){
		layer.load(2);
		var num=$(this).val()-0;
		purchaselist.data.total-=$(this).parents('td').next('td.dPrice').text()-0;
		var price=$(this).parents('td').prev('td').text()-0;
		purchaselist.updateShoppingList($(this).data('id'),num,$(this).data('pro'),$(this),price);
	});

	//删除商品
	$('#purchaselist').on('click','.deleteGoods',function(){
		layer.load(2);
		purchaselist.data.total-=$(this).parents('td').next('td.dPrice').text()-0;
		purchaselist.deleteSingleGoods($(this).data('id'),$(this).data('pro'),$(this));
	});

	//全选
	$('.isChecked').on('click',function(){
		var tag=this.checked;
		console.log('quanxuan',tag);
		$('#purchaselist .tagSelect').each(function(){
			this.checked=tag;
		})
	});

	$('#purchaselist').on('click','.tagSelect',function(){
		var isCheck=true;
		$('#purchaselist .tagSelect').each(function(){
			if(!this.checked){
                isCheck=false;
            }
		})

		$('.isChecked')[0].checked=isCheck;
	});

	$('#payToorder').on('click',function(){
		var arr=[];
		layer.load();				
		$('#purchaselist .tagSelect').each(function(){
			if(this.checked){
				arr.push($(this).data('id'));
			}
		})
		config.ajax('post',config.ajaxAddress.publicAddress+config.ajaxAddress.createBorderList,function(data){
			console.log(data);

			if(data.code=="200"){
				layer.closeAll('loading');
				purchaselist.data.coding=data.coding;
				layer.open({
			        type:1,
			        content: $('#alertMessage'), //这里content是一个DOM
			          shade:[0.8,'#000'],
			          area:'900px',
			          maxmin: true,
			          end:function(){
			            // console.log('end');
			          }
			        })
			}else{
				layer.msg('提交失败，请重新提交');
			}
		},{good:JSON.stringify(arr),note:'测试数据，不做处理'});
	});

	$('.payInput').eq(0).focus();

	$('.payInput:not(.payInput:last)').each(function(){
			$(this).on('focus',function(){
				$(this).on('keyup',function(){
					this.blur();
					$(this).next('input').focus();
				})
				
			})
			 

	})
	$('.payInput:last').on('keyup',function(){
		console.log('zhifu');
		$('.payInput').each(function(){
			purchaselist.data.pass+=$(this).val().trim();

		})
		purchaselist.data.pass=hex_md5(purchaselist.data.pass+config.accessKey);
		layer.load();
		purchaselist.payOrder();
	})

	
})