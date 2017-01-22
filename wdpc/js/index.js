var config={
  //表单提交
  formSubmit:function(formId,urlhttp,fun){
    var tok=cookieUtil.getCookie('token');
    
    $(formId).ajaxSubmit({
      url:urlhttp,
      data:{
        token:tok
      },
      success:function(data){
        console.log(data);
        if(!!fun){
          fun(data);
        }  
      }
    });
  },
  formatTemplate:function(dta, tmpl) {  
        var b;
        var format = { 
            price: function(x) {  
                // console.log(typeof x,this.discount);
                return (x*b).toFixed(2); 
            },
            discount:function(a){
                b=a==0?1:a*0.1;
                return b;
            }
        };  
        return tmpl.replace(/{(\w+)}/g, function(m1, m2) {  
            if (!m2)  
                return "";  
            return (format && format[m2]) ? format[m2](dta[m2]) : dta[m2];  
        });  
    },
    /**
     * 
     * @param {String} method 请求方法
     * @param {String} url 请求地址
     * @param {Function} fun 回调函数
     * @param {Object} data 请求参数
     */
    ajax:function(method,url,fun,data){
        // console.log(url);
        data=data||{};
        url+="?v="+new Date().getTime();
        $.ajax({
            type:method,
            url:url,
            data:data||{date:new Date().getTime()},
            success: function(msg){
    
                console.log(typeof msg);
                msg=typeof msg==='object'?msg:JSON.parse(msg);
                if(msg.code&&msg.code=='401'){
                    open('login.html','_self');
                }else{
                   if(fun){
                    fun(msg);
                    } 
                }               
           },
       error:function(e){
         console.log(JSON.stringify(e));
        
            }
        })
    }
}

$(function(){

    var index=0;
	//轮播图
	var oBanner={
		showPic:function(){
			var me=this;
			clearInterval(this.timer);
			this.timer=setInterval(function(){
				index==$(".notice-pic li").length/2?index=0:index++;
                index==0?$('.notice-pic').css({left:0}):'';
				me.showCon();
			},2000);
		},
		showCon:function(){
			$(".notice-pic").animate({left:-index*780+'px'},1000);
			
		}
	};
	oBanner.showPic();
	$(".lunboPic_list li").click(function(){
		clearInterval(oBanner.timer);
		index=$(this).index();
		oBanner.showCon();
		oBanner.showPic();
	});

    $(".down-area").on("click",'img',function(){
            layer.open({
            type:1,
            content: $(".alert-area"), //这里content是一个DOM
          shade:[0.8,'#000'],
          area:['600px','430px'],
          maxmin: true,
          title:'万店联盟网站试运行中'
        })
            //添加购物车
            //detailPage.addShoppingCar();
        });

    $(".testDown").on("click",'img',function(){
            layer.open({
            type:1,
            content: $(".alert-area"), //这里content是一个DOM
          shade:[0.8,'#000'],
          area:['600px','430px'],
          maxmin: true,
          title:'万店联盟网站试运行中'
        })
            //添加购物车
            //detailPage.addShoppingCar();
        });

    config.ajax('get','/index/public/index.php/index/index',function(data){
        var arr=[],arrS=[];
        $.each(data,function(index,item){
            if(index<4){

                arr.push(config.formatTemplate(item,$('#todayFav').html()));
            }else{
                arrS.push(config.formatTemplate(item,$('#todaySpec').html()));
            }
        })
        $('.today-spec').html('');
        $('.today-fav').html('');
        $('.today-spec').append(arrS.join(''));
        $('.today-fav').append(arr.join(''));

    })
})


// 深度优先遍历复制, 借助队列
function deepCopy(obj) {
    var newObj = {},
        srcQueue = [obj], srcVisitedQueue = [],
        copyQueue = [newObj], copyVisitedQueue = [];

    while (srcQueue.length > 0) {
        var currentSrcElement = srcQueue.shift(),
            currentCopyElement = copyQueue.shift();

        srcVisitedQueue.push(currentSrcElement);
        copyVisitedQueue.push(currentCopyElement);

        for (var key in currentSrcElement) {
            if (typeof currentCopyElement[key] !== 'object') {
                currentCopyElement[key] = currentSrcElement[key];
            } else {
                // 有环的情况
                var index = srcVisitedQueue.indexOf(currentSrcElement[key]);
                if (index >= 0) {
                    currentCopyElement[key] = copyVisitedQueue[index];
                } else {
                    srcQueue.push(currentSrcElement[key]);
                    currentCopyElement[key] = {};
                    copyQueue.push(currentCopyElement[key]);
                }
            }
        }
    }

    return newObj;
}

// Test case
// 1. 只含有简单类型的Object{a: 1, b:2} => pass
// 2. 简单类型和复杂类型同时存在的情况下的Object => pass:
// var obj1 = {
//     a: 1,
//     b: 2,
//     c: {
//         d: 3,
//         e: {
//             f: 4,
//             g: 5
//         }
//     },
//     h: {
//         i: 6,
//         j: 7
//     }
// };
// 3. 有环的情况下的Object => pass:
// var obj1 = {
//     a: 1,
//     b: 2,
//     c: obj1
// };
$(function(){
    $(document).scroll(function(){
        for (var i=0;i<$(".Louti").length;i++) {
            if($(this).scrollTop()<$(".Louti").eq(0).offset().top){
                $("#LoutiNav").hide();
            }else if($(this).scrollTop()>=$(".Louti").eq(i).offset().top){
                $("#LoutiNav").show();
                $("#LoutiNav li").eq(i).addClass("hover").siblings().removeClass('hover');
            }
        }

    });
    
    $("#LoutiNav li").click(function(){
        $(this).addClass("hover").siblings().removeClass('hover');
        if($(this).is("#LoutiNav  li:last")){
            console.log('last')
            $(document).scrollTop(0);
            $("#LoutiNav").hide();
        }else{
            $(document).scrollTop($(".Louti").eq($(this).index()).offset().top);
        }
            
    });

})