/**
 * Created by Administrator on 2016/11/9.
 */

var zhizhao;
var mendian;
var idcard;
alert(document.cookie);
 //var http = window.localStorage.getItem('http');
 var http="htttp://wwww.baidu.com"
alert('ssss---111');
$(function() {
                //点击获取验证码
                $(document).on('click','#verification',function(){
                    var code = $('#phone').val();
                    $.ajax({
                        type: 'post',
                        url: http + '/main/sendSMS',
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        data: JSON.stringify({
                            "type":"0",
                            "mobile":code
                        }),
                        success:function(data){
                            alert(data.msg)
                            console.log(data.result);
                        }
                    })
                });

    //---------------------------------------点击注册-----------------------------------------
        
            $('#bt').click(function(){
                alert('sssss');
                var code = $('#phone').val();
                var pwd  = $('#pw').val();
                var realName = $('#realName').val();
                var storeName =$('#storeName').val();
                var storeAddress=$('#storeAddress').val();
                var validateCode =$('#validateCode').val();
                var PWD = hex_md5(pwd).toUpperCase();
                  console.log(code);
                  console.log(pwd);
                  console.log(realName);
                  console.log(storeName);
                  console.log(storeAddress);
                  console.log(mendian);
                  console.log(zhizhao);
                  console.log(idcard);
                $.ajax({
                       type:"post",
                       url: http + 'main/regisgerUser',
                       dataType:'json',
                       contentType: "application/json;charset=utf-8",
                        data: JSON.stringify({
                                "validateCode":validateCode,
                                "realName":realName,
                                "cardId":"45646465460021251",
                                "storePhotos":mendian, //门店照片
                                "businessLicense":zhizhao,  //营业执照
                                "cardIdImg":idcard,         //身份证照片
                                "storeName":storeName,    //车商名称
                                "storeAddress":storeAddress,   //门店地址
                                "code":code,                           //手机号
                                "pwd":PWD  //密码 md5 加密  （32位大写）
                        }),
                      success: function(data) {
                           if(data.msg="注册成功！"){
                            location.href='login.html'
                          }
                             alert(data.msg);
                    }
                })
            })


                $('.text_box input').focus(function () {
                    $(this).parent().removeClass('infoPass');
                    $(this).parent().removeClass('error');
                    $(this).parent().find('strong').remove();
                    $(this).parent().addClass('focus');
                })




                $('#phone').blur(function () {
                    var that = this;
                    //判断是否填写
                    if ($(this).val() === '') {
                        $strong = $('<strong><b></b>请输入手机号</strong>')
                        $(this).parent().addClass('error').append($strong);
                        return;
                    }

                    //判断格式是否正确
                    var phoneReg = /^1[3578]\d{9}$/;
                    var phoneNum = $(this).val();
                    if (!phoneReg.test(phoneNum)) {
                        $strong = $('<strong><b></b>请输入正确的手机号</strong>')
                        $(this).parent().addClass('error').append($strong);
                        return;
                    }
                    })


                //密码判断
                $('#pw').blur(function () {
                    //判断是否输入密码
                    if ($(this).val() === '') {
                        $strong = $('<strong><b></b>请输入要设置的密码</strong>')
                        $(this).parent().addClass('error').append($strong);
                        return;
                    }
                    //判断密码格式
                    var pwReg = /^[^\s]{6,20}$/;
                    var pw = $(this).val();
                    if (!pwReg.test(pw)) {
                        $strong = $('<strong><b></b>请输入正确密码格式</strong>')
                        $(this).parent().addClass('error').append($strong);
                        return;
                    }
                    //成功
                    $strong = $('<strong></strong>')
                    $(this).parent().addClass('infoPass').append($strong);
                })


			





//--------------------------------------获取营业执照照片-----------------------------------------------------

                $('#postForm').ajaxForm({
                    url: http + "main/uploadUserImg",
                    dataType: 'json',
                    data: $('#postForm').serialize(),


                     success:function (data){
                        console.log(data.result)
                        zhizhao =data.result;
                        console.log(zhizhao)
                       }
                    });

            $("#file_upload").change(function() {
                var $file = $(this);
                var fileObj = $file[0];
                //console.log(fileObj.files[0])
                var windowURL = window.URL || window.webkitURL;
                var dataURL;
                var $img = $("#preview");

                if (fileObj && fileObj.files && fileObj.files[0]) {
                    dataURL = windowURL.createObjectURL(fileObj.files[0]);
                    $img.attr('src', dataURL);

                } else {
                    dataURL = $file.val();
                    var imgObj = document.getElementById("preview");
                    imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                    imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
                }

            })
//----------------------------------------获取门店照片----------------------------------------------
    $('#postFormone').ajaxForm({
        url: http + "main/uploadUserImg",
        dataType: 'json',
        data: $('#postFormone').serialize(),
         success : function(data){

            console.log(data.result)
            mendian =data.result;
            console.log(mendian)

        }
    });
    $("#file_idcard").change(function() {
        var $file = $(this);
        var fileObj = $file[0];
        //console.log(fileObj.files[0])
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $img = $("#previe");

        if (fileObj && fileObj.files && fileObj.files[0]) {
            dataURL = windowURL.createObjectURL(fileObj.files[0]);
            $img.attr('src', dataURL);

        } else {
            dataURL = $file.val();
            var imgObj = document.getElementById("preview");
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
        }
    })

//-----------------------------------------获取身份证正面------------------------------------------------------------
                    $('#postFormthree').ajaxForm({
                        url: http + "main/uploadUserImg",
                        dataType: 'json',
                        data: $('#postFormthree').serialize(),
                        success: processJson
                    });
                    function processJson(data){
                        //console.log(data.result)
                        idcard = data.result;
                        console.log(idcard)
                    }
                    $("#file_mendian").change(function() {
                        var $file = $(this);
                        var fileObj = $file[0];
                        //console.log(fileObj.files[0])
                        var windowURL = window.URL || window.webkitURL;
                        var dataURL;
                        var $img = $("#men");

                        if (fileObj && fileObj.files && fileObj.files[0]) {
                            dataURL = windowURL.createObjectURL(fileObj.files[0]);
                            $img.attr('src', dataURL);

                        } else {
                            dataURL = $file.val();
                            var imgObj = document.getElementById("preview");
                            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
                        }
            })
});

