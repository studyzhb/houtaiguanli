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

    var areaObj={
        data:{
            pageCount:'',
            navId:'',
            typeId:"",
            typeInfo:[],
            tempGoodsContent:$('#sortContent').html()
        },
        methods:{
            updateArealist:function(data){
                $('#all-sort-list').html('');
                 var obj={};
                 obj.data=data;
                 
                 obj.cityid=params.id;
                 log.d(obj);
                layObj.laytpl(areaObj.data.tempGoodsContent).render(obj,function(html){
                    $('#all-sort-list').append(html);
                })
            },
            updatePage:function(){
                layui.use(['laypage', 'layer'],function(){
                    var laypage=layui.laypage;
                    var layer = layui.layer;
                    laypage({
                        cont: 'page'
                        ,pages: areaObj.data.pageCount //总页数
                        ,groups: 5 //连续显示分页数
                        ,jump:function(data){
                            //得到页数data.curr
                            areaObj.methods.updatePageNum(data.curr);
                        }
                    });
                });

                fistLoad=false;
            },
            updatePageNum:function(num,cityTypeId){
                
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.area.arealist,function(data){
                    log.d(data);
                    if(data.code==200){
                        // if(fistLoad){
                        //     areaObj.methods.updatePage();
                        // }
                        // areaObj.data.pageCount=Math.ceil(data.pageAllNum/10);
                        // $('.detailCount').text(data.pageAllNum);
                        areaObj.methods.updateArealist(data.data);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{page:num,cityId:params.id,cityTypeId:cityTypeId});
            },
            updateAreaType:function(data){
                areaObj.data.typeInfo=data;
                $.each(data,function(index,item){
                    $('<option>').appendTo($('select.areaType')).attr('value',item.id).text(item.name);
                })
                form=layObj.form();
                form.render();
                form.on('select(areaType)',function(data){
                   areaObj.methods.updatePageNum(1,data.value); 
                })
            },
            getAreaInfo:function(id,fn){
                log.d(id);
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.area.updateAreaInfo,function(data){
                    log.d(data);
                    if(data.code==200){
                        fn(data.data);
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{id:id});
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
            updateAreaTypeInfo:function(){
                 common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.area.getAreaType,function(data){
                        classObj.methods.updateArealist(data.data);
                        
                        log.d(data);
                        if(data.code==200){
                            areaObj.methods.updateAreaType(data.data);
         areaObj.methods.updatePageNum(1);
                        }else{
                            layObj.layer.msg(data.msg);
                        }
                    
                        
                    },{cityId:params.id})
            }
        }
    }

    

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

    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.area.getAreaType,function(data){
         areaObj.methods.updateAreaType(data.data);
         areaObj.methods.updatePageNum(1);
        log.d(data);
        if(data.code==200){
            
        }else{
            layObj.layer.msg(data.msg);
        }
       
        
    },{cityId:params.id})

    setTimeout(function(){
        form=layObj.form();
        form.on('submit(shopInfo)',function(formParams){
            log.d(formParams.field)
            formParams.field.cityId=params.id;
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.area.addArea,function(data){
                    log.d(data);
                    if(data.code==200){
                        layer.msg('添加成功');
                        setTimeout(function(){
                            layObj.layer.closeAll();
                             areaObj.methods.updatePageNum(1);
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                            layObj.layer.closeAll();
                             areaObj.methods.updatePageNum(1);
                        },1000);
                    }
                },formParams.field);
                
            return false;
        })
        form.on('submit(areaInfo)',function(formParams){
            log.d(formParams.field)
            
            var arrName=[];
            for(var item in formParams.field){
                log.d(item)
                arrName.push(formParams.field[item]);
            }
            var dataForm={};
            dataForm.cityId=params.id;
            dataForm.typeId=areaObj.data.typeId;
            dataForm.name=arrName;
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.area.addAreaInfo,function(data){
                    log.d(data);
                    if(data.code==200){
                        layer.msg('添加成功');
                        setTimeout(function(){
                            layObj.layer.closeAll();
                             areaObj.methods.updatePageNum(1);
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                            layObj.layer.closeAll();
                             areaObj.methods.updatePageNum(1);
                        },1000);
                    }
                },dataForm);
                
            return false;
        })

        form.on('submit(editorAreaType)',function(formParams){
            log.d(formParams.field)
            
            
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.area.addAreaInfo,function(data){
                    log.d(data);
                    if(data.code==200){
                        layer.msg('添加成功');
                        setTimeout(function(){
                            layObj.layer.closeAll();
                             areaObj.methods.updatePageNum(1);
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                            layObj.layer.closeAll();
                             areaObj.methods.updatePageNum(1);
                        },1000);
                    }
                },formParams.field);
                
            return false;
        })

        form.on('submit(editorAreaInfo)',function(formParams){
            log.d(formParams.field)
            
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.area.addAreaInfo,function(data){
                    log.d(data);
                    if(data.code==200){
                        layer.msg('添加成功');
                        setTimeout(function(){
                            layObj.layer.closeAll();
                             areaObj.methods.updatePageNum(1);
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                             layObj.layer.closeAll();
                             areaObj.methods.updatePageNum(1);
                        },1000);
                    }
                },formParams.field);
                
            return false;
        })

    },1000);

    $('.nav-menu-all-area').on('click','a',function(){
        $(this).addClass('active').siblings().removeClass('active');
        //log.d($(this))
        areaObj.data.navId=$(this).data('id');
        // log.d(areaObj.data.navId);
        areaObj.methods.updatePageNum(1);
    });

    //添加区域类型
    $('.addArea').on('click',function(){
        $('input.cityid').val(params.id);
        layObj.layer.open({
             type:1,
            content: $('#authorForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'400px',
            maxmin: true,
            end:function(){
                $('#authorForm').hide();
            }
        })
    })
    //添加区域内容
    $('#all-sort-list').on('click','.addAreaType',function(){
        areaObj.data.typeId=$(this).data('id');
        layObj.layer.open({
             type:1,
            content: $('#areaInfoForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'600px',
            maxmin: true,
            end:function(){
                $('#authorForm').hide();
            }
        })
    })
    //编辑区域类型
     $('#all-sort-list').on('click','.editorSingleAreaType',function(){
        areaObj.data.typeId=$(this).data('id');
        layObj.layer.open({
             type:1,
            content: $('#editorAreaTypeWrapper'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'600px',
            maxmin: true,
            end:function(){
                $('#authorForm').hide();
            }
        })
    })

    //编辑类型内容
    $('#all-sort-list').on('click','.editorSingleAreaInfo',function(){
        var self=this;
        layObj.layer.load();
        common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.city.citylist,function(data){
            if(data.code==200){
                console.log(data.data);
                var cityInfo=data.data;
                var tpml=$('#editorAreaCon').html();
                areaObj.methods.getAreaInfo($(self).data('id'),function(res){
                    var obj={};
                    obj.data=res;
                    obj.cityid=params.id;
                    obj.typeid=areaObj.data.typeId;
                    obj.cityInfo=cityInfo;
                    obj.typeInfo=areaObj.data.typeInfo;
                    log.d(obj);
                    layObj.laytpl(tpml).render(obj,function(html){
                        $('.editorAreaInfo').append(html);
                    })
                    form.render();
                    layObj.layer.closeAll('loading');
                    layObj.layer.open({
                        type:1,
                        content: $('#editorAreaWrapper'), //这里content是一个DOM
                        shade:[0.8,'#000'],
                        area:'600px',
                        maxmin: true,
                        end:function(){
                            $('#authorForm').hide();
                        }
                    })
                })
            }
            
        })
        
    })

    $('.createAreaInfoInput').on('click',function(){
        $('<input type="text" placeholder="请输入" autocomplete="off" class="layui-input">').appendTo($('.areaInfoInput')).attr('name',Math.floor(Math.random()*1000));
    })



})