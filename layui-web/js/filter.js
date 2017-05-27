
var layer;
var $;
var laytpl;
var user=cookieUtil.getCookie('username');
var cookAuthor=cookieUtil.getCookie('authorlist');
var localAuthor=
$(function(){
	
	/*$('.layui-tab-title').on('click',function(){
		if($(this).has('a')){
			location.href=$(this).find('a').attr('href');
		}
	})*/

	$('.quit').on('click',function(){
	
	config.ajax('get',config.ajaxAddress.quit,function(data){
		if(data.code==200){
            layer.msg('退出成功');
            cookieUtil.removeCookie('username');
            cookieUtil.removeCookie('authorlist');
            cookieUtil.removeCookie('token');
            setTimeout(function(){
                open('login.html','_self');
            },500);
            
        }else{
            layer.msg('网络错误，请稍后重试');
            setTimeout(function(){
                open('login.html','_self');
            },500);
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

// 对菜单列表进行归类

var netPath=location.href;
var reg=/(\/[a-zA-Z0-9-_]+)/g;
var getArr=netPath.match(reg);
var switchVal=getArr[getArr.length-1].substring(1);
switch(switchVal){
	case 'add-brand':
		netPath+='/goodsbrand.html';
		break;
	case 'editor-brand':
		netPath+='/goodsbrand.html';
		break;
	case 'add-sort':
		netPath+='/goodsSort.html';
		break;
	case 'editor-sort':
		netPath+='/goodsSort.html';
		break;
	case 'editor-goodsInfo':
		netPath+='/editorgoodsInfo.html';
		break;
	case 'add-admin-menu':
		netPath+='/admin-menulist.html';
		break;
	case 'editor-author':
		netPath+='/authorlist.html';
		break;
	case 'add-author':
		netPath+='/authorlist.html';
		break;
	case 'add-shop-origin':
		netPath+='/shop.html';
		break;
	case 'shopprice-his':
		netPath+='/shop-price.html';
		break;
	case　'add-psort':
		netPath+='/pSort.html';
		break;
	case 'editor-psort':
		netPath+='/pSort.html';
		break;
	case　'add-task-sort':
		netPath+='/taskSort.html';
		break;
	case 'editor-task-sort':
		netPath+='/taskSort.html';
		break;
	case　'add-express-sort':
		netPath+='/express-sort.html';
		break;
	case 'editor-express-sort':
		netPath+='/express-sort.html';
		break;
		
}
// if(!cookAuthor){
	config.ajax('get',config.ajaxAddress.getAuthorlist,function(data){
		console.log(data.code,typeof data);
		if(data.code=='401'||!data.code){
			open('login.html','_self');
			return;
		}
		if(!!user){
			$('.username').text(cookieUtil.getCookie('username'));
		}else{
			open('login.html','_self');
		}
		cookieUtil.setExpiresDate('authorlist',JSON.stringify(data));
		updateList(data.data);
	});
// }else{
// 	if(!!user){
// 			$('.username').text(cookieUtil.getCookie('username'));
// 		}else{
// 			open('login.html','_self');
// 		}
// 	updateList(JSON.parse(cookAuthor));
// }

function updateList(data)
{
	layui.use(['laypage','layer','laytpl'],function(){
				$=layui.jquery;
		    	laytpl = layui.laytpl;
		    	layer = layui.layer;
		    	var tempHtml=slider.innerHTML;
		    	//获取权限列表	

		    	$.each(data,function(index,item){
					// console.log(item.children);
					item.thisselc=netPath;
					item.shai=item.thisselc;
					// $.each(item.children,function(ind,its){
					// 	if(item.thisselc.indexOf(item.path)){

					// 	}
					// })
					laytpl(tempHtml).render(item,function(html){
					// console.log(html);
					
					$('#sliderPage').append(html);

					})
				})
				layui.use('element',function(){
					var element = layui.element();
					element.init();
				});
		 });
}
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