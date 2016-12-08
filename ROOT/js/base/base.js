/**
 * 生成Html的tr标签
 * @date 2016-12-27
 * @author 杨乔召
 * @param html
 * @param index
 * @param type
 * @returns
 */
function createHtmlTr(html, index, type) {
	if (type == 0) {
		html += "<tr>";
	} else {
		html += "</tr>";
	}
	return html;
}

/**
 * 生成createHtmlTd标签
 * @date 2016-12-27
 * @author 杨乔召
 * @param html
 * @param data_param
 * @returns
 */
function createHtmlTd(html, data_param) {
	if(data_param == null || data_param == 'null'){
	   data_param  = "";
	}
	html += "<td>" + data_param + "</td>";
	return html;
}

/**
 * 生成操作图标
 * @date 2016-12-27
 * @author 杨乔召
 * @param html
 * @param json
 * @returns
 */
function createHtmlOpt(html, json) {
	html += "<span class='content1'>";
	html += "<div class='operation'>";
	html += "<a class='operation1'></a>";
	html += "<a class='operation1 operation2'></a>";
	html += "</div>";
	html += "</span>";
	return html;
}

/**
 * 时间转换器
 * @date 2016-12-27
 * @author 杨乔召
 * @param time
 * @param type
 * @returns
 */
function time_trans(time, type) {// 时间转换 time时间戳
	type = type || 'all';
	var time_text;
	var nowTime = new Date(time);
	var year = nowTime.getFullYear();
	var month = nowTime.getMonth() + 1;
	var day = nowTime.getDate();
	var hour = nowTime.getHours();
	var min = nowTime.getMinutes();
	var sec = nowTime.getSeconds();
	switch (type) {
	case 'ymd':
		// 年月日
		time_text = year + '年' + addZero(month) + '月' + addZero(day) + '日';
		break;
	case 'all':
		// 年月日时分秒
		time_text = year + '年' + addZero(month) + '月' + addZero(day) + '日'
				+ addZero(hour) + '时' + addZero(min) + '分' + addZero(sec) + '秒'
		break;
	case 'y-m-d':
		// 年月日
		time_text = year + '-' + addZero(month) + '-' + addZero(day);
		break;
	case 'default':
		break;
	}
	return time_text;
}

/**
 * 添零处理
 */
function addZero(str) { // 添零
	str = str + '';
	if (str.length == 1) {
		str = '0' + str;
	}
	return str;
}

/**
 * 列表页面显示分页信息
 * @date 2016-12-27
 * @author 杨乔召
 * @param pages
 * @param dt
 */
function showPage(pages, dt) {
	laypage({
		cont : 'page',
		pages : pages,
		groups : 3,
		curr : p,
		jump : function(obj, first) {
			if (!first) {
				dt.pageNo = obj.curr;
				p = obj.curr;
				console.log("pageno:" + p)
				//
				doList(dt);
			}
		}
	});
}

/**
 * 动态获取公司列表生成下拉组件
 * @date 2016-12-27
 * @author 杨乔召
 * @param setId  页面定位id
 */
function ajaxCompanyList(setId) {
	$.ajax({
		type : "POST",
		data : {
			isInactive : 0
		},
		url : "/teamwork/tw/u/company/findList",
		success : function(result) {
			if (result.ret) {
				// 输出结果
				console.log(result)
                var data = [];
                var newList = result.data;
                for (var i = 0; i < newList.length; i++) {
                	 var json ={
                          title:newList[i].companyName,
                          text:newList[i].companyName,
                          value:newList[i].companyId
                	 }
                	 data[i] = json;
                }
			    //生成下拉框组件
                createSelect(setId,data);
			} else {
				console.log(result.msg);
			}
		}
	})
}

/**
 * 根据公司ID动态获取部门列表并生成下拉组件
 * @date 2016-12-27
 * @author 杨乔召
 * @param setId  页面定位id
 * @param companyId  公司ID
 */
function ajaxDepartList(setId, companyId) {
	$.ajax({
		type : "POST",
		data : {
			isInactive : 0,
			companyId : companyId
		},
		url : "/teamwork/tw/u/depart/findList",
		success : function(result) {
			if (result.ret) {
				// 输出结果
				console.log(result)
                var data = [];
                var newList = result.data;
                for (var i = 0; i < newList.length; i++) {
                	 var json ={
                          title:newList[i].departName,
                          text:newList[i].departName,
                          value:newList[i].departId
                	 }
                	 data[i] = json;
                }
			    //生成下拉框组件
                createSelect(setId,data);
			} else {
				console.log(result.msg);
			}
		}
	})
}

/**
 * 根据部门ID动态获取员工列表并生成下拉组件
 * 
 * @date 2016-12-27
 * @author 杨乔召
 * @param setId 页面定位id
 * @param departId 部门ID
 */
function ajaxUserList(setId, departId) {
	$.ajax({
		type : "POST",
		data : {
			isInactive : 0,
			companyId : companyId
		},
		url : "/teamwork/tw/u/user/findList",
		success : function(result) {
			if (result.ret) {
				// 输出结果
				console.log(result)
				var data = [];
                var newList = result.data;
                for (var i = 0; i < newList.length; i++) {
                	 var json ={
                          title:newList[i].userName,
                          text:newList[i].userName,
                          value:newList[i].userId
                	 }
                	 data[i] = json;
                }
			    //生成下拉框组件
                createSelect(setId,data);
			} else {
				console.log(result.msg);
			}
		}
	})
}

/**
 * 根据字典类型取出该类型对应的字典数据
 * @date 2016-12-27
 * @author 杨乔召
 * @param setId 页面定位id
 * @param dictCode 字典类型
 */
function ajaxDictList(setId, dictCode) {
	$.ajax({
		type : "POST",
		data : {
			isInactive : 0,
			dictCode : dictCode
		},
		url : "/teamwork/tw/b/dict/findList",
		success : function(result) {
			if (result.ret) {
				// 输出结果
				console.log(result)
				var data = [];
                var newList = result.data;
                for (var i = 0; i < newList.length; i++) {
                	 var json ={
                          title:newList[i].dictName,
                          text:newList[i].dictName,
                          value:newList[i].dictValue
                	 }
                	 data[i] = json;
                }
			    //生成下拉框组件
                createSelect(setId,data);
			} else {
				console.log(result.msg);
			}
		}
	})
}

/**
 * 动态获取项目列表并生成下拉组件
 * @date 2016-12-27
 * @author 杨乔召
 * @param setId 页面定位id
 */
function ajaxProjectList(setId) {
	$.ajax({
		type : "POST",
		data : {
			isInactive : 0
		},
		url : "/teamwork/tw/p/project/findList",
		success : function(result) {
			if (result.ret) {
				// 输出结果
				console.log(result)
				var data = [];
                var projectList = result.data;
                for (var i = 0; i < projectList.length; i++) {
                	 var json ={
                          title:projectList[i].projectName,
                          text:projectList[i].projectName,
                          value:projectList[i].projectId
                	 }
                	 data[i] = json;
                }
			    //生成下拉框组件
                createSelect(setId,data);
			} else {
				console.log(result.msg);
			}
		}
	})
}

/**
 * 生成下拉框组件
 * @param setId
 * @param data
 */
function createSelect(setId,data){
	var select = document.createElement("select");
    for(var obj in data){
        var option = document.createElement("option");
        option.name = obj.text;
        option.innerHTML = obj.title;
        option.value = obj.value;
        select.appendChild(option)
    }
    $("#"+setId).html(select);
}