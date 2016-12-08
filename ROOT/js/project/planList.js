//传入数据
 var p =1;
$(function(){
  //工作计划
  var dt={
	 pageNo:p
  }
  doList(dt);

  ajaxProjectList("");
})
/**
 * @desc  工作计划
 * @author  
 * @date   2016-12-06
 **/
function doList(dt){
    dt = check("");
    $.ajax({
    type:"POST",
	data:dt,
    url: "/teamwork/tw/u/plan/list",
        success: function(result){
           if(result.ret){
				var dataList = result.data.dataList;
				var html = createHtml(dataList);
			    $("#planList").html(html);
				var pages = result.data.pages;
				//分页
				showPage(pages,dt);
			}else{
				console.log(result.msg);
			}
        }
    })
}

/**
 * @desc   创建数据
 * @author  
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
	    html= createHtmlTd(html,data[i].planId);
        html= createHtmlTd(html,data[i].userId);
        html= createHtmlTd(html,data[i].planCode);
        html= createHtmlTd(html,data[i].planType);
        html= createHtmlTd(html,data[i].planItems);
        html= createHtmlTd(html,data[i].planTiems);
        html= createHtmlTd(html,data[i].status);
        html= createHtmlTd(html,data[i].isInactive);
        html= createHtmlTd(html,time_trans(data[i].createdTime,'y-m-d'));
        html= createHtmlTd(html,data[i].createdBy);
        html= createHtmlTd(html,time_trans(data[i].updatedTime,'y-m-d'));
        html= createHtmlTd(html,data[i].updatedBy);
        //
		html= createHtmlOpt(html,null);
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
    var planCode = $("#planCode").val();
    if( planCode == "" ){ 
      if(type == "add" || type == "edit"){
        alert("");
      } 
    }else{
       dt.planCode = planCode;
    }
    //用户名称
    var planItems = $("#planItems").val();
    if( planItems == "" ){ }else{
       dt.planItems = planItems;
    }
    console.log(dt);
}



