//数据加载
 var p =1;
$(function(){
  //系统日志 
  var dt={
   pageNo:p
  }
  doList(dt);
})
/**
 *系统日志
 **/  
function doList(dt){
    dt = check("");
    $.ajax({
    type:"POST",
    data:dt,
    url: "/teamwork/tw/b/log/list",
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

/**
 * @desc   生成列表内容
 * @author 杨乔召
 * @date   2016-12-06
 **/
function createHtml(data){
	var html ="";
	for (var i =0 ;i<data.length; i++) {
		var index = i+1;
		 //创建<tr>
	    html= createHtmlTr(html,index,0);
	    //创建<td>
	    html= createHtmlTd(html,index);
	    //传入数据
	    html= createHtmlTd(html,data[i].logCode);
        html= createHtmlTd(html,data[i].logType);
        html= createHtmlTd(html,data[i].content);     
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
    //日志ID
    var logID = $("#logID").val();
    if( logID == "" ){ 
      if(type == "add" || type == "edit"){
        alert("");
      } 
    }else{
       dt.logID = logID;
    }
    //日志类型
    var logType = $("#logType").val();
    if( logType == "" ){ }else{
       dt.logType = logType;
    }

    console.log(dt);
}