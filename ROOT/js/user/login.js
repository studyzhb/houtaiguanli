$(function(){
	$(".login_button").click(function(){
		ajaxEvt();
	});
	document.onkeydown=function(event){
		var evt = window.event;
		if(evt.keyCode==13){
			ajaxEvt();
		}
	}

}) 
 
//加入参数并跳转页面
function home(userId){
   location.href="../../pages/index.html?userId="+userId;	
}

//ajax传输数据
function ajaxEvt(){
	var userCode=$(".user_input").val();
	var userPasswd=$(".password_input").val();
	$.ajax({
		type:"post",
		url:"/teamwork/bs/login",
		async: false,
		data:{
			"userCode":userCode,
			"userPasswd":userPasswd
		},
		success:function(result){
			console.log(result);
			if(result.ret){
				home(result.data.userId);
			}else{
				alert(result.msg);
			}
		}
	})
}