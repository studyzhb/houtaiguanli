$(function(){
	var fistLoad=true;
var goodsInfo={
	pageCount:'',
	status:'0'
}

var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;


		updatePageNum(0,goodsInfo.status);
		
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

$('.unedit').on('click',function(){
	fistLoad=true;
	goodsInfo.status=0;
	updatePageNum(0,goodsInfo.status);
});

$('.edited').on('click',function(){
	fistLoad=true;
	goodsInfo.status=1;
	updatePageNum(0,goodsInfo.status);
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

 function updatePageNum(p1,sta){
        config.ajax('get',config.ajaxAddress.goodsInfo,function(data){
            var tempHtml=supplierList.innerHTML;
            $('#purchaselist').html('');
            goodsInfo.pageCount=data.count;
            if(fistLoad){

                updatePage();
            }
            $.each(data.data,function(index,item){
                item.selectedindex=index;
                console.log(item);
                laytpl(tempHtml).render(item,function(html){
                    $('#purchaselist').append(html);
                });
            });
        },{p:p1,status:sta});
    }


function updatePage(){
	fistLoad=false;
	layui.use(['laypage', 'layer'],function(){
		var laypage=layui.laypage;
		var layer = layui.layer;
		laypage({
		    cont: 'page'
		    ,pages: goodsInfo.pageCount //总页数
		    ,groups: 5 //连续显示分页数
		    ,jump:function(data){
		    	//得到页数data.curr
		    	updatePageNum(data.curr,goodsInfo.status);
		    }
		  });
	});
	
}
	


});