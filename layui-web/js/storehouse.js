$(function(){

var storehouse={
	orderlist:[],
	readyIndex:0,
	supplierId:''
}


var laytpl,alertAddIndex;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
	});

$('#purchaselist').on('click','.lookorderInfo',function(){
	storehouse.readyIndex=$(this).data('id');
	alertAddIndex=layer.open({
		type:1,
		content: $('#goodsNum'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'400px',
      maxmin: false
	})
});

updateStoreContent();

function updateStoreContent(){
	config.ajax('get',config.ajaxAddress.storehouse,function(data){
		var tempHtml=supplierList.innerHTML;
		$('#purchaselist').html('');
		console.log(data);
		$.each(data.supplier,function(index,item){
			if(index==0){
				storehouse.supplierId=item.supplierId;
			}
			$('<option>').appendTo($('.supplierList')).html(item.name).attr('value',item.supplierId);
		});
		data.addList=storehouse.orderlist;
		data.temp=false;
		if(data.addList.length){
			$('#confirm-save').show();
		}else{
			$('#confirm-save').hide();
		}
		laytpl(tempHtml).render(data,function(html){
			
			$('#purchaselist').append(html);
		});


		layui.use('form',function(){
			var form = layui.form();
			form.on('select(supplier)', function(data){
			  //console.log(addShopPage.area.pro);
			  console.log(data.value);
			  storehouse.supplierId=data.value;
			  updateStoreContent();
			});
		});

	},{supplierId:storehouse.supplierId});
}

//补货数量
$('.saveGoodsNum').on('click',function(){
	
	var num=$('.singleNum').val()-0;

	if(num==0){
		$.each(storehouse.orderlist,function(index,item){
			if(item.goodId==storehouse.readyIndex){
				storehouse.orderlist.splice(index,1);
			}
		});
		updateStoreContent();
	}else{
		console.log(num);
		var temp=false;
		$.each(storehouse.orderlist,function(index,item){
			if(item.goodId==storehouse.readyIndex){
				item.addNum=num;
				temp=true;
			}
		});

		if(!temp){
			storehouse.orderlist.push({goodId:storehouse.readyIndex,addNum:num});
		}

		updateStoreContent();
	}
	
	layer.close(alertAddIndex);
});

//生成采购单

$('#confirm-save').on('click',function(){
	var arr=[];
	$.each(storehouse.orderlist,function(index,item){
		item.good_id=item.goodId;
		item.unm=item.addNum;
		arr.push(item);
	});
	$('#goods').val(JSON.stringify(arr));
	$('#ordernum').val(new Date().getTime());
	$('#supplierId').val(storehouse.supplierId);
	console.log($('#goods').val());
	console.log($('#ordernum').val());
	console.log($('#supplierId').val());
	config.formSubmit('#createOrderlist',config.ajaxAddress.addOrderList,function(data){
		console.log(data);
		 /*if(data.code==200){
		    layer.msg('添加成功');
		    setTimeout(function(){
		        open('purchaselist.html','_self');
		    },500);
		    
		}else{
		    layer.msg('网络错误，请稍后重试');
		    setTimeout(function(){
		        open('purchaselist.html','_self');
		    },500);
		}*/
		});
});



});