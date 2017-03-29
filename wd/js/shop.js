$(function(){
	var laytpl;
	var fistLoad=true;
	var shopUser={
		pageCount:''
	}
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
		config.ajax('get',config.ajaxAddress.shopList,function(data){
			console.log(data);
			updatePageNum(1);
		})
	
	});

	$('#menulist-wraper').on('click','.editorShopInfo',function(){
		open('edit-shop.html?id='+$(this).data('id'),'_self');
	});

	$('#all-author-list').on('click','.editor-role',function(){
		
	});


	function updatePageNum(p1){
        config.ajax('get',config.ajaxAddress.shopList,function(data){
            console.log(data);
            var tempHtml=menulistContent.innerHTML;
			$('#menulist-wraper').html('');
			shopUser.pageCount=data.count;
            if(fistLoad){

                updatePage();
            }
            $.each(data.data,function(index,item){
                
                // console.log(item);
                laytpl(tempHtml).render(item,function(html){
					$('#menulist-wraper').append(html);
				});
            });
            $('.detailCount').text(data.num);
        },{p:p1});
    }



	function updatePage(){
		layui.use(['laypage', 'layer'],function(){
			var laypage=layui.laypage;
			var layer = layui.layer;
			laypage({
			    cont: 'page'
			    ,pages: shopUser.pageCount //总页数
			    ,groups: 5 //连续显示分页数
			    ,jump:function(data){
			    	//得到页数data.curr
			    	updatePageNum(data.curr);
			    }
			  });
		});

	    fistLoad=false;
	}

});