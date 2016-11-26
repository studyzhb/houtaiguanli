var config={
	ajaxAddress:{
		http:'http://122.114.48.44:8080/heche/',
	},
	ajax:function(method,url,data,fun){
		$.ajax({
			type:method,
			url:url,
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(data)||{},
			success:function(data){
				console.log(data);
				if(data.status==1){
					if(fun){
						fun(data);
					}
				}else{
					alert(data.msg);
				}
			},
			error:function(){
				alert('通信错误，请稍后重试');
			}
		})
	},
	formatTemplate:function(dta, tmpl) {  
        var b;
        var format = { 
            price: function(x) {  
                //console.log(typeof x,this.discount);
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
    }
}