require(['jquery','main','ajaxAddress','lay-model','log'],function($,myObj,ajaxAddress,layObj,log){
    
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
    

    var disObj={
        data:{
            navId:'',
            tempGoodsContent:$('#shopGoodsCon').html(),
            pageCount:0
        },
        methods:{
            updateShopList:function(data){
                 $('#tableWrapper').html('');
                 var obj={};
                 obj.data=data;
                 obj.navId=disObj.data.navId;
                 obj.cityid=params.id;
                 log.d(layObj);
                layObj.laytpl(disObj.data.tempGoodsContent).render(obj,function(html){
                    $('#tableWrapper').append(html);
                })
            },
            updatePage:function(){
                layui.use(['laypage', 'layer'],function(){
                    var laypage=layui.laypage;
                    var layer = layui.layer;
                    laypage({
                        cont: 'page'
                        ,pages: disObj.data.pageCount //总页数
                        ,groups: 5 //连续显示分页数
                        ,jump:function(data){
                            //得到页数data.curr
                            disObj.methods.updatePageNum(data.curr);
                        }
                    });
                });

                fistLoad=false;
            },
            updatePageNum:function(num){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.discount.showlist,function(data){
                    log.d(data);
                    if(data.code==200){
                        if(fistLoad){
                            disObj.methods.updatePage();
                        }
                        disObj.data.pageCount=data.pageAllNum%10==0?data.pageAllNum/10:Math.ceil(data.pageAllNum/10);
                        disObj.methods.updateShopList(data.data);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{page:num,cityid:params.id,navid:disObj.data.navId});
            },
            /**
             * @param {Number} id 要排序的导航id 
             * @param {Number} order 要排序的位置
             */
            sortNavListByInput:function(id,order,oldOrder){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.discount.sortBenefit,function(data){
                    if(data.code==200){
                        location.reload();
                    }
                },{id:id,oldPostion:oldOrder,newPostion:order});
            }
        }
    }

    /**
     * 编辑店铺详细信息
     */

     $('#tableWrapper').on('click','.editInfo',function(){
        //  log.d('nnnn');
         open('editor-discountInfo.html?id='+$(this).data('id'),'_self');
     })


     /**
     * 失去焦点时请求服务器进行排序
     */
    $('#tableWrapper').on('blur','.sortInput',function(){
        var value=$(this).val().trim();
        var navId=$(this).data('id');
        var order=$(this).data('order');
        disObj.methods.sortNavListByInput(navId,value,order);
    })
     
    /**
     * 点击添加店铺先选择导航
     */
    $('.add-shop-info').on('click',function(){
        open('add-discountInfo.html?cityid='+params.id+'&navid='+disObj.data.navId,'_self');
    })

    $('.nav-menu-all-area').on('click','a',function(){
        $(this).addClass('active').siblings().removeClass('active');
        //log.d($(this))
        disObj.data.navId=$(this).data('id');
        // log.d(disObj.data.navId);
        disObj.methods.updatePageNum(1);
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
    //         disObj=data.pageAllNum%10==0?data.pageAllNum/10:Math.ceil(data.pageAllNum/10);
    //        disObj.methods.updateShopList(data.data);
    //     }else{
    //         layObj.layer.msg('获取数据失败,请稍后再试!!');
    //     }
    // })
    
    /**
     * 获取城市列表
     */
    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.nav.getPrimaryNav,function(data){
        // log.d(data);
        if(data.code==200){
            $.each(data.data,function(index,item){
                if(index==0){
                    disObj.data.navId=item.id;
                    $('<a href="javascript:;" class="active">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                     disObj.methods.updatePageNum(1);
                }else{
                    $('<a href="javascript:;">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                }  
            })
           
        }
    })

    
})