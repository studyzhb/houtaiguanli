/**
 * Created by Administrator on 2016/11/8.
 */
       $(function(){
      var dizhi = 'http://122.114.48.44:8080';
      var userNumber = localStorage.getItem('userNumber');
      var endtime = new Array();
     var http = window.localStorage.getItem('http');



   $('#usid li ').click(function(){
      var that = $(this).index();
       $('.dis').removeClass('dis').addClass('undis');
       $('.undis').eq(that).removeClass('undis').addClass('dis');

       $(this).siblings('li').removeClass('usidBG')
       $(this).addClass('usidBG');
       $(this).find('a').css('color','white');
       $(this).siblings().find('a').css('color','black');
       $(this).find('.tubiao2').show();
       $(this).siblings().find('.tubiao2').hide();
       $(this).find('.tubiao1').hide();
       $(this).siblings().find('.tubiao1').show();
       $(this).find('.jiantou1').show();
       $(this).siblings().find('.jiantou1').hide();
       $(this).find('.jiantou').hide();
       $(this).siblings().find('.jiantou').show();
})
   
        if(sessionStorage.getItem('ifClick')){
               $('#usid li').eq(6).click();
               sessionStorage.removeItem('ifClick');
           }
   
// 
//         if(sessionStorage.getItem('ifClick')){
//             $('#usid li').eq(2).click();
//             sessionStorage.removeItem('ifClick');
//         }
//         
//        if(sessionStorage.getItem('ifClick')){
//             $('#usid li').eq(2).click();
//             sessionStorage.removeItem('ifClick');
//         }
// 
//         if(sessionStorage.getItem('ifClick')){
//             $('#usid li').eq(4).click();
//             sessionStorage.removeItem('ifClick');
//         }
   
   
   
   
   
   
   
   

  $('.keepon li ').click(function(){
    var that = $(this).index();
    $('.xianshi').removeClass('xianshi').addClass('yingchang');
    $('.yingchang').eq(that).removeClass('yingchang').addClass('xianshi');
      $(this).siblings().find('a').removeClass('xiahuaxian') ;
      $(this).find('a').addClass('xiahuaxian');
})
  $('.muchT li ').click(function(){
    var that = $(this).index();
    $('.ismuch').removeClass('ismuch').addClass('nomuch');
    $('.nomuch').eq(that).removeClass('nomuch').addClass('ismuch');

      $(this).siblings().find('a').removeClass('xiahuaxian') ;
      $(this).find('a').addClass('xiahuaxian');

  })


  //-----------------------------------------------------------------提现充值界面隐藏-----------------------------------------------------------------------

                 $(document).on('click','#chongzhi',function(){
                        $('.tixian').show();  
                        $('.qBao').hide(); 
                   })
                 $(document).on('click','#tixian',function(){
                        $('.tixian').show();  
                        $('.qBao').hide(); 
                     })







    
              var dizhi = 'http://192.168.0.202:8080';

           //---------------------------个人中心用户名余额-----------------------------------------

            function userimg(){
                var headImg = localStorage.getItem('headImg');
                var nickname = localStorage.getItem('nickname');
                var money = localStorage.getItem('money');
//              var Money = parseFloat(money/10000);

                $.ajax({
                    type: 'post',
                    url: http + 'wallet/findWalletByUserId',
                    dataType: 'json',
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify({
                        "userNumber":userNumber,

                    }),
                    success:function(data){
                        //console.log(data)
                        var result =data.result;
                       var money = result.amont
                        //console.log(money);
                        localStorage.setItem('money',money);
                    }

                })


                $('.username').html('');
                var us ='';
                us += '<img src="'+dizhi+headImg+'"  class="Gg"/>';
                us += '<span class="uID">';
                us += '<a>' + nickname + '</a>';
                us += '</span>';
                us += '<p>余额:<span>'+ money+'万</span></p>';

                $('.username').append(us);
            }
           userimg ();
      //---------------------------------------获取用户名，修改的地方-----------------------------------------------------
                   var nickname = localStorage.getItem('nickname');
                   $('.XGYH').html('');
                   var inp = ''
              
                   inp +='<label>昵称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>';
                   inp +=' <input type="text" id="name" value='+ nickname +'>';
                   inp +='<button id="BT" >修改</button><button>取消</button>';
                   $('.XGYH').html(inp);
      
      
      
          //-----------------------------修改名称---------------------------------
          　$('#BT').click(function(){
                var name = $('#name').val();
               if(name !=''){
                       $.ajax({
                           type: 'post',
                           url: http + 'user/updateUserNickName',
                           dataType: 'json',
                           contentType: "application/json;charset=utf-8",
                           data: JSON.stringify({
                               'userNumber': userNumber,
                               "nickName":name
                           }),
                           success:function(data){
                              alert('修改成功，重新登录显示')

                           },
                           error:function(){
                               alert('修改失败，登录超时')
                           }
                       })
               }
           });

           //-----------------------------修改密码---------------------------------
                     $('#pwBT').click(function(){
                        window.location.href = 'Getclose.html';
                     })
                        
                         $('#phoneBT').click(function(){
                        window.location.href = 'revisionsPhone.html';
                     })
          //------------------------- 关注的页面数据 -------------------------------------------
                       function concern() {
                           $.ajax({
                               type: 'post',
                               url: http + 'user/selectGoodByUserCollect',
                               dataType: 'json',
                               contentType: "application/json;charset=utf-8",
                               data: JSON.stringify({
                                   "userNumber":userNumber,
                                   "currentPage":1,
                                   "pageSize":5
                               }),
                                  success:function(data){
                                   //console.log(data);
                                  var result = data.result;
                                   $('.concern').html('');
                                   var cern = '';
                                    var len =result.length;
                                  if (len>0)  {
                                      for (var i=0;i< result.length;i++){
                                          var a = parseFloat(result[i].runKilometer / 10000);
                                          var b = parseFloat(result[i].joinPrice / 10000);
                                          var c = result[i].goodId;
                                          cern += '<div class="big">';
                                          cern += '<img src =" '+ dizhi+result[i].headImg  +'">';
                                          cern += '<ul>';
                                          cern += '<li>';
                                          cern += '<span>'+'第' + result[i].periods + '期</span>';
                                          cern +=  result[i].goodName
                                          cern +=  '<img src ="img/tubiao%20(14).png"  giD='+c+' class="quguan">';
                                          cern += '<li>'+result[i].purchasedDataYear +'年' + '/'+ a+'万公里</li>';
                                          cern +=  '<li><div class="div1"><div class="div2"></div></div><span>95%</span></li>';
                                          cern +=  '<li><span>合车价'+  b + '万</span><button>我要合车》</button></li></ul></div>';
                                      }
                                      $('.concern').html(cern);
            
                                  }
                                  }
                           })
                       }
                      concern()


           //-----------------------------------取消关注-------------------------------------
                       $(document).on('click', '.quguan', function() {
                           var concernID = $(this).attr('giD');

                           $.ajax({
                               type: 'post',
                               url: http + 'user/delUserCollect',
                               dataType: 'json',
                               contentType: "application/json;charset=utf-8",
                               data: JSON.stringify({
                                   "userNumber":userNumber,
                                    "goodId" :concernID
                               }),
                               success:function(data){
                                       alert(data.msg);
                               },
                               error:function() {
                                   alert('取消失败了');
                               }
                           })
                       })

           //查询订单列表..........................进行中------------------------------
                    function ongoing(){
                        $.ajax({
                            type: 'post',
                            url: http + 'order/selectOrderList',
                            dataType: 'json',
                            contentType: "application/json;charset=utf-8",
                            data: JSON.stringify({
                                "userNumber":userNumber,
                                "state":1,
                                "currentPage":1,
                                "pageSize":3
                            }),
                            success:function(data){
                                 //console.log(data)
                                var result = data.result;
                                $('.jingxing').html('');
                              
                                var len =result.length;
//                                var list= [];
                                for (var i=0;i< result.length;i++){
                                var jx = '';
                                 var div1Width = parseInt($('.div1').width()*result[i].nowPercent/100)
                                 console.log(result[i].nowPercent)                                 
                                 console.log($('.div1').width())
                                 console.log(div1Width)
//                               list.push(div1Width);
                               endtime[i] = result[i].endTime;
                                show ()
                               var c = result[i].goodId
                                jx += '<div class="kong">';
                                jx += '<ul>';
                                jx += '<li><span>'+'第' + result[i].periods + '期</span>';
                                jx +=  result[i].goodName;
                                jx +=  '</li>' ;
                                jx += '<li>'+result[i].purchasedDataYear +'年' + '/'+ result[i].runKilometer+'万公里</li>';
                                jx += '<li><div class="div1"><div class="div2"></div></div>'
                                jx += '<span>'+ result[i].nowPercent +'%</span></li>';
                                jx +=  '<li><img src="images/img1%20(6).png">合车剩余时间：';
                                jx +=  '<span class="zzz"></span></li>';
                                jx += '</ul>';
                                jx += '<div class="heche">';
                                jx += '<p>合车价'+  result[i].joinPrice + '万</p>';
                                jx +=  '<span>预计销售价'+ result[i].estimatePrice +'万</span>';
                                jx +=  '</div>';
                                jx +=  '</div>';
                                 $('.jingxing').html(jx);
                                 $('.kong:nth-of-type('+(i+1)+')').find('.div2').css('width',div1Width);
                                }
                                  
                                    
                                }
                          })
                     }
             ongoing();



                                 
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














           //查询订单列表----------------------------------代付款-------------------------------------
               function behalf (){
                   $.ajax({
                       type: 'post',
                       url: http + 'order/selectOrderList',
                       dataType: 'json',
                       contentType: "application/json;charset=utf-8",
                       data: JSON.stringify({
                           "userNumber":userNumber,
                           "state":0,
                           "currentPage":1,
                           "pageSize":5
                       }),
                       success:function(data){
                           //console.log(data)
                           var result = data.result;
                           //console.log(data.result);
                           $('.daifukuang').html('');
                           
                           var len =result.length;
                           for (var i=0;i< result.length;i++){
                           	      var dfk = '';
                                 endtime[i] = result[i].endTime;
                                 yixi()
                               var div2Width = parseInt($('.div1').width()*result[i].nowPercent/100)
                               var c = result[i].goodId;
                               dfk += '<ul class="FK">';
                               dfk += '<li><span>'+'第' + result[i].periods + '期</span>';
                               dfk +=  result[i].goodName;
                               dfk +=  '</li>' ;
                               dfk += '<li>'+result[i].purchasedDataYear +'年' + '/'+ result[i].runKilometer+'万公里</li>';
                               dfk += '<li><div class="div1"><div class="div2"></div></div>';
                               dfk +=  '<span>' +result[i].nowPercent +'%</span></li>';
                               dfk +=  '<li><img src="images/img1%20(6).png">合车剩余时间：';
                               dfk +=  '<span class="qqq"></span></li>';
                               dfk += '</ul>';
                               dfk += '<div class="daifu">';
                               dfk += '<p>合车价'+  result[i].joinPrice + '万</p>';
                               dfk +=  '<span>预计销售价'+ result[i].estimatePrice +'万</span>';
                               dfk +=  '<button class="fukuan">去付款</button>';
                               dfk +=  '</div>';
                                $('.daifukuang').html(dfk);
                                $('.FK:nth-of-type('+(i+1)+')').find('.div2').css('width',div2Width);
                           }
                          
                         
                       }
                   })
               }
               behalf ();

                         function yixi(){
                        function yixi1 (){
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
                                $('.qqq').eq(j).html(_date+":"+_hour+":"+_minutes+":"+_seconds);
                                //console.log(_date+":"+_hour+":"+_minutes+":"+_seconds);
                            }
                        }
                        yixi1();
                        setInterval(yixi1,1000);
                    }

















           //查询订单列表----------------------------------已结束-------------------------------------

               function ended (){
                   $.ajax({
                       type: 'post',
                       url: http + 'order/selectOrderList',
                       dataType: 'json',
                       contentType: "application/json;charset=utf-8",
                       data: JSON.stringify({
                           "userNumber":userNumber,
                           "state":2,
                           "currentPage":1,
                           "pageSize":5
                       }),
                       success:function(data){
                           //console.log(data)
                           var result = data.result;
                           $('.yijieshu').html('');
                           var yjs = '';
                           var len =result.length;
                           for (var i=0;i< result.length;i++){
                             
                               var c = result[i].goodId;
                               yjs += '<ul>';
                               yjs += '<li><span>'+'第' + result[i].periods + '期</span>';
                               yjs +=  result[i].goodName;
                               yjs +=  '</li>' ;
                               yjs += '<li>'+result[i].purchasedDataYear +'年' + '/'+ result[i].runKilometer+'万公里</li>';
                               yjs += '<li><div class="div1"><div class="div2"></div></div><span>100%</span></li>';
                               yjs += '</ul>';
                           }
                           $('.yijieshu').html(yjs);
                       }
                   })
               }
               ended ();
              //--------------------------------------------------查询交易记录-----------------------------------------------------
                   function inquiries (){
                       $.ajax({
                           type: 'post',
                           url: http + 'wallet/findBillById',
                           dataType: 'json',
                           contentType: "application/json;charset=utf-8",
                           data: JSON.stringify({
                               "userNumber":userNumber,
                               "currentPage":1,
                               "pageSize":5
                           }),
                           success:function(data){
                               //console.log(data)
                               var result = data.result;
                               $('.trades').html('');
                               var chaxun = '';
                               for (var i=0;i< result.length;i++){
                                   var billId = result[i].billId ;
                                   chaxun += '<ul>';
                                   chaxun += '<li><img src="img/tubiao%20(5).png">';
                                   chaxun += '<span>'+ result[i].money +'</span>';
                                   chaxun += '<span>'+ result[i].billNum +'</span>';
                                   chaxun += '<span>'+ result[i].createTime +'</span>';
                                   chaxun += '<span><a href="#" class="Move" billId='+billId +'>删除</a></span>';
                                   chaxun +=  '</li>' ;
                                   chaxun += '</ul>';
                               }
                               $('.trades').html(chaxun);
                           }
                       })
                   }
                inquiries ();
                //-----------------------------------------------------------删除交易记录------------------------------------------------------------
              $(document).on('click','.Move',function(){
                         var billId = $(this).attr('billId');
                          var billid = parseInt(billId)
                           $.ajax({
                               type: 'post',
                               url: http + 'wallet/delBillById',
                               dataType: 'json',
                               contentType: "application/json;charset=utf-8",
                               data: JSON.stringify({
                                   "userNumber":userNumber,
                                   "billId":billid
                               }),
                               success:function(data){
                                 console.log(data)
                               },
                                error:function(){
                                    alert('删除失败');
                                }
                           })
                   })

              $('.Move').click(function(){
                   $(this).parent().parent().remove();

               })

           //------------------------------------添加银行卡---------------------------------------

             $('#TJcard').click(function(){
                 $('.mask').show();
                 $('.flavouredcard').show()
             })
            $('#TCcard').click(function(){

                $('.mask').hide();
                $('.flavouredcard').hide()

            })
            $('#Tcard').click(function(){
               var card = $('#card').val();
               var cardnumber = $('#cardnumber').val();
               var phone = $('#phone').val();
               var financed =$('#financed').val();
                  $.ajax({
                      type: 'post',
                      url: http + 'wallet/addUserBank',
                      dataType: 'json',
                      contentType: "application/json;charset=utf-8",
                      data: JSON.stringify({
                          "userNumber":userNumber,
                          "mobile":phone,
                          "number":cardnumber,
                          "user":card,
                          "bankName":"农业银行"
                      }),
                    success:function(data){
                        alert(data.msg);

                    }
　　　　　　　　})
          })
        //---------------------------------设置用户支付密码--------------------------------
          
          
          

					 $('.sure').click(function(){
//						console.log('a')
						var zhiMi=$('#zhiMi').val();
			            var zhim =hex_md5(zhiMi).toUpperCase();
						$.ajax({
                            type: 'post',
                            url: http + 'wallet/setUserPaypwd',
                            dataType: 'json',
                            contentType: "application/json;charset=utf-8",
                            data: JSON.stringify({
                                "userNumber":userNumber,
                                "payPwd":zhim                          
                            }),
                        		success:function(data){
                                alert(data.msg)
                                console.log(data);
							}

           			})
	         })
                        






         


//---------------------------------------------------车辆认证-------------------------------------------------------------------



                           function qualification (){
                               $.ajax({
                                   type: 'post',
                                   url: http + 'user/findUserAuthenInfo',
                                   dataType: 'json',
                                   contentType: "application/json;charset=utf-8",
                                   data: JSON.stringify({
                                       "userNumber": userNumber,
                                   }),
                                   success:function(data){
//                                   console.log(data);
                                       var result =data.result;
                                      var renzheng = '';
                                       $('.personalRight').html('');
                                       renzheng += '<ul>';
                                       renzheng += '<li><lable>联系人姓名</lable><input type="text" value='+ result.realName+ '><img src="images/renzheng.png" class="liuliu"></li>';
                                       renzheng += '<li><lable>车商名称&nbsp;</lable><input type="text" value='+ result.storeName+ '><img src="images/renzheng.png" class="liuliu"></li>';
                                      // renzheng += '<li><lable>门店照片&nbsp;</lable><input type="text"><img src="images/renzheng.png" class="liuliu"></li>';
                                       renzheng += '<li><lable>门店地址&nbsp;</lable><input type="text" value='+ result.storeAddress+ '><img src="images/renzheng.png" class="liuliu"></li>';
                                    //   renzheng += '<li><lable>营业执照&nbsp;</lable><input type="text" ><img src="images/renzheng.png" class="liuliu"></li>';
                                       renzheng += '<li><lable>身份证&nbsp;&nbsp;&nbsp;&nbsp;</lable><input type="text" value='+ result.cardId+ '><img src="images/renzheng.png" class="liuliu"></li>';
                                       renzheng += '<li><lable>联系电话&nbsp;</lable><input type="text" value='+ result.code+ '><img src="images/renzheng.png" class="liuliu"></li>';
                                       renzheng += '</ul>';
                                       $('.personalRight').html(renzheng);

                                   }
                               })

                     }
                       qualification ();


//--------------------------------------------------------------查询银行--------------------------------------------------------------------------




              function chaxun(){
                               $.ajax({
                                   type: 'post',
                                   url: http + 'wallet/selectBankByUserId',
                                   dataType: 'json',
                                   contentType: "application/json;charset=utf-8",
                                   data: JSON.stringify({
                                       "userNumber": userNumber,
                                   }),
                                   success:function(data){
//                                   console.log(data);
                                       var result =data.result;
                                       //console.log(result);
                                     $('.credit').html('');
                                     var cred = '';
                                     for(var i=0;i<result.length;i++){
                                         var bankid = result[i].bankId;
                                          //console.log(bankid)
                                     	cred +='<li>'
                                     	cred +='<span>'+result[i].bankName +'</span>'; 
                                     	cred +='<span>'+ result[i].bankNumber +'</span>';
                                     	cred +='<a href="#" class="removeK" bankId='+bankid+'>删除</a></li>';
                                     	
                                     }
                                       $('.credit').html(cred);
                                  }
                               })

                     }
                       chaxun ();


                 //---------------------------------------删除银行卡---------------------------------------
             $   (document).on('click', '.removeK', function() {
                             var bankid = $(this).attr('bankid');
                             var bankID = bankid
                         $.ajax({
                             type: 'post',
                             url: http + 'wallet/deleteBankById',
                             dataType: 'json',
                             contentType: "application/json;charset=utf-8",
                             data: JSON.stringify({
                                 "userNumber":userNumber,
                                 "bankId":bankID
                             }),
                         success:function(data){
                          alert(data.msg);
                          location.reload(true)
                 }
             })
          })
       })