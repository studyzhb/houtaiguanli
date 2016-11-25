
        var dizhi = 'http://122.114.48.44:8080';
        var userNumber = localStorage.getItem('userNumber');
        var endtime = new Array();
        var http = window.localStorage.getItem('http');


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
                 
        
   //-----------------------------------------------------轮播图--------------------------------------------------------------
          function  banner(){
             $.ajax({
                 type:"post",
                 url: http + "article/getAdsList",
                 dataType:"json",
                 contentType:"application/json;charset=utf-8",
                 data:JSON.stringify({
                     "userNumber":userNumber
                 }),
                    success:function(data){
                        //console.log(data);
                        //console.log(data.adsList);

                        var adsList = data.adsList;
                        var banner = '';
                        $('.pageCone').html('');
                        banner +='<div class="swiper-wrapper"> ';
                        banner += '<div class="swiper-slide"><img src="'+dizhi+adsList[0].adsImg+'" /></div>';
                        banner += '<div class="swiper-slide"><img src="'+dizhi+adsList[1].adsImg+'" /></div>';
                        banner += '<div class="swiper-slide"><img src="'+dizhi+adsList[2].adsImg+'" /></div>';
                        banner += '</div>'
                        $('.pageCone').append(banner);

                        var pageCone = new Swiper('.pageCone',{
                            pagination: '.swiper-pagination',
                            loop: true,
                            autoplay:3500,
                            autoplayDisableOnInteraction : false,

                        });


                    }
             })
         }
              banner();

//===============================================================首页我要合车===================================================================================
  	 		
  	                 	  	
   function maicar(cityname){
         	//localStorage.getItem('checkText')
         	//console.log(localStorage.getItem('checkText'))
          $.ajax({
              type: 'post',
              url: http + 'good/meddile',
              dataType: "json",
              contentType:"application/json;charset=utf-8",
              data:JSON.stringify({
                 "cityName":cityname,
                  "state":1,
                  "userNumber":userNumber,
                  "currentPage":1,
                  "pageSize":4
              }),
              success:function(data) {
                 //console.log(data);
//                console.log(data.result.newGoodList);
                  var newGoodList =data.result.newGoodList;
                	$('.newcarN').html('');
                	  show();
//              	   var list= [];
                  
                	for(var i =0;i<newGoodList.length;i++){
                		   var tmpStr = '';
                        var c = newGoodList[i].goodId;
                        //console.log(newGoodList[i].endTime)
                        //var endtime = newGoodList[i].endTime;
                        endtime[i] = newGoodList[i].endTime;
                         
                        
                        var  div1Width = parseInt($('.div1').width()*newGoodList[i].nowPercent/100)
//                        console.log(div1Width);
//                      list.push(div1Width);
//                      console.log(newGoodList[i].goodName)
                        tmpStr +='<div class="goodcarN">';
                		tmpStr +='<img src =" '+ dizhi+newGoodList[i].headImg  +'">'
                		tmpStr += '<ul>';
					    tmpStr += '<li>';
					    tmpStr +='<span>'+'第' + newGoodList[i].periods + '期</span>';
                        tmpStr +=  '【'+newGoodList[i].cityName+'】'
					    tmpStr +=  newGoodList[i].goodName
                        tmpStr +=  "</li>";
					    tmpStr += '<li>'+newGoodList[i].purchasedDataYear +'年'+ '/'+ newGoodList[i].runKilometer+'万公里</li>';
					    tmpStr += "<li>";
					    tmpStr += "<div class='div1'>";
					    tmpStr += "<div class='mydiv'></div>";
					    tmpStr +="</div>";
					    tmpStr += "<span>";
					    tmpStr += newGoodList[i].nowPercent;
                        tmpStr += "%</span>";
				        tmpStr += "</ul>";
					    tmpStr += "<dl>";
					   	tmpStr += "<li><img src=' images/img1 (6).png '/ >合车剩余时间：<span class='zzz'></span></li>";
                        tmpStr += "<li>"+ '合车价'+ newGoodList[i].joinPrice  + "万</li>";
					    tmpStr += "<li><button class='shopping' goodid="+c+">"+ '我要合车》'+"</button></li>"
                        tmpStr += '</div>'
                        $('.newcarN').append(tmpStr);
                       $('.goodcarN:nth-of-type('+(i+1)+')').find('.mydiv').css('width',div1Width);
              }
                 
                  
          }
       })
         }
        //maicar();
