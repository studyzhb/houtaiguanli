
var layer;
var $;
var laytpl;
config.ajax('get',config.ajaxAddress.getAuthorlist,function(data){
		console.log(data);
		layui.use(['laypage','layer','laytpl'],function(){
				$=layui.jquery;
		    	laytpl = layui.laytpl;
		    	layer = layui.layer;
		    	var tempHtml=slider.innerHTML;
		    	//获取权限列表	

		    	$.each(data,function(index,item){
					console.log(item.children);
					laytpl(tempHtml).render(item,function(html){
					console.log(html);
					
					$('#sliderPage').append(html);

					
					})
				})
				layui.use('element',function(){
					var element = layui.element();

				});
		 })
		
		
		
	});


$('.show-content').on('click','.select-tit',function(){
	console.log('111');
        if($(this).next().css('display')=='none'){
            $(this).nextAll().css('display','block');
        }else{
            $(this).nextAll().css('display','none');
        } 
    });

    $('.show-content').on('click','li',function(){
        $(this).parents('.select-items').css('display','none').next().css('display','none');
        $(this).parents('.select-items').prev('.select-tit').find('span').text($(this).text());  
    })