$(function(){
	var laytpl;
	var fistLoad=true;
	var shopUser={
		pageCount:''
	}
	function updatePageNum(p1){
        config.ajax('get',config.ajaxAddress.shopList,function(data){
            // console.log(data);
            var tempHtml=menulistContent.innerHTML;
            // console.log(tempHtml);
			$('#menulist-wraper').html('');
			shopUser.pageCount=data.count;
            if(fistLoad){
                updatePage();
            }
            
            $.each(data.data,function(index,item){
                
              
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
	

	layui.use(['laytpl','form'],function(){
		laytpl = layui.laytpl;
		
		updatePageNum(1);
		/*config.ajax('get',config.ajaxAddress.shopList,function(data){
			console.log(data);
			var tempHtml=menulistContent.innerHTML;
			//console.log(tempHtml);
			
				$('#menulist-wraper').html('');
				$.each(data,function(index,item){
					console.log(item);
					laytpl(tempHtml).render(item,function(html){
						$('#menulist-wraper').append(html);
					});
				});
		})*/
	
	});

	$('#menulist-wraper').on('click','.editorShopInfo',function(){
		// layer.open();
		// console.log($(this).data('id'));
		config.ajax('get',config.ajaxAddress.shopprice,function(data){
			// console.log(data);
			var tempHtml=shopPriceContent.innerHTML;
			
			$('.shop-price-wrapper').html('');
			$.each(data,function(index,item){
				console.log(item);
				laytpl(tempHtml).render(item,function(html){
					$('.shop-price-wrapper').append(html);
				});
			});

		},{id:$(this).data('id')});
		
		layer.open({
	        type:1,
	        content: $('#alertDemo'), //这里content是一个DOM
	      shade:[0.8,'#000'],
	      area:'900px',
	      maxmin: true
	    })
	});

	$('#menulist-wraper').on('click','.lookShopInfo',function(){
		open('shopprice-his.html?id='+$(this).data('id'),'_self');
	});

	$('.addUserInfo').on('click',function(){
		
		$('#order-time').val(new Date().getTime());
		config.formSubmit('#adminInfo',config.ajaxAddress.shopprice,function(data){
			if(data.code==200){
                layer.msg('添加成功');
                setTimeout(function(){
                    open('shop-price.html','_self');
                },500)
                
            }else{
                layer.msg('网络错误，请稍后重试');
                setTimeout(function(){
                    open('shop-price.html','_self');
                },500)
            }
		});
	});





});