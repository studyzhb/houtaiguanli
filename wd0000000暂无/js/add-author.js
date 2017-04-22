
$(function(){
	
	var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
	});
	config.ajax('get',config.ajaxAddress.addUserRole,function(data){
		console.log(data);
		//authorList authorContent
		$('#authorList').html('');
		var tempHtml=authorContent.innerHTML;
		$.each(data,function(index,item){
			item.selectedindex=index;
			laytpl(tempHtml).render(item,function(html){
				$('#authorList').append(html);
			});
		});
		layui.use('form',function(){
			
		});
	});

	$('.commit-author').on('click',function(){
		config.formSubmit('#authorForm',config.ajaxAddress.addUserRole,function(data){
			console.log(data);
			/*if(data.code==200){
                layer.msg('添加成功');
                setTimeout(function(){
                    open('authorlist.html','_self');
                },500)
                
            }else{
                layer.msg('网络错误，请稍后重试');
                setTimeout(function(){
                    open('authorlist.html','_self');
                },500)
            }*/
		});
	});
	
	
});