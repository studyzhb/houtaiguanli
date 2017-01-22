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
            price1: function(x) {  
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