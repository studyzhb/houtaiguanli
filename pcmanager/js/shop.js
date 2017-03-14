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
    

    var ShopObj={
        data:{
            navId:'',
            tempGoodsContent:$('#shopGoodsCon').html(),
            pageCount:0
        },
        methods:{
            updateShopList:function(data){
                 $('#tableWrapper').html('');
                layObj.laytpl(ShopObj.data.tempGoodsContent).render(data,function(html){
                    $('#tableWrapper').append(html);
                })
            },
            updatePage:function(){
                layui.use(['laypage', 'layer'],function(){
                    var laypage=layui.laypage;
                    var layer = layui.layer;
                    laypage({
                        cont: 'page'
                        ,pages: ShopObj.data.pageCount //总页数
                        ,groups: 5 //连续显示分页数
                        ,jump:function(data){
                            //得到页数data.curr
                            ShopObj.methods.updatePageNum(data.curr);
                        }
                    });
                });

                fistLoad=false;
            },
            updatePageNum:function(num){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.shop.shoplist,function(data){
                    log.d(data);
                    if(data.code==200){
                        if(fistLoad){
                            ShopObj.methods.updatePage();
                        }
                        ShopObj.data.pageCount=data.pageAllNum%10==0?data.pageAllNum/10:Math.ceil(data.pageAllNum/10);
                        ShopObj.methods.updateShopList(data.data);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{page:num,cityid:params.id,navid:ShopObj.data.navId});
            }
        }
    }

   

    /**
     * 点击添加店铺先选择导航
     */
    $('.add-shop-info').on('click',function(){
        // layObj.layer.open({
        //     type:1,
        //     content: $('.alertWrapper'), //这里content是一个DOM
        //     shade:[0.8,'#000'],
        //     area:'400px',
        //     maxmin: true
        // })
        open('add-shop.html?navid='+ShopObj.data.navId,'_self');
    })

    $('.nav-menu-all-area').on('click','a',function(){
        $(this).addClass('active').siblings().removeClass('active');
        //log.d($(this))
        ShopObj.data.navId=$(this).data('id');
        log.d(ShopObj.data.navId);
        ShopObj.methods.updatePageNum(1);
    });

    /**
     * 
     */
    $('.alertWrapper').on('click','a',function(){

    })

    // $('#purchaselist').on()

    /**
    * 获取商品列表数据
    */
    // common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.shop.shoplist,function(data){
    //     log.d(data);
    //     if(data.code==200){
    //         ShopObj=data.pageAllNum%10==0?data.pageAllNum/10:Math.ceil(data.pageAllNum/10);
    //        ShopObj.methods.updateShopList(data.data);
    //     }else{
    //         layObj.layer.msg('获取数据失败,请稍后再试!!');
    //     }
    // })
    /**
     * 获取城市列表
     */
    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.nav.showNavlist,function(data){
        log.d(data);
        if(data.code==200){
            $.each(data.data,function(index,item){
                if(index==0){
                    ShopObj.data.navId=item.id;
                    $('<a href="javascript:;" class="active">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                     ShopObj.methods.updatePageNum(1);
                }else{
                    $('<a href="javascript:;">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                }  
            })
           
        }
    })
})