/**
 * Created by Administrator on 2016/11/12.
 */
                 //详情数据...
            var userNumber =  localStorage.getItem('userNumber');
            var goodID     =  window.localStorage.getItem('tmpGoodID');
            var goodID2    =  window.localStorage.getItem('goodD');
            var goodID3    =  window.localStorage.getItem('good1');
            var dizhi = 'http://122.114.48.44:8080';
            var goods;
             var dJ;
            var  dingjin = 0;
            var div1Width = 0;
            var http = window.localStorage.getItem('http');
         
      
////var value  = $('.mon').val()
////var mon = $('.mon');
//// mon.val =mon.value;
////
////  mon.blur(function () {
////      mon.is(mon.val)
////      alert(mon.val());
////  })

         function detail2(){
	
             $.ajax({
                 type: 'post',
                 url: http+'good/findGoodDetail',
                 dataType: 'json',
                 contentType: "application/json;charset=utf-8",
                 data: JSON.stringify({
                     'userNumber': userNumber,
                     'goodId': goodID2
                 }),
                  success:function (data){
                      //console.log(data);
                      //console.log(data.result.good);
                      goods = data.result.good;
                      function show(){
                          var now=new Date();
                          var nowtime=now.getTime();
                          var biyeDate=new Date(goods.endTime);
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
                          $('.daojishi').html(_date+":"+_hour+":"+_minutes+":"+_seconds);
                      }
                      show();
                      setInterval(show,1000);


                      $('.detailTop').html('');
                      var hche = '';
                       hche +='<p>首页>';
                       hche +='<span>我要合车></span>';
                       hche +='<b>'+'第' + goods.periods + '期</b>';
                       hche += '<span>'+ goods.goodName +'</span>' ;
                       hche +='</p>';


                      $('.detailbig').html('');
                      var detailq= '';
////                       var a = parseInt(goods.runKilometer / 10000);
////                       var b = parseInt(goods.joinPrice / 10000);
////                       var c = parseInt(goods.newPrice / 10000);
                           var d =  goods.goodId;


                      
                         detailq +='<div class="detailN">';
                         detailq +='<img src= " '+dizhi+ goods.headImg + '" class="detailimg">';
                         detailq +='<ul>';
                         detailq +='<li>';
                         detailq += '<span>'+'第' + goods.periods + '期</span>';
                         detailq +=  '【'+goods.cityName+'】'
                         detailq +=  goods.goodName
                         detailq +='</li>';
                         detailq += '<li>' +"舒适型" + '</li>';
                         detailq += '<li>';
                         detailq +='<span>'+goods.purchasedDataYear + '年'+ '/'+ goods.runKilometer+'万公里</span>';
                         detailq += '<span>' + "新车指导价" + '</span>';
                         detailq += '<span>' + goods.newPrice  + '万</span>';
                         detailq += '</li>';
                         detailq += '<li>' +"合车价" + goods.joinPrice + "万"+ '<a class="concern" gid = '+d+'>关注</a></li>';
                         detailq += '<li><div class="div1"><div class="div2"></div></div><span>' +goods.nowPercent +'%</span></li>';
                         detailq += '<li>'+"预计销售价"+goods.newPrice+ "万"+ '</li>';
                         detailq += '<li><img src="images/img1 (6).png"> '+"合车剩余时间:"+'<span class="daojishi"></span>';
                         detailq += '<span class="jXZ" style="float: right">进行中</span></li>';
                         detailq += '<li><span>';
                         detailq +=  '5</span>';
                         detailq +=  '位支持者</li>';
                         detailq +=  '</ul>';
                         detailq +=  '<dl>';
                         detailq +=  '<li  class="dJ">￥0万</li>';
                         detailq +=  '<li>购买</li>'
                         detailq +=  '<li class="dianji"><div><a href="#" id="min">';
                         detailq +=  '-</a></div>';
                         detailq += '<div><input type="text" value="0" class="mon" name="mon" ><a>%</a></div>';
                         detailq += '<div><a href="#" id="plus"> '
                         detailq +=  '+</a></div></li></dl>';
                         detailq +=  '<div class="hecheT"><button class="heche" goodiid='+d+'>我要合车</button></div>';
                         detailq +=  '</div>';
                    
                       $('.detailbig').html(detailq);
                        div1Width = parseInt($('.div1').width()*goods.nowPercent/100)
//                      console.log(div1Width)
                       $('.div2').css("width", div1Width);
                       $('.detailTop').html(hche);
                      
                  }

             })
           }
      
       detail2()

       
       
       
       //---------------------------------------------------------合车页进来的数据-----------------------------------------------------------
       
      function detail3(){

             $.ajax({
                 type: 'post',
                 url: http +'good/findGoodDetail',

                 dataType: 'json',
                 contentType: "application/json;charset=utf-8",
                 data: JSON.stringify({
                     'userNumber': userNumber,
                     'goodId': goodID3
                 }),
                  success:function (data){
                      //console.log(data);
                      //console.log(data.result.good);
                      goods = data.result.good;

                      function show(){
                          var now=new Date();
                          var nowtime=now.getTime();
                          var biyeDate=new Date(goods.endTime);
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
                          $('.daojishi').html(_date+":"+_hour+":"+_minutes+":"+_seconds);
                      }
                      show();
                      setInterval(show,1000);


                      $('.detailTop').html('');
                      var hche = '';
                       hche +='<p>首页>';
                       hche +='<span>我要合车></span>';
                       hche +='<b>'+'第' + goods.periods + '期</b>';
                       hche += '<span>'+ goods.goodName +'</span>' ;
                       hche +='</p>';

           
                      $('.detailbig').html('');
                 
             
                   
                     
                         var detailq= '';
//////                       var a = parseInt(goods.runKilometer / 10000);
//////                       var b = parseInt(goods.joinPrice / 10000);
//////                       var c = parseInt(goods.newPrice / 10000);
                         var d =  goods.goodId;
                         detailq +='<div class="detailN">';
                         detailq +='<img src= " '+dizhi+ goods.headImg + '" class="detailimg">';
                         detailq +='<ul>';
                         detailq +='<li>';
                         detailq += '<span>'+'第' + goods.periods + '期</span>';
                         detailq +=  '【'+goods.cityName+'】'
                         detailq +=  goods.goodName
                         detailq +='</li>';
                         detailq += '<li>' +"舒适型" + '</li>';
                         detailq += '<li>';
                         detailq +='<span>'+goods.purchasedDataYear + '年'+ '/'+ goods.runKilometer+'万公里</span>';
                         detailq += '<span>' + "新车指导价" + '</span>';
                         detailq += '<span>' + goods.newPrice  + '万</span>';
                         detailq += '</li>';
                         detailq += '<li>' +"合车价" + goods.joinPrice + "万"+ '<a class="concern" gid = '+d+'>关注</a></li>';
                         detailq += '<li><div class="div1"><div class="div2"></div></div><span>' +goods.nowPercent +'%</span></li>';
                         detailq += '<li>'+"预计销售价"+goods.newPrice+ "万"+ '</li>';
                         detailq += '<li><img src="images/img1 (6).png"> '+"合车剩余时间:"+'<span class="daojishi"></span>';
                         detailq += '<span class="jXZ" style="float: right">进行中</span></li>';
                         detailq += '<li><span>';
                         detailq +=  '5</span>';
                         detailq +=  '位支持者</li>';
                         detailq +=  '</ul>';
                         detailq +=  '<dl>';
                         detailq +=  '<li  class="dJ">￥0万</li>';
                         detailq +=  '<li>购买</li>'
                         detailq +=  '<li class="dianji"><div><a href="#" id="min">';
                         detailq +=  '-</a></div>';
                         detailq += '<div><input type="text" value="0" class="mon" name="mon" ><a>%</a></div>';
                         detailq += '<div><a href="#" id="plus"> '
                         detailq +=  '+</a></div></li></dl>';
                         detailq +=  '<div class="hecheT"><button class="heche" goodiid='+d+'>我要合车</button></div>';
                         detailq +=  '</div>';
                         
                         var monValue = $('.mon').val();
                         console.log(monValue)
                      
                       $('.detailbig').html(detailq);
                        div2Width = parseInt($('.div1').width()*goods.nowPercent/100)
                       $('.div2').css("width", div2Width);
                       $('.detailTop').html(hche);
                      

                  }

             })
           }
      
    detail3()

       
       
