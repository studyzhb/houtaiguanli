
var layer;
var $;
var laytpl;
var user=cookieUtil.getCookie('username');
$(function(){
	
	$('.layui-tab-title').on('click',function(){
		if($(this).has('a')){
			location.href=$(this).find('a').attr('href');
		}
	})

	$('.quit').on('click',function(){
	
	config.ajax('get',config.ajaxAddress.quit,function(data){
		if(data.code==200){
            layer.msg('退出成功');
            cookieUtil.removeCookie('username');
            setTimeout(function(){
                open('login.html','_self');
            },500)
            
        }else{
            layer.msg('网络错误，请稍后重试');
            setTimeout(function(){
                open('login.html','_self');
            },500)
        }
	})
	});

	// config.ajax('get',config.ajaxAddress.validateAuthor,function(data){
	// 	console.log(data);
	// 	if(data.code==200){
           
            
 //        }else{
 //            layer.msg('请检查权限');
 //            setTimeout(function(){
 //                open('login.html','_self');
 //            },500)
 //        }
	// });

config.ajax('get',config.ajaxAddress.getAuthorlist,function(data){
		console.log(data);
		if(!!user){
			$('.username').text(cookieUtil.getCookie('username'));
		}else{
			open('login.html','_self');
		}
		layui.use(['laypage','layer','laytpl'],function(){
				$=layui.jquery;
		    	laytpl = layui.laytpl;
		    	layer = layui.layer;
		    	var tempHtml=slider.innerHTML;
		    	//获取权限列表	

		    	$.each(data,function(index,item){
					// console.log(item.children);
					item.thisselc=location.href;
					item.shai=item.thisselc;
					
					laytpl(tempHtml).render(item,function(html){
					// console.log(html);
					
					$('#sliderPage').append(html);

					})
				})
				layui.use('element',function(){
					var element = layui.element();
					element.init();
				});
		 })
		
		
		
	});

$('.show-content').on('click','.select-tit',function(){

        if($(this).next().css('display')=='none'){
            $(this).nextAll().css('display','block');
        }else{
            $(this).nextAll().css('display','none');
        } 
    });

    $('.show-content').on('click','li',function(){
        $(this).parents('.select-items').css('display','none').next().css('display','none');
        $(this).parents('.select-items').prev('.select-tit').find('span').text($(this).text());  
    })





});