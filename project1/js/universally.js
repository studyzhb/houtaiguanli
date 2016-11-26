/**
 * Created by Administrator on 2016/11/7.
 */
            var dizhi = 'http://122.114.48.44:8080/';
            var http ='http://122.114.48.44:8080/heche/';
$('.ulR').mouseenter( function () {

    $('#username').show().animate({


    });
})
$('#username').mouseleave( function () {
    $('#username').hide();
})

$('#qiehuan').on('click','#qiehuan li',function(){
      console.log(1);

    if($(this).index()==0){
        location.href = "index.html";
    }if($(this).index()==1) {
        location.href = "wantcar.html";
    }
})


//----------------------------------------搜索期数跳转到合车列表页-----------------------------------------------------
                     $('#youSearch').click(function(){
                       var periods = $('#mySearch').val();
                         
                       if(periods!=''){
                           sessionStorage.setItem('periods',periods);
                           window.location.href = 'wantcar.html';
                       }
                   })












//----------------------------------------侧边栏----------------------------------------------------
	$(window).scroll(function(){
		var top=$(window).scrollTop()
		var scroll=$('.Searchbar').height()+$('.navQ').height()+$('.banner').height()/2;	
		
		if(top>scroll){
			$('.sider').css('display','block');
		}else{
			$('.sider').css('display','none');
		}
	})

$('.sider').on('mouseenter', '.right_box', function () {
    var i = $(this).index();
     $(this).find($('.iconBox')).css('background-color','red');
    $('.tipBox').eq(i).show().animate({

        right: 0
    })
})
$('.sider').on('mouseleave', '.right_box', function () {
    var i = $(this).index();
    $(this).find($('.iconBox')).css('background-color','gray');
    $('.tipBox').eq(i).animate({
        right: -50
    }, function () {
        $(this).hide()
    })
})
//------------------------------------------------侧边栏的各区域跳转-------------------------------------------------------
        $('.tipBox').eq(0).click(function(){

        	  window.location.href="login.html";
        	  location.href='login.html';
         
        })

        $('.tipBox').eq(1).click(function(){
        	  window.location.href="personal.html";
            sessionStorage.setItem('ifC',true);
              //alert(1)
        })

         $('.tipBox').eq(2).click(function(){

        	  window.location.href="personal.html";
              sessionStorage.setItem('ifCl',true);
                //alert(1)
        })

         $('.tipBox').eq(3).click(function(){

        	  window.location.href="personal.html";
             sessionStorage.setItem('ifCli',true);
               //alert(1)
        })



//------------------------------------用户头像----------------------------------------------------
function user (){
    var headImg = localStorage.getItem('headImg');
    var nickname = localStorage.getItem('nickname');
    //console.log(nickname);
    //console.log(headImg);

    var us = '';
    $('.ulR').html('');
    us += '<li><img src="'+dizhi+headImg+'" /></li>';
    us += '<li>';
    us += '<a>' + nickname + '</a>';
    us += '</li>';
    $('.ulR').append(us);
}
user ();




			
//---------------------------------------导航用户名下面的跳转界面--------------------------------------------
           $('#mY').click(function(){
                window,location.href ='personal.html';
           })
            $('#left').click(function(){
                window,location.href ='login.html';
             })
             $('#shezhi').click(function(){
                window,location.href ='personal.html';
               sessionStorage.setItem('ifClick',true);
             })
             
             
 //城市市区的选择
				  var userNumber = localStorage.getItem('userNumber');
                  console.log(userNumber);
				/*调取市区  */
				     $(function(){ 
				     	var shuju=[];
				     	$.ajax({
				     		type:"post", 
				     		url: http + "main/selectCityByGood",
				     		dataType:"json",
				     		contentType: "application/json;charset=utf-8",
				     		data:JSON.stringify({
				                   "userNumber":userNumber                  
				                 }),
				     		success:function(data){
				  			console.log(data);  
				  			//console.log(data.result[0].name);
							var str='';
				   			var mocity=sessionStorage.getItem('mocityName')
				   			var city = document.getElementById('city');
				   			city.innerHTML='<option>'+mocity+'</option>'
				     		str='<option>'+mocity+'</option>'	
				     			var arr=data.result
				     			for(var i=0;i<arr.length;i++){
				     				if(arr[i].name==mocity){
				     					str=''
				     					$('#city').append(str)
				     				}else{
				     					str='<option>'+arr[i].name+'</option>'
				     					$('#city').append(str);
				     				}    				
				//   				console.log(str)     				     				
				     			}     				
				     		}    	
				     	})     
				     })   


                    
                     function gradeChange(obj) {
                        if(obj){
                           var cityName=$(obj).val();
                            sessionStorage.setItem('mocityName',cityName);
                        }
                        // console.log(cityName);
                        // maicar(cityName);
                        // tomorrow(cityName);
                        // pastcar(cityName);
                        location.reload();
                    } 
				    // maicar(cityName);
        //             tomorrow(cityName);
        //             pastcar(cityName)
                    
//
//          window.onload =function(){
//	          var cookieUtil = {
//				setCookie: function(name,value,iDate){
//					//console.log('1')
//					var date = new Date();
//					date.setDate(date.getDate()+iDate);
//					document.cookie = name + "=" + value + ";expires=" + date;
//				},
//				getCookie: function(name){
//					var str = document.cookie;
//					var arr = str.split("; ");
//					for(var i = 0; i < arr.length; i++){
//						var arr1 = arr[i].split("=");
//						if(arr1[0]==name){
//							return arr1[1];
//						}
//					}
//					return "";
//				},
//				removeCookie:function(name){
//					this.setCookie(name,1,-1);
//				}
//			}
//       })