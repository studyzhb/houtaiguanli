//数据加载
 var p =1;
$(function(){
  //系统字典 
  var dt={
   pageNo:p
  }
  doList(dt);
})
/**
 *系统字典
 **/  
function doList(dt){
    dt = check("");
    $.ajax({
    type:"POST",
    data:dt,
    url: "/teamwork/tw/b/dict/list",
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
   //创建<tr>
    html= createHtmlTr(html,index,0);
    //创建<td>
    html= createHtmlTd(html,index);
    //传入数据
    html= createHtmlTd(html,data[i].dictId);
    html= createHtmlTd(html,data[i].dictCode);
    html= createHtmlTd(html,data[i].dictName); 
    html= createHtmlTd(html,data[i].dictValue); 
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
    //字典ID
    var dictId = $("#dictId").val();
    if( dictId == "" ){ 
      if(type == "add" || type == "edit"){
        alert("");
      } 
    }else{
       dt.dictId = dictId;
    }
    //字典代码
    var dictCode = $("#dictCode").val();
    if( dictCode == "" ){ }else{
       dt.dictCode = dictCode;
    }
    //字典名称
    var dictName = $("#dictName").val();
    if( dictName == "" ){ }else{
       dt.dictName = dictName;
    }
    //字典类型 
    var dictValue = $("#dictValue").val();
    if( dictValue == "" ){ }else{
       dt.dictValue = dictValue;
    }

    console.log(dt);
}