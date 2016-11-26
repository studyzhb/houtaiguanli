/**
 * Created by Administrator on 2016/11/7.
 */
                var dizhi = 'http://122.114.48.44:8080/';
                var userNumber = localStorage.getItem('userNumber');
                var periods  =  sessionStorage.getItem('periods');
                  var http ='http://122.114.48.44:8080/heche/';
           function wantcar() {
             if(periods ==null){
                 $.ajax({
                     type: 'post',
                     url:  http + 'good/meddile',
                     dataType: "json",
                     contentType: "application/json;charset=utf-8",
                     data: JSON.stringify({
                         "cityName": "全国",
                         "state": 1,
                         "userNumber": userNumber,
                         "currentPage": 1,
                         "pageSize": 2
                     }),
                     success: function (data) {
                         var newGoodList = data.result.newGoodList;
                         $('.newcarN').html('');
                       
//                         var list= [];
//                           console.log(1);
                           console.log(newGoodList.length)
                         for (var i = 0; i < newGoodList.length; i++) {
                            var tmpStr = '';
                             var c = newGoodList[i].goodId;

                             //console.log(div1Width)
//                            list.push(div1Width);
                             tmpStr += "<ul class='plus'>";
                             tmpStr += "<li><img src ='"+ dizhi+newGoodList[i].headImg  +"'></li>";
                             tmpStr += "<li>";
                             tmpStr += '<span>'+'第' + newGoodList[i].periods + '期</span>';
                             tmpStr +=  newGoodList[i].goodName
                             tmpStr +=  "</li>";
                             tmpStr += '<li>'+newGoodList[i].purchasedDataYear +'年' + '/'+ newGoodList[i].runKilometer+'万公里</li>';
                             tmpStr += "<li>";
                             tmpStr += newGoodList[i].nowPercent
                             tmpStr += "%</li>";
                             tmpStr += "<li>";
                             tmpStr += "<div class='div1'>";
                             tmpStr += "<div class='div2'></div>";
                             tmpStr += "</div>";
                             tmpStr += "</li>";
                             tmpStr += "<li>";
                              tmpStr += newGoodList[i].joinPrice;
                             tmpStr += "万</li>";
                             tmpStr += "<button class='Btn' good1="+c+">";
                             tmpStr += "我要合车</button>";
                             tmpStr += "</ul>";
                              $('.newcarN').append(tmpStr);
                             var  div1Width = parseInt($('.div1').width()*newGoodList[i].nowPercent/100)
                              $('.plus:nth-of-type('+(i+1)+')').find('.div2').css('width',div1Width);
                         }
                     }
                 })
             }
          }
                 wantcar();
                 
          function  period(){
                if(periods !=null){
                 $.ajax({
                     type: 'post',
                     url:  http + 'good/findListByPeriods',
                     dataType: "json",
                     contentType: "application/json;charset=utf-8",
                     data: JSON.stringify({
                         "cityName": "全国",
                         "periods": parseInt(periods),
                         "userNumber": userNumber,
                         "currentPage": 1,
                         "pageSize": 2
                     }),
                     success: function (data) {
                         console.log(data);
                         var newGoodList = data.result;
                         $('.newcarN').html('');
//                        var list= [];
                           for (var i = 0; i < newGoodList.length; i++) {
                         	 var Str = '';
                             var c = newGoodList[i].goodId;
                            
//                           console.log(div1Width);
//                            list.push(div2Width);
                             Str += "<ul class='PR'>";
                             Str += "<li><img src ='" + dizhi + newGoodList[i].headImg + "'></li>";
                             Str += "<li>";
                             Str += '<span>'+'第' + newGoodList[i].periods + '期</span>';
                             Str +=  newGoodList[i].goodName
                             Str +='</li>';
                             Str += '<li>'+newGoodList[i].purchasedDataYear + '年' + '/'+ newGoodList[i].runKilometer+'万公里</li>'
                             Str += "<li>";
                             Str += newGoodList[i].nowPercent
                             Str += "%</li>";
                             Str += "<li>";
                             Str += "<div class='div1'>";
                             Str += "<div class='div2'></div>";
                             Str += "</div>";
                             Str += "</li>";
                             Str += "<li>";
                             Str += newGoodList[i].joinPrice;
                             Str += "万</li>";
                             Str += "<button class='Btn' good1="+c+">";
                             Str += "我要合车</button>";
                             Str += "</ul>";
                              $('.newcarN').append(Str);
                             var  div2Width = parseInt($('.div1').width()*newGoodList[i].nowPercent/100)
                              $('.PR:nth-of-type('+(i+1)+')').find('.div2').css('width',div2Width);
                          }
                     }
                   })
                }
           }

             period()       


//           console.log(periods)


                      $(document).on('click', '.Btn', function() {
	                        var gid = $(this).attr('good1');
	                        var good1 = gid
	                        localStorage.setItem('good1',good1);
//	                        console.log(goodD)
                          localStorage.setItem('comeFrom',3);
	                        location.href = 'detail.html' ;
	                    });


//-------------------------------------------------------------------------------------------------------


       $(document).on('click', '.fenye li', function() {
       	    
       	      var that =$(this).index()+1;
       	      
              $.ajax({
                     type: 'post',
                     url:  http + 'good/meddile',
                     dataType: "json",
                     contentType: "application/json;charset=utf-8",
                     data: JSON.stringify({
                         "cityName": "全国",
                         "state": 1,
                         "userNumber": userNumber,
                         "currentPage": that,
                         "pageSize": 2
                     }),
                     success: function (data) {
                         var newGoodList = data.result.newGoodList;
                         $('.newcarN').html('');
                       
//                         var list= [];
//                           console.log(1);
                           console.log(newGoodList.length)
                         for (var i = 0; i < newGoodList.length; i++) {
                            var tmpStr = '';
                             var c = newGoodList[i].goodId;

                             //console.log(div1Width)
//                            list.push(div1Width);
                             tmpStr += "<ul class='plus'>";
                             tmpStr += "<li><img src ='"+ dizhi+newGoodList[i].headImg  +"'></li>";
                             tmpStr += "<li>";
                             tmpStr += '<span>'+'第' + newGoodList[i].periods + '期</span>';
                             tmpStr +=  newGoodList[i].goodName
                             tmpStr +=  "</li>";
                             tmpStr += '<li>'+newGoodList[i].purchasedDataYear +'年' + '/'+ newGoodList[i].runKilometer+'万公里</li>';
                             tmpStr += "<li>";
                             tmpStr += newGoodList[i].nowPercent
                             tmpStr += "%</li>";
                             tmpStr += "<li>";
                             tmpStr += "<div class='div1'>";
                             tmpStr += "<div class='div2'></div>";
                             tmpStr += "</div>";
                             tmpStr += "</li>";
                             tmpStr += "<li>";
                              tmpStr += newGoodList[i].joinPrice;
                             tmpStr += "万</li>";
                             tmpStr += "<button class='Btn' good1="+c+">";
                             tmpStr += "我要合车</button>";
                             tmpStr += "</ul>";
                              $('.newcarN').append(tmpStr);
                             var  div1Width = parseInt($('.div1').width()*newGoodList[i].nowPercent/100)
                              $('.plus:nth-of-type('+(i+1)+')').find('.div2').css('width',div1Width);
                         }
                     }
                 })
           });