require(['jquery','main','log'],function($,myObj,log){

    var common=myObj.load();
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
    }

    $('.website-all-area').on('click','a',function(){
        open(dataUrl,'_self');
    })
    
});