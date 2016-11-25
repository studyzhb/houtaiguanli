/**
 * Created by Administrator on 2016/11/15.
 */
                  var http = window.localStorage.getItem('http');
            //点击获取验证码
                $(document).on('click','#verification',function(){
                    var code = $('#phone').val();
                    $.ajax({
                        type: 'post',
                        url: http + 'main/sendSMS',
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        data: JSON.stringify({
                            "type":"1",
                            "mobile":code
                        }),
                        success:function(data){
                            alert(data.msg)
                            console.log(data.result);
                        }
                    })
                });

           
           
                $('#bt').click(function(){
                         var  phone =$("#phone").val();
                         var  code =$("#code").val();
                         var  pw =$("#pw").val();
                         var PWD = hex_md5(pw).toUpperCase();
//                    console.log(phone);
//                    console.log(code);
//                    console.log(pw);
                         console.log(phone);
                         console.log(code);
                         console.log(PWD);
                         
                    $.ajax({
                        type: 'post',
                        url: http + 'main/updateUserPwd',
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        data: JSON.stringify({
                            "code":phone,
                            "type":0,
                            "validateCode":code,
                            "pwd":PWD

                        }),
                        success:function(data){
                            console.log(data);
                            alert(data.msg)
                            if(data.msg=="修改成功！"){
                            	window.location.href="login.html"
                            	
                            }
                        }
                    })

                })

           

   $('.text_box input').focus(function () {
        $(this).parent().removeClass('infoPass');
        $(this).parent().removeClass('error');
        $(this).parent().find('strong').remove();
        $(this).parent().addClass('focus');
    })









         $('#pw').blur(function () {
        //判断是否输入密码
        if ($(this).val() === '') {
            $strong = $('<strong><b></b>请输入要设置的密码</strong>')
            $(this).parent().addClass('error').append($strong);
            return;
        }
         })  
     $('#pw').blur(function () {
        //判断是否相同
        var pw = $('#pw_confirm').val();
        if (pw !== '') {
            if ($(this).val() !== pw) {
                $strong = $('<strong><b></b>请输入相同密码</strong>');
                $(this).parent().addClass('error').append($strong);
                return;
            }
            //成功
            $strong = $('<strong></strong>');
            $(this).parent().addClass('infoPass').append($strong);
        }
    })
     $('#pw_confirm').blur(function () {
        //判断是否相同
         var pw = $('#pw').val();
          if (pw !== '') {
            if ($(this).val() !== pw) {
                $strong = $('<strong><b></b>请输入相同密码</strong>');
                $(this).parent().addClass('error').append($strong);
                return;
            }
            //成功
            $strong = $('<strong></strong>');
            $(this).parent().addClass('infoPass').append($strong);
        }
    })