


$(function(){


	var id = 1118
	


	var http = "http://192.168.1.137:8080/m/stage/stage/"
	 $.ajax({
        type:'GET',
        // async:false,
        url:http+id,
        dataType:'json',
        cache:true,
        contentType:'application/json;charset=utf-8',       
        success:function(data){
           console.log(data.result)
           /*驿站简介*/
           $(".instructions-cont").html(data.result.referral)

           /*站长介绍*/
           $(".chairman-introduce").html('<span>站长介绍:</span>'+data.result.synopsis)
           /*主营业务*/
           $(".main-introduce").html('<span>主营业务:</span>'+data.result.business)
           /*所属行业*/
           $(".about-industry").html('<span>所属行业:</span>'+data.result.format)
           /*驿站地址*/
           $(".stage-address").html('<span>驿站地址:</span>'+data.result.address)
           /*所在城市*/
           $(".city-address").html('<span>所在城市:</span>'+data.result.province)
           	/*驿站电话*/
           $(".stage-call").html('<span>驿站电话:</span>'+data.result.tel)
           /*侍女名称*/
           $(".maid-name").html('<span>侍女名称:</span>'+data.result.sunv_title)
           /*微信号*/
           $(".weixin-number").html('<span>微信号:</span>'+data.result.weixin_sn)
          /* 微信名*/
           $(".weixin-name").html('<span>微信名:</span>'+data.result.weixin_title)
           /*侍女电话*/
            $(".maid-call-number").html('<span>侍女电话:</span>'+data.result.mobile)

         },
        error:function(XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(XMLHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
                console.log(textStatus);
        }
      });
	$(".edit-data").on("touchend",function(){
		localStorage.setItem('stageNameId',id);
		window.open("stageApply.html",target="_self")
	})
})












