//数据加载
 var p =1;
$(function(){
  //用户群组列表 
  var dt={
	 pageNo:p
  }
  doList(dt);
})
/**
 *用户群组列表
 **/  
function doList(dt){
    dt = check("");
    $.ajax({
    type:"POST",
	data:dt,
    url: "/teamwork/tw/u/team/list",
        success: function(result){
           if(result.ret){
			   var dataList = result.data.dataList;
			   var html = createHtml(dataList);
			   $("#teamList").html(html);
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
      //创建<tr>
    html= createHtmlTr(html,index,0);
    //创建<td>
    html= createHtmlTd(html,index);
     //传入数据
     html= createHtmlTd(html,data[i].teamCode);
     html= createHtmlTd(html,data[i].teamName);
     html= createHtmlTd(html,data[i].leaderId);
	   html= createHtmlTd(html,data[i].isInactive);
     html= createHtmlTd(html,time_trans(data[i].createdTime,'y-m-d'));
     html= createHtmlTd(html,data[i].createdBy);
     html= createHtmlTd(html,time_trans(data[i].updatedTime,'y-m-d'));
     html= createHtmlTd(html,data[i].updatedBy);      
      //创建</tr>
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
    var teamCode = $("#teamCode").val();
    if( teamCode == "" ){ 
      if(type == "add" || type == "edit"){
        alert("");
      } 
    }else{
       dt.teamCode = teamCode;
    }
    //用户名称
    var teamName = $("#teamName").val();
    if( teamName == "" ){ }else{
       dt.teamName = teamName;
    }
    console.log(dt);
}


