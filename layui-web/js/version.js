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
		config.ajax('get',config.ajaxAddress.showVersion,function(data){
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
            }
          });
    });

    fistLoad=false;
}
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;	
		config.ajax('get',config.ajaxAddress.showVersion,function(data){
		// console.log(data);
		var tempHtml=sortContent.innerHTML;

		$('#all-sort-list').html('');

		$.each(data.data,function(index,item){

			laytpl(tempHtml).render(item,function(html){

				$('#all-sort-list').append(html);
			});
		});
	});	
	});

	//编辑分类
	$('#all-sort-list').on('click','.editor-brand',function(){
		console.log($(this).data('id'));
		var bname=escape($(this).data('name'));
		location.href='editor-version.html?id='+$(this).data('id');
	});


});