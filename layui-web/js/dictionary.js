$(function(){
		var laytpl;
		var fistLoad=true;
		var supplierPage={
		pagecount:''
	}
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;	
		// config.ajax('get',config.ajaxAddress.showgoodsbrand,function(data){
		// // console.log(data);
		// 	var tempHtml=sortContent.innerHTML;
		// 	$('#all-sort-list').html('');
		// 	$.each(data,function(index,item){
		// 		laytpl(tempHtml).render(item,function(html){
		// 			$('#all-sort-list').append(html);
		// 		});
		// 	});
		// });	
	});
	updatePageNum(0)
	
	function updatePageNum(p1){
		config.ajax('get',config.ajaxAddress.showDictionary,function(data){
		// console.log(data);
		supplierPage.pagecount=data.count;
			var tempHtml=sortContent.innerHTML;
			$('#all-sort-list').html('');
			if(fistLoad){

                updatePage();
            }
			$.each(data.data,function(index,item){
				laytpl(tempHtml).render(item,function(html){
					$('#all-sort-list').append(html);
				});
			});
		},{p:p1});	
	}

	function updatePage(){
    layui.use(['laypage', 'layer'],function(){
        var laypage=layui.laypage;
        var layer = layui.layer;
		
        laypage({
            cont: 'page'
            ,pages: supplierPage.pagecount //总页数
            ,groups: 5 //连续显示分页数
            ,jump:function(data){
                //得到页数data.curr
                updatePageNum(data.curr);
				console.log(data.curr);
            }
          });
		  
    });

    fistLoad=false;
}

	//编辑分类
	$('#all-sort-list').on('click','.editor-dictionary',function(){
		console.log($(this).data('id'));
		var bname=escape($(this).data('name'));
		location.href='editor-dictionary.html?id='+$(this).data('id')+'?brandname='+bname;
	});

	//删除
	$('#all-sort-list').on('click','.delete-dictionary',function(data){
		config.ajax('post',config.ajaxAddress.deleteDictionary,function(data){
			console.log(data);
			if(data.code==200){
                layer.msg('删除成功');
                setTimeout(function(){
                    open('dictionary.html','_self');
                },1000);
                
            }else{
                layer.msg('网络错误，请稍后重试');
                setTimeout(function(){
                    open('dictionary.html','_self');
                },1000);
            }
		},{id:$(this).data('id')});
		// console.log($(this).data('id'));
		// var bname=escape($(this).data('name'));
		// location.href='editor-dictionary.html?id='+$(this).data('id')+'?brandname='+bname;
	});
});