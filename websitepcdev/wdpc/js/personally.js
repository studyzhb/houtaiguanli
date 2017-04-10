$(function(){
    $(".judgeContent").hide();
    $(".judge span").click(function(){
        $(this).addClass("bg_color").siblings().removeClass("bg_color");
        $(this).parents(".listLog").next("div").slideDown("200");
    });
    $(".confirm").click(function(){
        $(this).parents(".judgeContent").slideUp("200");
    });
    // 退款
//    账户设置
    $(".personNav span").click(function(){
        var _index=$(this).index();
        $(this).addClass('bg_color').siblings("span").removeClass('bg_color');
        $(".personMess").eq(_index).show().siblings(".personMess").hide();
    });
    // 性别切换
    $(".sex").click(function(){
       var atr= $(this).find("img").attr("src");
        console.log(atr);
        if(atr=="../../img/sexNocheck.png"){
            $(this).find("img").attr("src","../../img/sexcheck.png").parent().siblings().find("img").attr("src","../../img/sexNocheck.png");
        }else{
            $(this).find("img").attr("src","../../img/sexNocheck.png");
        }
    })

    // 帮助中心
    $(".helpTop li").click(function(){
        $(this).find("span").addClass("bg_color").parent().siblings().find("span").removeClass("bg_color");
        $(this).find("p").addClass("color").parent().siblings().find("p").removeClass("color");
        var _perindex=$(this).index();
        $(".helpMain .heloComm").eq(_perindex).show().siblings('.heloComm').hide();
        // var width=$(this).width();
        // var Left=$(".movesigle").position().left;
        // console.log(width);
        // console.log(Left);

    })
})