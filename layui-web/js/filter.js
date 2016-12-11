
var layer;
var $;
var laytpl;
config.ajax('get',config.ajaxAddress.getAuthorlist,function(data){
		console.log(data);
		layui.use(['form','laypage','layer','laytpl'],function(){
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