require(['jquery','main','ajaxAddress','lay-model','log'],function($,myObj,ajaxAddress,layObj,log){
    var common=myObj.load();
    var fistLoad=true;
    var alertFirstLoad=true;
    var form;
    /**
     * 获取地址栏中参数信息
     */
    var params=function(){

        var paraData=location.href.split('?')||[];
        var readyData=paraData[1]?paraData[1]:'';
        var arrData=readyData.split('&')||[];
        log.d(location.href);
        var obj={};
        
        $.each(arrData,function(index,item){

            var arr=item.split('=')||[];
            
            obj[arr[0]]=arr[1];
            
        })

        return obj;
    }();

    var ObligationGoodsObj={
        data:{

        },
        methods:{
            
        }
    }

    //打开生成商品包界面
    $('.createGoodsBag').on('click',function(){
        layObj.layer.open({
            type:1,
            content: $('#goodsBag'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:['98%','90%'],
            maxmin: true,
            end:function(){
                $('#goodsBag').hide();
            }
        })
    });

})