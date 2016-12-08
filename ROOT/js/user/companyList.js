//数据加载
 var p =1;
$(function(){
  //公司列表 
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
     url: "/teamwork/tw/u/company/list",
        success: function(result){
           if(result.ret){
				var dataList = result.data.dataList;
				var html = createHtml(dataList);
				console.log(result)
			   $("#companyList").html(html);
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
    html= createHtmlTd(html,data[i].companyId);
    html= createHtmlTd(html,data[i].companyCode);
    html= createHtmlTd(html,data[i].companyName);
    html= createHtmlTd(html,data[i].createdBy);
    html= createHtmlTd(html,time_trans(data[i].createdTime,'y-m-d'));
    html= createHtmlTd(html,data[i].status);
    html= createHtmlTd(html,data[i].isInactive);    
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
    //公司ID
    var companyId = $("#companyId").val();
    if( companyId == "" ){ 
      if(type == "add" || type == "edit"){
        alert("");
      } 
    }else{
       dt.companyId = companyId;
    }
    //公司名称
    var companyName = $("#companyName").val();
    if( companyName == "" ){ }else{
       dt.companyName = companyName;
    }
    console.log(dt);
}



