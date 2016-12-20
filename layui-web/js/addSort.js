$(function(){
	config.ajax('get',config.ajaxAddress.addGoodsSort,function(data){
		console.log(data);
		$('.parCom').html('<option value="0">一级机构</option>');
		$.each(data,function(index,item){
			$('<option>').appendTo($('.parCom')).html(item.type).attr('value',item.id);
			$.each(item.children,function(i,its){
				$('<option>').appendTo($('.parCom')).html(' ---- '+its.type);
			});
			
		});
		
		layui.use('form',function(){
			
		});
	})


	//提交菜单
	$('.commit-author').on('click',function(){
		var pVal=$('.piliangsort').val();
		var arr=pVal.split(',');
		layer.open({type:3});
		var $input=$('<input type="hidden" name="type">');
		var tag=true;
		$.each(arr,function(index,item){
			$('.sortpl').val(item);

			config.formSubmit('#authorForm',config.ajaxAddress.addGoodsSort,function(data){
			if(data.code==200){
				tag=true;
				
			}else{
				tag=false;
				
			}
			});

			if(tag){
				alert('添加成功');
				layer.msg('添加成功');
				open('goodsSort.html',"_self");
			}else{
				alert('添加失败');
				layer.msg('网络错误，请稍后重试');
				open('goodsSort.html',"_self");
			}
		})
		console.log(arr);
		
	});


});
