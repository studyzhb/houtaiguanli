
$(function(){
	var speclicenses={
		arrOrder:[],
		selectedindex:'',
		zongjia:'',
		del:[],
		orderlistId:'',
		status:'0',
		requrl:config.ajaxAddress.specialSubject.licenses,
		pageCount:'',
		specInfo:{
			id:'',
			name:''
		},
		specArr:[],
		specInfoArr:[]
	}
	var fistLoad=true;
	var laytpl;
	layui.use('laytpl',function(){
		laytpl=layui.laytpl;
		speclicenses.requrl=config.ajaxAddress.specialSubject.licenses;
		speclicenses.status=0;
		fistLoad=true;
		config.ajax('get',config.ajaxAddress.specialSubject.licenses,function(data){

			updateList(data.data);
			speclicenses.specArr=data.special;
			speclicenses.specInfoArr=data.data;
			$.each(data.special,function(ind,item){
				if(ind==0){
					speclicenses.specInfo.id=item.id;
					speclicenses.specInfo.title=item.title;
				}
				$('<option>').appendTo($('.stockList')).html(item.title).attr('value',item.id);
			})
			layui.use('form',function(){
				form =layui.form();
				form.on('select(special)', function(data){
					speclicenses.specInfo.id=data.value;
					getSpecName(data.value);
				  config.ajax('get',config.ajaxAddress.specialSubject.licenses,function(data){
				  	updateList(data.data);
				  },{id:data.value})
				});
			})
		},{status:0});
		
		
	});

	function getSpecName(id){

		$.each(speclicenses.specArr,function(ind,item){
			if(item.id==id){
				speclicenses.specInfo.name=item.title;
				return false;
			}
		})
	}

	function updateList(data){
		var tempHtml=supplierList.innerHTML;

		speclicenses.pageCount=data.count;
		$('#purchaselist').html('');
		if(fistLoad){

               updatePage();
            }
		$.each(data,function(index,item){
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
			    ,pages: speclicenses.pageCount //总页数
			    ,groups: 5 //连续显示分页数
			    ,jump:function(data){
			    	//得到页数data.curr
			    	// updatePageNum(data.curr);

			    	config.ajax('get',speclicenses.requrl,function(data){
						updateList(data.data,laytpl);
					},{status:speclicenses.status,p:data.curr});
			    }
			  });
		});

	    fistLoad=false;
	}

$('.addgoods').on('click',function(){
	open('add-specLicenses.html?data&'+encodeURIComponent(JSON.stringify(speclicenses.specInfo)),'_self');
})

