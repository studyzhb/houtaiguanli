$(function(){
	var purchasePage={
		arrOrder:[],
		selectedindex:'',
		zongjia:'',
		del:[],
		orderlistId:'',
		status:'0',
		requrl:config.ajaxAddress.getOrderList,
		pageCount:''

	}
	var laytpl;
	var fistLoad=true;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
		purchasePage.requrl=config.ajaxAddress.getOrderList;
		purchasePage.status=0;
		fistLoad=true;
		config.ajax('get',config.ajaxAddress.getOrderList,function(data){
			console.log(data);
			updateList(data,laytpl);
		},{status:0});
	});

	$('.nshenhe').on('click',function(){
		//console.log('nshenhe');
		purchasePage.status=0;
		fistLoad=true;
		purchasePage.requrl=config.ajaxAddress.getOrderList;
		config.ajax('get',config.ajaxAddress.getOrderList,function(data){

			updateList(data,laytpl);
		},{status:0});
	});

	$('.shenhe').on('click',function(){
		//console.log('shenhe');
		purchasePage.status=1;
		fistLoad=true;
		purchasePage.requrl=config.ajaxAddress.getOrderList;
		config.ajax('get',config.ajaxAddress.getOrderList,function(data){
			updateList(data,laytpl);
		},{status:1});
	});

	$('.inputStore').on('click',function(){
		console.log('ruku');
		purchasePage.status=2;
		fistLoad=true;
		purchasePage.requrl=config.ajaxAddress.showInputStore;
		config.ajax('get',config.ajaxAddress.showInputStore,function(data){
			updateList(data,laytpl);
		},{status:2});
	});

	$('.jujue').on('click',function(){
		//console.log('jujue');
		purchasePage.status=10;
		fistLoad=true;
		purchasePage.requrl=config.ajaxAddress.getOrderList;
		config.ajax('get',config.ajaxAddress.getOrderList,function(data){
			updateList(data,laytpl);
		},{status:10,p:1});
	});

	function updateList(data,laytpl){
		var tempHtml=supplierList.innerHTML;
		//console.log(data);
		purchasePage.pageCount=data.count;
		$('#purchaselist').html('');
		if(fistLoad){

               updatePage();
            }
		$.each(data.lst,function(index,item){
			item.selectedindex=index;
			console.log(item);
			laytpl(tempHtml).render(item,function(html){
				$('#purchaselist').append(html);
			});
		});
		$('.detailCount').text(data.num);
	}

	function updatePage(){
		layui.use(['laypage', 'layer'],function(){
			var laypage=layui.laypage;
			var layer = layui.layer;
			laypage({
			    cont: 'page'
			    ,pages: purchasePage.pageCount //总页数
			    ,groups: 5 //连续显示分页数
			    ,jump:function(data){
			    	//得到页数data.curr
			    	// updatePageNum(data.curr);

			    	config.ajax('get',purchasePage.requrl,function(data){
						updateList(data,laytpl);
					},{status:purchasePage.status,p:data.curr});
			    }
			  });
		});

	    fistLoad=false;
	}


