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
                
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.classify.showlist,function(data){
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
            }
        }
    }


    setTimeout(function(){
        form=layObj.form();
        form.on('submit(shopInfo)',function(formParams){
            log.d(formParams.field)
            formParams.field.navId=classObj.data.navId;
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.area.addArea,function(data){
                    log.d(data);
                    if(data.code==200){
                        layer.msg('添加成功');
                        setTimeout(function(){
                            
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                            
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
            dataForm.navId=classObj.data.navId;
            dataForm.typeId=classObj.data.typeId;
            dataForm.name=arrName;
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.classify.addClassInfo,function(data){
                    log.d(data);
                    if(data.code==200){
                        layer.msg('添加成功');
                        setTimeout(function(){
                            
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                            
                        },1000);
                    }
                },dataForm);
                
            return false;
        })

        form.on('submit(editorAreaType)',function(formParams){
            log.d(formParams.field)
            
            
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.area.updateAreaType,function(data){
                    log.d(data);
                    if(data.code==200){
                        layer.msg('添加成功');
                        setTimeout(function(){
                            
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                            
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
                            
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                            
                        },1000);
                    }
                },formParams.field);
                
            return false;
        })

    },1000);



    //添加分类类型
    $('.addArea').on('click',function(){
        $('input.cityid').val(classObj.data.navId);
        layObj.layer.open({
             type:1,
            content: $('#authorForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'400px',
            maxmin: true
        })
    })

    //编辑区域类型
     $('#all-sort-list').on('click','.editorSingleAreaType',function(){
        classObj.data.typeId=$(this).data('id');
        layObj.layer.open({
             type:1,
            content: $('#editorAreaTypeWrapper'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'600px',
            maxmin: true
        })
    })


    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.area.getAreaType,function(data){
         classObj.methods.updateArealist(data.data);
        
        log.d(data);
        if(data.code==200){
            
        }else{
            layObj.layer.msg(data.msg);
        }
       
        
    },{cityId:params.id})


    

})