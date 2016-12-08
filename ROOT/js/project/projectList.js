//初始化数据
var p =1;
$(function(){
  //加载项目列表
  var dt={
	 pageNo:p
  }
  doList(dt);
})

/**
 * @desc   默认项目列表
 * @author 杨乔召
 * @date   2016-12-06
 **/
function doList(dt){
    $.ajax({
    type:"POST",
	data:dt,
    url: "/teamwork/tw/p/project/list",
        success: function(result){
            var html = "";
			console.log(result)
			if(result.ret){
				var dataList = result.data.dataList;
				var html = createHtml(dataList);
				console.log(result.data.pages);
			    $("#projectList").html(html);
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
	    html= createHtmlTd(html,data[i].projectId);
	    html= createHtmlTd(html,data[i].projectCode);
        html= createHtmlTd(html,data[i].projectName);
        html= createHtmlTd(html,data[i].projectNike);
        html= createHtmlTd(html,data[i].projectType);
        html= createHtmlTd(html,data[i].budgetType);
        html= createHtmlTd(html,data[i].status);
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