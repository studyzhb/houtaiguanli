require(['jquery','jquery-form','main','ajaxAddress','lay-model','log'],function($,jf,myObj,ajaxAddress,layObj,log){
    
    var common=myObj.load();
    var fistLoad=true;
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
    var GoodsObj={
        data:{
            tempGoodsContent:$('#shopGoodsCon').html(),

        },
        methods:{
            updateGoodsList:function(data){
                $('#tableWrapper').html('');
                layObj.laytpl(GoodsObj.data.tempGoodsContent).render(data,function(html){
                    $('#tableWrapper').append(html);
                })
            },
            updatePage:function(){
                layui.use(['laypage', 'layer'],function(){
                    var laypage=layui.laypage;
                    var layer = layui.layer;
                    laypage({
                        cont: 'page'
                        ,pages: GoodsObj.data.pageCount //总页数
                        ,groups: 5 //连续显示分页数
                        ,jump:function(data){
                            //得到页数data.curr
                            GoodsObj.methods.updatePageNum(data.curr);
                        }
                    });
                });

                fistLoad=false;
            },
            updatePageNum:function(num){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.shopGoods.showlist,function(data){
                    log.d(data);
                    if(data.code==200){
                        if(fistLoad){
                            GoodsObj.methods.updatePage();
                        }
                        GoodsObj.data.pageCount=data.pageAllNum%10==0?data.pageAllNum/10:Math.ceil(data.pageAllNum/10);
                        GoodsObj.methods.updateGoodsList(data.data);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{page:num,cityid:params.id,navid:GoodsObj.data.navId});
            },
            updateRecommendList:function(num){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.shopGoods.recommendList,function(data){
                    log.d(data);
                    if(data.code==200){
                        if(fistLoad){
                            GoodsObj.methods.updatePage();
                        }
                        GoodsObj.data.pageCount=data.pageAllNum%10==0?data.pageAllNum/10:Math.ceil(data.pageAllNum/10);
                        GoodsObj.methods.updateShopList(data.data);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{page:num,cityid:params.id,navid:GoodsObj.data.navId});
            },
            updateRecommendStatus:function(id,status){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.shopGoods.addRecommend,function(data){
                    log.d(data);
                    if(data.code==200){
                        layObj.layer.msg('添加成功');
                       location.reload();
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{id:id,recommend:status});
            }
        }
    }

    /**
     * 编辑店铺详细信息
     */

     $('#tableWrapper').on('click','.editInfo',function(){
        //  log.d('nnnn');
         open('editor-shop-goods.html?id='+$(this).data('id'),'_self');
     })


    /**
     * 推荐列表与全部切换
     */
    $('.unedit').on('click',function(){
        $(this).addClass('layui-this').siblings().removeClass('layui-this');
        GoodsObj.methods.updatePageNum(1);
    })

    $('.edited').on('click',function(){
        $(this).addClass('layui-this').siblings().removeClass('layui-this');
        GoodsObj.methods.updateRecommendList(1);
    })

    $('#tableWrapper').on('click','.recommendInfo',function(){
         ShopObj.methods.updateRecommendStatus($(this).data('id'),$(this).data('status'));
     })


    $('.nav-menu-all-area').on('click','a',function(){
        $(this).addClass('active').siblings().removeClass('active');
        //log.d($(this))
        GoodsObj.data.navId=$(this).data('id');
        log.d(GoodsObj.data.navId);
        GoodsObj.methods.updatePageNum(1);
    });

    /**
     * 获取城市列表
     */
    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.nav.getPrimaryNav,function(data){
        log.d(data);
        if(data.code==200){
            $.each(data.data,function(index,item){
                if(index==0){
                    GoodsObj.data.navId=item.id;
                    $('<a href="javascript:;" class="active">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                     GoodsObj.methods.updatePageNum(1);
                }else{
                    $('<a href="javascript:;">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                }  
            })
           
        }
    })


    

})