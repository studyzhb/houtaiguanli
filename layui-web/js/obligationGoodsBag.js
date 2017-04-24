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
            alertPageCount:'1'
        },
        methods:{
            //获取标准下的商品
            updateObligationTypeInfoById:function(id,p){
                $('#goods-orderlist').html('');
                common.tools.ajax('get',ajaxAddress.obligationPreFix+ajaxAddress.obligation.goodsBag.lookGoodsInBag,function(data){
                    
                    var tml=$('#showGoodsContent').html();
                    if(data.code==200){
                        
                        classObj.data.alertPageCount=Math.ceil(data.num/data.limit)||1;
                        
                        $('.obligationTotal').html(data.num);
                        layObj.laytpl(tml).render(data.data.goods_list,function(html){
                            $('#goods-orderlist').append(html);
                        })
                        // if(alertFirstLoad){
                        //     classObj.methods.updateAlertPage(id);
                        // }
                    }
                },{id:id,p:p});
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
                            classObj.data.currentPage=data.curr;
                            classObj.methods.updateObligationTypeInfoById(id,data.curr);
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
                            classObj.methods.updatePageNum(data.curr);
                        }
                    });
                });

                fistLoad=false;
            },
            updatePageNum:function(num){
                
                common.tools.ajax('get',ajaxAddress.obligationPreFix+ajaxAddress.obligation.goodsBag.showlist,function(data){
                    log.d(data);
                    
                    if(data.code==200){
                        classObj.data.arrData=data.data.pack_list;
                        
                        classObj.data.pageCount=Math.ceil(data.pageAllNum/10);
                        $('.detailCount').text(data.data.all_num);
                        classObj.methods.updateArealist(data.data.pack_list);
                        if(fistLoad){
                            classObj.methods.updatePage();
                        }
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{page:num});
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
            updateStatusType:function(sta,upId,obj){
                // var item=classObj.methods.getSingleInfo(upId);
                var item={};
                item.status=sta;
                item.id=upId;
                common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.obligation.goodsBag.updateStatus,function(data){
                    log.d(data);
                    classObj.data.isCanClick=true;
                    if(data.code==200){
                        //location.reload();
                        layObj.layer.closeAll();
                        classObj.methods.updatePageNum(1);
                        
                    }else{
                        layObj.layer.msg(data.msg);
                        // layObj.layer.closeAll();
                        //location.reload();
                    }
                },item);
            },
            updateStatusInfoType:function(sta,upId,obj,pId){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.classify.updateStatusInfoType,function(data){
                    log.d(data);
                    classObj.data.isCanClick=true;
                    if(data.code==200){
                        //location.reload();
                        layObj.layer.closeAll();
                        
                        if(sta=='1'){
                            $(obj).text('启用').addClass('active').data('status',0);
                        }else{
                            $(obj).text('停用').removeClass('active').data('status',1);
                        }
                        
                    }else{
                        layObj.layer.msg(data.msg);
                        // layObj.layer.closeAll();
                        //location.reload();
                    }
                },{navid:classObj.data.navId,status:sta,id:upId,typeid:pId});
            },
            updateSubInfo:function(obj){

            },
            //获取债券金分类信息
            addGoodsGetSortInfo:function(){
                common.tools.ajax('get',ajaxAddress.obligationPreFix+ajaxAddress.obligation.classifyList,function(data){
                    
                    if(data.code==200){
                        data=data.data;
                        classObj.data.arrGoodsClassify=data.class_list;
                        $('.obligationGoodsType').html('');
                        $.each(classObj.data.arrGoodsClassify,function(index,item){
                            $('<option>').appendTo($('.obligationGoodsType')).attr('value',item.id).html(item.cname);
                        })
                        form.render();
                    }else{
                        classObj.data.arrGoodsClassify=[];
                    }

                });
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
                console.log(data);
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
                common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.obligation.goodsBag.deleteObligationGoods,function(data){

                    if(data.code==200){
                        
                        layObj.layer.closeAll('loading');
                        
                        classObj.methods.updateObligationTypeInfoById(classObj.data.typeId,classObj.data.currentPage);
                       
                        
                    }else{
                        layObj.layer.closeAll('loading');
                        layObj.layer.msg(data.message);
                        
                    }
                },{good_id:id,pick_id:classObj.data.typeId});
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
    $('#all-sort-list').on('click','.icon-btn',function(){
        var status=$(this).data('status');
        var upId=$(this).data('id');
        var self=this;
        if(classObj.data.isCanClick){
            classObj.data.isCanClick=false;
            if(status=='0'){
                layObj.layer.confirm('你确认要停用此类型吗?',function(index){
                    layObj.layer.close(index);
                    classObj.methods.updateStatusType(status,upId,self);
                })
            }else{
                classObj.methods.updateStatusType(status,upId,this);

            }
        }else{
            layObj.layer.msg('请勿重复点击');
        }
        // layObj.layer.load();
        
    })

    //删除标准下的商品
    $('#goods-orderlist').on('click','.deleteObligationType',function(){
        var id=$(this).data('id');
        layObj.layer.load();
        layObj.layer.confirm('确定删除?',function(index){
            layObj.layer.close(index);
            classObj.methods.deleteGoodsFromObligationType(id);
        })
    })

    $('#all-sort-list').on('click','.icon-btn-sub',function(){
        var status=$(this).data('status');
        var upId=$(this).data('id');
        var pId=$(this).data('typeid');
        if(classObj.data.isCanClick){
            classObj.data.isCanClick=false;
            classObj.methods.updateStatusInfoType(status,upId,this,pId);
            return;
            if(status=='0'){
                layObj.layer.confirm('你确认要停用此类型吗?',function(index){
                    
                    layObj.layer.close(index);

                })
            }else{
                classObj.methods.updateStatusInfoType(status,upId,this,pId);
            }
        }else{
            layObj.layer.msg('请勿重复点击');
        }
        // layObj.layer.load();
        
    })

    setTimeout(function(){
        form=layObj.form();
        form.on('submit(shopInfo)',function(formParams){
            log.d(formParams.field)
            formParams.field.navid=classObj.data.navId;
            common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.obligation.goodsBag.addGoodsBag,function(data){
                    log.d(data);
                    if(data.code==200){
                        
                        layObj.layer.closeAll();
                        layer.msg('添加成功');
                        setTimeout(function(){
                            classObj.methods.updatePageNum(1);
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        layObj.layer.closeAll();
                        setTimeout(function(){
                            
                            //classObj.methods.updatePageNum(1);
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
         * 编辑包的基本信息
         */
        form.on('submit(editorAreaType)',function(formParams){
            log.d(formParams.field);
            layObj.layer.load();
            common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.obligation.goodsBag.updateBagInfo,function(data){
                    log.d(data);
                    if(data.code==200){
                        layObj.layer.closeAll();
                        layer.msg('添加成功');
                        classObj.methods.updatePageNum(1);
                        
                    }else{
                        layObj.layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                            // location.reload();
                        },1000);
                    }
                },formParams.field);
                
            return false;
        })

        form.on('submit(editorAreaInfo)',function(formParams){
            log.d(formParams.field)
            
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.classify.updateClssInfo,function(data){
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
                },formParams.field);
                
            return false;
        })

        form.on('submit(searchFilterGoods)',function(formParams){
 
            $('#searchedlist').html('');
            var tempHtml=searchedcontent.innerHTML;
            
            common.tools.ajax('get',ajaxAddress.obligationPreFix+ajaxAddress.obligation.goodsBag.searchFilterGoods,function(data){
                    data=data.data;
                    if(data.code==200){
                        
                        layObj.laytpl(tempHtml).render(data.goods_list,function(html){
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
        // $('input.cityid').val(classObj.data.navId);
        layObj.layer.open({
            title:'生成商品包',
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
    $('#all-sort-list').on('click','.addAreaType',function(){
        classObj.data.typeId=$(this).data('id');
        alertFirstLoad=true;
        var classN=$(this).data('name');
        $('form').each(function(){
            this.reset();
        });
        classObj.methods.addGoodsGetSortInfo();
        classObj.methods.updateObligationTypeInfoById(classObj.data.typeId);
        layObj.layer.open({
             type:1,
             title:classN,
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
    //编辑区域类型
     $('#all-sort-list').on('click','.editorSingleAreaType',function(){
        classObj.data.typeId=$(this).data('id');
        classObj.data.typeEl=$(this).parent('td').prevAll('.typeName');
        var sItem=classObj.methods.getSingleInfo(classObj.data.typeId);
        classObj.methods.updateObligationInfo(sItem);

    })

    //编辑类型内容
    $('#all-sort-list').on('click','.editorSingleAreaInfo',function(){
        var self=this;
        layObj.layer.load();
        common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.classify.getClassInfo,function(data){
            if(data.code==200){
                
                var tpml=$('#editorAreaCon').html();
                $('.editorAreaInfo').html('');
                layObj.laytpl(tpml).render(data.data,function(html){
                    $('.editorAreaInfo').append(html);
                    form.render();
                })
                
                layObj.layer.closeAll('loading');
                layObj.layer.open({
                    type:1,
                    content: $('#editorAreaWrapper'), //这里content是一个DOM
                    shade:[0.8,'#000'],
                    area:'600px',
                    maxmin: true,
                    end:function(){
                        classObj.data.isCanClick=true;
                        $('#editorAreaWrapper').hide();
                    }
                })
                
            }
            
        },{id:$(this).data('id')});
        
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
            goods_ids:arr.join()
        }
        common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.obligation.goodsBag.updateBagInfo,function(data){
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
     classObj.methods.updatePageNum(1);

})