//                          $('.div2').width(div1Width);
                    function show (){
                        function show1 (){
                            for (var j =0;j<endtime.length;j++){
                                var now=new Date();
                                var nowtime=now.getTime();
                                //console.log(endtime[j])
                                var biyeDate=new Date(endtime[j]);
                                var _time=biyeDate.getTime();
                                var cha=_time-nowtime;
                                var s=1000;
                                var m=s*60;
                                var h=m*60;
                                var _day=1000*60*60*24;
                                var _date=Math.floor(cha/_day);
                                var _hour=Math.floor((cha-_date*_day)/h);
                                var _minutes=Math.floor((cha-_date*_day-_hour*h)/m);
                                var _seconds=Math.floor((cha-_date*_day-_hour*h-_minutes*m)/s);
                                $('.zzz').eq(j).html(_date+":"+_hour+":"+_minutes+":"+_seconds);
                                //console.log(_date+":"+_hour+":"+_minutes+":"+_seconds);
                            }
                        }
                        show1();
                        setInterval(show1,1000);
                    }
        function  tomorrow(cityname) {
                    $.ajax({
                        type: 'post',
                        url: http + 'good/meddile',
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        data: JSON.stringify({
                            "cityName": cityname,
                            "state": 0,
                            "userNumber": userNumber,
                            "currentPage": 1,
                            "pageSize": 8
                        }),
                        success: function (data) {
                            //console.log(data);
                            //console.log(data.result);

                            var newGoodList =data.result.newGoodList;
                            $('.tomorrowcar').html('');
                            var tomorrow = '';
                            for(var i =0;i<newGoodList.length;i++) {
                                 time ();
                            
                                tomorrow += '<div class="spoilerN">';
                                tomorrow += '<ul>';
                                tomorrow += '<li><img src =" '+ dizhi+newGoodList[i].headImg  +'"></li>';
                                tomorrow += '<li>';
                                tomorrow += '<span>'+'第' + newGoodList[i].periods + '期</span>';
                                tomorrow +=  '【'+newGoodList[i].cityName+'】'
                                tomorrow +=  newGoodList[i].goodName
                                tomorrow += '</li>';
                                tomorrow += '<li>'+newGoodList[i].purchasedDataYear + '/'+ newGoodList[i].runKilometer+'万公里</li>';
                                tomorrow += '<li>' +newGoodList[i].nowPercent + '%</li>'
                                tomorrow += '<li><div></div></li>'
                                tomorrow += '<li class="last">倒计时<span class="jishi"></span></li>';
                                tomorrow += '<li><span>' +"未开始"+'</span></li>';
                                tomorrow += '</ul>';
                                tomorrow += '</div>';
                            }
                            $('.tomorrowcar').append(tomorrow);
                        }
                    })
                }
             //tomorrow()

                                function time (){
                                    function time1 (){
                                        for (var j =0;j<endtime.length;j++){
                                            var now=new Date();
                                            var nowtime=now.getTime();
                                            //console.log(endtime[j])
                                            var biyeDate=new Date(endtime[j]);
                                            var _time=biyeDate.getTime();
                                            var cha=_time-nowtime;
                                            var s=1000;
                                            var m=s*60;
                                            var h=m*60;
                                            var _day=1000*60*60*24;
                                            var _date=Math.floor(cha/_day);
                                            var _hour=Math.floor((cha-_date*_day)/h);
                                            var _minutes=Math.floor((cha-_date*_day-_hour*h)/m);
                                            var _seconds=Math.floor((cha-_date*_day-_hour*h-_minutes*m)/s);
                                            $('.jishi').eq(j).html(_date+":"+_hour+":"+_minutes+":"+_seconds);
                                            //console.log(_date+":"+_hour+":"+_minutes+":"+_seconds);
                                        }
                                    }
                                    time1();
                                    setInterval(time1,1000);
                                }


        //---------------------------------------------------往期回顾----------------------------------------------------------------

                       function pastcar (cityname){
                               $.ajax({
                                   type: 'post',
                                   url: http + 'good/meddile',
                                   dataType: "json",
                                   contentType: "application/json;charset=utf-8",
                                   data: JSON.stringify({
                                       "cityName": cityname,
                                       "state": 2,
                                       "userNumber": userNumber,
                                       "currentPage": 1,
                                       "pageSize": 8
                                   }),
                                   success: function (data) {
//                                     console.log(data);
//                                     console.log(data.result);
                                       var newGoodList =data.result.newGoodList;
//                                     console.log(newGoodList.length)

                                       $('.pastcar').html('');
                                        var past= '';
                                     for(var i=0;i<newGoodList.length;i++){
//                                       var a = parseFloat(newGoodList[i].runKilometer / 10000);
//                                       var b = parseFloat(newGoodList[i].joinPrice / 10000);
                                         past+='<div class="PastN">';
                                         past+='<ul>';
                                         past+= '<li><img src =" '+ dizhi+newGoodList[i].headImg  +'"></li>';
                                         past += '<li>';
                                         past += '<span>'+'第' + newGoodList[i].periods + '期</span>';
                                         past += '【'+newGoodList[i].cityName+'】'
                                         past +=  newGoodList[i].goodName
                                         past += '</li>';
                                         past+='<li>'+newGoodList[i].purchasedDataYear + '/'+ newGoodList[i].runKilometer+'万公里</li>';
                                         past+='<li>100%</li>';
                                         past+='<li><div></div></li>';
                                         past+='<ul>';
                                         past+='</div>';
                                     }
                                       $('.pastcar').append(past);
                          }
                       })
                   }
                         // pastcar (cityname)
