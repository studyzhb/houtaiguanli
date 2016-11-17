var indexPage={
        addProvince:function(){
            //创建省份类select
            $.each(config.area.citylist,function(index,item){
                console.log(item.p)
                $('#province-list').html('');
                $('<li>').appendTo($('#province-list')).html(item.p);
            });
        },
        addCity:function(parVal){
            $('#city-list').html('')
            $.each(config.area.citylist,function(index,item){
                if(item.p==parVal){
                    $.each(item.c,function(i,cityO){
                        $('<li>').appendTo($('#city-list')).html(cityO.n);
                    })
                }
            });
        },
        addCountry:function(parP,parC){
            $('#contry-list').html('');
            $.each(config.area.citylist,function(index,item){
                if(item.p==parP){
                    $.each(item.c,function(i,cityO){
                        if(cityO.n==parC&&cityO.a){
                            $.each(cityO.a,function(a,contryO){
                                $('<li>').appendTo($('#contry-list')).html(contryO.s);
                            })
                        }

                    })
                }
            });
        },
        selectResu:function(){
             
            
        }
    }

$(function(){
    // if(!$(".sidebar-title").parent(".sidebar-nav").hasClass('sidebar-nav-fold')){
        // $(".sidebar-title").next().hide().end().addClass('sidebar-nav-fold');
    // }
   
    $(".sidebar-nav").find('.sidebar-trans').css('display','none');

    
    $('.sidebar-trans li').each(function(){
        // console.log($(this)); 
        if($(this).data('selected')=='selected'){
            $(this).find('a').css('background-color','#2A94DE');
            $(this).parent('.sidebar-trans').css('display','block');
        }else{
            $(this).find('a').css('background-color','0');
        }

    })



    $('.location span').each(function(){
        $(this).text($(this).data('title'));
    })

    $(".sidebar-title").on('click', function() {

        if ($(this).next().css('display')=='none') {
           $(this).next().slideDown(200);
            $(this).parent(".sidebar-nav").addClass('expand-menu');

        } else {
            $(this).next().slideUp(200);
            $(this).parent(".sidebar-nav").removeClass('expand-menu');
        }
        $(this).parent(".sidebar-nav").siblings().find('.sidebar-trans').css('display','none');
    });



    
    $('.purchaselist-info').dblclick(function(){
        console.log($(this).data('info'));
        $(".add-con-area").show();
        $(".add-alert-area").show();
    });

    $('.nav-hover-content').hover(function(){
        $(this).children('.show-content').show();
    },function(){
        $(this).children('.show-content').hide();
    })

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

    

    
    // console.log($('.select-tit'));
    $('#show-content').on('click','.select-tit',function(){
        if($(this).next().css('display')=='none'){
            $(this).nextAll().css('display','block');
        }else{
            $(this).nextAll().css('display','none');
        } 
    })


    $('#city-list').on('click',function(){
        // $('#contry-list').html('县');
        indexPage.addCountry($('#province-list')[0].value,this.value);
    })

    $('#province-list').on('click',function(){
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