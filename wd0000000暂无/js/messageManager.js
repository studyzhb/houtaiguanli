$(function(){
var fistLoad=true;
var goodsInfo={
	pageCount:'',
	status:'',
	page:'',
	goodName:''
}
goodsInfo.status=cookieUtil.getCookie('leaveMessStatus')?cookieUtil.getCookie('leaveMessStatus'):'0';
goodsInfo.page=cookieUtil.getCookie('leaveMessPage')?cookieUtil.getCookie('leaveMessPage'):'';


// cookieUtil.setExpiresDate('goodsInfoStatus',goodsInfo.status,7);
// cookieUtil.setExpiresDate('goodsInfoPage',goodsInfo.page,7);
var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
		updatePageNum(goodsInfo.page,goodsInfo.status);	
	});
	layui.use('form',function(){
			
		});
$('#purchaselist').on('click','.lookorderInfo',function(){
	layer.open({
		type:1,
		content: $('#alertDemo'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'900px',
      maxmin: true
	})
});
// console.log(!!goodsInfo.status);

//导出采购单

$('#goodExcel').on('click',function(){
	console.log('click')
	/*config.ajax('get',config.ajaxAddress.excelOutput,function(data){
		console.log(data);
	},{buyer_id:$(this).data('id')});*/
	
	open(config.ajaxAddress.goodExcel+'?token='+cookieUtil.getCookie('token')+'&status='+goodsInfo.status,'_self');
});
$('.unedit').on('click',function(){
	fistLoad=true;
	goodsInfo.status='0';
	goodsInfo.page='1';
	// cookieUtil.setExpiresDate('goodsInfoStatus',goodsInfo.status,7);
	updatePageNum(goodsInfo.page,goodsInfo.status);
});

$('.edited').on('click',function(){
	fistLoad=true;
	goodsInfo.status='1';
	goodsInfo.page='1';
	updatePageNum(goodsInfo.page,goodsInfo.status);
});


/**
*商品名称搜索
*/
$('.searchByKeywords').on('click',function(){
    
    var val=$(this).prev().find('input').val();
    
    goodsInfo.goodName=val;
    console.log(val,fistLoad);
    fistLoad=true;
    updatePageNum(goodsInfo.page,goodsInfo.status,val);

});


/*config.ajax('get',config.ajaxAddress.goodsInfo,function(data){
	var tempHtml=supplierList.innerHTML;
	$('#purchaselist').html('');
	goodsInfo.pageCount=data.count;
	updatePage();
	$.each(data.data,function(index,item){
		item.selectedindex=index;
		console.log(item);
		laytpl(tempHtml).render(item,function(html){
			$('#purchaselist').append(html);
		});
	});
});*/

 function updatePageNum(p1,sta,val){
 		cookieUtil.setExpiresDate('leaveMessPage',p1,7);
 		cookieUtil.setExpiresDate('leaveMessStatus',sta,7);
 		// console.log(p1,sta);
 		if(goodsInfo.status=='1'){
			$('.edited').addClass('layui-this');
			$('.unedit').removeClass('layui-this');
		}else{

			$('.unedit').addClass('layui-this');
			$('.edited').removeClass('layui-this');
		}
 		val=val||'';
        config.ajax('get',config.ajaxAddress.message.showMessage,function(data){
        	console.log(data);
            var tempHtml=supplierList.innerHTML;
            $('#purchaselist').html('');
            goodsInfo.pageCount=data.num;
            // console.log(fistLoad);
            if(fistLoad){

                updatePage();
            }
            $.each(data.data,function(index,item){
                item.selectedindex=index;
                // console.log(item);
                laytpl(tempHtml).render(item,function(html){
                    $('#purchaselist').append(html);
                });
            });
            // console.log(data.num);
            $('.detailCount').text(data.num);
        },{p:p1,status:sta,goodName:goodsInfo.goodName});
    }


function updatePage(){
	fistLoad=false;

	layui.use(['laypage', 'layer'],function(){
		var laypage=layui.laypage;
		var layer = layui.layer;
		laypage({
		    cont: 'page'
		    ,pages: goodsInfo.pageCount //总页数
		    ,groups: 3 //连续显示分页数
		    ,curr:goodsInfo.page
		    ,jump:function(data){
		    	//得到页数data.curr
		    	// goodsInfo.page=data.curr;
		    	// console.log('点击翻页'+data.curr);
		    	if(!fistLoad){
		    		updatePageNum(data.curr,goodsInfo.status);
		    	}
		    }
		  });
	});
	
	}
	/**
	*更新留言状态
	*/
	function updateMessStatus(messId,status){
		config.ajax('post',config.ajaxAddress.message.showMessage,function(data){
			console.log(data);
			if(data.code==200){
				layer.msg('更新成功');
				switch (status){
					case '1':
						goodsInfo.status=0;
						break;
					case '0':
						goodsInfo.status=1;
						break;
				}
				updatePageNum(goodsInfo.page,goodsInfo.status);
			}
		},{leave_id:messId,status:status})
	}


	$('#purchaselist').on('click','.disableMess',function(){
		var messId=$(this).data('id');
		updateMessStatus(messId,0);
	})

	$('#purchaselist').on('click','.enableMess',function(){
		var messId=$(this).data('id');
		updateMessStatus(messId,1);
	})

});