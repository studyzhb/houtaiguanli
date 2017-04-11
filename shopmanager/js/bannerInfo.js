require(['jquery','main','ajaxAddress','lay-model','img-single-load','log'],function($,myObj,ajaxAddress,layObj,upload,log){
    
    var common=myObj.load();
    var fistLoad=false;
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

    

    $('.cityName').text(unescape(params.name)||'');

    var bannerObj={
        data:{
            navId:'',
            tempGoodsContent:$('#shopGoodsCon').html(),
            tempBannerFix:$('#bannerInfoFixCon').html(),
            pageCount:0
        },
        methods:{
            sortBannerOrder:function(data){
               var arr=[];
               $.each(data,function(index,item){
                   arr[item.displayorder-1]=item
               })
               for(var i=0;i<arr.length;i++){
                   if(!arr[i]){
                       arr[i]={}
                   }
               }
               return arr;
            },
            updateShopList:function(data,tag){

                 var obj={};
                 obj.data=bannerObj.methods.sortBannerOrder(data);
                 obj.navId=bannerObj.data.navId;
                 obj.cityid=params.id;
                 var tpl;
                 log.d(obj);
                 if(tag){
                     $('#tableWrapper').html('');
                     tpl=bannerObj.data.tempGoodsContent;
                 }else{
                     $('#tableWrapperNext').html('');
                     tpl=bannerObj.data.tempBannerFix;
                 }
                 
                layObj.laytpl(tpl).render(obj,function(html){
                    if(tag){
                        $('#tableWrapper').append(html);
                    }else{
                        $('#tableWrapperNext').append(html);
                    }
                    
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
                        if(num==1){
                            bannerObj.methods.updateShopList(data.data,true);
                        }else{
                             bannerObj.methods.updateShopList(data.data,false);
                        }
                        
                    }else if(data.code==300){
                        if(fistLoad){
                            bannerObj.methods.updatePage();
                        }
                        bannerObj.data.pageCount=data.pageAllNum%10==0?data.pageAllNum/10:Math.ceil(data.pageAllNum/10);
                        if(num==1){
                            bannerObj.methods.updateShopList([],true);
                        }else{
                             bannerObj.methods.updateShopList([],false);
                        }
                        
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{page:num,cityid:params.id,position:num});
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
            },
            editorBannerInfo:function(data){
                
                $('.editBannerInfoWrapper').html('');
                var tpl=$('#editorBannerCon').html();
                layObj.laytpl(tpl).render(data,function(html){
                    $('.editBannerInfoWrapper').append(html);
                })
                layObj.layer.open({
                    type:1,
                    content: $('.editMenuForm'), //这里content是一个DOM
                    shade:[0.8,'#000'],
                    area:'600px',
                    zIndex:'10',
                    maxmin: true,
                    end:function(){
                        $('.editMenuForm').hide();
                    }
                })
            },
            updateBannerStatus:function(sta,id){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.banner.updateBannerStatus,function(data){
                    if(data.code==200){
                        layObj.layer.msg(data.msg);
                        bannerObj.methods.updatePageNum(1);
                        bannerObj.methods.updatePageNum(2);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{id:id,status:sta});
            },
            deleteBannerInfo:function(id){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.banner.deleteBanner,function(data){
                    if(data.code==200){
                        bannerObj.methods.updatePageNum(1);
                        bannerObj.methods.updatePageNum(2);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{id:id});
            },
            sortBannerOrderInfo:function(id,order,obj,tag){
                var targetEl={};
                if(tag){
                    var tId=obj.prev().data('id');
                    if(!tId){
                        targetEl='';
                    }else{
                        targetEl.id=obj.prev().data('id')||'';
                        targetEl.displayorder=order+1;
                    }
                    
                }else{
                     var tId=obj.next().data('id');
                    if(!tId){
                        targetEl='';
                    }else{
                        targetEl.id=obj.next().data('id')||'';
                        targetEl.displayorder=order-1;
                    }
                }
                var arr=[];
                arr[0]={id:id,displayorder:order};
                if(targetEl){
                    arr.push(targetEl);
                }
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.banner.sortBanner,function(data){
                    if(data.code==200){
                        bannerObj.methods.updatePageNum(1);
                        bannerObj.methods.updatePageNum(2);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{positionJson:JSON.stringify(arr)});
            }
        }
    }

    /**
     * 编辑店铺详细信息
     */

     $('.mainContent').on('click','.editInfo',function(){
        var bId=$(this).data('id');
        var bTitle=$(this).data('title');
        var bDisplayOrder=$(this).data('displayorder');
        var bPosition=$(this).data('position');
        var bStatus=$(this).data('status');
        var bSlide_src=$(this).data('slidesrc');
        var slide_info=$(this).data('slideinfo');
        var dataInfo={
            id:bId,
            title:bTitle,
            displayorder:bDisplayOrder,
            position:bPosition,
            status:bStatus,
            slide_src:bSlide_src,
            slide_info:slide_info
        }
        
         
         bannerObj.methods.editorBannerInfo(dataInfo);


     })


     /**
     * 添加详细信息
     */

     $('.mainContent').on('click','.addBannerInfo',function(){
        //  log.d('nnnn');
        $('.menuForm')[0].reset();
        $('.imageadd').show().prevAll().remove();
        
         $('.bannerPosition').val($(this).data('order'));
         $('.bannerPositionReal').val($(this).data('position'));
         $('.bannerStatus').val($(this).data('status'));
         layObj.layer.open({
             type:1,
            content: $('.menuForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'600px',
            zIndex:'10',
            maxmin: true,
            end:function(){
                $('.menuForm').hide();
            }
         })



     })

     /**
      * 排序
      */


     $('.mainContent').on('click','.upSort',function(){
        
         
         var bid=$(this).data('id');
         var bOrder=$(this).data('order');
         bannerObj.methods.sortBannerOrderInfo(bid,(bOrder-1),$(this).parents('tr'),true);
     })

     $('.mainContent').on('click','.downSort',function(){
        
        var bid=$(this).data('id');
         var bOrder=$(this).data('order');
         bannerObj.methods.sortBannerOrderInfo(bid,(bOrder+1),$(this).parents('tr'),false);
     })


     /**
     * 失去焦点时请求服务器进行排序
     */
    $('.mainContent').on('blur','.sortInput',function(){
        var value=$(this).val().trim();
        var navId=$(this).data('id');
        var order=$(this).data('order');
        var cd=$(this).data('cityid');
        bannerObj.methods.sortNavListByInput(navId,value,order,cd);
    })

    /**
     * 状态改变
     */
    $('.mainContent').on('click','.icon-btn-sub',function(){
        var sta=$(this).data("status");
        var id=$(this).data("id");
        bannerObj.methods.updateBannerStatus(sta,id);
    })
     
     /**
     * 删除
     */
    $('.mainContent').on('click','.deleteBannerInfo',function(){
        
        var id=$(this).data("id");
        layObj.layer.confirm('你确定要执行删除操作吗?',function(index){
            layObj.layer.close(index);
            bannerObj.methods.deleteBannerInfo(id);
        })    
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
     setTimeout(function(){
         bannerObj.methods.updatePageNum(2);
     },500)
     
    
     /**
     * 图片上传
     */
    $('.imageadd').on('click',function(){
        upload.uploadImage(this);
    });


    setTimeout(function(){
        form=layObj.form();
        form.verify({
            username: function(value){
                if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                return '用户名不能有特殊字符';
                }
                if(/(^\_)|(\__)|(\_+$)/.test(value)){
                return '用户名首尾不能出现下划线\'_\'';
                }
                if(/^\d+\d+\d$/.test(value)){
                return '用户名不能全为数字';
                }
            }
            
            ,pass: [
                /^[\S]{6,12}$/
                ,'密码必须6到12位，且不能出现空格'
            ],
            isChangeValue:function(value,a){
                if($(a).data('info')==value){
                    $(a).val('');
                }  
            }
            });

            form.on('submit(shopInfo)',function(paraData){
                log.d(paraData.field)
                paraData.field.cityid=params.id;
                // paraData.field.navid=params.navid;
                // log.d(formData);
                // var arr=[];
                // arr.push('http://enclosure.wandlm.net/user-release/android_1489550372150.png');
                // // arr.push('http://enclosure.wandlm.net/user-release/android_1489550372150.png');
                // // arr.push('http://enclosure.wandlm.net/user-release/android_1489550372150.png');
                // formData.slide_src=JSON.stringify(arr);
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.banner.addBanner,function(data){
                        log.d(data);
                        if(data.code==200){
                            layObj.layer.msg('添加成功');
                            setTimeout(function(){
                                layObj.layer.closeAll();
                                bannerObj.methods.updatePageNum(1);
                                bannerObj.methods.updatePageNum(2);
                            },1000);
                            
                        }else{
                            layObj.layer.msg(data.msg);
                            setTimeout(function(){
                                // layObj.layer.closeAll();
                                // bannerObj.methods.updatePageNum(1);
                            },1000);
                        }
                    },paraData.field);
                    
                return false;
            });

            form.on('submit(editorBannerCon)',function(paraData){
                log.d(paraData.field)
                paraData.field.cityid=params.id;
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.banner.updateBannerInfo,function(data){
                        log.d(data);
                        if(data.code==200){
                            layObj.layer.msg('添加成功');
                            setTimeout(function(){
                                layObj.layer.closeAll();
                                bannerObj.methods.updatePageNum(1);
                                bannerObj.methods.updatePageNum(2);
                            },1000);
                            
                        }else{
                            layObj.layer.msg(data.msg);
                            setTimeout(function(){
                                // layObj.layer.closeAll();
                                // bannerObj.methods.updatePageNum(1);
                            },1000);
                        }
                    },paraData.field);
                    
                return false;
            });

    },1000)
    
})