$(function(){

	/*
	*获取分类列表
	*
	*/

	function updateList(data){
		layui.use(['laypage','layer','laytpl'],function(){
			$=layui.jquery;
	    	laytpl = layui.laytpl;
	    	layer = layui.layer;
	    	var tempHtml=slider.innerHTML;
	    	//获取权限列表	

	    	$.each(data,function(index,item){
				// console.log(item.children);
				item.thisselc=netPath;
				item.shai=item.thisselc;
				
				laytpl(tempHtml).render(item,function(html){
				// console.log(html);
				
				$('#sliderPage').append(html);

				})
			})
			layui.use('element',function(){
				var element = layui.element();
				element.init();
			});
		 });
	}

	



















});