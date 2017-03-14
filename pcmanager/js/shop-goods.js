require(['jquery','jquery-form','main','ajaxAddress','lay-model','log'],function($,jf,myObj,ajaxAddress,layObj,log){
    
    var common=myObj.load();

    var GoodsObj={
        data:{
            tempGoodsContent:$('#shopGoodsCon').html(),

        },
        methods:{
            updateGoodsList:function(data){
                layObj.laytpl(GoodsObj.data.tempGoodsContent).render(data,function(html){
                    $('#tableWrapper').append(html);
                })
            }
        }
    }

    /**
    * 获取商品列表数据
    */
    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.shopGoods.showlist,function(data){
        log.d(data);
        if(data.code==200){
            GoodsObj.methods.updateGoodsList(data.data);
        }else{
            layObj.layer.msg('获取数据失败,请稍后再试!!');
        }
    })

})