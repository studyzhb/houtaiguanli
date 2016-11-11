$(function(){

	function formatTemplate(dta, tmpl) {  
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

    var indexPage={
        addProvince:function(){
            //创建省份类select
            $.each(config.area.citylist,function(index,item){
                // console.log(item.p)
                $('<option>').appendTo($('#province-list')).html(item.p);
            });
        },
        addCity:function(parVal){
            $('#city-list').html('<option>市</option>')
            $.each(config.area.citylist,function(index,item){
                if(item.p==parVal){
                    $.each(item.c,function(i,cityO){
                        $('<option>').appendTo($('#city-list')).html(cityO.n);
                    })
                }
            });
        },
        addCountry:function(parP,parC){
            $('#contry-list').html('<option>县</option>');
            $.each(config.area.citylist,function(index,item){
                if(item.p==parP){
                    $.each(item.c,function(i,cityO){
                        if(cityO.n==parC&&cityO.a){
                            $.each(cityO.a,function(a,contryO){
                                $('<option>').appendTo($('#contry-list')).html(contryO.s);
                            })
                        }

                    })
                }
            });
        },
        selectResu:function(){
             
            
        }
    }

    indexPage.addProvince();

    $('#city-list').on('change',function(){
        // $('#contry-list').html('县');
        indexPage.addCountry($('#province-list')[0].value,this.value);

    })

    $('#province-list').on('change',function(){
        // $('#city-list').html('市');
        indexPage.addCity(this.value);
    })

    $('#add-organ').click(function(){
    	$(".add-con-area").show();
        $(".add-alert-area").show();
    })

    $('#closeConArea').click(function(){
        $(".add-con-area").hide();
        $(".add-alert-area").hide();
    })




   

})