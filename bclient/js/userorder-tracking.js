$(function(){
	var sN=location.href.split('?')[1].split('=')[1];
	//购物车页面
	var orderTracking={
		data:{
			//采购单号
			coding:'',
			pass:'',
			status:'1',
			total:0
		},
		updateShoppingList:function(carid,num,pro,$obj,price){
			config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.updateShoppingList,function(data){
				console.log(data);
				layer.closeAll('loading');
				if(data.code=='200'){
					$obj.val(num);
					orderTracking.data.total+=(num*price).toFixed(2);
					$obj.parents('td').next('td.dPrice').text(num*price.toFixed(2));
					$('.detailPrice').text(orderTracking.data.total);
				}
			},{id:carid,num:num,pro:pro});
		},
		lookSingleOrder:function(){

			config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.userOrderDetail,function(data){
				console.log(data);
				layer.closeAll('loading');
				if(data.code=='200'){
					
					var tempHtml=orderlistGoods.innerHTML;
					var tempHtml1=receiveuserInfo.innerHTML;
					$('.goodsWrapper').html('');
					$('.user-mess').html('');
					
					laytpl(tempHtml).render(data.orderinfo,function(html){
						
						$('.goodsWrapper').append(html);
					});
					laytpl(tempHtml1).render(data.orderinfo,function(html){
						
						$('.user-mess').append(html);
					});
				}

				layer.open({
			        type:1,
			        content: $('#alertMessage'), //这里content是一个DOM
			          shade:[0.8,'#000'],
			          area:'800px',
			          maxmin: true,
			          end:function(){
			            // console.log('end');
			          }
			        })

			},{id:orderTracking.data.coding,status:orderTracking.data.status});

		},
		printSingleOrder:function(){
			var me=this;
			config.ajax('post',config.ajaxAddress.publicAddress+config.ajaxAddress.printTrainOrder,function(data){
				console.log(data);
				layer.closeAll('loading');
				if(data.code=='200'){
					
				}
				//me.bodyScale();
				layer.open({
			        type:1,
			        content: $('#alertMessage'), //这里content是一个DOM
			          shade:[0.8,'#000'],
			          area:"800px",
			          maxmin: true,
			          end:function(){
			            // console.log('end');
			          }
			        })

			},{orderid:orderTracking.data.coding,type:'print'});

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
				}
				
			},{paypassword:this.data.pass,orderid:this.data.coding,total:this.data.total});
		},
		bodyScale:function (){
    
	    	var devicewidth=$('#alertMessage').width();
	        var scale=devicewidth/750;
	        $('.alert-main-con').css({'zoom':scale});
	        console.log(devicewidth,scale);
	    }
	}

	layui.use(['laytpl','element'],function(){
		laytpl = layui.laytpl;
		element= layui.element();
		config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.userOrderList,function(data){
			console.log(data);
			var tempHtml=supplierList.innerHTML;
			$('#purchaselist').html('');
			
			laytpl(tempHtml).render(data,function(html){
				
				$('#purchaselist').append(html);
			});
		},{status:sN});
	});

	$('#purchaselist').on('click','.printTrain',function() {
		$('.payInput').val('');
		// layer.load();
		// orderTracking.data.total=$(this).data('pri');
		orderTracking.data.coding=$(this).data('id');
		orderTracking.printSingleOrder();

		

	})

	$('#purchaselist').on('click','.lookinfo',function() {
		$('.payInput').val('');
		// layer.load();
		orderTracking.data.status=$(this).data('status');
		orderTracking.data.coding=$(this).data('id');
		orderTracking.lookSingleOrder();

		

	})

	function updateGoods(){

        var arr=[{status:'卖家已下单'},{status:'卖家已付款'},{status:'商家已接单'},{status:'开始配送'},{status:'配送完成'}];
        
        var infoHtml=$('#info').html();
        var data=$('.ps-bg').data('info');
       var outputIndex=data.num;
        var arrInfo=[];
        var tArr=data.data;
        console.log(tArr);
        // $('.ps-bg').html('');
        console.log(outputIndex);
        if(!!outputIndex&&outputIndex!=10){
            $.each(arr,function(index,item){
                
                if(index<outputIndex&&index<4){
                    console.log(outputIndex,index);
                    var da=new Date();
                    da.setTime(tArr[index]*1000);
                    item.time=da.toLocaleString();

                    arrInfo.push(formatTemplate(item,infoHtml));
                }
            });
            if(outputIndex==4){
                //arrInfo.push($('#completed').html());
            }

        }else if(outputIndex==10){
            $.each(arr,function(index,item){

                if(index<2){
                    var da=new Date();
                    da.setTime(tArr[index]*1000);
                    item.time=da.toLocaleString();
                    
                    arrInfo.push(formatTemplate(item,infoHtml));
                }
            });
            var da=new Date();
            da.setTime(tArr[5]*1000);
            arrInfo.push(formatTemplate({status:'退货完成',time:da.toLocaleString()},infoHtml));
            
        }else{
            var da=new Date();
            arrInfo.push(formatTemplate({status:'暂无配送消息',time:da.toLocaleString()},infoHtml));
        }
//        console.log(arrInfo);
        $('.ps-bg').append(arrInfo.join(''));
    }

	
})