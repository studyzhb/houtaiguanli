require(['jquery','main','ajaxAddress','lay-model','log'],function($,myObj,ajaxAddress,layObj,log){
    
    var common=myObj.load();
    var fistLoad=true;



     common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.nav.showNavlist,function(data){
        // log.d(data);
        if(data.code==200){
            $.each(data.data,function(index,item){
                if(index==0){
                    ShopObj.data.navId=item.id;
                    $('<a href="javascript:;" class="active">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                }else{
                    $('<a href="javascript:;">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                }  
            })
           
        }
    })
})
