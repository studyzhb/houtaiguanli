








/*驿站申请页面*/
$(function(){

	
var ThisUserIsSuNvSign = false;
var id=localStorage.getItem('stageNameId');
	//localStorage.removeItem("stageNameId");
	
var http = "http://192.168.1.137:8080/m/stage/stage/"

	$.ajax({
        type:'GET',
        // async:false,
        url:http+id,
        dataType:'json',
        cache:true,
        contentType:'application/json;charset=utf-8',       
        success:function(data){
           /*驿站简介*/
           if(data.result.flag==11){
           	ThisUserIsSuNvSign = true;
           }
           creatDom(ThisUserIsSuNvSign);
           /*驿站名称*/
           $(".stage-name-out").val(data.result.title)
           var formats = null;
           switch(data.result.format)
				{
				case 11:
				  formats = "综合"
				  break;
				case 21:
				  formats = "茶馆"
				  break;
				case 22:
				  formats = "工作室"
				  break;
				default:
				  formats = "其它"
				}
           /*行业类别*/
           $(".hangye-leibie").val(formats)
           /*驿站地址*/
           $(".yizhan-dizhi").val(data.result.address)
           
           /*驿站电话*/
           console.log(data.result.format)
           $(".yizhan-dianhua").val(data.result.tel)
           /*主营业务*/
           $(".zhuying-yewu").val(data.result.business)
           /*微信名*/
          	console.log(data.result.weixin_title)
           $(".weixin-ming").val(data.result.weixin_title)
           /*微信号*/
           $(".weixin-hao").val(data.result.weixin_sn)
           /*侍女名称*/
           $(".shinv-ming").val(data.result.sunv_title)
           /*侍女手机号*/
           $(".shinv-shouji").val(data.result.mobile)
           /*所在城市*/
           $(".suozai-chengshi").val(data.result.province)
           /*站长(分会长)介绍*/
           $(".huizhang-jieshao").val(data.result.synopsis)
           /*驿站(会长)介绍*/
           $(".huizhan-jieshao").val(data.result.referral)

           

         },
        error:function(XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(XMLHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
                console.log(textStatus);
                creatDom(ThisUserIsSuNvSign);
        }
      });




/*封装的创建活动申请列表函数*/
function creatDom(sign){
/*第一行*/

	var oLi = $("<li>")
	$(".apply-infor").append(oLi)
	var oH2 = $("<h2>").html("驿站名称"+"<span>*</span>")
	$(oLi).append(oH2)
	var oInput = $(' <input class="input stage-name-out" type="text" placeholder="请输入城市(市县)名+店名+驿站二字">')
	$(oLi).append(oInput)
	/*第二行*/
	var oLi1 = $("<li>")
	$(".apply-infor").append(oLi1)
	var oH2a = $("<h2>").html("所属行业"+"<span>*</span>")
	$(oLi1).append(oH2a)
	var oInput1 = $(' <input class="input hangye-leibie" type="text" readonly="readonly" placeholder="请点击右侧图标，选择您驿站所属的行业">')
	$(oLi1).append(oInput1)
	var oImg1 = $('<img class="img-v"  src="img/icon_down@3x.png"/>')
	$(oLi1).append(oImg1)
	/*第三行*/
	var oLi2 = $("<li>")
	$(".apply-infor").append(oLi2)
	var oH2b = $("<h2>").html("驿站地址"+"<span>*</span>")
	$(oLi2).append(oH2b)
	var oInput2 = $(' <input class="input yizhan-dizhi" type="text" placeholder="请填写驿站详细地址">')
	$(oLi2).append(oInput2)
	/*第四行*/
	/*素女可见 判断用户是否为素女*/
	if(sign){
		var oLi3 = $("<li>")
		$(".apply-infor").append(oLi3)
		var oH2b = $("<h2>").html("驿站电话"+"<span>*</span>")
		$(oLi3).append(oH2b)
		var oInput2 = $(' <input class="input yizhan-dianhua" type="text" placeholder="请输入驿站联系电话">')
		$(oLi3).append(oInput2)
	}
	/*第五行*/
	var oLi4 = $("<li>")
	$(".apply-infor").append(oLi4)
	var oH2b = $("<h2>").html("主营业务")
	$(oLi4).append(oH2b)
	var oInput2 = $(' <input class="input zhuying-yewu" type="text" placeholder="请简单介绍驿站的主营业务">')
	$(oLi4).append(oInput2)
	/*第六行*/
	var oLi5 = $("<li>")
	$(".apply-infor").append(oLi5)
	var oH2b = $("<h2>").html("微信名")
	$(oLi5).append(oH2b)
	var oInput2 = $(' <input class="input weixin-ming" type="text" placeholder="请输入侍女微信名,例如:夏沫">')
	$(oLi5).append(oInput2)
	/*第七行*/
	var oLi6 = $("<li>")
	$(".apply-infor").append(oLi6)
	var oH2b = $("<h2>").html("微信号"+"<span>*</span>")
	$(oLi6).append(oH2b)
	var oInput2 = $(' <input class="input weixin-hao" type="text" placeholder="请输入侍女微信号,例如:dn80012">')
	$(oLi6).append(oInput2)
	/*第八行*/
	var oLi7 = $("<li>")
	$(".apply-infor").append(oLi7)
	var oH2b = $("<h2>").html("侍女名称")
	$(oLi7).append(oH2b)
	var oInput2 = $(' <input class="input shinv-ming" type="text" placeholder="请输入侍女名称,例如:夏沫">')
	$(oLi7).append(oInput2)
	/*第九行*/
	/*此处需要判断是否是素女*/
	if(sign){
		var oLi8 = $("<li>")
		$(".apply-infor").append(oLi8)
		var oH2b = $("<h2>").html("侍女手机号")
		$(oLi8).append(oH2b)
		var oInput2 = $(' <input class="input shinv-shouji" type="text" placeholder="请输入侍女手机号码">')
		$(oLi8).append(oInput2)
	}
	/*第十行*/
	var oLi9 = $("<li>")
	$(".apply-infor").append(oLi9)
	var oH2b = $("<h2>").html("所在城市"+"<span>*</span>")
	$(oLi9).append(oH2b)
	var oInput2 = $(' <input class="input suozai-chengshi" type="text" placeholder="请输入驿站所在城市">')
	$(oLi9).append(oInput2)
	/*第十一行*/
	var oLi10 = $("<li>")
	$(".apply-infor").append(oLi10)
	var oH2b = $("<h2>").html("站长(分会长)介绍")
	$(oLi10).append(oH2b)
	var oInput2 = $(' <input class="input huizhang-jieshao" type="text" placeholder="请对站长(分会长)做简单介绍">')
	$(oLi10).append(oInput2)
	/*第十二行*/
	var oLi11 = $("<li>")
	$(".apply-infor").append(oLi11)
	var oH2b = $("<h2>").html("驿站(会长)介绍")
	$(oLi11).append(oH2b)
	var oInput2 = $(' <input class="input huizhan-jieshao" type="text" placeholder="请对驿站(会长)做简单介绍">')
	$(oLi11).append(oInput2)
	/*第十三行*/
	var oLi12 = $("<li>")
	$(".apply-infor").append(oLi12)
	var oH2b = $("<h2>").html("推荐人")
	$(oLi12).append(oH2b)
	var oInput2 = $(' <input class="input" type="text" placeholder="请手动输入推荐人称呼">')
	$(oLi12).append(oInput2)
}


/*图片预览*/
$("#container").on("change","input",function(file){
	var prevDiv = document.getElementById('img-preview');
  	console.log(file)  
  	console.log($(this).files)  
  	console.log($(this))  
  /*if (file.files && file.files[0]) { 
    var reader = new FileReader();     
    reader.onload = function(evt){       
      prevDiv.innerHTML = '<img class="img-preview" src="' + evt.target.result +'" />';
      console.log(evt.target.result)
    }      
    reader.readAsDataURL(file.files[0]);    
  }else{      
    prevDiv.innerHTML = '<div class="img-preview" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
      console.log(file.value)
  }*/
  var objUrl = getObjectURL(this.files[0]) ;
	console.log("objUrl = "+objUrl) ;
	if (objUrl) {
		$("#img").attr("src", objUrl) ;
	}
	console.log(objUrl)

})  
  function getObjectURL(file) {
	var url = null ; 
	console.log(file)
	if (window.createObjectURL!=undefined) { // basic
		url = window.createObjectURL(file) ;
	} else if (window.URL!=undefined) { // mozilla(firefox)
		//url = window.URL.createObjectURL(file) ;
	} else if (window.webkitURL!=undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file) ;
	}
	return url ;
}


/*信息上传*/
$(".true-bnt").on("touchend",function(){
	var title = $(".stage-name-out").val();
	var category = $(".hangye-leibie").val()
	var address = $(".yizhan-dizhi").val();
	var img_banner = "http://oss-cn-shanghai.aliyuncs.com/banner1.jpg"
	var tel = $(".yizhan-dianhua").val()
	var business = $(".zhuying-yewu").val();
	var sunv_id = $(".shinv-ming").val()
	var sunv_title = $(".shinv-ming").val()
	var weixin_sn = $(".weixin-hao").val();
	var weixin_title = $(".weixin-ming").val();
	var mobile = $(".shinv-shouji").val();
	var synopsis = $(".huizhang-jieshao").val()
	 console.log(title)
	 //var category = $(".hangye-leibie").val()
	console.log(id)
	$.ajax({
		url: 'http://192.168.1.137:8080/m/stage/stage/new',
		type: 'post',
		dataType: 'json',
		contentType:'application/json;charset=UTF-8',
		data: JSON.stringify({
			"uid":13084,
			"title":title,
			"category":"11",
			"format":"21",
			"address": address,
			"img_banner":img_banner,
			"tel":tel,
			"business":business,
			"sunv_title":sunv_title,
			"weixin_sn":weixin_sn,
			"weixin_title":weixin_title,
			"mobile":mobile,
			"synopsis":synopsis
			//body:$(".huizhan-jieshao").val()


		}),
	})
	.done(function() {
		console.log("success");
	})
	.fail(function(data) {
		console.log(data)
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
})

	

})


/*选择行业开始*/
$(function(){
	/*点击选择所属类别*/
	$(document).on("touchend",".img-v",function(){
		$(".popup").show();
		$(".industry-place").show();
	})
	console.log($(".industry-list"))
	$(".industry-list li").on("touchend",function(){
		var index = $(this).index()
		for(var i=0;i<$(".industry-list li").length;i++){
			$(".industry-list li").eq(i).removeClass('color-one')
			$(".industry-list img").eq(i).removeClass('img-show')
			$(".industry-list li").eq(index).addClass('color-one')
			$(".industry-list li").eq(index).find("img").addClass('img-show')
		}
		hidePopup()
	
	})
	$(".popup").on("touchend",function(){
		hidePopup()
	})

	function hidePopup(){
		$(".popup").hide();
		$(".industry-place").hide();
		for(var i=0;i<$(".industry-list li").length;i++){
			console.log($(".industry-list li").eq(i).attr("class")=="color-one");
			if($(".industry-list li").eq(i).attr("class")=="color-one"){
				var txt = $(".industry-list li").eq(i).text()
				$(".hangye-leibie").val(txt)
			}
		}
	}

})


/*选择行业结束*/




