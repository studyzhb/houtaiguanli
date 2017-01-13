var user=cookieUtil.getCookie('username');

if(!user){
	open('login.html','_self');
}

!function(){
    layui.use('layer', function(){
        window.layer = layui.layer;
  
    }); 
}()