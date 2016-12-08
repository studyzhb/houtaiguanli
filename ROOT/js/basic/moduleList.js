//数据加载
 var p =1;
$(function(){
  //系统菜单
  var dt={
	 pageNo:p
  }
  doList(dt);
})
/**
 *系统菜单
 **/  
function doList(dt){
	dt = check("");
    $.ajax({
    type:"POST",
	data:dt,
    url: "/teamwork/tw/b/module/list",
        success: function(result){
           if(result.ret){
				var dataList = result.data.dataList;
				var html = createHtml(dataList);
				console.log(result)
			  $("#moduleList").html(html);
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
		//创建li开始
		html= createHtmlTr(html,index,0);
		//创建<span>
		html= createHtmlTd(html,index);
		//传入数据
	    html= createHtmlTd(html,data[i].moduleId);
        html= createHtmlTd(html,data[i].moduleName);  
        html= createHtmlTd(html,data[i].isInactive);
        html= createHtmlTd(html,time_trans(data[i].createdTime,'y-m-d'));
        html= createHtmlTd(html,data[i].createdBy);
        html= createHtmlTd(html,time_trans(data[i].updatedTime,'y-m-d'));
        html= createHtmlTd(html,data[i].updatedBy);
        //创建li结束 
		html= createHtmlTr(html,index,1);
    };
	return html;
 }


  //信息搜索
function check(type){
    var dt={
            pageNo:p
    }
    //菜单ID
    var moduleID = $("#moduleID").val();
    if( moduleID == "" ){ 
      if(type == "add" || type == "edit"){
        alert("");
      } 
    }else{
       dt.moduleID = moduleID;
    }
    //菜单名称
    var moduleName = $("#moduleName").val();
    if( moduleName == "" ){ }else{
       dt.moduleName = moduleName;
    }

    console.log(dt);
}