require(['jquery','main','ajaxAddress','lay-model','log'],function($,myObj,ajaxAddress,layObj,log){
    
    var common=myObj.load();
    var fistLoad=true;
    var alertFirstLoad=true;
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

    var classObj={
        data:{
            pageCount:'',
            isCanClick:true,
            navId:'',
            typeId:"",
            typeInfo:[],
            tempGoodsContent:$('#sortContent').html(),
            arrData:[],
            alertPageCount:'1',
            currentPageNum:'1'
        },
        methods:{
            //获取用户的历史记录
            updateObligationTypeInfoById:function(id,p){
                $('#goods-orderlist').html('');
                common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.viplist.lookVipHisInfo,function(data){
                    
                    var tml=$('#showGoodsContent').html();
                    if(data.code==200){
                        
                        // classObj.data.alertPageCount=Math.ceil(data.num/data.limit)||1;
                        
                        // $('.obligationTotal').html(data.num);
                        layObj.laytpl(tml).render(data.data.cash,function(html){
                            $('#goods-orderlist').append(html);
                        })
                        // if(alertFirstLoad){
                        //     classObj.methods.updateAlertPage(id);
                        // }
                    }
                },{user_id:id});
            },
            //获取用户的个人信息
            updateObligationPersonInfoById:function(id,p){
                $('#basePersonInfo').html('');
                
                common.tools.ajax('get',ajaxAddress.obligationPreFix+ajaxAddress.viplist.getUserBalance,function(data){
                    
                    var tml=$('#showBaseInfoCon').html();
                    if(data.code==200){
                        // layObj.laytpl(tml).render(data.data,function(html){
                        //     $('#basePersonInfo').append(html);
                        // })
                       common.tools.ajax('get',ajaxAddress.obligationPreFix+ajaxAddress.viplist.getBaseInfo,function(toData){
                            var obj={
                                balanceInfo:data.data,
                                baseInfo:toData.data
                            }
                            var tml=$('#showBaseInfoCon').html();
                            if(data.code==200){
                                
                                // classObj.data.alertPageCount=Math.ceil(data.num/data.limit)||1;
                                
                                // $('.obligationTotal').html(data.num);
                                layObj.laytpl(tml).render(obj,function(html){
                                    $('#basePersonInfo').append(html);
                                })
                                // if(alertFirstLoad){
                                //     classObj.methods.updateAlertPage(id);
                                // }
                            }
                        },{user_id:id});
                    }
                },{user_id:id});

            },
            updateArealist:function(data){
                $('#all-sort-list').html('');
                 var obj={};
                 obj.data=data;
                 log.d(obj);
                layObj.laytpl(classObj.data.tempGoodsContent).render(obj,function(html){
                    $('#all-sort-list').append(html);
                })
            },
            updateAlertPage:function(id){
                
                layui.use(['laypage', 'layer'],function(){
                    var laypage=layui.laypage;
                    var layer = layui.layer;
                    laypage({
                        cont: 'alertpage'
                        ,pages: classObj.data.alertPageCount //总页数
                        ,groups: 5 //连续显示分页数
                        ,jump:function(data){
                            //得到页数data.curr
                           
                            if(classObj.data.currentPage==data.curr){
                                 classObj.data.currentPage=data.curr;
                            }else{
                                classObj.data.currentPage=data.curr;
                                classObj.methods.updateObligationTypeInfoById(id,data.curr);
                            }
                            
                        }
                    });
                });

                alertFirstLoad=false;
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
                            if(classObj.data.currentPageNum==data.curr){

                            }else{
                                classObj.data.currentPageNum=data.curr;
                                classObj.methods.updatePageNum(data.curr);
                            }
                            
                        }
                    });
                });

                fistLoad=false;
            },
            updatePageNum:function(num,params){
                var obj={
                    p:num
                }
                if(params){
                    obj.tel=params.tel
                }
                $.extend(true,obj,classObj.data.cacheData||{});
                
                common.tools.ajax('get',ajaxAddress.obligationPreFix+ajaxAddress.viplist.showlist,function(data){
                    log.d(data);
                    if(data.code==200){
                        classObj.data.arrData=data.data.queue_list;
                        
                        classObj.data.pageCount=Math.ceil(data.data.all_num/data.data.page_num);
                        $('.detailCount').text(data.data.all_num);
                        classObj.methods.updateArealist(data.data.queue_list);
                        if(fistLoad){
                            classObj.methods.updatePage();
                        }
                    }else{
                        classObj.methods.updateArealist([]);
                        layObj.layer.msg(data.message);
                    }
                },obj);
            },
            updateAreaType:function(data){
                classObj.data.typeInfo=data;
                $.each(data,function(index,item){
                    $('<option>').appendTo($('select.areaType')).attr('value',item.id).text(item.name);
                })
                form=layObj.form();
                form.render();
                form.on('select(areaType)',function(data){
                   classObj.methods.updatePageNum(1,data.value); 
                })
            },
            getAreaInfo:function(id,fn){
                log.d(id);
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.classify.updateAreaInfo,function(data){
                    log.d(data);
                    if(data.code==200){
                        fn(data.data);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{id:id});
            },
            updateStatusType:function(upId){
                // var item=classObj.methods.getSingleInfo(upId);
                var item={};
                // item.status=sta;
                item.order_id=upId;
                item.status=1;
                common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.obligation.backGoods.updateStatus,function(data){
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
            updateStatusInfoType:function(upId){
                common.tools.ajax('get',ajaxAddress.obligationOutPreFix+ajaxAddress.obligation.output.getOneInfo,function(data){
                    log.d(data);
                    classObj.data.isCanClick=true;
                    if(data.code==200){
                        //location.reload();
                        layObj.layer.closeAll();
                        
                        
                    }else{
                        layObj.layer.msg(data.msg);
                        // layObj.layer.closeAll();
                        //location.reload();
                    }
                },{id:upId});
            },
            updateSubInfo:function(obj){

            },
            deleteClassInfo:function(id){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.classify.deleteClassInfo,function(data){
                    log.d(data);
                    
                    if(data.code==200){
                        
                        layObj.layer.closeAll();
                        classObj.methods.updatePageNum(1);
                       
                        
                    }else{
                        layObj.layer.msg(data.msg);
                        layObj.layer.closeAll();
                        classObj.methods.updatePageNum(1);
                    }
                },{id:id});
            },
            //
            updateObligationInfo:function(data){
                
                var tpl=$('#editorNavCon').html();
                $('.editor-area-type').html('');
                    data.goodsBagArr=classObj.data.goodsBagArr;
                    layObj.laytpl(tpl).render(data,function(html){
                        $('.editor-area-type').append(html);
                        form.render();
                    })
                
                 layObj.layer.open({
                    type:1,
                    content: $('#editorAreaTypeWrapper'), //这里content是一个DOM
                    shade:[0.8,'#000'],
                    area:'600px',
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
            getGoodsBagList:function(){
                common.tools.ajax('get',ajaxAddress.obligationPreFix+ajaxAddress.obligation.goodsBag.showlist,function(data){
                    
                    
                    if(data.code==200){
                        classObj.data.goodsBagArr=data.data.pack_list;

                    }else if(data.code==409){
                        
                        
                    }else{

                    }
                });
            },
            inputMoney:function(obj){
                obj.user_id=classObj.data.user_id;
                common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.viplist.inputMoney,function(data){
                    if(data.code==200){
                        layObj.layer.closeAll();
                        layObj.layer.msg(data.message);
                        $('form').each(function(){
                            this.reset();
                        })
                        classObj.methods.updatePageNum(classObj.data.currentPageNum);
                    }else if(data.code==409){
                        layObj.layer.msg('请先设置支付密码');
                        layObj.layer.confirm('是否同意将支付密码设置为手机后6位？',function(index){
                            layObj.layer.close(index);
                            classObj.methods.syncPassword(obj.user_id,classObj.data.tel);
                        })
                    }else{
                        layObj.layer.closeAll('loading');
                        layObj.layer.msg(data.message);
                    }
                },obj);
            },
            syncPassword:function(id,tel){
                common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.viplist.updatePayPassword,function(data){
                    if(data.code==200){
                        layObj.layer.closeAll();
                        layObj.layer.msg(data.message);
                        classObj.methods.updatePageNum(classObj.data.currentPageNum);
                    }else{
                        layObj.layer.closeAll('loading');
                        layObj.layer.msg(data.message);
                    }
                },{user_id:id,tel:tel});
            }
        }
    }

    // common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.area.getAreaType,function(data){
    //      classObj.methods.updateAreaType(data.data);
    //      classObj.methods.updatePageNum(1);
    //     log.d(data);
    //     if(data.code==200){
            
    //     }else{
    //         layObj.layer.msg(data.msg);
    //     }
       
        
    // },{cityId:params.id})
    /**
     * 状态更改
     */
    $('#all-sort-list').on('click','.approve',function(){
        var status=$(this).data('status');
        var upId=$(this).data('id');
        var tel=$(this).data('tel');
        classObj.data.user_id=upId;
        classObj.data.tel=tel;
        var self=this;
        // layObj.layer.prompt({title: '请输入充值金额', formType: 0}, function(text, index){
        //     // layer.load();
        //     layer.close(index);
            // classObj.methods.inputMoney(upId,text,tel);
        // });
        layObj.layer.open({
            type: 1,
            title:'请输入充值金额并选择类型',
            content: $('#areaInfoForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'600px',
            maxmin: true,
            end:function() {
            // body...
            $('#areaInfoForm').hide();
            }
        })
  
    })

    
    //确认提现
     $('#all-sort-list').on('click','.confirmapprove',function(){
        var status=$(this).data('status');
        var upId=$(this).data('id');
        var self=this;
        classObj.methods.updateStatusInfoType(upId);
  
    })

    //获取商品包
    // classObj.methods.getGoodsBagList();

    //删除标准下的商品
    $('#goods-orderlist').on('click','.deleteObligationType',function(){
        var id=$(this).data('id');
        layObj.layer.load();
        layObj.layer.confirm('确定删除?',function(index){
            layObj.layer.close(index);
            classObj.methods.deleteGoodsFromObligationType(id);
        })
    })



    setTimeout(function(){
        form=layObj.form();

        form.on('submit(shopInfo)',function(formParams){
            log.d(formParams.field)
            layObj.layer.load();
            formParams.field.navid=classObj.data.navId;
            common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.obligation.queueMode.addNewMode,function(data){
                    log.d(data);
                    if(data.code==200){
                        
                        layObj.layer.closeAll();
                        layer.msg('添加成功');
                        setTimeout(function(){
                            classObj.methods.updatePageNum(1);
                        },1000);
                        
                    }else{
                        
                        layObj.layer.closeAll();
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                            
                            classObj.methods.updatePageNum(1);
                        },1000);
                    }
                },formParams.field);
                
            return false;
        })
        form.on('submit(areaInfo)',function(formParams){
            log.d(formParams.field)
            
            var arrName=[];
            for(var item in formParams.field){
                
                arrName.push(formParams.field[item]);
            }
            var dataForm={};
            // dataForm.navId=classObj.data.navId;
            dataForm.typeid=classObj.data.typeId;
            dataForm.name=JSON.stringify(arrName);
            
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.classify.addClassInfo,function(data){
                    log.d(data);
                    if(data.code==200){
                        layer.msg('添加成功');
                        setTimeout(function(){
                            layObj.layer.closeAll();
                            classObj.methods.updatePageNum(1);
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                            // layObj.layer.closeAll();
                            // classObj.methods.updatePageNum(1);
                        },1000);
                    }
                },dataForm);
                
            return false;
        })
        /**
         * 充值
         */
        form.on('submit(inputMoney)',function(formParams){
            log.d(formParams.field)
            layObj.layer.load();
            if(formParams.field.money-0>2000){
                layObj.layer.confirm('您操作的金额为：'+formParams.field.money+'，确定执行吗？',function(index){
                    layObj.layer.close(index);
                    classObj.methods.inputMoney(formParams.field);
                },function(){
                    layObj.layer.closeAll('loading');
                })
            }else{
                classObj.methods.inputMoney(formParams.field);
            }
            
                
            return false;
        })

        form.on('submit(editorAreaType)',function(formParams){
            log.d(formParams.field)
            layObj.layer.load();
            common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.obligation.queueMode.updateMode,function(data){
                    log.d(data);
                    if(data.code==200){
                        layObj.layer.closeAll();
                        layer.msg('操作成功');
                        classObj.methods.updatePageNum(1);
                        setTimeout(function(){
                            // location.reload();
                            
                            
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                            // location.reload();
                        },1000);
                    }
                },formParams.field);
                
            return false;
        })
        //编辑实名认证信息
        form.on('submit(editorAreaInfo)',function(formParams){
            log.d(formParams.field)
            
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.viplist.editRealName,function(data){
                    log.d(data);
                    if(data.code==200){
                        layObj.layer.closeAll();
                        layer.msg(data.message);
                        classObj.methods.updatePageNum(classObj.data.currentPageNum);
                    }else{
                        layer.msg(data.message);
                        setTimeout(function(){
                            // layObj.layer.closeAll();
                            // classObj.methods.updatePageNum(1);
                        },1000);
                    }
                },formParams.field);
                
            return false;
        })

        form.on('submit(searchResultByTel)',function(formParams){
            log.d(formParams.field)
            fistLoad=true;
            classObj.data.cacheData=formParams.field;
            classObj.methods.updatePageNum(classObj.data.currentPageNum,formParams.field);                
            return false;
        })

        form.on('submit(searchFilterGoods)',function(formParams){
 
            $('#searchedlist').html('');
            var tempHtml=searchedcontent.innerHTML;
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.obligation.searchFilterGoods,function(data){
                    
                    if(data.code==200){
                        
                        layObj.laytpl(tempHtml).render(data.data,function(html){
                            $('#searchedlist').append(html);
                        })

                        classObj.data.alertIndex=layer.open({
                          type: 1,
                          content: $('#goods-list'), //这里content是一个DOM
                          shade:[0.8,'#000'],
                          area:'900px',
                          maxmin: true,
                          end:function() {
                            // body...
                            $('#goods-list').hide();
                          }
                        })
                    }else{
                        
                        setTimeout(function(){
                            // layObj.layer.closeAll();
                            // classObj.methods.updatePageNum(1);
                        },1000);
                    }
                },formParams.field);
                
            return false;
        })

    },1000);

    $('.nav-menu-all-area').on('click','a',function(){
        $(this).addClass('active').siblings().removeClass('active');
        //log.d($(this))
        classObj.data.navId=$(this).data('id');
        // log.d(classObj.data.navId);
        classObj.methods.updatePageNum(1);
    });

    //添加分类类型
    $('.addArea').on('click',function(){
         $('#authorForm')[0].reset();
         $('.goodsBagList').html('');
         $.each(classObj.data.goodsBagArr,function(index,item){
             if(index==0){
                $('<option>').appendTo($('.goodsBagList')).html(item.pack_name).attr({'value':item.id,selected:true});
             }else{
                $('<option>').appendTo($('.goodsBagList')).html(item.pack_name).attr('value',item.id);
             }
             
         })
         form.render();
        // $('input.cityid').val(classObj.data.navId);
        layObj.layer.open({
             type:1,
            content: $('#authorForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'400px',
            maxmin: true,
            end:function(){
                classObj.data.isCanClick=true;
                $('#authorForm').hide();
            }
        })
    })
    //在标准下添加商品
    $('#all-sort-list').on('click','.lookInfoHis',function(){
        classObj.data.typeId=$(this).data('id');
        alertFirstLoad=true;
        var status=$(this).data('status');
        var upId=$(this).data('id');
        var tel=$(this).data('tel');
        var self=this;
        var classN=$(this).data('name');
        $('form').each(function(){
            this.reset();
        });
        classObj.methods.updateObligationTypeInfoById(upId);
        layObj.layer.open({
             type:1,
             title:'手机号为:'+tel,
            content: $('#obligationTypeListInfo'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:['95%','90%'],
            maxmin: true,
            end:function(){
                classObj.data.isCanClick=true;
                $('#obligationTypeListInfo').hide();
            }
        })
    })

     //查看个人信息
    $('#all-sort-list').on('click','.lookupSingleInfo',function(){
        classObj.data.typeId=$(this).data('id');
        alertFirstLoad=true;
        var status=$(this).data('status');
        var upId=$(this).data('id');
        var tel=$(this).data('tel');
        var self=this;
        var classN=$(this).data('name');
        $('form').each(function(){
            this.reset();
        });
        classObj.methods.updateObligationPersonInfoById(upId);
        layObj.layer.open({
             type:1,
             title:'手机号为:'+tel,
            content: $('#obligationPersonInfo'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:['95%','90%'],
            maxmin: true,
            end:function(){
                classObj.data.isCanClick=true;
                $('#obligationPersonInfo').hide();
            }
        })
    })

    /**
     * 查看历史记录
     */
    // $('#all-sort-list').on('click','.lookInfoHis',function(){
    //     var status=$(this).data('status');
    //     var upId=$(this).data('id');
    //     var tel=$(this).data('tel');
    //     var self=this;
    //     layObj.layer.open({
    //         type:1,
    //         title:'手机号为:'+tel,
    //         content: $('.recommendCon'), //这里content是一个DOM
    //         shade:[0.8,'#000'],
    //         area:'600px',
    //         maxmin: true,
    //         end:function(){
    //             log.d('关闭');
    //             $('.recommendCon').hide();
    //         }
    //     })
  
    // })
    //编辑区域类型
     $('#all-sort-list').on('click','.editorSingleAreaType',function(){
        classObj.data.typeId=$(this).data('id');
        classObj.data.typeEl=$(this).parent('td').prevAll('.typeName');
        var sItem=classObj.methods.getSingleInfo(classObj.data.typeId);
        classObj.methods.updateObligationInfo(sItem);

    })

    //编辑实名认证信息
    $('#all-sort-list').on('click','.editorSingleAreaInfo',function(){
        var self=this;
        layObj.layer.load();
        var name=$(this).data('name');
        var id=$(this).data('id');
        var card=$(this).data('card');

        var tpml=$('#editorAreaCon').html();
        $('.editorAreaInfo').html('');
        layObj.laytpl(tpml).render({real_name:name,id:id,id_card:card},function(html){
            $('.editorAreaInfo').append(html);
            form.render();
        })
        
        layObj.layer.closeAll('loading');
        layObj.layer.open({
            type:1,
            title:'修改实名认证信息',
            content: $('#editorAreaWrapper'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'600px',
            maxmin: true,
            end:function(){
                classObj.data.isCanClick=true;
                $('#editorAreaWrapper').hide();
            }
        })
        
    })

     //删除类型内容
    $('#all-sort-list').on('click','.deleteSingleAreaInfo',function(){
        var self=this;
        
        var deleId=$(this).data('id');
        layObj.layer.confirm('你确认要停用此类型吗?',function(index){
                    
                    layObj.layer.close(index);
                    classObj.methods.deleteClassInfo(deleId);

                })
        
        
    })

    //复选框选中
    $('.checkall').on('click',function() {
        var bt=this.checked;
        $('.ischecked').each(function(){
            this.checked=bt;
        });
        //$('.ischecked').attr('checked',this.checked);
    });

    $('#searchedlist').on('click','.ischecked',function(){
        var ischecked=true;
        $('.ischecked').each(function(){
            if(!this.checked){
                ischecked=false;
            }
        });
        $('.checkall')[0].checked=ischecked;
    });

    //确定选中商品
    $('#confirmorder').on('click',function(){
        layObj.layer.load();
        var arr=[];
        var typId=classObj.data.typeId
        $('.ischecked').each(function(){
            if(this.checked){
               arr.push($(this).data('id'));
            }
         });
        var obj={
            id:typId,
            goods:JSON.stringify(arr)
        }
        common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.obligation.addObligationGoods,function(data){
            alertFirstLoad=true;
            if(data.code==200){
                layObj.layer.closeAll('loading');
                layObj.layer.close(classObj.data.alertIndex);
                layObj.layer.msg(data.message);
                classObj.methods.updateObligationTypeInfoById(classObj.data.typeId,classObj.data.currentPage)
            }else{
                layObj.layer.closeAll('loading');
                layObj.layer.msg(data.message);
            }
        },obj);
    })

    $('.createAreaInfoInput').on('click',function(){
        $('<input type="text" placeholder="请输入" autocomplete="off" class="layui-input">').appendTo($('.areaInfoInput')).attr('name',Math.floor(Math.random()*1000));
    })

    $('.nav-menu-all-area').on('click','a',function(){
        $(this).addClass('active').siblings().removeClass('active');
        //log.d($(this))
        classObj.data.navId=$(this).data('id');
        // log.d(classObj.data.navId);
        classObj.methods.updatePageNum(1);
    });
     classObj.methods.updatePageNum(classObj.data.currentPageNum);
})