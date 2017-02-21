var user=cookieUtil.getCookie('username');

if(!user){
	open('login.html','_self');
}

!function(w){
    layui.use(['layer','laytpl'], function(){
        w.layer = layui.layer;
        w.laytpl = layui.laytpl;
  
    }); 
}(this)