require(['jquery','main','ajaxAddress','lay-model','log'],function($,myObj,ajaxAddress,layObj,log){
    
    var common=myObj.load();
    var fistLoad=true;
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

    var LabelObj={
        data:{
            pageCount:'',
            isCanClick:true,
            navId:'',
            typeId:"",
            typeInfo:[],
            primaryData:[],
            tempGoodsContent:$('#sortContent').html()
        },
        methods:{
            updateArealist:function(data){
                $('#all-sort-list').html('');
                 var obj={};
                 obj.data=data;
                 log.d(obj);
                layObj.laytpl(LabelObj.data.tempGoodsContent).render(obj,function(html){
                    $('#all-sort-list').append(html);
                })
            },
            updatePage:function(){
                layui.use(['laypage', 'layer'],function(){
                    var laypage=layui.laypage;
                    var layer = layui.layer;
                    laypage({
                        cont: 'page'
                        ,pages: LabelObj.data.pageCount //总页数
                        ,groups: 5 //连续显示分页数
                        ,jump:function(data){
                            //得到页数data.curr
                            LabelObj.methods.updatePageNum(data.curr);
                        }
                    });
                });

                fistLoad=false;
            },
            updatePageNum:function(num){
                
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.label.showLabelTypeList,function(data){
                    log.d(data);
                    if(data.code==200){
                        // if(fistLoad){
                        //     LabelObj.methods.updatePage();
                        // }
                        // LabelObj.data.pageCount=Math.ceil(data.pageAllNum/10);
                        // $('.detailCount').text(data.pageAllNum);
                        LabelObj.methods.updateArealist(data.data);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{page:num,navid:LabelObj.data.navId});
            },
            updateAreaType:function(data){
                LabelObj.data.typeInfo=data;
                $.each(data,function(index,item){
                    $('<option>').appendTo($('select.areaType')).attr('value',item.id).text(item.name);
                })
                form=layObj.form();
                form.render();
                form.on('select(areaType)',function(data){
                   LabelObj.methods.updatePageNum(1,data.value); 
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
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.classify.updateStatusType,function(data){
                    log.d(data);
                    LabelObj.data.isCanClick=true;
                    if(data.code==200){
                        //location.reload();
                        layObj.layer.closeAll();
                        
                        if(sta=='1'){
                            $(obj).text('启用').addClass('active').data('status',0);
                        }else{
                            $(obj).text('停用').removeClass('active').data('status',1);
                        }
                        LabelObj.methods.updatePageNum(1);
                        
                    }else{
                        layObj.layer.msg(data.msg);
                        // layObj.layer.closeAll();
                        //location.reload();
                    }
                },{navid:LabelObj.data.navId,status:sta,id:upId});
            },
            updateStatusInfoType:function(sta,upId,obj,pId){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.classify.updateStatusInfoType,function(data){
                    log.d(data);
                    LabelObj.data.isCanClick=true;
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
                },{navid:LabelObj.data.navId,status:sta,id:upId,typeid:pId});
            },
            updateSubInfo:function(obj){

            },
            deleteClassInfo:function(id){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.classify.deleteClassInfo,function(data){
                    log.d(data);
                    
                    if(data.code==200){
                        
                        layObj.layer.closeAll();
                        LabelObj.methods.updatePageNum(1);
                        
                    }else{
                        layObj.layer.msg(data.msg);
                        layObj.layer.closeAll();
                        LabelObj.methods.updatePageNum(1);
                    }
                },{id:id});
            },
            deleteLabelType:function(id){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.label.deleteLabelType,function(data){
                    log.d(data);
                    
                    if(data.code==200){
                        
                        layObj.layer.closeAll();
                        LabelObj.methods.updatePageNum(1);
                        
                    }else{
                        layObj.layer.msg(data.msg);
                        layObj.layer.closeAll();
                        LabelObj.methods.updatePageNum(1);
                    }
                },{id:id});
            },
            updatePrimaryCon:function(){
                $('.navWrapper').html('');
                $.each(LabelObj.data.primaryData,function(index,item){
                    $('<input type="checkbox" name="navid">').appendTo($('.navWrapper')).attr('title',item.name).val(item.id);
                })
                form.render('checkbox');
            },
            updateLabelType:function(id,typeid,name,intro){
                var tpl=$('#editorNavCon').html();
           
                
                     $('.editor-area-type').html('');
                 
                    layObj.laytpl(tpl).render({id:id,typeid:typeid,name:name,introduce:intro},function(html){
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
                        
                        $('#editorAreaTypeWrapper').hide();
                    }
                })
                
            
            },
            updateLabelStatusType:function(sta,id){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.label.updateLabelStatusType,function(data){
                    log.d(data);
                    
                    if(data.code==200){
                        
                        // layObj.layer.closeAll();
                        LabelObj.methods.updatePageNum(1);
                        
                    }else{
                        layObj.layer.msg(data.msg);
                        // layObj.layer.closeAll();
                        // LabelObj.methods.updatePageNum(1);
                    }
                },{status:sta,id:id});
            }
        }
    }

    

    setTimeout(function(){
        form=layObj.form();
        form.on('submit(shopInfo)',function(formParams){
            log.d(formParams.field)
            formParams.field.navId=LabelObj.data.navId;
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.classify.addClass,function(data){
                    log.d(data);
                    if(data.code==200){
                        layer.msg('添加成功');
                        setTimeout(function(){
                            layObj.layer.closeAll();
                            LabelObj.methods.updatePageNum(1);
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                            layObj.layer.closeAll();
                            LabelObj.methods.updatePageNum(1);
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
            dataForm.navId=LabelObj.data.navId;
            dataForm.typeId=LabelObj.data.typeId;
            dataForm.name=JSON.stringify(arrName);
            
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.classify.addClassInfo,function(data){
                    log.d(data);
                    if(data.code==200){
                        layer.msg('添加成功');
                        setTimeout(function(){
                            layObj.layer.closeAll();
                            LabelObj.methods.updatePageNum(1);
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                            layObj.layer.closeAll();
                            LabelObj.methods.updatePageNum(1);
                        },1000);
                    }
                },dataForm);
                
            return false;
        })

        form.on('submit(editorAreaType)',function(formParams){
            log.d(formParams.field)
            
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.label.updateLabelType,function(data){
                    log.d(data);
                    if(data.code==200){
                        layer.msg('添加成功');
                        setTimeout(function(){
                            // location.reload();
                            layObj.layer.closeAll();
                            LabelObj.methods.updatePageNum();
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                           layObj.layer.closeAll();
                            LabelObj.methods.updatePageNum();
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
                            LabelObj.methods.updatePageNum(1);
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                            layObj.layer.closeAll();
                            LabelObj.methods.updatePageNum(1);
                        },1000);
                    }
                },formParams.field);
                
            return false;
        })

        form.on('submit(addLabel)',function(paramsData){
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.label.addLabelType,function(data){
                    log.d(data);
                    if(data.code==200){
                        layer.msg('添加成功');
                        
                        setTimeout(function(){
                            layObj.layer.closeAll();
                            LabelObj.methods.updatePageNum();
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                            layObj.layer.closeAll();
                           LabelObj.methods.updatePageNum();
                        },1000);
                    }
                },paramsData.field);
                
            return false;
        })

    },1000);

    $('.nav-menu-all-area').on('click','a',function(){
        $(this).addClass('active').siblings().removeClass('active');
        //log.d($(this))
        LabelObj.data.navId=$(this).data('id');
        // log.d(LabelObj.data.navId);
        LabelObj.methods.updatePageNum(1);
    });

    //添加分类类型
    $('.addArea').on('click',function(){
        // $('#authorForm')[0].reset();
        $('input.cityid').val(LabelObj.data.navId);
        // LabelObj.methods.updatePrimaryCon();
        layObj.layer.open({
             type:1,
            content: $('#authorForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'800px',
            maxmin: true,
            end:function(){
                LabelObj.data.isCanClick=true;
                $('#authorForm').hide();
            }
        })
    })
    //添加区域内容
    $('#all-sort-list').on('click','.addAreaType',function(){
        LabelObj.data.typeId=$(this).data('id');
        var classN=$(this).data('name');
        $('.sortName').text(classN);
        layObj.layer.open({
             type:1,
            content: $('#areaInfoForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'600px',
            maxmin: true,
            end:function(){
                LabelObj.data.isCanClick=true;
                $('#areaInfoForm').hide();
            }
        })
    })

    //改变启用停用状态
    $('#all-sort-list').on('click','.icon-btn',function(){
        LabelObj.data.typeId=$(this).data('id');
        var lId=$(this).data('id');
        var lSta=$(this).data('status');
        
        LabelObj.methods.updateLabelStatusType(lSta,lId);
        
    })

    //编辑区域类型
     $('#all-sort-list').on('click','.editorSingleAreaType',function(){
        LabelObj.data.typeId=$(this).data('id');
        LabelObj.data.typeEl=$(this).parent('td').prevAll('.typeName');
        var laId=$(this).data('id');
        var lTypeId=$(this).data('type');
        var name=$(this).data('name');
        var intro=$(this).data('intro');

        LabelObj.methods.updateLabelType(laId,lTypeId,name,intro);
  
    })

    //删除区域类型
     $('#all-sort-list').on('click','.deleteLabelType',function(){
        
        var laId=$(this).data('id');
       
        layObj.layer.confirm('你确定要执行删除操作?',function(){
            LabelObj.methods.deleteLabelType(laId);
        })
   
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
                        LabelObj.data.isCanClick=true;
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
                    LabelObj.methods.deleteClassInfo(deleId);

                })
        
    })

    $('.createAreaInfoInput').on('click',function(){
        $('<input type="text" placeholder="请输入" autocomplete="off" class="layui-input">').appendTo($('.areaInfoInput')).attr('name',Math.floor(Math.random()*1000));
    })

    $('.nav-menu-all-area').on('click','a',function(){
        $(this).addClass('active').siblings().removeClass('active');
        //log.d($(this))
        LabelObj.data.navId=$(this).data('id');
        // log.d(LabelObj.data.navId);
        LabelObj.methods.updatePageNum(1);
    });


    LabelObj.methods.updatePageNum(1);
    /**
     * 获取导航列表
     */
    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.nav.getPrimaryNav,function(data){
        // log.d(data);
        var ind;
       
        if(data.code==200){
            LabelObj.data.primaryData=data.data;
            $.each(data.data,function(index,item){
            if(ind&&item.id==ind||index==0&&!ind){
                    LabelObj.data.navId=item.id;
                    LabelObj.data.navName=item.name;
                    $('<a href="javascript:;" class="active">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                }else{
                    $('<a href="javascript:;">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                } 
             
            })
            
           
        }
    })

})