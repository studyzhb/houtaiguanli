 /**
 * Created by Administrator on 2016/11/15.
 */

          var userNumber = localStorage.getItem('userNumber');

             $(document).on('click','#verification',function(){
                 var  mobile = $('#phone').val()
                 $.ajax({
                     type: 'post',
                     url: 'http://192.168.0.202:8080/heche/main/sendSMS',
                     dataType: "json",
                     contentType: "application/json;charset=utf-8",
                     data: JSON.stringify({
                         "type":"3",
                         "mobile":mobile
                     }),
                     success:function(data){
                         alert(data.msg)
                          console.log(data.result);
                     }
                 })
             })


             $('#tijiao').click(function(){

                     var  code =$("#code").val();
                     var  newphone =$("#newphone").val();

                     $.ajax({
                         type: 'post',
                         url: 'http://192.168.0.202:8080/heche/user/updaeUserCode',
                         dataType: "json",
                         contentType: "application/json;charset=utf-8",
                         data: JSON.stringify({
                             "userNumber": userNumber,
                             "code": newphone,
                             "validateCode": code
                         }),
                         success:function(data){
                             alert(data.msg)
                         }


                  })

             })


