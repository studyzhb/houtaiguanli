$(function(){
	var purchasePage={
		arrOrder:[],
		selectedindex:'',
		zongjia:'',
		status:2,
		pageCount:''
	}
	var fistLoad=true;
	/**
		确认采购单
	*/

	var orderConfirm={
		arrbefor:[],
		arrafter:[]
	}

var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
		
		purchasePage.status=2;
		fistLoad=true;
		updateorderlist(1);
	});


	$('.nshenhe').on('click',function(){
		
		purchasePage.status=2;
		fistLoad=true;
		updateorderlist(1);
	});

	$('.shenhe').on('click',function(){
		

		purchasePage.status=3;
		fistLoad=true;
		updateorderlist(1);
	});

	$('.iswaiting').on('click',function(){
		

		purchasePage.status=4;
		fistLoad=true;
		updateorderlist(1);
	});

	$('.sending').on('click',function(){
		

		purchasePage.status=5;
		fistLoad=true;
		updateorderlist(1);
	});
	$('.sended').on('click',function(){
		

		purchasePage.status=6;
		fistLoad=true;
		updateorderlist(1);
	});

	$('.jujue').on('click',function(){

		purchasePage.status=10;
		fistLoad=true;
		updateorderlist(1);

	});


function updateorderlist(page){
	config.ajax('get',config.ajaxAddress.outputList,function(data){
		var tempHtml=supplierList.innerHTML;
		purchasePage.pageCount=data.count;
		if(fistLoad){
            updatePage();
        }
		$('#purchaselist').html('');
		$.each(data.data,function(index,item){
			item.selectedindex=index;
			console.log(item);
			laytpl(tempHtml).render(item,function(html){
				$('#purchaselist').append(html);
			});
		});
		 $('.detailCount').text(data.num);
	},{status:purchasePage.status,p:page});
		
}
//分页
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
		    	updateorderlist(data.curr);
		    }
		  });
	});

    fistLoad=false;
}

//查看配送完成

$('#purchaselist').on('click','.lookorderInfo',function(){
	
	config.ajax('get',config.ajaxAddress.outputSingleDetail,function(data){
		
		// orderConfirm.arrbefor=[];
		var tempHtml=singleOrderList.innerHTML;
		$('#singleOrderWrapper').html('');
		$.each(data.lst,function(index,item){
			item.selectedindex=index;
			/*purchasePage.zongjia=item.dposit;
			item.singlePrice=item.price*item.unm;
			item.selectedindex=index;
			purchasePage.buyerid=item.id;
			purchasePage.arrOrder.push(item);
			orderConfirm.arrbefor.push(item);*/
			laytpl(tempHtml).render(item,function(html){
				$('#singleOrderWrapper').append(html);
			});
		});

		layer.open({
			type:1,
			title:'出库单号：'+data.oddnum,
			content: $('#alertDemo'), //这里content是一个DOM
	      shade:[0.8,'#000'],
	      area:'1200px',
	      maxmin: true
		})

	},{id:$(this).data('id')});
	
});