//------------------------------------------------------------点击加input值------------------------------------------------
//                         
//
//              $(document).on('click', '#plus', function() {
//                      
//                  var value = parseInt($('.mon').val())+5
//                      $(".mon").val(value)
//                      $(".dJ").html('￥'+parseInt(goods.joinPrice*value/100+'万'))
//                      var  dJ  = $('.dJ').html();
//                   console.log(dJ);
//                   localStorage.setItem('dJ',dJ);
//
//                  })
//              $(document).on('click', '#min', function() {
//                  var value = parseInt($('.mon').val())-5
//                  $(".mon").val(value)
//                  $(".dJ").html('￥'+parseInt(goods.joinPrice*value/100+'万'))
//                  var dJ  = $('.dJ').html();
//              localStorage.setItem('dJ',dJ);
//                console.log(dJ)
//              })

						
		                $(document).on('click', '#plus', function() {
		                	var value = parseInt($('.mon').val());
		                	if(value+preB>=100){
		                		alert('购买分数超出，请重新选择')
		                		value=0
		                	}
		                   // var value = parseInt($('.mon').val())+5;
//		                   console.log(value)
                            
		                    if(value==100){
		                    	$(".mon").val(100);
		                    	
		                    }else{                   
		                    	value=value+5; 
		                    	$(".mon").val(value);
		                    }                       
		                        $(".dJ").html('￥'+parseInt(goods.joinPrice*value/100)+'万')
//		                          dJ  = $('.dJ').html();
                                  //alert(dJ);
                                  dJ  = goods.joinPrice*value/100;
                                window.localStorage.setItem('dJ',dJ);
                               window.sessionStorage.setItem('value',value);
		                    });


		//------------------------------------------------------------点击减input值------------------------------------------------
		               
		                $(document).on('click', '#min', function() {               	
		                   // var value = parseInt($('.mon').val())-5
		                   var value= parseInt($('.mon').val());         
		                    window.sessionStorage.setItem('value',value);
		                   if(value==0){                  	
		                    	$(".mon").val(0);
		                   }else{                     	
		                    	value=value-5; 
		                    	$(".mon").val(value);
		                    }
		                                          
		                    $(".dJ").html('￥'+parseInt(goods.joinPrice*value/100)+'万')
		                     dJ  = $('.dJ').html();
                            //alert(dJ);
                              dJ = goods.joinPrice*value/100;
                            window.localStorage.setItem('dJ',dJ);
		                })


			  $(document).on('blur', '.mon', function() { 
				var value=parseInt($('.mon').val());
				if(value+preB>100){
					alert('购买分数超出，请重新选择')
					value=0
				}
			})
