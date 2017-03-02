$(function(){
	//购物车页面
	var purchaselist={
		data:{
			//采购单号
			coding:'',
			pass:'',
			total:0,
			selectedTotal:0
		},
		/**
		*
		*/
		updateShoppingList:function(carid,num,pro,$obj,price){
			console.log(num,price);
			var self=this;
			config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.updateShoppingList,function(data){

				layer.closeAll('loading');
				if(data.code=='200'){
					$obj.val(num);
					//判断是否选中,假设选中更改合计价格
					var sPrice=num*price;
					purchaselist.data.total=purchaselist.data.total-0;
					purchaselist.data.total+=sPrice;
					purchaselist.data.total=(purchaselist.data.total-0).toFixed(2);
					$obj.parents('td').next('td.dPrice').text((num*price).toFixed(2));
					if(self.isAddTotal($obj)){
						purchaselist.data.selectedTotal+=sPrice;
						$('.detailPrice').text(purchaselist.data.selectedTotal.toFixed(2));
					}
					//$('.detailPrice').text(purchaselist.data.total);
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
				if(data.code=="200"){
					layer.msg('支付成功');
					location.reload();
				}else{
					layer.msg(data.message);
					// location.reload();
				}
				
			},{paypassword:this.data.pass,orderid:this.data.coding,total:this.data.total});
		},
		//判断是否选中
		isAddTotal:function(s){
			var o=s.parents('td.goodsnum').siblings('td.checkInput').find('input')[0];
			
			if(o.checked){
				return true;
			}
			return false;
		}
	}

	layui.use(['laytpl','element'],function(){
		laytpl = layui.laytpl;
		element= layui.element();
		config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.showShoppingList,function(data){

			var tempHtml=supplierList.innerHTML;
			$('#purchaselist').html('');
			$.each(data.goodinfo,function(index,item){
				purchaselist.data.total+=item.minsell*item.wholesale*item.carnum;
			})
			purchaselist.data.total=purchaselist.data.total.toFixed(2);
			purchaselist.data.total=purchaselist.data.total-0;
			laytpl(tempHtml).render(data,function(html){
				$('#purchaselist').append(html);
			});
			$('.detailPrice').text('0.00');
			//$('.detailPrice').text(purchaselist.data.total);
		})
	});

	//购物车数量+ -
	$('#purchaselist').on('click','.addNum',function(){
		layer.load(1);
		purchaselist.data.total-=$(this).parents('td').next('td.dPrice').text()-0;

		var price=$(this).parents('td').prev('td').text()-0;
		var $obj=$(this).next();
		if(purchaselist.isAddTotal($obj)){
			purchaselist.data.selectedTotal-=$(this).parents('td').next('td.dPrice').text()-0;
		}
		var num=$obj.val()-0;
		num++;
		purchaselist.updateShoppingList($(this).data('id'),num,$(this).data('pro'),$obj,price);
	});

	$('#purchaselist').on('click','.reduce',function(){
		layer.load(2);
		var $obj=$(this).prev();
		var num=$(this).prev().val()-0;
		if(num>1){
			purchaselist.data.total-=$(this).parents('td').next('td.dPrice').text()-0;
			if(purchaselist.isAddTotal($obj)){
				purchaselist.data.selectedTotal-=$(this).parents('td').next('td.dPrice').text()-0;
			}
		}
		var price=$(this).parents('td').prev('td').text()-0;
		num=num<2?1:--num;
		purchaselist.updateShoppingList($(this).data('id'),num,$(this).data('pro'),$obj,price);
	});

	$('#purchaselist').on('blur','.inputNum',function(){
		layer.load(2);
		var num=$(this).val()-0;
		if(num<1){
			num=1;
		}
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
		if(tag){
			//全选
			$('.detailPrice').text((purchaselist.data.total-0).toFixed(2));
		}else{
			$('.detailPrice').text('0.00');
		}
		$('#purchaselist .tagSelect').each(function(){
			this.checked=tag;
		})
	});
	//单个点击复选框2017/2/28修改合计价格区域
	$('#purchaselist').on('click','.tagSelect',function(){
		var isCheck=true;
		var dPrice=$(this).parents('td').siblings('.dPrice').text()-0;
		
		if(this.checked){
			//增加此类商品总价格到合计区
			purchaselist.data.selectedTotal+=dPrice;
		}else{
			//从合计区域减掉此价格
			purchaselist.data.selectedTotal-=dPrice;
		}
		$('.detailPrice').text((purchaselist.data.selectedTotal-0).toFixed(2));
		$('#purchaselist .tagSelect').each(function(){

			if(!this.checked){
                isCheck=false;
            }
		})

		$('.isChecked')[0].checked=isCheck;
	});

	//点击生成订单
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
				$('.payInput').val('');
				$('.payInput').eq(0).focus();
			}else{
				layer.msg('提交失败，请重新提交');
			}
		},{good:JSON.stringify(arr),note:'测试数据，不做处理'});
	});

	

	$('.payInput:not(.payInput:last)').each(function(){
			$(this).on('focus',function(){
				$(this).on('keyup',function(){
					this.blur();
					$(this).next('input').focus();
				})
				
			})
			 

	})
	$('.payInput:last').on('keyup',function(){
		
		$('.payInput').each(function(){
			purchaselist.data.pass+=$(this).val().trim();

		})
		this.blur();
		purchaselist.data.pass=hex_md5(purchaselist.data.pass+config.accessKey);
		layer.load();
		purchaselist.payOrder();
	})

	
})