$(function(){
    config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.specApi.specManage,function(data){
        var tempHtml=specContent.innerHTML;
		$('.gridly').html('');
        console.log(windowlaytpl);
        if(data.code==200){
            $.each(data.shop_special,function(index,item){
                laytpl(tempHtml).render(item,function(html){
					$('.gridly').append(html);
				});
            })
        }
    })
})