/**
 * Created by Administrator on 2016/11/16.
 */

   
              
                 var userNumber =  localStorage.getItem('userNumber');
                 var goodID =localStorage.getItem('gid');
                 var chText ='';
                 var dizhi = 'http://122.114.48.44:8080';
               // var  dJ = window.localStorage.setItem('dJ',dJ);
                   var http = window.localStorage.getItem('http');
                var  dJ1 =window.localStorage.getItem('dJ');
                var goods;
                var needpaynum;
                var newStr='';
                   console.log(dJ1)
        function Purchase(){
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
                	console.log(data)
                    console.log(data.result.good);
                    goods = data.result.good;
                    /*var dingJin=null;
					var ndj = parseInt(dJ1);
					if(ndj<50){
						dingJin=3000;
					}else if(ndj>100){
						dingJin=8000;
					}else{
						dingJin=5000;
					}
					console.log(ndj)*/
					newStr=goods.nowPercent;
                    $('.boxcar').html('');
                    var detailq= '';
//                  var a = parseInt(goods.runKilometer / 10000);
//                  var b = parseInt(goods.joinPrice / 10000);
                    var c = parseInt(goods.newPrice / 10000);
                    var d =  goods.goodId;
                    detailq +='<div class="goodcarN">';
                    detailq +='<img src= " '+dizhi+ goods.headImg + '" class="detailimg">';
                    detailq +='<ul>';
                    detailq +='<li>';
                    detailq += '<span>'+'第' + goods.periods + '期</span>';
                    detailq += '【'+goods.cityName+'】'
                    detailq +=  goods.goodName
                    detailq +='</li>';
                    detailq += '<li>';
                    detailq +='<span>'+goods.purchasedDataYear + '/'+ goods.runKilometer+'万公里</span>';
                    detailq += '</li>';
                    detailq += '<li><div class="div1"><div class="div2"></div></div><span>' + goods.nowPercent+'%</span></li>';
                    detailq += '<li>' +"合车价" + dJ1 + "万"+ '</li>';
                    detailq +=  '</div>';
                    detailq +='<div class="xuanzhe">';
                    detailq +='<select class="jiaoyi " id="ct" onchange="yinCard()">';
                    detailq +='<option class="dingjiao" value="0"><span >￥'+goods.depositMoney+'万</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>定金交易</span></option>';
                    detailq +='<option class="quanjiao" value="1"><span>￥'+dJ1+'万</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>全款交易</span></option>';
                    detailq +='</select>';
                    detailq +='</div>'
                    $('.boxcar').html(detailq);
                    div3Width = parseInt($('.div1').width()*goods.nowPercent/100)
                    $('.div2').css("width", div3Width);
                    
                }

            });
        }
           Purchase();
    		//定金交易全款交易   
        	//var newStr='';
            var type=0;
             //newStr =$('#ct').find('option:selected').val();
            // console.log(newStr)
           function yinCard(){
           	
           	  chText = $('#ct').find('option:selected').val(function(){
           	  	type=this.value;          	            	  	
           	  });  
           	  
//         	  alert(chText)
        	//var cc=  window.sessionStorage.setItem('chText',chText);       	  
               //alert(chText);
               
             newStr =$('#ct').find('option:selected').val();
             
           }
           
                $(document).on('click', '.iscar', function() {
	                        var gid = $(this).attr('goodD');
	                        var goodD = gid
	                    window.sessionStorage.setItem('goodD',goodD);
	                        console.log(goodD)
	                        location.href = 'detail.html' ;
	                });
	                    
//------------------------------------------------显示隐藏点击支付之后的那些页面-----------------------------------------------------------------------
           $('#iscar').click(function(){
           	if(type==0){
           	  	needpaynum=goods.depositMoney;
           	  }else{
           	  	needpaynum = dJ1;
           	  }
           		 muan();
           		 
                 $('.mask').show();
                 $('.payment').show();
                 
                 
                 
                 
                 
                 
                 
             })
            $('#tuichu').click(function(){

                $('.mask').hide();
                $('.payment').hide()
            

            })
             $('#tWO').click(function(){
                $('.mask').hide();
          
                $('.pay').hide();

            })
              
              $('#fuY').click(function(){
                $('.mask').hide();
          
                $('.fuya').hide();

            })
     //------------------------------------------------加入那些钱的值--------------------------------------------------------------------------------------------------           
          function muan(){
//        	var cT = window.sessionStorage.getItem('chText');
            //console.log(chText)
          	$('.fu').html('');
          	var mu ='';          	
          	 mu +='<b id="yi">'+ needpaynum+'万<b>';
          	$('.fu').html(mu);
          }
       
       

        var money =localStorage.getItem('money');
//      console.log(money)
                 $('.yE').html('');
          	   var nu ='';
          	   nu +='<b id="er">'+ money+'万<b>';
          	   $('.yE').html(nu);
          	
        
        
       $(document).on('click', '#zhifu', function() {
	                 
	           var a =parseInt($('#yi').text());
          	   var b =parseInt($('#er').text())
//        	   console.log(a);
//        	   console.log(b)
              var  d = parseInt(a-b);
            window.localStorage.setItem('d',d);
//              console.log(d);
          	   var c = parseInt(b-a);
//        	   console.log(c)
	            if(c<0){
                $('.payment').hide();
                $('.pay').show();
              }
	           else{  	
	           	$('.payment').hide();
	            $('.fuya').show();
	           }
        });  
        
               var f = window.localStorage.getItem('d')
             $('.haixu').html('');
          	   var cu ='';
          	   cu +='<b>'+ f+'万<b>';
          	   $('.haixu').html(cu);
          	   
       $(document).on('click', '#qdzf', function() {
   	                 var payPwd = $('#Zzx').val();
   	                 var PWD = hex_md5(payPwd).toUpperCase();
   	                 console.log(goodID);
   	                 console.log(userNumber);
   	                 console.log(PWD);
   	                 console.log(type);
   	                  $.ajax({
		                     type: 'post',
		                     url: http + 'order/createOrder',
		                     dataType: "json",
		                     contentType: "application/json;charset=utf-8",
		                     data: JSON.stringify({
		                        "userNumber":userNumber,
								"type":parseInt(type),  //0定金 /1 全款  /2尾款
								"goodId":parseInt(goodID),  //车辆id
								"buyCount":10, //购买份数
								"location":1,      //下单来源 0 APP/1 PC
								"payStyle":3,      //付款方式：0银联 /1支付宝 /2微信 /3余额
								"payPwd":PWD//用户支付密码
		                     }),
		                     success:function(data){
		                     	console.log(data)
		                     	
		                     }
   	
   	          })
      })