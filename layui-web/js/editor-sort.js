$(function(){
	// console.log(laytpl);
	var url=location.href.split('?');
	if(!!url.length){
		var brandId=url;
	}
	var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
	});
	


	console.log(brandId);
	var bid=brandId[1].split('=')[1];
	$('.brandId').val(brandId[1].split('=')[1]);
	$('.brandName').val(unescape(brandId[2].split('=')[1]));
	var tml=$('.editSortPic').html();
	config.ajax('get',config.ajaxAddress.editGoodsSort,function(data){
		console.log(data);
		$('#authorList').append(config.formatTemplate(data.data,tml));
	},{id:bid});
	$('.commit-author').on('click',function(){
		config.formSubmit('#authorForm',config.ajaxAddress.editGoodsSort,function(data){
			if(data.code==200){
				open('goodsSort.html',"_self");
			}else{
				layer.msg('网络错误，请稍后重试');
			}
		});
	});

      $('#authorList').on('click','.imageaddc',function(){
          
          ImageWrapper.btap=false;
          upImage('image-suolve');
        })

      $('#authorList').on('click','.imageadd',function(){
          
          ImageWrapper.btap=true;
          upImage('image-suolve');
        })
});