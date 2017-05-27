require(['jquery','main','ajaxAddress','lay-model','log','params'],function($,myObj,ajaxAddress,layObj,log,params){
    
    var common=myObj.load();
    var fistLoad=true;
    var alertFirstLoad=true;
    var form;


    var classObj={
        data:{
            pageCount:'',
            pageSize:10,
            isCanClick:true,
            navId:'',
            typeId:"",
            typeInfo:[],
            tempGoodsContent:$('#sortContent').html(),
            arrData:[],
            alertPageCount:'1',
            currentPage:'1',
            sortTagShow:false,
            sortTagClickNum:0,
            isShowSortCon:false,
            currentPageNum:1,
        },
        methods:{
            updateArealist:function(data){
                $('#all-sort-list').html('');
                 var obj={};
                 obj.data=data;
                layObj.laytpl(classObj.data.tempGoodsContent).render(obj,function(html){
                    $('#all-sort-list').append(html);
                })
            },
            updatePage:function(){
                layui.use(['laypage', 'layer'],function(){
                    var laypage=layui.laypage;
                    var layer = layui.layer;
                    laypage({
                        cont: 'page'
                        ,pages: classObj.data.pageCount //总页数
                        ,groups: 5 //连续显示分页数
                        ,jump:function(data){
                            //得到页数data.curr
                            if(classObj.data.currentPageNum!=data.curr){
                                 classObj.data.currentPageNum=data.curr;
                                classObj.methods.updatePageNum(data.curr);
                            }
                           
                        }
                    });
                });

                fistLoad=false;
            },
            updatePageNum:function(num,obj){
                var para={
                    p:num
                }
                if(obj){
                    para.queue=obj.queue;
                }
                $.extend(true,para,classObj.data.cacheData||{});
                common.tools.ajax('get',ajaxAddress.obligationManagerPreFix+ajaxAddress.obligation.obligationLineList,function(data){
                    log.d(data);
                    
                    if(data.code==200){
                        classObj.data.arrData=data.data.queue_list;
                        // $('form').each(function(){
                        //     this.reset();
                        // })
                        classObj.data.pageCount=Math.ceil(data.data.all_num/classObj.data.pageSize);

                        classObj.methods.updateArealist(data.data.queue_list);
                        if(fistLoad){
                            classObj.methods.updatePage();
                        }
                    }else{
                        classObj.methods.updateArealist([]);
                        classObj.data.pageCount=1;
                        if(fistLoad){
                            classObj.methods.updatePage();
                        }
                        layObj.layer.msg(data.message);
                    }
                },para);
            },
            updateStatusType:function(sta,upId,obj){
                // var item=classObj.methods.getSingleInfo(upId);
                var item={};
                item.status=sta;
                item.order_id=upId;
                common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.obligation.queueList.leaveUser,function(data){
                    log.d(data);
                    classObj.data.isCanClick=true;
                    if(data.code==200){
                        //location.reload();
                        layObj.layer.closeAll();
                        layObj.layer.msg(data.message);
                        classObj.methods.updatePageNum(classObj.data.currentPageNum);
                        
                    }else{
                        layObj.layer.msg(data.message);
                        // layObj.layer.closeAll();
                        //location.reload();
                    }
                },item);
            },
            updateStatusInfoType:function(sta,upId,obj,pId){
                common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.obligation.queueList.readyGoods,function(data){
                    log.d(data);
                    classObj.data.isCanClick=true;
                    if(data.code==200){
                        //location.reload();
                        layObj.layer.closeAll();
                        layObj.layer.msg(data.message);
                        classObj.methods.updatePageNum(classObj.data.currentPageNum);
                        
                    }else{
                        layObj.layer.msg(data.msg);
                        // layObj.layer.closeAll();
                        //location.reload();
                    }
                },{order_id:upId});
            },
            finishedSatusInfoType:function(sta,upId,obj,pId){
                common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.obligation.queueList.finishedGoods,function(data){
                    log.d(data);
                    classObj.data.isCanClick=true;
                    if(data.code==200){
                        //location.reload();
                        layObj.layer.closeAll();
                        layObj.layer.msg(data.message);
                        classObj.methods.updatePageNum(classObj.data.currentPageNum);
                        
                    }else{
                        layObj.layer.msg(data.msg);
                        // layObj.layer.closeAll();
                        //location.reload();
                    }
                },{order_id:upId});
            },
            updateSubInfo:function(obj){

            },
            deleteClassInfo:function(id){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.classify.deleteClassInfo,function(data){
                    log.d(data);
                    
                    if(data.code==200){
                        
                        layObj.layer.closeAll();
                        classObj.methods.updatePageNum(classObj.data.currentPageNum);
                       
                        
                    }else{
                        layObj.layer.msg(data.msg);
                        layObj.layer.closeAll();
                        classObj.methods.updatePageNum(classObj.data.currentPageNum);
                    }
                },{id:id});
            },
            //
            updateObligationInfo:function(data){
                
                var tpl=$('#editorNavCon').html();
                $('.editor-area-type').html('');
                 
                    layObj.laytpl(tpl).render(data,function(html){
                        $('.editor-area-type').append(html);
                        form.render();
                    })
                
                 layObj.layer.open({
                    type:1,
                    content: $('#editorAreaTypeWrapper'), //这里content是一个DOM
                    shade:[0.8,'#000'],
                    area:'400px',
                    maxmin: true,
                    end:function(){
                        classObj.data.isCanClick=true;
                        $('#editorAreaTypeWrapper').hide();
                    }
                })        
            },
            getSingleInfo:function(id) {
            
                var singleInfo;
                $.each(classObj.data.arrData,function(index,item){
                    if(id==item.id){
                        singleInfo=item;
                        return false;
                    }
                })

                return singleInfo;
            },
            //删除债权金标准下的商品
            deleteGoodsFromObligationType:function(id){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.obligation.deleteObligationGoods,function(data){
                    
                    
                    if(data.code==200){
                        
                        layObj.layer.closeAll('loading');
                        
                        classObj.methods.updateObligationTypeInfoById(classObj.data.typeId,classObj.data.currentPage);
                       
                        
                    }else{
                        layObj.layer.closeAll('loading');
                        layObj.layer.msg(data.message);
                        
                    }
                },{good_id:id});
            },
            getQueueList:function(){
                common.tools.ajax('get',ajaxAddress.obligationPreFix+ajaxAddress.obligation.queueMode.showlist,function(data){
                    log.d(data);
                    
                    if(data.code==200){
                        classObj.data.arrData=data.data.queue_list;
                        $('.selectedQueueList').html('');
                        $.each(classObj.data.arrData,function(index,item){
                            if(index==0){
                                $('<option selected>').appendTo($('.selectedQueueList')).html(item.name).attr('value',item.id);
                            }else{
                                $('<option>').appendTo($('.selectedQueueList')).html(item.name).attr('value',item.id);
                                
                            }
                            
                        })

                        setTimeout(function(){
                            form.render();
                        },1000);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{status:2});
            }
        }
    }


    /**
     * 发放商品
     */
    $('#all-sort-list').on('click','.sendDiscountGoods',function(){

        var upId=classObj.data.current_order_id=$(this).data('id');
        var self=this;
        layObj.layer.open({
            title:'点击确定发送完毕',
            type:1,
            content: $('#sendPerferGoodsWrapper'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'600px',
            maxmin: true,
            end:function(){
                classObj.data.isCanClick=true;
                $('#sendPerferGoodsWrapper').hide();
            }
        })  

    })

    setTimeout(function(){
        form=layObj.form();
        form.on('submit(sendPreferGoods)',function(formParams){
            log.d(formParams.field)
            formParams.field.order_id=classObj.data.current_order_id;
            common.tools.ajax('post',ajaxAddress.obligationManagerPreFix+ajaxAddress.obligation.sendPreFer,function(data){
                    log.d(data);
                    if(data.code==200){
                        layObj.layer.closeAll();
                        layer.msg('发放成功');
                        classObj.methods.updatePageNum(classObj.data.currentPageNum);    
                    }else{
                        
                        layObj.layer.closeAll();
                        layer.msg(data.message);

                    }
                },formParams.field);
                
            return false;
        })

        form.on('submit(searchObligationModelList)',function(formParams){
            classObj.data.cacheData=classObj.data.cacheData||{};
            $.extend(true,classObj.data.cacheData,formParams.field||{});
            fistLoad=true;
            // formParams.field
            classObj.data.currentPageNum=1;
            classObj.methods.updatePageNum(1);
            return false;
        })

    },1000);


     classObj.methods.updatePageNum(classObj.data.currentPageNum);
    //  classObj.methods.getQueueList();


})