$(function(){
	var laytpl;
	var fistLoad=true;
	var shopUser={
		pageCount:''
	}
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
		updatePageNum(1);
	});
	
	function updatePageNum(p1){
        config.ajax('get',config.ajaxAddress.showshopUser,function(data){
            console.log(data);
            var tempHtml=menulistContent.innerHTML;
			$('#adminUserList').html('');
			shopUser.pageCount=data.count;
            if(fistLoad){

                updatePage();
            }
            $.each(data.data,function(index,item){
                
                // console.log(item);
                laytpl(tempHtml).render(item,function(html){
					$('#adminUserList').append(html);
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