//--------------------------------------------------------------------------------------------------------------------------------------
                    $(document).on('click', '.shopping', function() {

                        var gid = $(this).attr('goodid');
                        var tmpGoodID = gid
                      window.localStorage.setItem('tmpGoodID',tmpGoodID);
                        location.href = 'detail.html' ;
                    });

                    //$('#youSearch').click(function(){
                    //     var periods = $('#mySearch').val();
                    //   $.ajax({
                    //        type:'post',
                    //        url: 'http://192.168.0.202:8080/heche/good/findListByPeriods',
                    //        dataType:'json',
                    //        contentType: "application/json;charset=utf-8",
                    //        data: JSON.stringify({
                    //            "cityName": "全国",
                    //            "currentPage":1,
                    //            "userNumber": userNumber,
                    //            "pageSize": 20,
                    //            "periods":periods
                    //        }),
                    //         success:function(data){
                    //             console.log(data)
                    //         }
                    //    })
                    //})
					//	更多好车推荐
                    $(document).on('click','.tuijian',function(){
                        location.href = 'wantcar.html'

                    });
                    
                    $(document).on('click','.goodcarAll',function(){
                    	location.href = 'wantcar.html'
                    	//console.log('a')
                    });
//----------------------------------------搜索期数跳转到合车列表页-----------------------------------------------------
                 
            //function checkNum(obj){
            //    if(!isNaN(obj.value)){
            //        alert("是数字类型!");   }
            //    else{
            //        alert("不是数字类型!");   }}
            //



//------------------------------------------数据没请求成功等待界面-----------------------------------------------------------------
//                document.getElementById("over").style.display = "block";
//                document.getElementById("layout").style.display = "block";
//                 if (XMLHttpReq.status == 200) {
//                     document.getElementById("over").style.display = "none";
//                     document.getElementById("layout").style.display = "none";
//
//                 }

