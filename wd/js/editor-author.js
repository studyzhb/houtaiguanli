$(function(){
	// console.log(laytpl);
	var laytpl;
	var authorId=location.href.split('?')[1].split('=')[1];
	$('#role-id').val(authorId);
	
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;

		config.ajax('get',config.ajaxAddress.editorUserRole,function(data){
		console.log(data);
		//authorList authorContent
		$('.role-name').val(data.roleInfo[0].name);
		$('#authorList').html('');
		var tempHtml=authorContent.innerHTML;
		
		$.each(data.priData,function(index,item){
			// item.selectedindex=index;
			console.log(item);
			laytpl(tempHtml).render(item,function(html){
				$('#authorList').append(html);
			});
		});

		layui.use('form',function(){

		});
	},{id:authorId});




	});
	

	$('.commit-author').on('click',function(){
		layer.open({
			type:3
		})
		config.formSubmit('#authorForm',config.ajaxAddress.editorUserRole,function(data){

			if(data.code==200){
                layer.msg('添加成功');
                setTimeout(function(){
                    open('authorlist.html','_self');
                },500)
                
            }else{
                layer.msg('网络错误，请稍后重试');
                setTimeout(function(){
                    open('authorlist.html','_self');
                },500)
            }
		});
	});
});