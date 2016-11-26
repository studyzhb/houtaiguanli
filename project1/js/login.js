/**
 * Created by Administrator on 2016/11/10.
 */
  $(function(){
  	        var http ='http://122.114.48.44:8080/heche/';
  	      
         $('#loging').click(function(){
            var code = $('#phone').val();
            var pwd  = $('#pw').val();
           var PWD = hex_md5(pwd).toUpperCase();
            // var pwd = 'E10ADC3949BA59ABBE56E057F20F883E';
             $.ajax({
                  type:'post',
                  url: http + 'main/login',
                  async: false,
                 dataType: 'json',
                 contentType:"application/json;charset=utf-8",
                 data:JSON.stringify({
                     'code':code,
                     'pwd' :PWD

                  }),
                 success:function(data){
                   //console.log(data);
                   //  console.log(data.result);
                     var result = data.result;
                    if(data.result){
                        if(msg="登录成功 "){
                            location.href='index.html'
                        }
                        //result.state==1
                        var nickname = result.nickName;
                        var headImg  = result.headImg;
                        var userNumber =result.userNumber;
                        //console.log(nickname);
                        localStorage.setItem('nickname',nickname);
                        localStorage.setItem('headImg',headImg);
                        localStorage.setItem('userNumber',userNumber);
                    }

                     alert(data.msg);
                 },
         })
             return false;
    })
       
         //地理定位所在市
				var mocityName=null;
					function get_ip(cb) {
								var script = document.createElement("script"),
								s = document.getElementsByTagName("script")[0];
								script.src = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=jsonp";
								s.parentNode.insertBefore(script, s);
								var it = setInterval(function() {
                  
									if(!!remote_ip_info) {
										cb(remote_ip_info);
										remote_ip_info = null;
										clearInterval(it);
										it = null;
									}
								}, 500);
							}
							get_ip(function(info){
								mocityName=info.city+'市';
                
								sessionStorage.setItem('mocityName',mocityName);				
							});	            
				             
  })