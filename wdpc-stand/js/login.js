$(function(){
    $("#dialogLogin").hide();
    $("#dialogReset").hide();
    $("#dialogSign").hide();
    $(".wd-common-login").click(function(){
        $("#dialogLogin").show();
    })
    $(".diaTop,.submit").click(function(){
        $(".dialog").hide();
    })
    $(".forgetPwd").click(function(){
        $("#dialogLogin").hide();
         $("#dialogReset").show();
    })
    $(".dialogin").click(function(){
        $("#dialogLogin").hide();
         $("#dialogSign").show();
    })
});