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

    var classObj={
        data:{
            pageCount:'',
            isCanClick:true,
            navId:'',
            typeId:"",
            typeInfo:[],
            tempGoodsContent:$('#sortContent').html()
        },
        methods:{
            updateArealist:function(data){
                $('#all-sort-list').html('');
                 var obj={};
                 obj.data=data.class_list;
                 log.d(obj);
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
                            classObj.methods.updatePageNum(data.curr);
                        }
                    });
                });

                fistLoad=false;
            },
            updatePageNum:function(num){
                
                common.tools.ajax('get',ajaxAddress.obligationPreFix+ajaxAddress.obligation.classifyList,function(data){
                    log.d(data);
                    if(data.code==200){
                        // if(fistLoad){
                        //     classObj.methods.updatePage();
                        // }
                        // classObj.data.pageCount=Math.ceil(data.pageAllNum/10);
                        // $('.detailCount').text(data.pageAllNum);
                        classObj.methods.updateArealist(data.data);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{page:num,navId:classObj.data.navId});
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
                common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.obligation.updateStatusType,function(data){
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
                        classObj.methods.updatePageNum(1);
                        
                    }else{
                        layObj.layer.msg(data.message);
                        // layObj.layer.closeAll();
                        //location.reload();
                    }
                },{navid:classObj.data.navId,status:sta,id:upId});
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
            layObj.layer.load();
            log.d(formParams.field)
            formParams.field.navid=classObj.data.navId;
            common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.obligation.addClass,function(data){
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
                            layObj.layer.closeAll();
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

        form.on('submit(editorAreaType)',function(formParams){
            log.d(formParams.field)
            layObj.layer.load();
            common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.obligation.updateClass,function(data){
                    log.d(data);
                    if(data.code==200){
                        
                        setTimeout(function(){
                            // location.reload();
                            layObj.layer.closeAll();
                            classObj.data.typeEl.text(formParams.field.cname);
                            layObj.layer.msg('操作成功');
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
    //添加区域内容
    $('#all-sort-list').on('click','.addAreaType',function(){
        classObj.data.typeId=$(this).data('id');
        var classN=$(this).data('name');
        $('#areaInfoForm')[0].reset();
        $('.sortName').text(classN);
        layObj.layer.open({
             type:1,
            content: $('#areaInfoForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'600px',
            maxmin: true,
            end:function(){
                classObj.data.isCanClick=true;
                $('#areaInfoForm').hide();
            }
        })
    })
    //编辑区域类型
     $('#all-sort-list').on('click','.editorSingleAreaType',function(){
        var cid=classObj.data.typeId=$(this).data('id');
        classObj.data.typeEl=$(this).parent('td').prevAll('.typeName');
        var cname=$(this).data('name');
        var tpl=$('#editorNavCon').html();
        $('.editor-area-type').html('');

                
                     
                 
                    layObj.laytpl(tpl).render({id:cid,name:cname},function(html){
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