//打开审核界面
$('#purchaselist').on('click','.confirmInputStore',function(){
	$('.confirmorder').text('审核通过').attr('data-issended','');
	$('#statusChange').val('3');
	$('.refuseBtn').hide();
	$('#outputSingleId').val($(this).data('id'));
	config.ajax('get',config.ajaxAddress.outputSingleDetail,function(data){
		console.log(data);
		/*orderConfirm.arrbefor=[];*/
		var tempHtml=orderListInput.innerHTML;
		$('#singleOrderWrapper1').html('');
		$.each(data.lst,function(index,item){
			item.selectedindex=index;
			/*purchasePage.zongjia=item.dposit;
			item.singlePrice=item.price*item.unm;
			item.selectedindex=index;
			purchasePage.buyerid=item.id;
			purchasePage.arrOrder.push(item);*/
			
			laytpl(tempHtml).render(item,function(html){
				$('#singleOrderWrapper1').append(html);
			});
		});

		layer.open({
			type:1,
			title:'出库单号：'+data.oddnum,
			content: $('#inputConfirmInto'), //这里content是一个DOM
	      shade:[0.8,'#000'],
	      area:'1200px',
	      maxmin: true
		})

	},{id:$(this).data('id')});
	
});
//打开打印小票界面
$('#purchaselist').on('click','.printTrain',function(){
	// $('.confirmorder').text('打印配货单').attr('data-issended','');
	// $('#statusChange').val('4');
	// $('.refuseBtn').hide();
	// $('#outputSingleId').val($(this).data('id'));
	// config.ajax('get',config.ajaxAddress.outputSingleDetail,function(data){
	// 	console.log(data);
	// 	/*orderConfirm.arrbefor=[];*/
	// 	var tempHtml=orderListInput.innerHTML;
	// 	$('#singleOrderWrapper1').html('');
	// 	$.each(data,function(index,item){
	// 		purchasePage.zongjia=item.dposit;
	// 		item.singlePrice=item.price*item.unm;
	// 		item.selectedindex=index;
	// 		purchasePage.buyerid=item.id;
	// 		purchasePage.arrOrder.push(item);
			
	// 		laytpl(tempHtml).render(item,function(html){
	// 			$('#singleOrderWrapper1').append(html);
	// 		});
	// 	});

	// },{id:$(this).data('id')});
	// layer.open({
	// 	type:1,
	// 	content: $('#inputConfirmInto'), //这里content是一个DOM
 //      shade:[0.8,'#000'],
 //      area:'1200px',
 //      maxmin: true
	// })

	open('printOutput.html?id='+$(this).data('id'),'_self');

});

//打开配送
$('#purchaselist').on('click','.sendingStore',function(){
	$('.confirmorder').text('配送').attr('data-issended','true');
	$('#statusChange').val('5');
	$('.refuseBtn').hide();
	$('#outputSingleId').val($(this).data('id'));
	config.ajax('get',config.ajaxAddress.outputSingleDetail,function(data){
		console.log(data);
		/*orderConfirm.arrbefor=[];*/
		var tempHtml=orderListInput.innerHTML;
		$('#singleOrderWrapper1').html('');
		$.each(data.lst,function(index,item){
			item.selectedindex=index;
			/*purchasePage.zongjia=item.dposit;
			item.singlePrice=item.price*item.unm;
			item.selectedindex=index;
			purchasePage.buyerid=item.id;
			purchasePage.arrOrder.push(item);*/
			
			laytpl(tempHtml).render(item,function(html){
				$('#singleOrderWrapper1').append(html);
			});
		});

		layer.open({
			type:1,
			title:'出库单号：'+data.oddnum,
			content: $('#inputConfirmInto'), //这里content是一个DOM
	      shade:[0.8,'#000'],
	      area:'1200px',
	      maxmin: true
		})

	},{id:$(this).data('id')});

});


//配送中
$('#purchaselist').on('click','.sendingOutput',function(){
	$('.confirmorder').text('配送完成').attr('data-issended','');
	$('.refuseBtn').show();
	$('#statusChange').val('6');
	$('#outputSingleId').val($(this).data('id'));
	config.ajax('get',config.ajaxAddress.outputSingleDetail,function(data){
		console.log(data);
		/*orderConfirm.arrbefor=[];*/
		var tempHtml=orderListInput.innerHTML;
		$('#singleOrderWrapper1').html('');
		$.each(data.lst,function(index,item){
			item.selectedindex=index;
			/*purchasePage.zongjia=item.dposit;
			item.singlePrice=item.price*item.unm;
			item.selectedindex=index;
			purchasePage.buyerid=item.id;
			purchasePage.arrOrder.push(item);*/
			
			laytpl(tempHtml).render(item,function(html){
				$('#singleOrderWrapper1').append(html);
			});
		});

		layer.open({
			type:1,
			title:'出库单号：'+data.oddnum,
			content: $('#inputConfirmInto'), //这里content是一个DOM
	      shade:[0.8,'#000'],
	      area:'1200px',
	      maxmin: true
		})

	},{id:$(this).data('id')});
	
});


