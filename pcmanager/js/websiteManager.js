require(['jquery','main','log','ajaxAddress'],function($,myObj,log,ajaxAddress){

    var common=myObj.load();

    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.city.citylist,function(data){
        if(data.code==200){
            $.each(data.data,function(index,item){
                 $('<a href="javascript:;">').html(item.name).data('id',item.id).appendTo($('.website-all-area'));
            })
           
        }
        
    })

    /**
     * 获取地址栏中参数信息
     */
    var params=function(){
        var paraData=location.href.split('?')||[];
        var obj={};
        $.each(paraData,function(index,item){
            var arr=item.split('=')||[];
            arr.length==2?obj[arr[0]]=arr[1]:'';
        })
        return obj;
    }();
    var dataUrl='';
    /**
     * 跳转页面
     */
    switch(params.name){
        case 'shop':
            dataUrl='shop.html';
            break;
        case 'goods':
            dataUrl='shop-goods.html';
            break;
        case '':
            dataUrl='shop-goods.html';
            break;
    }

    $('.website-all-area').on('click','a',function(){
        open(dataUrl+'?id='+$(this).data('id'),'_self');
    })
    
});