//-----------------------------------------去付款-------------------------------------------------
                $(document).on('click', '.heche', function() {
					var hevalue = parseInt(sessionStorage.getItem('value'))
					
					console.log(preB)
                    if (hevalue==0){
                        alert('请输入要购买的数量')
                    }if(hevalue+preB>100){
		                		alert('购买分数超出，请重新选择')
		                		
		                	}else
                    {
                    var gid = $(this).attr('goodiid');
                    localStorage.setItem('gid',gid);
                    window.location.href = 'Determine.html' ;
                    }
                });

					

            //..................添加关注列表.........................

                    $(document).on('click', '.concern', function() {
                        var concernID = $(this).attr('gid');
                          //console.log(concernID);

                            $.ajax({
                                type: 'post',
                                url: http + 'user/addUserCollect',
                                dataType: 'json',
                                contentType: "application/json;charset=utf-8",
                                data: JSON.stringify({
                                    'userNumber': userNumber,
                                    "goodId":concernID
                                }),
                                success:function(data){
                                     alert(data.msg);

                                }
                            })
                    });


      // -----------------------------------------合车记录-----------------------------------------------
                    function record(){
                        $.ajax({
                            type: 'post',
                            url: http + 'good/findGoodDetail',
                            dataType: 'json',
                            contentType: "application/json;charset=utf-8",
                            data: JSON.stringify({
                                'userNumber': userNumber,
                                'goodId': goodID
                            }),
                            success:function (data){
                                //console.log(data);
                                //console.log(data.result.orderList);
                                var orderList = data.result.orderList;
                                
                                $('.record').html('');
                                var JL = '';
                                for (var i=0;i<orderList.length;i++){
                                	 var money = parseFloat(orderList[i].money);
                                    JL +='<li>';
                                    JL +='<p>'+ orderList[i].nickName +'</p>'
                                    JL +='<p>'+ money +'万元</p>'
                                    JL +='<p>'+ orderList[i].payTime +'</p>'
                                    JL +='</li>';
                                }

                                $('.record').html(JL);
                            }

                        });
                    }
                    record();



