
var indexPage={
        addProvince:function(){
            //创建省份类select
            $('#province-list').html('');
            $.each(config.area.citylist,function(index,item){
                console.log(item.p)
                
                $('<a>').appendTo($('#province-list')).html(item.p);
            });
        },
        addCity:function(parVal){
            $('#city-list a').remove();
            console.log(parVal);
            $.each(config.area.citylist,function(index,item){
                if(item.p==parVal){
                    $.each(item.c,function(i,cityO){
                        $('<a>').appendTo($('#city-list')).html(cityO.n);
                    })
                }
            });
        },
        addCountry:function(parP,parC){
            $('#contry-list a').remove();
            $.each(config.area.citylist,function(index,item){
                if(item.p==parP){
                    $.each(item.c,function(i,cityO){
                        if(cityO.n==parC&&cityO.a){
                            $.each(cityO.a,function(a,contryO){
                                $('<a>').appendTo($('#contry-list')).html(contryO.s);
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

    $('#province-list').on('click','a',function(){
        console.log($(this).text());
        $('#save-area').data('pro',$(this).text());
        $('#save-area').data('city','');
        $('#save-area').data('country','');
        $(this).addClass('active-p').siblings().removeClass('active-p');

        indexPage.addCity($(this).text());
    });
    

    $('#city-list').on('click','a',function(){
        $('#save-area').data('city',$(this).text());
        $('#save-area').data('country','');
        console.log($(this).text(),$('#province-list .active-p').text());
        $(this).addClass('active-p').siblings().removeClass('active-p');
        indexPage.addCountry($('#province-list .active-p').text(),$(this).text());
    });

    $('#contry-list').on('click','a',function(){
        $(this).addClass('active-p').siblings().removeClass('active-p');
        $('#save-area').data('country',$(this).text());
        
    });

    $('#save-area').click(function(){
        console.log($('#save-area').data('pro'),$('#save-area').data('city'),$('#save-area').data('country'));
    });

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

    $('#show-content').on('click','.click-show-area',function(){
        
        $(".add-con-area").show();
        $(".add-alert-area").show();
    })
    

    // $('#show-content').on('click','#province-list li',function(){
    //     alert($(this).text());
    //     $('#title-province').text($(this).text());
    //     indexPage.addCity($(this).text());
    //     $(this).parents('.select-items').css('display','none').next().css('display','none');
    // });

    // $('#show-content').on('click','#city-list li',function(){
        
    //     console.log($(this).text(),$('#province-list').text());

    //     indexPage.addCountry($('#province-list').text(),$(this).text());
    // });

    // $('#show-content').on('click','#cpuntry-list li',function(){
    //     alert($(this).text());
    // });


    // $('#city-list').on('click',function(){
    //     // $('#contry-list').html('县');
    //     indexPage.addCountry($('#province-list')[0].value,this.value);
    // })

    // $('#province-list').on('click',function(){
    //     // $('#city-list').html('市');
    //     indexPage.addCity(this.value);
    // })

    $('#add-organ').click(function(){
    	$(".add-con-area").show();
        $(".add-alert-area").show();
    })

    $('#closeConArea').click(function(){
        $(".add-con-area").hide();
        $(".add-alert-area").hide();
    })



    //添加一品多码
    
    $('.addmore-goods-name').on('click',function(){

        var html=$('script[type="text/template"]').html();
        $('#goodsAddmore').append(html);

        console.log($('#goodsAddmore'));
    })


    //打印
    $('.printpage').click(function(){
        document.body.innerHTML=document.getElementById('printcontent').innerHTML;
        window.print();
    });

})