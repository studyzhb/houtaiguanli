$(function(){
	/*var laytpl;
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
		config.ajax('get',config.ajaxAddress.shopList,function(data){
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
		})
	
	});

	$('#menulist-wraper').on('click','.editorShopInfo',function(){
		open('edit-shop.html?id='+$(this).data('id'),'_self');
	});

	$('#all-author-list').on('click','.editor-role',function(){
		
	});*/
	var w=$('.shop-content').width();
	var h=$('.shop-content').height();
	

	showIframe('me.html',w,h);


	function showIframe(url,w,h){
	    //添加iframe
	    var if_w = w; 
	    var if_h = h; 
	    //allowTransparency='true' 设置背景透明
	    $("<iframe width='" + if_w + "' height='" + if_h + "' id='YuFrame1' name='YuFrame1' style='position:absolute;z-index:4;'  frameborder='no' marginheight='0' marginwidth='0' allowTransparency='true'></iframe>").appendTo($('.shop-content'));    
	    var st=document.documentElement.scrollTop|| document.body.scrollTop;//滚动条距顶部的距离
	    var sl=document.documentElement.scrollLeft|| document.body.scrollLeft;//滚动条距左边的距离
	    var ch=document.documentElement.clientHeight;//屏幕的高度
	    var cw=document.documentElement.clientWidth;//屏幕的宽度
	    var objH=$("#YuFrame1").height();//浮动对象的高度
	    var objW=$("#YuFrame1").width();//浮动对象的宽度
	    var objT=Number(st)+(Number(ch)-Number(objH))/2;
	    var objL=Number(sl)+(Number(cw)-Number(objW))/2;
	    $("#YuFrame1").css('left','0');
	    $("#YuFrame1").css('top','0');
	 
	    $("#YuFrame1").attr("src", url)
	 
	    //添加背景遮罩
	    //$("<div id='YuFrame1Bg' style='background-color: Gray;display:block;z-index:3;position:absolute;left:0px;top:0px;filter:Alpha(Opacity=30);/* IE */-moz-opacity:0.4;/* Moz + FF */opacity: 0.4; '/>").prependTo('body'); 
	    /*var bgWidth = Math.max($("body").width(),cw);
	    var bgHeight = Math.max($("body").height(),ch);
	    $("#YuFrame1Bg").css({width:bgWidth,height:bgHeight});
	 */
	    //点击背景遮罩移除iframe和背景
	    /*$("#YuFrame1Bg").click(function() {
	        $("#YuFrame1").remove();
	        $("#YuFrame1Bg").remove();
	    });*/
	}

});