$('#purchaselist').on('click','.lookorderInfo',function(){
	config.ajax('get',config.ajaxAddress.editOrderList,function(data){
		console.log(data);
		var tempHtml=singleOrderList.innerHTML;
		$('#singleOrderWrapper').html('');
		purchasePage.orderlistId=data.id;
		$.each(data.lst,function(index,item){
			purchasePage.zongjia=item.dposit;
			item.singlePrice=item.price*item.unm;
			item.selectedindex=index;
			purchasePage.arrOrder.push(item);
			laytpl(tempHtml).render(item,function(html){
				$('#singleOrderWrapper').append(html);
			});
		});
		$('.dposit').text(data.dposit+'元');
	},{id:$(this).data('id')});
	layer.open({
		type:1,
		content: $('#alertDemo'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'1000px',
      maxmin: true
	})
});

/**
采购单添加新商品

*/

$('#purchaselist').on('click','.addorderInfo',function(){
	console.log('添加新商品');
	open('edit-purchaselist.html?id='+$(this).data('id'),'_self');
});



//导出采购单

$('#purchaselist').on('click','.exceloutput',function(){
	
	/*config.ajax('get',config.ajaxAddress.excelOutput,function(data){
		console.log(data);
	},{buyer_id:$(this).data('id')});*/
	
	open(config.ajaxAddress.excelOutput+'?token='+cookieUtil.getCookie('token')+'&buyer_id='+$(this).data('id'),'_self');
});


//打印采购单
$('#purchaselist').on('click','.printOrderlist',function(){
	/*config.ajax('get',config.ajaxAddress.editOrderList,function(data){
		console.log(data);
		var tempHtml=printOrderList.innerHTML;
		$('#printOrderWrapper').html('');
		var dposit=0;
		$.each(data.lst,function(index,item){
			item.singlePrice=item.price*item.unm;
			item.selectedindex=index;
			dposit=item.dposit;
			laytpl(tempHtml).render(item,function(html){
				$('#printOrderWrapper').append(html);
			});

		});
		$('.printdposit').text(dposit+'元');
	},{id:$(this).data('id')});
	layer.open({
		type:1,
		content: $('#printDemo'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'1000px',
      maxmin: true
	})*/
	
	open('printTemplate.html?id='+$(this).data('id'),'_self');

});


var index;
$('#singleOrderWrapper').on('click','.editorSingGood',function(){
	purchasePage.selectedindex=$(this).data('id');
	var nnn=$(this).data('id')-0;
	purchasePage.zongjia-=purchasePage.arrOrder[nnn].singlePrice-0;
	
	index=layer.open({
		type:1,
		content: $('#goodsNum'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'400px',
      maxmin: false
	})
	
});

$('#singleOrderWrapper').on('click','.deleteSingGood',function(){
	purchasePage.selectedindex=$(this).data('id');
	var nnn=$(this).data('id')-0;
	var ind=purchasePage.selectedindex-0;
	purchasePage.zongjia-=purchasePage.arrOrder[nnn].singlePrice-0;
	
	var tempHtml=singleOrderList.innerHTML;
	layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(i){
  			//do something
  			purchasePage.del.push(purchasePage.arrOrder[ind].id);
  			purchasePage.arrOrder.splice(ind,1);
  			$('#singleOrderWrapper').html('');
  			$.each(purchasePage.arrOrder,function(index,item){
  				item.selectedindex=index;
				laytpl(tempHtml).render(item,function(html){
					$('#singleOrderWrapper').append(html);
				});
			});
			$('.dposit').text(Number(purchasePage.zongjia).toFixed(2)+'元');
		  layer.close(i);
		});
	
});

$('.saveGoodsNum').on('click',function(){
	
	
	var ind=purchasePage.selectedindex-0;
	var num=$('.singleNum').val();
	console.log(num);
	purchasePage.arrOrder[ind].unm=num;
	purchasePage.arrOrder[ind].singlePrice=(num*purchasePage.arrOrder[ind].price).toFixed(2);
	purchasePage.zongjia+=purchasePage.arrOrder[ind].singlePrice-0;
	var tempHtml=singleOrderList.innerHTML;
	if(num==0){
		
		console.log(purchasePage.del);
		layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(i){
  			//do something
  			purchasePage.del.push(purchasePage.arrOrder[ind].id);
  			purchasePage.arrOrder.splice(ind,1);
  			$('#singleOrderWrapper').html('');
  			$.each(purchasePage.arrOrder,function(index,item){
  				item.selectedindex=index;
				laytpl(tempHtml).render(item,function(html){
					$('#singleOrderWrapper').append(html);
				});
			});
			$('.dposit').text(Number(purchasePage.zongjia).toFixed(2)+'元');
		  layer.close(i);
		});
	}else{
		$('#singleOrderWrapper').html('');
		$.each(purchasePage.arrOrder,function(index,item){
			item.selectedindex=index;
			laytpl(tempHtml).render(item,function(html){

				$('#singleOrderWrapper').append(html);
			});
		});
		$('.dposit').text(Number(purchasePage.zongjia).toFixed(2)+'元');
	}
	
	layer.close(index);
});

$('#confirmorder').on('click',function(){
	var arr=[];
	$.each(purchasePage.arrOrder,function(index,item){
		// console.log(item);
		//商品ID修改 buyerDetId更改为good_id del:purchasePage.del,
		arr.push({id:item.id,price:item.price,good_id:item.good_id,buyer_id:item.buyer_id,unm:item.unm,dposit:purchasePage.zongjia});
	});

	console.log(arr);
	$('#goods').val(JSON.stringify(arr));
	$('#deleGoods').val(JSON.stringify(purchasePage.del));
	$('#orderlistId').val(purchasePage.orderlistId);
	// console.log($('#goods').val());
	config.formSubmit('#purchaselistForm',config.ajaxAddress.editOrderList,function(data){
		console.log(data);
		if(data.code==200){
                layer.msg('提交成功');
                setTimeout(function(){
                    open('purchaselist.html','_self');
                },500)
                
            }else{
                layer.msg('网络错误，请稍后重试');
                setTimeout(function(){
                    open('purchaselist.html','_self');
                },500)
            }
	});
});



});