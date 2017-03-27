require(['jquery','main','ajaxAddress','lay-model','log','baiduMap','image-upload','params','img-single-load'],function($,myObj,ajaxAddress,layObj,log,mapObj,upload,params,uploadsingle){
    
    var common=myObj.load();
    var fistLoad=true;
    var form;
    
    
    $('.cityName').text(unescape(params.name));
    var ShopObj={
        data:{
            navId:'',
            tempGoodsContent:$('#shopGoodsCon').html(),
            pageCount:0,
            shopid:'',
            arrLabel:[],
            labelJson:[],
            arrGoodsLabel:[],
            arrShopClassify:[],
            arrGoodsClassify:[],
            arrAreaGoods:[],
            sortObj:{},
            currentPage:'1',
            currentRePage:'1',
            //当前处于哪个tab栏 1为全部列表,2为已推荐
            currentStatus:'1',
        },
        methods:{
            updateShopList:function(data){
                 $('#tableWrapper').html('');
                 var obj={};
                 obj.data=data;
                 obj.navId=ShopObj.data.navId;
                 obj.cityid=params.id;
                 log.d(layObj);
                layObj.laytpl(ShopObj.data.tempGoodsContent).render(obj,function(html){
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
                            if(ShopObj.data.currentStatus=='1'){
                                ShopObj.data.currentPage=data.curr;
                                ShopObj.methods.updatePageNum(data.curr);
                            }else if(ShopObj.data.currentStatus=='2'){
                                ShopObj.data.currentRePage=data.curr;
                                ShopObj.methods.updateRecommendList(data.curr);
                            }                 
                        }
                    });
                });

                fistLoad=false;
            },
            updatePageNum:function(num){
                log.d(params);
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.shop.shoplist,function(data){
                    log.d(data);
                    if(data.code==200){
                        if(fistLoad){
                            ShopObj.methods.updatePage();
                        }
                        ShopObj.data.pageCount=Math.ceil(data.total/data.pageSize);
                        $('.detailCount').text(data.total);
                        ShopObj.methods.updateShopList(data.data);
                    }else{
                        layObj.layer.msg(data.msg);
                        ShopObj.methods.updateShopList([]);
                    }
                },{page:num,cityid:params.id,navid:ShopObj.data.navId});
            },
            updateRecommendList:function(num){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.shop.recommendList,function(data){
                    log.d(data);
                    if(data.code==200){
                        if(fistLoad){
                            ShopObj.methods.updatePage();
                        }
                        ShopObj.data.pageCount=Math.ceil(data.total/data.pageSize);
                        $('.detailCount').text(data.total);
                        ShopObj.methods.updateShopList(data.data);
                    }else{
                        layObj.layer.msg(data.msg);
                        ShopObj.methods.updateShopList([]);
                    }
                },{page:num,cityid:params.id,navid:ShopObj.data.navId});
            },
            updateRecommendStatus:function(id,status){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.shop.addRecommend,function(data){
                    log.d(data);
                    if(data.code==200){
                        layObj.layer.msg('添加成功');
                        ShopObj.methods.updatePageNum(1);
                    }else{
                        layObj.layer.msg(data.msg);

                    }
                },{id:id,recommend:status});
            },
            updateShopStatus:function(sta,id){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.shop.updateShopStatus,function(data){
                    if(data.code==200){
                        layObj.layer.msg(data.msg);
                        ShopObj.methods.updatePageNum(ShopObj.data.currentPage);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{id:id,status:sta});
            },
            /**
             * 获取单个店铺信息
             */
            getSingleInfo:function(id){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.shop.getShopInfoById,function(data){
                    log.d(data);
                    if(data.code==200){
                        ShopObj.methods.updateShopInfo(data.data);
                    }
                },{id:id,cityid:params.id,navid:ShopObj.data.navId});
            },
            updateShopInfo:function(data){
                var tpl=$('#formCon').html();
                $('.formWrapper').html('');
                $('.mapWrapper').append($('#mapContainer'));
                var pArr=data.itude?data.itude.split(',')||[]:[];
                new AMap.Marker({
                    position :pArr,
                    map : mapObj
                })
                layObj.laytpl(tpl).render(data,function(html){
                    $('.formWrapper').append(html);
                    setTimeout(function(){
                        form.render();
                    },600);
                });
            },
            getLabelInfo:function(){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.label.getLabelListByNavId,function(data){
                    log.d(data);
                    if(data.code==200){
                        ShopObj.data.arrLabel=data.data;
                    }else{
                        ShopObj.data.arrLabel=[];
                    }
                },{navid:ShopObj.data.navId});
            },
            getGoodsLabelInfo:function(){
                //TODO 产品标签数据
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.label.getGoodsLabelListByNavId,function(data){
                    log.d(data);
                    if(data.code==200){
                        ShopObj.data.arrGoodsLabel=data.data;
                    }else{
                        ShopObj.data.arrGoodsLabel=[];
                    }
                },{navid:ShopObj.data.navId});
            },
            getAreaInfo:function(){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.area.getAreaTypeList,function(data){
                    log.d(data);
                    if(data.code==200){
                        ShopObj.data.arrArea=data.data;
                    }else{
                        ShopObj.data.arrArea=[];
                    }
                },{cityid:params.id});
            },
            //添加商品时获取区域信息
            addGoodsGetAreaInfo:function(id){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.area.getAreaGoodsTypeList,function(data){
                    log.d(data);
                    if(data.code==200){
                        ShopObj.data.arrAreaGoods=data.data;
                    }else{
                        ShopObj.data.arrAreaGoods={};
                    }
                },{shopid:ShopObj.data.shopid});
            },
            //添加商品时获取分类信息
            addGoodsGetSortInfo:function(){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.sort.goodsShowlist,function(data){
                    log.d(data);
                    if(data.code==200){
                        ShopObj.data.arrGoodsClassify=data.data;
                    }else{
                        ShopObj.data.arrGoodsClassify=[];
                    }

                },{navid:ShopObj.data.navId});
            },
            //添加店铺时获取分类信息
            addShopGetSortInfo:function(){
                var shopClassify;
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.sort.showlist,function(data){
                    log.d(data);
                    if(data.code==200){
                        shopClassify=data.data;
                        ShopObj.data.arrShopClassify=data.data;
                    }else{
                        shopClassify=[];
                        ShopObj.data.arrShopClassify=[];
                    }
                    // $('.shopProWrapper').html('');
                    // $.each(shopClassify.children,function(index,item){
                    //     $('<option>').appendTo($('.shopProWrapper')).html(item.name).attr('name',item.id);
                    // })
                    // form.render();
                },{navid:ShopObj.data.navId});
            },
            renderShopInfo:function(){
                var tpl=$('#shopTypeCon').html();
                var tplArea=$('#shopAreaCon').html();
                var tplClass=$('#shopSortTypeCon').html();
                $('.labelWrapper').html('');
                $('.shopTypeWrapper').html('');
                $('.shopProWrapper').html('');
                layObj.laytpl(tpl).render(ShopObj.data.arrLabel,function(html){
                    $('.labelWrapper').append(html);
                })
                layObj.laytpl(tplClass).render(ShopObj.data.arrShopClassify,function(html){
                    $('.shopProWrapper').append(html);
                })
                layObj.laytpl(tplArea).render(ShopObj.data.arrArea,function(html){
                    $('.shopTypeWrapper').append(html);
                })
                form.render();
            },
            /**
             * 编辑渲染标签
             */
            renderEditShopInfo:function(){
                var tpl=$('#shopTypeCon').html();
                var tplArea=$('#shopAreaCon').html();
                layObj.laytpl(tpl).render(ShopObj.data.arrLabel,function(html){
                    $('.labelWrapper').append(html);
                })

                layObj.laytpl(tplArea).render(ShopObj.data.arrArea,function(html){
                    $('.shopTypeWrapper').append(html);
                })
                form.render();
            },
            /**
             * 渲染添加产品所需标签
             */
            renderAddGoodsInfo:function(){
                var tpl=$('#shopTypeCon').html();
                var tplClass=$('#shopSortTypeCon').html();
                $('.goodsTypeWrapper').html('');
                $('.goodsProWrapper').html('');
                layObj.laytpl(tpl).render(ShopObj.data.arrGoodsLabel,function(html){
                    $('.goodsTypeWrapper').append(html);
                })
                layObj.laytpl(tplClass).render(ShopObj.data.arrGoodsClassify,function(html){
                    $('.goodsProWrapper').append(html);
                })
            },
            repeatArr:function(arr){
                var nArr=[];
                var obj={};
                var str="";
                // for(var i=0;i<arr.length;i++){
                //     if(!obj[arr[i]['id']]){
                //         obj[arr[i]['id']]=arr[i].name;
                //     }else{
                //         obj[arr[i]['id']]=obj[arr[i]['id']]+','+arr[i].name;
                //     }
                // }
                // for(var key in obj){
                //     var o={};
                //     o[key]=obj[key];
                //     nArr.push(o);
                // }

                for(var i=0;i<arr.length;i++){
                    
                    if(i==arr.length-1){
                        str+=arr[i].name;
                    }else{
                        str+=arr[i].name+',';
                    }
                }
                
                return str;
            }
        }
    }

    $('.shopWrapper').on('click','.icon-display',function(){
        
        var $o=$(this).parents('.detail-banner-split');
        var $input=$o.parent('.image-suolve').next('input');
        var imgStr=$(this).data('info');
        console.log(imgStr);
        if(/\[/.test($input.val())){
            var arr=JSON.parse($input.val());
            $.each(arr,function(index,item){
                if(item==imgStr){
                    arr.splice(index,1);
                    return false;
                }
            })
        }else{
            $input.val('');
        }

        $o.remove();
        
        return false;
    })

    $('.shopWrapper').on('mouseover','.detail-banner-split',function(){
        $(this).find('.icon-display').show();
        $(this).find('.opacity-z-index').show();
    })

    $('.shopWrapper').on('mouseleave','.detail-banner-split',function(){
        $(this).find('.icon-display').hide();
         $(this).find('.opacity-z-index').hide();
    })

    /**
     * 推荐列表与全部切换
     */
    $('.unedit').on('click',function(){
        ShopObj.data.currentStatus='1';
        fistLoad=true;
        $(this).addClass('layui-this').siblings().removeClass('layui-this');
        ShopObj.methods.updatePageNum(ShopObj.data.currentPage);
    })

    $('.edited').on('click',function(){
        ShopObj.data.currentStatus='2';
        fistLoad=true;
        $(this).addClass('layui-this').siblings().removeClass('layui-this');
        ShopObj.methods.updateRecommendList(ShopObj.data.currentRePage);
    })
    
    /**
     * 编辑店铺详细信息
     */
     $('#tableWrapper').on('click','.editInfo',function(){
        ShopObj.data.labelJson=[];
        ShopObj.methods.getSingleInfo($(this).data('id'));
        layObj.layer.open({
             type:1,
            content: $('.editMenuForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:['95%','98%'],
            zIndex:10,
            maxmin: true,
            end:function(){
                $('.editMenuForm').hide();
            }
         })
         
     })

     /**
      * 添加店铺产品
      */
     $('#tableWrapper').on('click','.add-shop-goods',function(){
        // open('add-shop-goods.html?cityid='+$(this).data('cityid')+'&navid='+$(this).data('navid')+'&shopid='+$(this).data('id'),'_self');
        $('.addShopGoodsForm')[0].reset();
        $('.imageadd').show().prevAll().remove();
        var shopName=$(this).data('name');
        //获取产品所属分类
        ShopObj.methods.addGoodsGetSortInfo();
        ShopObj.data.shopid=$(this).data('id');
        ShopObj.methods.renderAddGoodsInfo();
        //获取产品所属店铺的区域
        ShopObj.methods.addGoodsGetAreaInfo();
        ShopObj.data.labelJson=[];
        // 打开添加店铺信息窗口
        layObj.layer.open({
             type:1,
             title:shopName,
            content: $('.addShopGoodsForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:['95%','98%'],
            zIndex:10,
            maxmin: true,
            end:function(){
                $('.addShopGoodsForm').hide();
            }
         })

     })
     

     /**
     * 推荐与否
     */
    $('#tableWrapper').on('click','.icon-btn-sub',function(){
        var sta=$(this).data("status");
        var id=$(this).data("id");
        ShopObj.methods.updateRecommendStatus(id,sta);
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
                 ShopObj.methods.updateShopStatus(sta,id);
            })
        }else{
             ShopObj.methods.updateShopStatus(sta,id);
        } 
    })


    /**
     * 点击添加店铺先选择导航
     */
    $('.add-shop-info').on('click',function(){
        ShopObj.data.labelJson=[];
        $('.menuForm')[0].reset();
        $('.imageadd-single').show().prevAll().remove();
        $('.imageadd').show().prevAll().remove();
        $('.addmapWrapper').append($('#mapContainer'));
        ShopObj.methods.renderShopInfo();
        ShopObj.methods.addShopGetSortInfo();
        // 打开添加店铺信息窗口
        layObj.layer.open({
             type:1,
             title:'店铺添加',
            content: $('.menuForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:['95%','98%'],
            zIndex:10,
            maxmin: true,
            end:function(){
                $('.menuForm').hide();
            }
         })
        // open('add-shop.html?navid='+ShopObj.data.navId+'&cityid='+params.id,'_self');
    })

    $('.nav-menu-all-area').on('click','a',function(){
        $(this).addClass('active').siblings().removeClass('active');
        //log.d($(this))
        ShopObj.data.navId=$(this).data('id');
        log.d(ShopObj.data.navId);
        ShopObj.methods.updatePageNum(ShopObj.data.currentPage);
        ShopObj.methods.getLabelInfo();
        ShopObj.methods.getGoodsLabelInfo();
        ShopObj.methods.addShopGetSortInfo();
    });

    
    /**
     * 获取城市列表
     */
    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.nav.getPrimaryNav,function(data){
        // log.d(data);
        var ind;
        params.navid&&(ind=params.navid);
        ShopObj.methods.getAreaInfo();
        
        if(data.code==200){
            $.each(data.data,function(index,item){
            if(ind&&item.id==ind||index==0&&!ind){
                    ShopObj.data.navId=item.id;
                    $('<a href="javascript:;" class="active">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                     ShopObj.methods.updatePageNum(ShopObj.data.currentPage);
                     ShopObj.methods.getLabelInfo();
                     ShopObj.methods.getGoodsLabelInfo();
                     ShopObj.methods.addShopGetSortInfo();
                }else{
                    $('<a href="javascript:;">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                }  
            })
           
        }
    })

    /**
     * 图片上传
     */
    $('.imageadd').on('click',function(){
        upload.uploadImage(this);
    });

    $('.imageadd-single').on('click',function(){
        uploadsingle.uploadImage(this);
    })

    /**
     * 图片上传
     */
    $('.formWrapper').on('click','.imageadd',function(){
        upload.uploadImage(this);
    });

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
            end.elem = this;
            layObj.laydate(end);
        })

        $('#date03').on('click',function(){
            end.elem = this;
            console.log('date03')
            layObj.laydate(start);
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


   setTimeout(function(){
       log.d(layObj);
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
            },
            findLabelToJson:function(value,a){
                
                // obj[$(a).attr('name')]=value;
                if(a.checked){
                    var obj={};
                    obj.id=$(a).attr('name');
                obj.name=value;
                ShopObj.data.labelJson.push(obj);
                }
                
            },
            sortToJson:function(value,a){
                var stock=ShopObj.data.sortObj[$(a).attr('name')]||[];
                if(a.checked){
                   stock.push(value);  
                }
            }
            });

            form.on('submit(shopInfo)',function(paraData){
                log.d(paraData.field)
                log.d(ShopObj.data.labelJson)
                paraData.field.cityid=params.id;
                paraData.field.navid=ShopObj.data.navId;
                paraData.field.itude=paraData.field.longitude+','+paraData.field.latitude;
                var arr=ShopObj.methods.repeatArr(ShopObj.data.labelJson);

                paraData.field.shop_label=arr;
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.shop.addShopList,function(data){
                        ShopObj.data.labelJson=[];
                        log.d(data);
                        if(data.code==200){
                            ShopObj.data.labelJson=[];
                            layer.msg('添加成功');
                            setTimeout(function(){
                                layObj.layer.closeAll();
                                ShopObj.methods.updatePageNum(ShopObj.data.currentPage);
                            },1000);
                        }else{
                            ShopObj.data.labelJson=[];
                            layer.msg('网络错误，请稍后重试');
                            setTimeout(function(){
                                
                            },1000);
                        }
                    },paraData.field);
                    
                return false;
            });

            form.on('submit(saveShopGoodsInfo)',function(paraData){
                
                paraData.field.cityid=params.id;
                paraData.field.navid=ShopObj.data.navId;
                paraData.field.shopid=ShopObj.data.shopid;
                paraData.field.area=ShopObj.data.arrAreaGoods.area;
                paraData.field.business=ShopObj.data.arrAreaGoods.business;
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.shopGoods.addShopGoods,function(data){
                        log.d(data);
                        if(data.code==200){
                            layer.msg('添加成功');
                            setTimeout(function(){
                                layObj.layer.closeAll();
                                ShopObj.methods.updatePageNum(ShopObj.data.currentPage);
                            },1000);
                            
                        }else{
                            layer.msg('网络错误，请稍后重试');
                            setTimeout(function(){
                                
                            },1000);
                        }
                    },paraData.field);
                    
                return false;
            });

            form.on('submit(editorDiscountInfo)',function(paraData){
            paraData.field.itude=paraData.field.longitude+','+paraData.field.latitude;
            var arr=ShopObj.methods.repeatArr(ShopObj.data.labelJson);
                
                paraData.field.shop_label=arr;
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.shop.updateShop,function(data){
                log.d(data);
                ShopObj.data.labelJson=[];
                if(data.code==200){
                    layObj.layer.msg('更新成功');
                    layObj.layer.closeAll();
                    ShopObj.methods.updatePageNum(ShopObj.data.currentPage);
                }else{
                    layObj.layer.msg(data.msg);
                    ShopObj.methods.getSingleInfo();
                }
            },paraData.field);
        })
    },1500)
    
})