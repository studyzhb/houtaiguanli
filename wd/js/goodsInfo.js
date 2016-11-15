$(function(){

	config.ajax('get',config.ajaxAddress.goodsInfo,function(data){
		console.log(typeof data);
		var aGoodsInfo=data;
		
		var arr=[];
		var templateCon=$('#table-goodsInfo').html();
		$.each(aGoodsInfo.data,function(index,item){
			arr.push(config.formatTemplate(item,templateCon));
		});
		$('#goodsInfoList').append(arr.join(''));
	})

});