$('#purchaselist').on('click','.lookorderInfo',function(){
	config.ajax('get',config.ajaxAddress.editOrderList,function(data){

		var tempHtml=singleOrderList.innerHTML;
		$('#singleOrderWrapper').html('');
		speclicenses.orderlistId=data.id;
		$.each(data.lst,function(index,item){
			speclicenses.zongjia=item.dposit;
			item.singlePrice=item.price*item.unm;
			item.selectedindex=index;
			speclicenses.arrOrder.push(item);
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
删除单个商品

*/

$('#purchaselist').on('click','.delete-this-goods',function(){
	var ind=$(this).data('id');
	var index=$(this).data('selecInd');
	layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(i){
			config.ajax('post',config.ajaxAddress.specialSubject.deleteSpecGoods,function(data){
				if(data.code==200){
					speclicenses.specInfoArr.splice(index,1);
  					updateList(speclicenses.specInfoArr);
				}
				layer.close(i);
			},{special_id:speclicenses.specInfo.id,good_id:ind})

		});
});

$('.searchGoods').on('click',function(){
	var val=$(this).prev().find('input').val();
	config.ajax('get',config.ajaxAddress.specialSubject.licenses,function(data){
	  	updateList(data.data);
	  },{'field':val,'special_id':speclicenses.specInfo.id})
})

//导出采购单

$('#purchaselist').on('click','.exceloutput',function(){
	
	/*config.ajax('get',config.ajaxAddress.excelOutput,function(data){
		console.log(data);
	},{buyer_id:$(this).data('id')});*/
	
	open(config.ajaxAddress.excelOutput+'?token='+cookieUtil.getCookie('token')+'&buyer_id='+$(this).data('id'),'_self');
});


//打印采购单
$('#purchaselist').on('click','.printOrderlist',function(){
	config.ajax('get',config.ajaxAddress.editOrderList,function(data){

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
	})
	
	open('printTemplate.html?id='+$(this).data('id'),'_self');

});


var index;
$('#singleOrderWrapper').on('click','.editorSingGood',function(){
	speclicenses.selectedindex=$(this).data('id');
	var nnn=$(this).data('id')-0;
	speclicenses.zongjia-=speclicenses.arrOrder[nnn].singlePrice-0;
	
	index=layer.open({
		type:1,
		content: $('#goodsNum'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'400px',
      maxmin: false
	})
	
});

$('#singleOrderWrapper').on('click','.deleteSingGood',function(){
	speclicenses.selectedindex=$(this).data('id');
	var nnn=$(this).data('id')-0;
	var ind=speclicenses.selectedindex-0;
	var tempHtml=singleOrderList.innerHTML;
	layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(i){
  			//do something
  			speclicenses.del.push(speclicenses.arrOrder[ind].id);
  			speclicenses.arrOrder.splice(ind,1);
  			$('#singleOrderWrapper').html('');
  			$.each(speclicenses.arrOrder,function(index,item){
  				item.selectedindex=index;
				laytpl(tempHtml).render(item,function(html){
					$('#singleOrderWrapper').append(html);
				});
			});
		  layer.close(i);
		});
	
});

$('.saveGoodsNum').on('click',function(){
	
	
	var ind=speclicenses.selectedindex-0;
	var num=$('.singleNum').val();
	
	speclicenses.arrOrder[ind].unm=num;
	speclicenses.arrOrder[ind].singlePrice=(num*speclicenses.arrOrder[ind].price).toFixed(2);
	speclicenses.zongjia+=speclicenses.arrOrder[ind].singlePrice-0;
	var tempHtml=singleOrderList.innerHTML;
	if(num==0){
		
		
		layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(i){
  			//do something
  			speclicenses.del.push(speclicenses.arrOrder[ind].id);
  			speclicenses.arrOrder.splice(ind,1);
  			$('#singleOrderWrapper').html('');
  			$.each(speclicenses.arrOrder,function(index,item){
  				item.selectedindex=index;
				laytpl(tempHtml).render(item,function(html){
					$('#singleOrderWrapper').append(html);
				});
			});
			$('.dposit').text(Number(speclicenses.zongjia).toFixed(2)+'元');
		  layer.close(i);
		});
	}else{
		$('#singleOrderWrapper').html('');
		$.each(speclicenses.arrOrder,function(index,item){
			item.selectedindex=index;
			laytpl(tempHtml).render(item,function(html){

				$('#singleOrderWrapper').append(html);
			});
		});
		$('.dposit').text(Number(speclicenses.zongjia).toFixed(2)+'元');
	}
	
	layer.close(index);
});

$('#confirmorder').on('click',function(){
	var arr=[];
	$.each(speclicenses.arrOrder,function(index,item){
		// console.log(item);
		//商品ID修改 buyerDetId更改为good_id del:speclicenses.del,
		arr.push({id:item.id,price:item.price,good_id:item.good_id,buyer_id:item.buyer_id,unm:item.unm,dposit:speclicenses.zongjia});
	});

	$('#goods').val(JSON.stringify(arr));
	$('#deleGoods').val(JSON.stringify(speclicenses.del));
	$('#orderlistId').val(speclicenses.orderlistId);
	// console.log($('#goods').val());
	config.formSubmit('#purchaselistForm',config.ajaxAddress.editOrderList,function(data){

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