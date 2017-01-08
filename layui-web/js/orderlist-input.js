$(function(){
	var purchasePage={
		arrOrder:[],
		selectedindex:'',
		zongjia:''
	}

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
		config.ajax('get',config.ajaxAddress.goodsInput,function(data){
			updateorderlist(data,laytpl);
		},{status:1});
	});


	$('.nshenhe').on('click',function(){
		console.log('nshenhe');
		config.ajax('get',config.ajaxAddress.goodsInput,function(data){

			updateorderlist(data,laytpl);
		},{status:1});
	});

	$('.shenhe').on('click',function(){
		console.log('shenhe');
		config.ajax('get',config.ajaxAddress.goodsInput,function(data){
			updateorderlist(data,laytpl);
		},{status:2});
	});

	$('.jujue').on('click',function(){
		console.log('jujue');
		config.ajax('get',config.ajaxAddress.goodsInput,function(data){
			updateorderlist(data,laytpl);
		},{status:10});
	});


function updateorderlist(data,laytpl){
	var tempHtml=supplierList.innerHTML;
		console.log(data);
		$('#purchaselist').html('');
		$.each(data.lst,function(index,item){
			item.selectedindex=index;
			console.log(item);
			laytpl(tempHtml).render(item,function(html){
				$('#purchaselist').append(html);
			});
		});
}


//打开确认审核数量界面

$('#purchaselist').on('click','.lookorderInfo',function(){
	config.ajax('get',config.ajaxAddress.editInput,function(data){
		console.log(data.data);
		orderConfirm.arrbefor=[];
		var tempHtml=singleOrderList.innerHTML;
		$('#singleOrderWrapper').html('');
		$.each(data.data,function(index,item){
			purchasePage.zongjia=item.dposit;
			item.singlePrice=item.price*item.unm;
			item.selectedindex=index;
			orderConfirm.arrbefor[index]={id:item.id,good_id:item.good_id,checkNum:item.checknum,buyerDetId:item.buyerDetId};
			purchasePage.buyerid=item.id;
			purchasePage.arrOrder.push(item);
			// orderConfirm.arrbefor.push(item);
			laytpl(tempHtml).render(item,function(html){
				$('#singleOrderWrapper').append(html);
			});
		});

	},{id:$(this).data('id')});
	layer.open({
		type:1,
		content: $('#alertDemo'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'1200px',
      maxmin: true
	})
});

//打开确认入库界面
$('#purchaselist').on('click','.confirmInputStore',function(){
	config.ajax('get',config.ajaxAddress.editInput,function(data){
		console.log(data.data);
		orderConfirm.arrbefor=[];
		var tempHtml=orderListInput.innerHTML;
		$('#singleOrderWrapper1').html('');
		$.each(data.data,function(index,item){
			purchasePage.zongjia=item.dposit;
			item.singlePrice=item.price*item.unm;
			item.selectedindex=index;
			purchasePage.buyerid=item.id;
			purchasePage.arrOrder.push(item);
			
			laytpl(tempHtml).render(item,function(html){
				$('#singleOrderWrapper1').append(html);
			});
		});

	},{id:$(this).data('id')});
	layer.open({
		type:1,
		content: $('#inputConfirmInto'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'1200px',
      maxmin: true
	})
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
	console.log(orderConfirm.arrbefor);
	orderConfirm.arrafter=[];
	$.each(orderConfirm.arrbefor,function(index,item){
		orderConfirm.arrafter.push({id:item.id,good_id:item.good_id,unm:item.checkNum,buyerDetId:item.buyerDetId});
	});
	console.log(orderConfirm.arrafter);
	config.ajax('post',config.ajaxAddress.changeInput,function(data){
		console.log(data);
		if(data.code==200){
			layer.closeAll();
            layer.msg('操作成功');
            setTimeout(function(){
                open('orderlistInput.html','_self');
            },500) 
        }else{
        	layer.closeAll();
            layer.msg('网络错误，请稍后重试');
            setTimeout(function(){
                open('orderlistInput.html','_self');
            },500)
        }

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
	$('.orderRefuseIntro').val(num);
	layer.close(index);
	confirmIntoStock();
});

$('.confirmorder').on('click',function(){
	$('.orderlistId').val(purchasePage.buyerid);
	$('.orderToF').val($(this).data('id'));
	$('.orderRefuseIntro').val('');
	if(!$(this).data('id')){
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
	}
	
	

	

});


//确认入库或拒绝入库
function confirmIntoStock(){
	config.formSubmit('#confirmInto',config.ajaxAddress.goodsInput,function(data){
		console.log(data);
		if(data.code==200){
                layer.msg('操作成功');
                setTimeout(function(){
                    open('orderlistInput.html','_self');
                },500)
                
            }else{

                layer.msg(data.mess);
                setTimeout(function(){
                    open('orderlistInput.html','_self');
                },500)
            }
	});
}



});