//控制百分比
        var preB = null;
          function detail(){
             $.ajax({
                 type: 'post',
                 url: http+'good/findGoodDetail',

                 dataType: 'json',
                 contentType: "application/json;charset=utf-8",
                 data: JSON.stringify({
                     'userNumber': userNumber,
                     'goodId': goodID
                 }),
                  success:function (data){
                      //console.log(data);
                      //console.log(data.result.good);
                      goods = data.result.good;
						preB = parseInt(goods.nowPercent);
//						console.log(preB)
                       //console.log(data.result.good)

                      function show(){
                          var now=new Date();
                          var nowtime=now.getTime();
                          var biyeDate=new Date(goods.endTime);
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
                          $('.daojishi').html(_date+":"+_hour+":"+_minutes+":"+_seconds);
                      }
                      show();
                      setInterval(show,1000);

                      $('.detailTop').html('');
                      var hche = '';
                       hche +='<p>首页>';
                       hche +='<span>我要合车></span>';
                       hche +='<b>'+'第' + goods.periods + '期</b>';
                       hche += '<span>'+ goods.goodName +'</span>' ;
                       hche +='</p>';

                      $('.detailbig').html('');
                      var detailq= '';
                   
                         var d =  goods.goodId;
                       
                         detailq +='<div class="detailN">';
                         detailq +='<img src= " '+dizhi+ goods.headImg + '" class="detailimg">';
                         detailq +='<ul>';
                         detailq +='<li>';
                         detailq += '<span>'+'第' + goods.periods + '期</span>';
                         detailq += '【'+goods.cityName+'】'
                         detailq +=  goods.goodName
                         detailq +='</li>';
                         detailq += '<li>' +"舒适型" + '</li>';
                         detailq += '<li>';
                         detailq +='<span>'+goods.purchasedDataYear + '年'+ '/'+ goods.runKilometer+'万公里</span>';
                         detailq += '<span>' + "新车指导价" + '</span>';
                         detailq += '<span>' + goods.newPrice  + '万</span>';
                         detailq += '</li>';
                         detailq += '<li>' +"合车价" + goods.joinPrice + "万"+ '<a class="concern" gid = '+d+'>关注</a></li>';
                         detailq += '<li><div class="div1"><div class="div2"></div></div><span>' +goods.nowPercent +'%</span></li>';
                         detailq += '<li>'+"预计销售价"+goods.estimatePrice+ "万"+ '</li>';
                         detailq += '<li><img src="images/img1 (6).png"> '+"合车剩余时间:"+'<span class="daojishi"></span>';
                         detailq += '<span class="jXZ" style="float: right">进行中</span></li>';
                         detailq += '<li><span>';
                         detailq +=  '5</span>';
                         detailq +=  '位支持者</li>';
                         detailq +=  '</ul>';
                         detailq +=  '<dl>';
                         detailq +=  '<li  class="dJ">￥0万</li>';
                         detailq +=  '<li>购买</li>'
                         detailq +=  '<li class="dianji"><div><a href="#" id="min">';
                         detailq +=  '-</a></div>';
                         detailq += '<div><input type="text" value="0" class="mon" name="mon" ><a>%</a></div>';
                         detailq += '<div><a href="#" id="plus"> '
                         detailq +=  '+</a></div></li></dl>';
                         detailq +=  '<div class="hecheT"><button class="heche" goodiid='+d+'>我要合车</button></div>';
                         detailq +=  '</div>';  
                        $('.detailbig').html(detailq);
                         div3Width = parseInt($('.div1').width()*goods.nowPercent/100)
                         $('.div2').css("width", div3Width);
                        $('.detailTop').html(hche);
                      
                     }
                         
             })
             } 
       
       detail()
















                     //----------------------------------------详情大图片--------------------------------------------------

                                function detailImg(){
                                    $.ajax({
                                        type: 'post',
                                        url:  http + 'good/findGoodDetail',
                                        dataType: 'json',
                                        contentType: "application/json;charset=utf-8",
                                        data: JSON.stringify({
                                            'userNumber': userNumber,
                                            'goodId': goodID
                                        }),
                                        success:function (data){
                                            var goodImgList = data.result.goodImgList;
                                            //console.log(goodImgList);
                                            $('.carimgaa').html('');
                                            var img = '';
                                            for (var i=0;i<goodImgList.length;i++){
                                                img +='<li><img src="'+dizhi+goodImgList[i].imgUrl+'"></li>'
                                            
                                            }
                                            $('.carimgaa').html(img);
                                        }

                                    });
                                }
                          detailImg();
 

                    
   //-------------------------------------------------------------用过之后删除保存值----------------------------------------------------------------------------------------                 
                    
                     sessionStorage.removeItem('tmpGoodID');
                     sessionStorage.removeItem('goodD');
                     sessionStorage.removeItem('good1');
             