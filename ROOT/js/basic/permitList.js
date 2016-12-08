//数据加载
 var p =1;
$(function(){
  //系统权限 
  var dt={
	 pageNo:p
  }
  doList(dt);
})
/**
 *系统权限
 **/  
function doList(dt){
    dt = check("");
    $.ajax({
    type:"POST",
	data:dt,
     url: "/teamwork/tw/b/permit/list",
        success: function(result){
           if(result.ret){
				var dataList = result.data.dataList;
				var html = createHtml(dataList);
				console.log(result)
			   $("#permitList").html(html);
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
    html= createHtmlTd(html,data[i].permitId);
    html= createHtmlTd(html,data[i].moduleId);
    html= createHtmlTd(html,data[i].permitName);
    html= createHtmlTd(html,data[i].permitAction);
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
    //模块ID
    var moduleID = $("#moduleID").val();
    if( moduleID == "" ){ 
      if(type == "add" || type == "edit"){
        alert("");
      } 
    }else{
       dt.moduleID = moduleID;
    }
    //权限ID
    var permitID = $("#permitID").val();
    if( permitID == "" ){ }else{
       dt.permitID = permitID;
    }
    //权限名称
    var permitName = $("#permitName").val();
    if( permitName == "" ){ }else{
       dt.permitName = permitName;
    }

    console.log(dt);
}