//---------------------------------------------------------------------其他样式--------------------------------------------------
		                  function qita() {
		                 $.ajax({
		                     type: 'post',
		                     url: http +'good/meddile',
		                     dataType: "json",
		                     contentType: "application/json;charset=utf-8",
		                     data: JSON.stringify({
		                         "cityName": "全国",
		                         "state": 1,
		                         "userNumber": userNumber,
		                         "currentPage": 1,
		                         "pageSize": 4
		                     }),
		                     success: function (data) {
		                         var newGoodList = data.result.newGoodList;
		                         $('.elseP').html('');
		                        
//		                         var list= [];
              
		                         for (var i = 0; i < newGoodList.length; i++) {
		                         	 var tmpStr = '';
	                                 var c = newGoodList[i].goodId;
	                                 var div1Width = parseInt($('.div1').width()*newGoodList[i].nowPercent/100)
//	                                  list.push(div1Width);
		                             tmpStr += "<ul class='zhenhao'>";
		                             tmpStr += "<li><img src ='"+ dizhi+newGoodList[i].headImg  +"'></li>";
		                             tmpStr += "<li>";
		                             tmpStr += '<span>'+'第' + newGoodList[i].periods + '期</span>';
		                             tmpStr +=  newGoodList[i].goodName
		                             tmpStr +=  "</li>";
		                             tmpStr += '<li>'+newGoodList[i].purchasedDataYear + '/'+ newGoodList[i].runKilometer+'万公里</li>';
		                             tmpStr += "<li>";
		                             tmpStr += "100%</li>";
		                             tmpStr += "<li>";
		                             tmpStr += "<div class='div1'>";
		                             tmpStr += "<div class='div2'></div>";
		                             tmpStr += "</div>";
		                             tmpStr += "</li>";
		                             tmpStr += "<li>";
		                              tmpStr += newGoodList[i].joinPrice;
		                             tmpStr += "万</li>";
		                             tmpStr +='<li>'
		                             tmpStr += "<button class='Btn' goodD="+ c +">";
		                             tmpStr += "我要合车</button>";
		                             tmpStr +='</li>'
		                             tmpStr += "</ul>";
		                              $('.elseP').html(tmpStr);
		                             $('.zhenhao:nth-of-type('+(i+1)+')').find('.div2').css('width',div1Width);
		                         }
		                        
		                     }
		                 })
		             }
		              qita();                
			     //-------------------------------------首页其他城市跳转到我要合车------------------------------------------------------------------         
	                  $(document).on('click', '.Btn', function() {
	                        var gid = $(this).attr('goodD');
	                        var goodD = gid
	                     window.localStorage.setItem('goodD',goodD);
	                        console.log(goodD)
	                        location.href = 'detail.html' ;
	                    });
	                    

				 
				
				
//				      var cityName=sessionStorage.getItem('mocityName') ;
//				//    console.log(cityName)//杭州市
//				     function gradeChange(cityName) {
//					//判断是否有传入参数cityName
//					if(cityName) {
//						localStorage.setItem('checkText', cityName);
//						//console.log(checkText);
//						maicar(cityName);
//						tomorrow(cityName);
//						pastcar(cityName);
//						
//					} else {		
//						var checkText = $('#city').find('option:selected').text();
//						//alert(checkText); 
//						localStorage.setItem('checkText', checkText);
//						// console.log(checkText);
//						maicar(checkText);
//						tomorrow(checkText);
//						pastcar(checkText)
//					}
//				}
//				     gradeChange(cityName);
				            
//修改
                var cityName=sessionStorage.getItem('mocityName') ;
                function gradeChange(obj) {
                    if(obj){
                        cityName=$(obj).val();
                        sessionStorage.setItem('mocityName',cityName) ;
                    }
                    maicar(cityName);
                    tomorrow(cityName);
                    pastcar(cityName)
                }
