require(['jquery','main','ajaxAddress','lay-model','log','params'],function($,myObj,ajaxAddress,layObj,log,params){
    
    var common=myObj.load();
    var fistLoad=true;

    var GoodsObj={
        data:{
            tempGoodsContent:$('#shopGoodsCon').html(),
            pageCount:0,
            currentPage:'1',
            currentRePage:'1',
            //当前处于哪个tab栏 1为全部列表,2为已推荐
            currentStatus:'1',
            labelJson:[],
            sortAnotherArr:[]
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
                            if(GoodsObj.data.currentPage!=data.curr){
                                GoodsObj.data.currentPage=data.curr;
                                GoodsObj.methods.updatePageNum(data.curr);
                            }
                        }
                    });
                });

                fistLoad=false;
            },
            //更新列表
            updatePageNum:function(num){
                var obj={page:num};
               
                $.extend(true,obj,GoodsObj.data.cacheData||{});
                $('#tableWrapper').html('');

                common.tools.ajax('get',ajaxAddress.publicAddress+ajaxAddress.shopDetail.convertedList,function(data){
                    log.d(data);
                    if(data.code==200){
                        data=data.data.list;
                        GoodsObj.data.pageCount=Math.ceil(data.total/data.per_page);
                        $('.detailCount').text(data.total);
                        GoodsObj.methods.updateGoodsList(data.bonus_list);
                        if(fistLoad){
                            GoodsObj.methods.updatePage();
                        }
                    }else{
                        GoodsObj.methods.updateGoodsList([]);
                        $('.detailCount').text(0);
                        GoodsObj.data.pageCount=1;
                        if(fistLoad){
                            GoodsObj.methods.updatePage();
                        }
                        layObj.layer.msg(data.message);
                    }
                },obj);
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
                
                var editorKindId='container'+Math.floor(Math.random()*1000)

               $('<script name="introduce" type="text/plain" style="width:99.5%;height:300px;overflow:auto;">').appendTo($('.formWrapper').find('.goodsintro')).html(data.introduce).attr('id',editorKindId);
                
               /**
                 * 加载百度编辑器
                 */
                var editor = UE.getEditor(editorKindId,{
                    toolbars:[['source','undo','redo','inserttable']],
                    autoHeightEnabled:true,
                    autoFloatEnabled: true
                });
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
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.shopGoods.sortGoods,function(data){
                    if(data.code==200){
                        layObj.layer.msg('排序成功');
                        GoodsObj.methods.updatePageNum(GoodsObj.data.currPage);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{positionJson:JSON.stringify(arr)});
            }
        }
    }

    layui.use('laydate',function(){
       var laydate=layui.laydate;
        var start = {

            format: 'YYYY-MM-DD hh:mm:ss'
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

            format: 'YYYY-MM-DD hh:mm:ss'
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
    * 滑过出现删除
    */
    $('.formWrapper').on('click','.icon-display',function(){
        
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

    $('.formWrapper').on('mouseover','.detail-banner-split',function(){
        $(this).find('.icon-display').show();
        $(this).find('.opacity-z-index').show();

    })

    $('.formWrapper').on('mouseleave','.detail-banner-split',function(){
        $(this).find('.icon-display').hide();
         $(this).find('.opacity-z-index').hide();
    })

    

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
        GoodsObj.data.sortObj={};
        GoodsObj.data.labelJson=[];
        GoodsObj.data.sortAnotherArr=[];
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
                $('script#container').appendTo($('body'));
            }
         })
     })




    /**
     * 排序
     */
    $('#tableWrapper').on('click','.upSort',function(){
        
         
         var bid=$(this).data('id');
         var bOrder=$(this).data('order');
         GoodsObj.methods.sortOrderInfo(bid,bOrder,$(this).parents('tr'),true);
     })

     $('#tableWrapper').on('click','.downSort',function(){
        
        var bid=$(this).data('id');
         var bOrder=$(this).data('order');
         GoodsObj.methods.sortOrderInfo(bid,bOrder,$(this).parents('tr'),false);
     })

      GoodsObj.methods.updatePageNum(GoodsObj.data.currentPage);


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
            },
            findLabelToJson:function(value,a){
                
                // obj[$(a).attr('name')]=value;
                if(a.checked){
                    var obj={};
                    obj.id=$(a).attr('name');
                obj.name=value;
                GoodsObj.data.labelJson.push(obj);
                }
                
            },
            sortToJson:function(value,a){
                var stock=GoodsObj.data.sortObj[$(a).attr('name')]=GoodsObj.data.sortObj[$(a).attr('name')]?GoodsObj.data.sortObj[$(a).attr('name')]:[];
                if(a.checked){
                   stock.push(value);  
                }

            },
            sortAnotherToJson:function(value,a){
                
                if(a.checked){
                    GoodsObj.data.sortAnotherArr.push(value);
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

            form.on('submit(editorDiscountInfo)',function(paraData){
                paraData.field.itude=paraData.field.longitude+','+paraData.field.latitude;
                // paraData.field.classifyids=GoodsObj.data.sortAnotherArr.join(',');
                var arr=GoodsObj.methods.repeatArr(GoodsObj.data.labelJson);
                paraData.field.goods_label=arr;
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.shopGoods.editShopGoodsById,function(data){
                    log.d(data);
                    $('script#container').appendTo($('body'));
                    GoodsObj.data.sortObj={};
                    GoodsObj.data.labelJson=[];
                    GoodsObj.data.sortAnotherArr=[];
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

            form.on('submit(searchByKeywords)',function(paraData){
                fistLoad=true;
                GoodsObj.data.cacheData=paraData.field;
                GoodsObj.data.currentPage=1;
                GoodsObj.methods.updatePageNum(GoodsObj.data.currentPage);
            })

            /**
             * 查询券码
             */
            form.on('submit(checkCode)',function(paraData){
                common.tools.ajax('post',ajaxAddress.publicAddress+ajaxAddress.shopDetail.scanConvertNum,function(data){
                    
                    if(data.code==200){
                        layObj.layer.confirm('确定使用?',function(index){
                            layObj.layer.close(index);
                            layObj.layer.load();
                            //改变状态
                            common.tools.ajax('post',ajaxAddress.publicAddress+ajaxAddress.shopDetail.confirmConvert,function(data){
                                layObj.layer.closeAll();
                                layObj.layer.msg(data.message);
                                if(data.code==200){
                                    GoodsObj.methods.updatePageNum(GoodsObj.data.currentPage);
                                }else{

                                }
                            },paraData.field);
                        })
                    }else{
                        layObj.layer.closeAll('loading');
                        layObj.layer.msg(data.message);
                        
                    }
                },paraData.field);
            })

    },1000)

    
    /**
     * 校验用户消费券码
     */
    $('.verifyOrderCode').on('click',function(){
        layObj.layer.open({
             type:1,
             title:'优惠券查询',
            content: $('.checkFormCode'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'400PX',
            zIndex:10,
            maxmin: true,
            end:function(){
                $('.checkFormCode').hide();
               
            }
         })
    })


})