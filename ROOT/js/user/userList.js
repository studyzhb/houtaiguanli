//数据加载
 var p =1;
$(function(){
  //用户列表 
  var dt={
	 pageNo:p
  }
  doList(dt);
})
/**
 *用户列表
 **/  
function doList(dt){
    dt = check("");
    $.ajax({
    type:"POST",
	data:dt,
    url: "/teamwork/tw/u/user/list",
        success: function(result){
           if(result.ret){
				var dataList = result.data.dataList;
				var html = createHtml(dataList);
			    $("#userList").html(html);
				var pages = result.data.pages;
				//显示分页 
				showPage(pages,dt);
			}else{
				console.log(result.msg);
			}
        }
    })
}

/*
**创建数据
*/

function createHtml(data){
    var html ="";
   
    for (var i =0 ;i<data.length; i++) {
        var index = i+1;
        //创建<li>
        html= createHtmlTr(html,index,0);
        //创建<span>
        html= createHtmlTd(html,index);
        html= createHtmlTd(html,data[i].departId);
        html= createHtmlTd(html,data[i].userCode);
        html= createHtmlTd(html,data[i].userName); 
        html= createHtmlTd(html,data[i].userAgname);
        html= createHtmlTd(html,data[i].header);
        html= createHtmlTd(html,data[i].personalQuote);
        html= createHtmlTd(html,data[i].loginTime);    
        html= createHtmlTd(html,data[i].loginTimes);
        html= createHtmlTd(html,data[i].isInactive);
        html= createHtmlTd(html,time_trans(data[i].createdTime,'y-m-d'));
        html= createHtmlTd(html,data[i].createdBy);
        html= createHtmlTd(html,time_trans(data[i].updatedTime,'y-m-d'));
        html= createHtmlTd(html,data[i].updatedBy);
        //创建操作图标
        /*html= createHtmlOpt(html,null);*/
        //创建</li>
       html= createHtmlTr(html,index,1);
    };
    return html;
}


//信息搜索
function check(type){
    var dt={
            pageNo:p
    }
    //登录账号
    var userCode = $("#userCode").val();
    if( userCode == "" ){ 
      if(type == "add" || type == "edit"){
        alert("");
      } 
    }else{
       dt.userCode = userCode;
    }
    //用户名称
    var userName = $("#userName").val();
    if( userName == "" ){ }else{
       dt.userName = userName;
    }
    console.log(dt);
}