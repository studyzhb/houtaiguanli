/**
 * Created by Administrator on 2016/11/9.
 */

var zhizhao;
var mendian;
var idcard;
  var http ='http://122.114.48.44:8080/heche/';
jQuery.ajax = (function(_ajax){
    
    var protocol = location.protocol,
        hostname = location.hostname,
        exRegex = RegExp(protocol + '//' + hostname),
        YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
        query = 'select * from html where url="{URL}" and xpath="*"';
    
    function isExternal(url) {
        return !exRegex.test(url) && /:\/\//.test(url);
    }
    
    return function(o) {
        
        var url = o.url;
        
        if ( /get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url) ) {
            
            // Manipulate options so that JSONP-x request is made to YQL
            
            o.url = YQL;
            o.dataType = 'json';
            
            o.data = {
                q: query.replace(
                    '{URL}',
                    url + (o.data ?
                        (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data)
                    : '')
                ),
                format: 'xml'
            };
            
            // Since it's a JSONP request
            // complete === success
            if (!o.success && o.complete) {
                o.success = o.complete;
                delete o.complete;
            }
            
            o.success = (function(_success){
                return function(data) {
                    
                    if (_success) {
                        // Fake XHR callback.
                        _success.call(this, {
                            responseText: data.results[0]
                                // YQL screws with <script>s
                                // Get rid of them
                                .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
                        }, 'success');
                    }
                    
                };
            })(o.success);
            
        }
        
        return _ajax.apply(this, arguments);
        
    };
    
})(jQuery.ajax);
jQuery.support.cors=true;
$(function() {
                //点击获取验证码
                $(document).on('click','#verification',function(){
                    var code = $('#phone').val();
                    $.ajax({
                        type: 'POST',
                        url: http + '/main/sendSMS',
                        // dataType:'jsonp',
                        contentType: "application/json;charset=GBK",
						jsonp:'callback',
                        crossDomain:true,
                        data:JSON.stringify({
                            "type":"0",
                            "mobile":code
                        }),
                        success:function(data){
                            alert(data.msg);
                            console.log(data.result);
                        },
						error:function(a,b,c){
							alert(JSON.stringify(a)+'error'+b+c);
						}
                    })
                });

    //---------------------------------------点击注册-----------------------------------------
            $('#bt').click(function(){
                var code = $('#phone').val();
                var pwd  = $('#pw').val();
                var realName = $('#realName').val();
                var storeName =$('#storeName').val();
                var storeAddress=$('#storeAddress').val();
                var validateCode =$('#validateCode').val();
                var shenFen =$('#shenFen').val();
                var PWD = hex_md5(pwd).toUpperCase();
                  console.log(code);
                  console.log(pwd);
                  console.log(realName);
                  console.log(storeName);
                  console.log(storeAddress);
                  console.log(mendian);
                  console.log(zhizhao);
                  console.log(idcard);
                  console.log(shenFen)
                $.ajax({
                       type:"post",
                       url: http + 'main/regisgerUser',
                       dataType:'json',
                       contentType: "application/json;charset=utf-8",
                        data: JSON.stringify({
                                "validateCode":validateCode,
                                "realName":realName,
                                "cardId":shenFen,
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
            var imgObj = document.getElementById("previe");
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
                        console.log(idcard);
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
                            var imgObj = document.getElementById("men");
                            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
                        }
            })
});

