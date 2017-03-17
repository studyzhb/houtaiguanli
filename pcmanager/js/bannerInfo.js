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
    

    var bannerObj={
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
                 obj.navId=bannerObj.data.navId;
                 obj.cityid=params.id;
                 log.d(layObj);
                 
                layObj.laytpl(bannerObj.data.tempGoodsContent).render(obj,function(html){
                    $('#tableWrapper').append(html);
                })
            },
            updatePage:function(){
                layui.use(['laypage', 'layer'],function(){
                    var laypage=layui.laypage;
                    var layer = layui.layer;
                    laypage({
                        cont: 'page'
                        ,pages: bannerObj.data.pageCount //总页数
                        ,groups: 5 //连续显示分页数
                        ,jump:function(data){
                            //得到页数data.curr
                            bannerObj.methods.updatePageNum(data.curr);
                        }
                    });
                });

                fistLoad=false;
            },
            updatePageNum:function(num){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.banner.showlist,function(data){
                    log.d(data);
                    if(data.code==200){
                        if(fistLoad){
                            bannerObj.methods.updatePage();
                        }
                        bannerObj.data.pageCount=data.pageAllNum%10==0?data.pageAllNum/10:Math.ceil(data.pageAllNum/10);
                        bannerObj.methods.updateShopList(data.data);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{page:num,cityid:params.id});
            },
            /**
             * @param {Number} id 要排序的导航id 
             * @param {Number} order 要排序的位置
             */
            sortNavListByInput:function(id,order,oldOrder,cityid){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.banner.sortBanner,function(data){
                    if(data.code==200){
                        location.reload();
                    }
                },{id:id,oldPostion:oldOrder,newPostion:order,cityid:cityid});
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
        var cd=$(this).data('cityid');
        bannerObj.methods.sortNavListByInput(navId,value,order,cd);
    })
     
    /**
     * 点击添加店铺先选择导航
     */
    $('.add-shop-info').on('click',function(){
        open('add-bannerInfo.html?cityid='+params.id,'_self');
    })

    $('.nav-menu-all-area').on('click','a',function(){
        $(this).addClass('active').siblings().removeClass('active');
        //log.d($(this))
        bannerObj.data.navId=$(this).data('id');
        // log.d(bannerObj.data.navId);
        bannerObj.methods.updatePageNum(1);
    });

    /**
     * 
     */
    $('.alertWrapper').on('click','a',function(){

    })


     bannerObj.methods.updatePageNum(1);
    

    
})