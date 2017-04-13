require(['jquery','main','ajaxAddress','lay-model','log','params'],function($,myObj,ajaxAddress,layObj,log,params){
    
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
            sortAnotherArr:[],
            currentPage:'1',
            currentRePage:'1',
            //当前处于哪个tab栏 1为全部列表,2为已推荐
            currentStatus:'1',
            searched:true
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
            updatePage:function(para){
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
                                ShopObj.methods.updatePageNum(data.curr,para);
                            }else if(ShopObj.data.currentStatus=='2'){
                                ShopObj.data.currentRePage=data.curr;
                                ShopObj.methods.updateRecommendList(data.curr);
                            }                 
                        }
                    });
                });

                fistLoad=false;
            },
            updatePageNum:function(num,para){
                var options={
                    page:num,
                    cityid:params.id,
                    navid:ShopObj.data.navId
                }

                para=$.extend(options,para||{});

                log.d(params);
                $('#tableWrapper').html('');
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.shop.bankCardList,function(data){
                    log.d(data);
                    if(data.code==200){
                        if(fistLoad){
                            ShopObj.methods.updatePage(para);
                        }
                        ShopObj.data.pageCount=Math.ceil(data.total/data.pageSize);
                        $('.detailCount').text(data.total);
                        ShopObj.methods.updateShopList(data.data);
                    }else{
                        layObj.layer.msg(data.msg);
                        ShopObj.methods.updateShopList([]);
                    }
                });
            },
            updateRecommendList:function(num){
                $('#tableWrapper').html('');
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
            getSingleInfo:function(data){
                //TODO
                ShopObj.methods.updateShopInfo(data);              
            },
            updateShopInfo:function(data){
                var tpl=$('#formCon').html();
                $('.formWrapper').html('');
                $('.mapWrapper').append($('#mapContainer'));
                var pArr=data.itude?data.itude.split(',')||[]:[];
                
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
            addGoodsGetSortInfo:function(shopid,fn){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.sort.goodsClassifyByShop,function(data){
                    log.d(data);
                    if(data.code==200){
                        ShopObj.data.arrGoodsClassify=data.data;
                        fn();
                    }else{
                        ShopObj.data.arrGoodsClassify=[];
                    }

                },{navid:ShopObj.data.navId,shopid:shopid});
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
                var tplClass=$('#goodsSortTypeCon').html();
                $('.goodsTypeWrapper').html('');
                $('.goodsProWrapper').html('');
                

                layObj.laytpl(tpl).render(ShopObj.data.arrGoodsLabel,function(html){
                    $('.goodsTypeWrapper').append(html);
                })
                //渲染产品分类数据
                layObj.laytpl(tplClass).render(ShopObj.data.arrGoodsClassify,function(html){
                    $('.goodsProWrapper').append(html);
                })
                $('.targetDestinationWrapper').html('');
                //如果是旅游导航添加目的地
                if(ShopObj.data.goodsTemplate=='travel'){
                    $('.targetDestinationWrapper').append($('#travelCon').html());
                }else{
                     //$('.targetDestinationWrapper').append($('#travelCon').html());
                }

                form.render();
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
            },
            //排序
            sortOrderInfo:function(id,order,obj,tag){
                var targetEl={};
                var tId,tOrder;
                if(tag){
                    tId=obj.prev().data('id');
                    tOrder=obj.prev().data('order');
                    if(!tId){
                        targetEl='';
                    }else{
                        targetEl.id=tId||'';
                        targetEl.displayorder=order;
                    }
                    
                }else{
                     tId=obj.next().data('id');
                     tOrder=obj.next().data('order');
                    if(!tId){
                        targetEl='';
                    }else{
                        targetEl.id=tId||'';
                        targetEl.displayorder=order;
                    }
                }
                var arr=[];
                arr[0]={id:id,displayorder:tOrder};
                if(targetEl){
                    arr.push(targetEl);
                }
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.shop.sortShop,function(data){
                    if(data.code==200){
                        layObj.layer.msg('排序成功');
                        ShopObj.methods.updatePageNum(ShopObj.data.currPage);
                        
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{positionJson:JSON.stringify(arr)});
            },
            /**
             * 搜索
             */
            searchInfo:function(val,checval){
                // business:ShopObj.data.selectedBusinessArea,
                //获取筛选参数
                var obj={
                    status:ShopObj.data.selectedStatus,
                    recommend:ShopObj.data.selectedRecommend,
                    
                    check:ShopObj.data.selectedCheckStatus,
                    name:val
                 };
                //  if(checval){
                     obj.proprietor=checval||' ';
                //  }
                 if(ShopObj.data.searched){
                     fistLoad=true;
                     $('.searchForm')[0].reset();
                     ShopObj.methods.updatePageNum(ShopObj.data.currentPage,obj);
                 }else{
                     layObj.layer.msg('推荐列表状态下不支持搜索,请切换..')
                 }
                
            },
            /**
             * 监听键盘事件
             */
            keydown:function (event){
                var key = (event||window.event).keyCode;
                var result = document.getElementById("result1")
                var cur = result.curSelect;
                
                if(key===40){
                    if(cur + 1 < result.childNodes.length){
                        if(result.childNodes[cur]){
                            result.childNodes[cur].style.background='';
                        }
                        result.curSelect=cur + 1;
                        result.childNodes[cur+1].style.background='#CAE1FF';
                        document.getElementById("keyword").value = result.tipArr[cur+1].name;
                    }
                }else if(key===38){
                    if(cur - 1>=0){
                        if(result.childNodes[cur]){
                            result.childNodes[cur].style.background='';
                        }
                        result.curSelect=cur-1;
                        result.childNodes[cur-1].style.background='#CAE1FF';
                        document.getElementById("keyword").value = result.tipArr[cur-1].name;
                    }
                }else if(key === 13){
                    var res = document.getElementById("result1");
                    if(res && res['curSelect'] !== -1){
                        ShopObj.methods.selectResult(document.getElementById("result1").curSelect);
                    }
                }else{
                    ShopObj.methods.autoSearch();
                }
            },
            /**
             * 根据关键字查询
             */
            selectResult:function(){

            },
            //定位选择输入提示关键字
            focus_callback:function () {
                if (navigator.userAgent.indexOf("MSIE") > 0) {
                    document.getElementById("keyword").onpropertychange = ShopObj.methods.autoSearch;
                }
            },
            autoSearch:function(){
                
            }
        }
    }

    $('.shopWrapper').on('click','.icon-display',function(){
    
        var $o=$(this).parents('.detail-banner-split');
        var $input=$o.parent('.image-suolve').next('input');
        var imgStr=$(this).data('info');
        var val=$input.val();
        // imgStr=/\[/.test(imgStr)?JSON.parse(imgStr)[0]||'':imgStr[0];
        imgStr=typeof imgStr=='object'?imgStr[0]:(/\[/.test(imgStr)?JSON.parse(imgStr)[0]:imgStr);
        if(/\[/.test(val)||typeof val=='object'){
            var arr=typeof val=='string'?JSON.parse(val)||[]:val;
            
            $.each(arr,function(index,item){
                if(item==imgStr){
                    arr.splice(index,1);
                    return false;
                }
            })
            $input.val(JSON.stringify(arr)).attr('data-info',JSON.stringify(arr));
        }else{
            $input.val('');
        }
        $o.siblings('.imageadd').show();
        $o.siblings('.imageadd-single').show();
        $o.remove();
        
        return false;
    })

    $('.shopWrapper').on('mouseover','.detail-banner-split',function(){
        // $(this).find('.icon-display').show();
        // $(this).find('.opacity-z-index').show();

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
        ShopObj.data.searched=true;
        $(this).addClass('layui-this').siblings().removeClass('layui-this');
        ShopObj.methods.updatePageNum(ShopObj.data.currentPage);
    })

    $('.edited').on('click',function(){
        ShopObj.data.currentStatus='2';
        fistLoad=true;
        ShopObj.data.searched=false;
        $(this).addClass('layui-this').siblings().removeClass('layui-this');
        ShopObj.methods.updateRecommendList(ShopObj.data.currentRePage);
    })
    
    /**
     * 编辑银行卡信息
     */
     $('#tableWrapper').on('click','.editInfo',function(){
        var obj={};
        //TODO
        ShopObj.methods.getSingleInfo(obj);
        layObj.layer.open({
             type:1,
            content: $('.editorAreaTypeWrapper'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'400px',
            zIndex:10,
            maxmin: true,
            end:function(){
                $('.editorAreaTypeWrapper').hide();
            }
         })
         
     })

     /**
      * 监听键盘事件目的地
      */
      $('.targetDestinationWrapper').on('keyup','.targetInput',function(e){
          var val=$(this).val();
          //console.log(val);
          //ShopObj.methods.keydown(e,val);
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
     * 店铺搜索功能 2017 3/30
     * 首先选择要搜索的分类
     */
    $('.searchByKeywords').on('click',function(){
        var con=$('.searchName').val();
        var checkval=$('.searchCheckname').val();
        ShopObj.methods.searchInfo(con,checkval);
    })


    /**
     * 点击添加店铺先选择导航
     */
    $('.add-shop-info').on('click',function(){

        $('#authorForm')[0].reset();
        $('#authorForm').find('input:not([type=radio],[type=checkbox])').val('').attr('data-info','');
        document.getElementById('authorForm').reset();
        

        // 打开添加店铺信息窗口
        layObj.layer.open({
             type:1,
             title:'银行卡添加',
            content: $('#authorForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'400px',
            zIndex:10, 
            maxmin: true,
            end:function(){
                $('#authorForm').hide();
            }
         })
        // open('add-shop.html?navid='+ShopObj.data.navId+'&cityid='+params.id,'_self');
    })



    /**
     * 排序
     */
    $('#tableWrapper').on('click','.upSort',function(){
        
         
         var bid=$(this).data('id');
         var bOrder=$(this).data('order');
         ShopObj.methods.sortOrderInfo(bid,bOrder,$(this).parents('tr'),true);
     })

     $('#tableWrapper').on('click','.downSort',function(){
        
        var bid=$(this).data('id');
         var bOrder=$(this).data('order');
         ShopObj.methods.sortOrderInfo(bid,bOrder,$(this).parents('tr'),false);
     })

         ShopObj.methods.updatePageNum(ShopObj.data.currentPage);
    
        // ShopObj.methods.getSingleInfo();

    



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
                var stock=ShopObj.data.sortObj[$(a).attr('name')]=ShopObj.data.sortObj[$(a).attr('name')]?ShopObj.data.sortObj[$(a).attr('name')]:[];
                if(a.checked){
                   stock.push(value);  
                }

            },
            sortAnotherToJson:function(value,a){
                
                if(a.checked){
                    ShopObj.data.sortAnotherArr.push(value);
                }
                
            }
            });

            //监听单选是否显示
            form.on('radio(isClickTrue)',function(obj){
                
                if(obj.value=='3'){
                    $(obj.elem).parent().next().show();
                }else{
                    $(obj.elem).parent().next().hide();
                }
            })

            //监听单选是否显示
            form.on('radio(isCheckTrue)',function(obj){
                
                if(obj.value=='1'){
                    $(obj.elem).parent().next().show();
                }else{
                    $(obj.elem).parent().next().hide();
                }
            })

            form.on('submit(shopInfo)',function(paraData){
                log.d(paraData.field)
                log.d(ShopObj.data.labelJson)
                paraData.field.cityid=params.id;
                paraData.field.navid=ShopObj.data.navId;
                paraData.field.itude=paraData.field.longitude+','+paraData.field.latitude;
                var arr=ShopObj.methods.repeatArr(ShopObj.data.labelJson);
                // $.extend(paraData.field,ShopObj.data.sortObj);
                for(var i in ShopObj.data.sortObj){
                    ShopObj.data.sortObj[i]=ShopObj.data.sortObj[i].join(',');
                    paraData.field[i]=ShopObj.data.sortObj[i];
                }
                paraData.field.shop_label=arr;
                paraData.field.classifyids=ShopObj.data.sortAnotherArr.join(',');
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.shop.addShopList,function(data){
                        ShopObj.data.labelJson=[];
                        ShopObj.data.sortObj={};
                        ShopObj.data.sortAnotherArr=[];
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
                paraData.field.shopname=ShopObj.data.shopname;
                paraData.field.area=ShopObj.data.arrAreaGoods.area;
                paraData.field.business=ShopObj.data.arrAreaGoods.business;
                var arr=ShopObj.methods.repeatArr(ShopObj.data.labelJson);
                paraData.field.goods_label=arr;
                //分类合并
                // paraData.field.classifyids=ShopObj.data.sortAnotherArr.join(',');
                //添加产品时所需要的模板
                paraData.field.template=ShopObj.data.goodsTemplate;
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.shopGoods.addShopGoods,function(data){
                        ShopObj.data.sortObj={};
                        ShopObj.data.labelJson=[];
                        ShopObj.data.sortAnotherArr=[];
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
                for(var i in ShopObj.data.sortObj){
                    ShopObj.data.sortObj[i]=ShopObj.data.sortObj[i].join(',');
                    paraData.field[i]=ShopObj.data.sortObj[i];
                }
                paraData.field.shop_label=arr;
                paraData.field.classifyids=ShopObj.data.sortAnotherArr.join(',');
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.shop.updateShop,function(data){
                log.d(data);
                ShopObj.data.sortObj={};
                ShopObj.data.labelJson=[];
                ShopObj.data.sortAnotherArr=[];
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

        /**
         * 搜索下拉选中
         */
        form.on('select(selectStatus)',function(data){
            ShopObj.data.selectedStatus=data.value;
        })

        form.on('select(selectCheckStatus)',function(data){
            ShopObj.data.selectedCheckStatus=data.value;
        })

        form.on('select(selectRecommend)',function(data){
            ShopObj.data.selectedRecommend=data.value;
        })

        form.on('select(selectBusinessArea)',function(data){
            ShopObj.data.selectedBusinessArea=data.value;
        })

    },500)

    
})