$('#singleOrderWrapper').on('blur','.inputChangeNum',function(data){
	console.log($(this).val());
	var sprice=$(this).data('sprice')-0;
	var ind=$(this).data('id')-0;
	//审核数量
	orderConfirm.arrbefor[ind].checkNum=$(this).val();
	// console.log($(this).siblings('.confirmdetails'));
	$(this).parent().siblings('.confirmdetails').text(sprice*$(this).val());
});

//核对数量提交
$('.checkConfirm').on('click',function(){
	// console.log(orderConfirm.arrbefor);
	orderConfirm.arrafter=[];
	$.each(orderConfirm.arrbefor,function(index,item){
		orderConfirm.arrafter.push({id:item.id,good_id:item.good_id,unm:item.checkNum,buyerDetId:item.buyerDetId});
	});
	console.log(orderConfirm.arrafter);
	config.ajax('post',config.ajaxAddress.changeInput,function(data){
		console.log(data);
	},{goods:JSON.stringify(orderConfirm.arrafter)});
});

var index;
$('#singleOrderWrapper').on('click','.editorSingGood',function(){
	purchasePage.selectedindex=$(this).data('id');
	var nnn=$(this).data('id')-0;
	purchasePage.zongjia-=purchasePage.arrOrder[nnn].singlePrice-0;
	
	
	
});

$('.saveGoodsNum').on('click',function(){
	
	var num=$('.singleNum').val();
	$('#refuseContent').val(num);
	layer.load();
	config.formSubmit('#confirmInto',config.ajaxAddress.refuseStorelist,function(data){
			console.log(data+'jujue');
			//layer.closeAll();
			if(data.code==200){
                layer.msg('操作成功');
                layer.closeAll();
                setTimeout(function(){
                	location.reload();
                    // open('orderlistOutput.html','_self');
                },500)
                
            }else{
                layer.msg('网络错误，请稍后重试');
                 layer.closeAll();
                setTimeout(function(){
                	location.reload();
                    // open('orderlistOutput.html','_self');
                },500)
            }
	});
});

$('.refuseBtn').on('click',function(){
	index=layer.open({
			type:1,
			content: $('#goodsNum'), //这里content是一个DOM
	      shade:[0.8,'#000'],
	      area:'400px',
	      maxmin: false
		});
});


$('.confirmorder').on('click',function(){

	
	
	if(!!$(this).attr('data-issended')){
		layer.load();
		config.formSubmit('#confirmInto',config.ajaxAddress.sendingStorelist,function(data){
			console.log(data+'kaishipeisong');
			if(data.code==200){
                layer.msg('操作成功');
                
                setTimeout(function(){
                    // open('orderlistOutput.html','_self');
                    layer.closeAll();
                    location.reload();
                },500)
                
            }else{
				   var index=layer.open({
				  content: data.mess,
				  yes: function(index, layero){
				    //do something

				    layer.closeAll(); //如果设定了yes回调，需进行手工关闭
				  }
				});     
				 
               /* layer.msg(data.mess);
                
                setTimeout(function(){
                	layer.closeAll();
                	location.reload();
                    // open('orderlistOutput.html','_self');
                },500)*/
            }
		});
	}else{
		confirmIntoStock();
	}


	/*if(!$(this).data('id')){
		console.log(!$(this).data('id'));
		index=layer.open({
			type:1,
			content: $('#goodsNum'), //这里content是一个DOM
	      shade:[0.8,'#000'],
	      area:'400px',
	      maxmin: false
		});
	}else{
		confirmIntoStock();
	}*/

});


//确认入库或拒绝入库
function confirmIntoStock(){
	layer.load();
	config.formSubmit('#confirmInto',config.ajaxAddress.outputSingleStatus,function(data){
		console.log(data);
		if(data.code==200){
                layer.msg('操作成功');
                
                setTimeout(function(){
                	layer.closeAll();
                	location.reload();
                    // open('orderlistOutput.html','_self');
                },500)
                
            }else{
                layer.msg('网络错误，请稍后重试');
                
                setTimeout(function(){
                	layer.closeAll();
                	location.reload();
                    // open('orderlistOutput.html','_self');
                },500)
            }
	});
}



});