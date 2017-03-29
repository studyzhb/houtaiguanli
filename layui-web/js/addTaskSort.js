$(function(){

	var taskSort={
		data:{
			sortData:[]
		}
	}

	config.ajax('get',config.ajaxAddress.taskSort.addSort,function(data){
		console.log(data);
		$('.parCom').html('<option value="0" selected>一级机构</option>');
		taskSort.data.sortData=data.data;
		$.each(data.data,function(index,item){
			$('<option>').appendTo($('.parCom')).html(item.name).attr('value',item.id).attr('data-type',item.type);
			// $.each(item.children,function(i,its){
			// 	$('<option>').appendTo($('.parCom')).html(' ---- '+its.type);
			// });	
		});
		
		layui.use('form',function(){
			var form=layui.form();
			form.on('select(sortWrapper)',function(data){
				$('.sortTypeWrapper').html('');
				if(data.value==0){
					$('.sortTypeWrapper').show();
					$('.sortTypeWrapper').append($('.conditionWrapper').html());
					form.render();
				}else{
					$('.sortTypeWrapper').hide();
					var sType;
					$.each(taskSort.data.sortData,function(index,item){
						if(item.id==data.value){
							sType=item.type;
						}
					})
					$('.sortTypeWrapper').append(config.formatTemplate({type:sType},$('.readTypeCon').html()));
				}
			})	

			form.on('select(sortFilter)',function(data){
				
			})
		});
	})


	//提交菜单
	$('.commit-author').on('click',function(){
		layer.open({type:3});
		config.formSubmit('#authorForm',config.ajaxAddress.taskSort.addSort,function(data){
			console.log(data);
			if(data.code==200){
				layer.msg('添加成功');
				//open('taskSort.html',"_self");
				
			}else{
				layer.msg('网络错误，请稍后重试');
				//open('taskSort.html',"_self");
				
			}
		});
		

		
	});


});
