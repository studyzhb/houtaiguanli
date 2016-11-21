$(function(){

	config.ajax('get',config.ajaxAddress.goodsInfo,function(data){
		//console.log(data);
		var aGoodsInfo=data;
		
		var arr=[];
		//var testArr=[];
		var templateCon=$('#table-goodsInfo').html();
		$.each(aGoodsInfo.data,function(index,item){
			//item.text
			//testArr.push(item.text);
			arr.push(config.formatTemplate(item,templateCon));
		});
		$('#goodsInfoList').append(arr.join(''));
		//$('#showcon').append(testArr.join(''));
	})

});