$(function(){

	var purchaselist={
		updateShoppingList:function(carid,num,pro,$obj){
			config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.updateShoppingList,function(data){
				console.log(data);
				layer.closeAll('loading');
				if(data.code=='200'){
					$obj.val(num);
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
		}
	}

	layui.use(['laytpl','element'],function(){
		laytpl = layui.laytpl;
		element= layui.element();
		config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.showShoppingList,function(data){
			console.log(data);
			var tempHtml=supplierList.innerHTML;
			$('#purchaselist').html('');
			laytpl(tempHtml).render(data,function(html){
				$('#purchaselist').append(html);
			});
		})
	});

	//购物车数量+ -
	$('#purchaselist').on('click','.addNum',function(){
		layer.load(1);
		var $obj=$(this).next();
		var num=$obj.val()-0;
		num++;
		purchaselist.updateShoppingList($(this).data('id'),num,$(this).data('pro'),$obj);
	});

	$('#purchaselist').on('click','.reduce',function(){
		layer.load(2);
		var $obj=$(this).prev();
		var num=$(this).prev().val()-0;
		num=--num==0?1:--num;
		purchaselist.updateShoppingList($(this).data('id'),num,$(this).data('pro'),$obj);
	});

	$('#purchaselist').on('blur','.inputNum',function(){
		layer.load(2);
		var num=$(this).val()-0;
		purchaselist.updateShoppingList($(this).data('id'),num,$(this).data('pro'),$(this));
	});

	//删除商品
	$('#purchaselist').on('click','.deleteGoods',function(){
		layer.load(2);
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
		$('#purchaselist .tagSelect').each(function(){
			if(this.checked){
				arr.push($(this).data('id'));
			}
		})
		config.ajax('post',config.ajaxAddress.publicAddress+config.ajaxAddress.createBorderList,function(data){
			console.log(data);
		},{good:JSON.stringify(arr),note:'测试数据，不做处理'});
	});



	
})