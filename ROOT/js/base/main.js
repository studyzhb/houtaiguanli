
//初始化加载方法体内的所有方法
$(function(){

//初始化左菜单
	initMenu();

//设置列表高度等于内容高度
	$(".per-list").height($(".right").height());

//顶部功能按钮   退出
	$(".quit").click(function(){
		window.location.href="login.html";
	})


//点击菜单控制菜单内容的显示/隐藏	
	$(".my-list").children("li").click(function(){
		if ($(this).height()==58) {
			$(this).animate({
				height:$(this).height()+$(this).find("ul").height()+"px"
			},500);
			$(this).siblings().animate({
				height:"58px"
			})
						
		}else{			
			$(this).animate({
				height:"58px"
			},500);			
		}		
	})

//点击子菜单，刷新对应页面

	$(".my-list").children("li").find("li").click(function(event){
		event.stopPropagation();
		var iUrl=$(this).find("a").attr("id");
	    mainFrame.location.href=iUrl;
	})

	 
	$(".top-menu div").hover(function(){
		$(this).css({"background":"#7dcdff"})
	},
	function(){
		$(this).css({"background":"0"})
	});



    
   
})

/**
 * 初始化左菜单 
 * 杨乔召
 **/
function initMenu(){
   var url=window.location.href;
   var userId=url.split("=")[1];
   $.ajax({
		type:"post",
		url:"/teamwork/home/left",
		async: false,
		data:{"userId":userId},
		success:function(result){
			console.log(result);
			if(result.ret){
				var data=result.data;
				//调用生成左侧菜单
				var html=createModule(data)
				$(".my-list").html(html);
		    }else{
				console.log(result.msg);
			}
		}
   })
}
  
/**
 * 生成模块菜单
 * 杨乔召 
 **/
function createModule(data){
	var html = "";
	for(var i=0;i<data.length;i++){
		html+="<li>";
		html+="<span></span><a>"+data[i].moduleName+"</a>";
		//调用模块菜单下的功能子菜单
        html+=createPermit(data[i].permitList);
		html+="</li>";
	}
    return html;
}

/**
 * 生成模块菜单下的功能子菜单
 * 杨乔召
 */
function createPermit(data){
	// 
	var html ="<ul>";
	//生成循环功能子菜单
	for(var i=0;i<data.length;i++){
		var iframeUrl=data[i].permitAction;
	  	html+="<li><a id="+iframeUrl+">"+data[i].permitName+"</a></li>";			
	}
	//
	html+="</ul>";
    return html;
}


