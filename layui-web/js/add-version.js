$(function(){
	
	
	$('.addUserInfo').on('click',function(){
		
	    
	   
		/*var pwd=$('.edituserwrap passwordAddMD5').val();
		if(!!pwd.trim()){
			pwd=hex_md5(pwd+config.accessKey);
			$('.edituserwrap passwordAddMD5').val(pwd);
		}*/
		
		config.formSubmit('#adminInfo',config.ajaxAddress.addVersion,function(data){
			console.log(data);
			if(data.code==200){
                layer.msg('添加成功');
                setTimeout(function(){
                    open('version.html','_self');
                },1000);
                
            }else{
                layer.msg('网络错误，请稍后重试');
                setTimeout(function(){
                    open('version.html','_self');
                },1000);
            }
		});
	})

});
