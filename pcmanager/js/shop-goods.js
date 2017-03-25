require(['jquery','jquery-form','main','ajaxAddress','lay-model','log','params','image-upload'],function($,jf,myObj,ajaxAddress,layObj,log,params,upload){
    
    var common=myObj.load();
    var fistLoad=true;
    
    $('.cityName').text(unescape(params.name));
    var GoodsObj={
        data:{
            tempGoodsContent:$('#shopGoodsCon').html(),
            pageCount:0,
            currentPage:'1',
            currentRePage:'1',
            //当前处于哪个tab栏 1为全部列表,2为已推荐
            currentStatus:'1',
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
                            //得到页数data.curr
                            if(GoodsObj.data.currentStatus=='1'){
                                GoodsObj.data.currentPage=data.curr;
                                GoodsObj.methods.updatePageNum(data.curr);
                            }else if(GoodsObj.data.currentStatus=='2'){
                                GoodsObj.data.currentRePage=data.curr;
                                GoodsObj.methods.updateRecommendList(data.curr);
                            }
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
                            GoodsObj.methods.updatePage(GoodsObj.data.currentPage);
                        }
                        GoodsObj.data.pageCount=Math.ceil(data.total/data.pageSize);
                        $('.detailCount').text(data.total);
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
                        GoodsObj.data.pageCount=Math.ceil(data.total/data.pageSize);
                        $('.detailCount').text(data.total);
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
                       GoodsObj.methods.updatePageNum(GoodsObj.data.currentPage);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{id:id,recommend:status});
            },
            updateShopGoodsStatus:function(sta,id){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.shopGoods.updateShopGoodsStatus,function(data){
                    if(data.code==200){
                        layObj.layer.msg(data.msg);
                        GoodsObj.methods.updatePageNum(GoodsObj.data.currentPage);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{id:id,status:sta});
            },
            deleteShopGoodsInfo:function(id){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.shopGoods.deleteShopGoodsInfo,function(data){
                    if(data.code==200){
                       GoodsObj.methods.updatePageNum(GoodsObj.data.currentPage);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{id:id});
            },
            /**
             * 获取单个商品详情
             */
            getSingleInfo:function(id){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.shopGoods.getGoodsById,function(data){
                    log.d(data);
                    if(data.code==200){
                        GoodsObj.methods.updateShopInfo(data.data);     
                    }else{
                        layObj.layer.msg('网络错误,请稍后再试.')
                    }
                },{id:id});
            },
            updateShopInfo:function(data){
                var tpl=$('#formCon').html();
                $('.formWrapper').html('');

                layObj.laytpl(tpl).render(data,function(html){
                    $('.formWrapper').append(html);
                    setTimeout(function(){
                        form.render();
                    },600);
                });
            }
        }
    }

    layui.use('laydate',function(){
       var laydate=layui.laydate;
        var start = {
            min: laydate.now()
            ,format: 'YYYY-MM-DD hh:mm:ss'
            ,max: '2099-06-16 23:59:59'
            ,istoday: false
            ,choose: function(datas){
                var timeStamp=Math.floor(new Date(datas).getTime());
                $(this.elem).next('input').val(Math.floor(timeStamp/1000));
                
                end.min = datas; //开始日选好后，重置结束日的最小日期
                end.start = datas //将结束日的初始值设定为开始日
            }
        };
        
        var end = {
            min: laydate.now()
            ,format: 'YYYY-MM-DD hh:mm:ss'
            ,max: '2099-06-16 23:59:59'
            ,istoday: false
            ,choose: function(datas){
                var timeStamp=Math.floor(new Date(datas).getTime());
                $(this.elem).next('input').val(Math.floor(timeStamp/1000));
                start.max = datas; //结束日选好后，重置开始日的最大日期
            }
        };

        $('#date').on('click',function(){
            
            start.elem = this;
            layObj.laydate(start);
        })
        $('#date01').on('click',function(){
            end.elem = this
            layObj.laydate(end);
        })

        $('.formWrapper').on('click','#date',function(){
            
            start.elem = this;
            layObj.laydate(start);
        })
        $('.formWrapper').on('click','#date01',function(){
            end.elem = this
            layObj.laydate(end);
        })
   })
    /**
     * 图片上传
     */
    $('.formWrapper').on('click','.imageadd',function(){
        upload.uploadImage(this);
    });

    /**
     * 推荐与否
     */
    $('#tableWrapper').on('click','.icon-btn-sub',function(){
        var sta=$(this).data("status");
        var id=$(this).data("id");
        GoodsObj.methods.updateRecommendStatus(id,sta);
    })
    /**
     * 停用或启用
     */
    $('#tableWrapper').on('click','.icon-btn',function(){
        var sta=$(this).data("status");
        var id=$(this).data("id");
        if(sta=='0'){
            layObj.layer.confirm('你确定要下架此商品?',function(index){
                layObj.layer.close(index);
                 GoodsObj.methods.updateShopGoodsStatus(sta,id);
            })
        }else{
             GoodsObj.methods.updateShopGoodsStatus(sta,id);
        } 
    })

    /**
     * 删除商品
     */
    $('#tableWrapper').on('click','.deleteGoodsInfo',function(){
        
        var id=$(this).data("id");
        layObj.layer.confirm('你确定要删除此商品?',function(index){
            layObj.layer.close(index);
            GoodsObj.methods.deleteShopGoodsInfo(id);
        })
        
    })

    /**
     * 编辑店铺详细信息
     */
     $('#tableWrapper').on('click','.editInfo',function(){
        //  log.d('nnnn');
        GoodsObj.methods.getSingleInfo($(this).data('id'));
        layObj.layer.open({
             type:1,
            content: $('.editMenuForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:['95%','80%'],
            zIndex:10,
            maxmin: true,
            end:function(){
                $('.editMenuForm').hide();
            }
         })
     })


    /**
     * 推荐列表与全部切换
     */
    $('.unedit').on('click',function(){
        GoodsObj.data.currentStatus='1';
        fistLoad=true;
        $(this).addClass('layui-this').siblings().removeClass('layui-this');
        GoodsObj.methods.updatePageNum(GoodsObj.data.currentPage);
    })

    $('.edited').on('click',function(){
        GoodsObj.data.currentStatus='2';
        fistLoad=true;
        $(this).addClass('layui-this').siblings().removeClass('layui-this');
        GoodsObj.methods.updateRecommendList(GoodsObj.data.currentRePage);
    })

   


    $('.nav-menu-all-area').on('click','a',function(){
        $(this).addClass('active').siblings().removeClass('active');
        //log.d($(this))
        GoodsObj.data.navId=$(this).data('id');
        log.d(GoodsObj.data.navId);
        GoodsObj.methods.updatePageNum(GoodsObj.data.currentPage);
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
                     GoodsObj.methods.updatePageNum(GoodsObj.data.currentPage);
                }else{
                    $('<a href="javascript:;">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                }  
            })
           
        }
    })

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
                    $(a).removeAttr("name");
                }   
            }
            });

            form.on('submit(editorDiscountInfo)',function(paraData){
                paraData.field.itude=paraData.field.longitude+','+paraData.field.latitude;
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.shopGoods.editShopGoodsById,function(data){
                    log.d(data);
                    if(data.code==200){
                        layObj.layer.msg('更新成功');
                        layObj.layer.closeAll();
                        GoodsObj.methods.updatePageNum(GoodsObj.data.currentPage);
                    }else{
                        layObj.layer.msg(data.msg);
                        GoodsObj.methods.getSingleInfo();
                    }
                },paraData.field);
            })
    },1000)

    

})