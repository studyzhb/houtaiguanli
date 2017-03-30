require(['jquery','main','log','lay-model','ajaxAddress'],function($,myObj,log,layObj,ajaxAddress){

    var common=myObj.load();
    var form;
    var params={
        id:''
    }

    var cityObj={
        data:{
            isShow:false,
            isCanClick:true
        },
        methods:{
            updateCityInfo:function(){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.city.citylist,function(data){
                    if(data.code==200){
                        $('.website-all-city-area').html('');
                        $.each(data.data,function(index,item){
                            if(item.status==1){
                                $('<a href="javascript:;" class="active">').html('<i class="layui-icon icon-display" data-id="'+item.id+'">&#xe640;</i>'+'<i class="layui-icon icon-edit" data-name="'+item.name+'" data-id="'+item.id+'">&#xe642;</i>'+item.name).data('id',item.id).appendTo($('.website-all-city-area'));
                            }else{
                                $('<a href="javascript:;">').html('<i class="layui-icon icon-display" data-id="'+item.id+'">&#xe640;</i>'+'<i class="layui-icon icon-edit" data-name="'+item.name+'" data-id="'+item.id+'">&#xe642;</i>'+item.name).data('id',item.id).appendTo($('.website-all-city-area'));
                            }
                            
                        })
                    }
                    
                })
            },
            updateCityStatus:function(id,obj,sta){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.city.updateCityStatus,function(data){
                    cityObj.data.isCanClick=true;
                    if(data.code==200){
                        if(sta=='1'){
                            $(obj).addClass('active');
                        }else{
                            $(obj).removeClass('active');
                        }
                        cityObj.methods.updateCityInfo();
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                    
                },{id:id,status:sta})
            },
            deleteCityInfo:function(id){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.city.deleteCity,function(data){
                    
                    if(data.code==200){
                       
                        cityObj.methods.updateCityInfo();
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                    
                },{id:id})
            }
        }
    }
    var areaObj={
        data:{
            pageCount:'',
            navId:'',
            isCanClick:true,
            closeIndex:"",
            typeId:"",
            typeInfo:[],
            tempGoodsContent:$('#sortContent').html()
        },
        methods:{
            updateArealist:function(data){
                $('#all-sort-list').html('');
                 var obj={};
                 obj.data=data;
                 
                //  obj.cityid=params.id;
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
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.area.deleteAreaInfo,function(data){
                    log.d(data);
                    
                    if(data.code==200){
                        
                        
                        areaObj.methods.updatePageNum(1);
                       
                        
                    }else{
                        layObj.layer.msg(data.msg);
                       
                        areaObj.methods.updatePageNum(1);
                    }
                },{id:id});
            },
            updateStatusInfoType:function(sta,upId,obj,pId){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.area.updateAreaStateInfo,function(data){
                    log.d(data);
                    areaObj.data.isCanClick=true;
                    if(data.code==200){
                        //location.reload();
                        //layObj.layer.closeAll();
                        
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
                },{navid:areaObj.data.navId,status:sta,id:upId,typeid:pId});
            },
            
            updateAreaTypeInfo:function(){
                areaObj.methods.updatePageNum(1);
                //  common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.area.getAreaType,function(data){
                //         //areaObj.methods.updateArealist(data.data);
                //         //areaObj.methods.updateAreaType(data.data);
                //         areaObj.methods.updatePageNum(1);
                //         log.d(data);
                //         if(data.code==200){
                            
                //         }else{
                //             layObj.layer.msg(data.msg);
                //         }
                    
                        
                //     },{cityid:params.id})
            },
            updateAreaInfo:function(id,name){
                 common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.area.updateAreaSingleInfo,function(data){
                        //areaObj.methods.updateArealist(data.data);
                        //areaObj.methods.updateAreaType(data.data);
                        areaObj.methods.updatePageNum(1);
                        log.d(data);
                        if(data.code==200){
                            
                        }else{
                            layObj.layer.msg(data.msg);
                        }
                    
                        
                    },{cityid:params.id,id:id,name:name})
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
                        cityObj.methods.selectResult(document.getElementById("result1").curSelect);
                    }
                }else{
                    cityObj.methods.autoSearch();
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
                    document.getElementById("keyword").onpropertychange = cityObj.methods.autoSearch;
                }
            },
            autoSearch:function(){
                
            }
        }
    }

    cityObj.methods.updateCityInfo();

    /**
     * 状态
     */
    $('#all-sort-list').on('click','.icon-btn-sub',function(){
        var status=$(this).data('status');
        var upId=$(this).data('id');
        var pId=$(this).data('typeid');
        if(areaObj.data.isCanClick){
            areaObj.data.isCanClick=false;
            areaObj.methods.updateStatusInfoType(status,upId,this,pId);
            return;
            if(status=='0'){
                layObj.layer.confirm('你确认要停用此类型吗?',function(index){
                    
                    layObj.layer.close(index);
                    
                })
            }else{
                areaObj.methods.updateStatusInfoType(status,upId,this,pId);
            }
        }else{
            layObj.layer.msg('请勿重复点击');
        }
        // layObj.layer.load();
        
    })


    $('#all-sort-list').on('click','.deleteSingleAreaInfo',function(){
        var self=this;
        
        var deleId=$(this).data('id');
        layObj.layer.confirm('你确认要停用此类型吗?',function(index){
                    
                    layObj.layer.close(index);
                    areaObj.methods.deleteClassInfo(deleId);

                })
    })


    /**
     *编辑区域内容
     */
    //编辑类型内容
    $('#all-sort-list').on('click','.editorSingleAreaInfo',function(){
        var self=this;
        var tpml=$('#editorAreaCon').html();
        $('.editorAreaInfo').html('');
        layObj.laytpl(tpml).render({id:$(this).data('id'),typeid:$(this).data('typeid'),name:$(this).data('name')},function(html){
            $('.editorAreaInfo').append(html);
        })
        areaObj.data.closeIndex=layObj.layer.open({
                                type:1,
                                content: $('#editorAreaWrapper'), //这里content是一个DOM
                                shade:[0.8,'#000'],
                                area:'600px',
                                maxmin: true,
                                end:function(){
                                    $('#editorAreaWrapper').hide();
                                }
                            })

         

        // areaObj.methods.updateAreaInfo();
        // layObj.layer.load();
        // common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.city.citylist,function(data){
        //     if(data.code==200){
        //         console.log(data.data);
        //         var cityInfo=data.data;
        //         var tpml=$('#editorAreaCon').html();
        //         areaObj.methods.getAreaInfo($(self).data('id'),function(res){
        //             var obj={};
        //             obj.data=res;
        //             obj.cityid=params.id;
        //             obj.typeid=areaObj.data.typeId;
        //             obj.cityInfo=cityInfo;
        //             obj.typeInfo=areaObj.data.typeInfo;
        //             log.d(obj);
        //             layObj.laytpl(tpml).render(obj,function(html){
        //                 $('.editorAreaInfo').append(html);
        //             })
        //             form.render();
        //             layObj.layer.closeAll('loading');
        //             layObj.layer.open({
        //                 type:1,
        //                 content: $('#editorAreaWrapper'), //这里content是一个DOM
        //                 shade:[0.8,'#000'],
        //                 area:'600px',
        //                 maxmin: true,
        //                 end:function(){
        //                     $('#editorAreaWrapper').hide();
        //                 }
        //             })
        //         })
        //     }
            
        // })
        
    })


    //添加区域内容
    $('#all-sort-list').on('click','.addAreaType',function(){
        areaObj.data.typeId=$(this).data('id');
        $('#areaInfoForm')[0].reset();
        $('.areaInfoInput').html('');
        areaObj.data.closeIndex=layObj.layer.open({
             type:1,
            content: $('#areaInfoForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'600px',
            maxmin: true,
            end:function(){
                $('#areaInfoForm').hide();
            }
        })
    })



    $('.addCity').on('click',function(){

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

    setTimeout(function(){
        form=layObj.form();
        
        form.verify({
            isNull:function(value,a){
                if(!value){
                    $(a).removeAttr('name');
                }
            }
        })

        form.on('submit(cityInfo)',function(paramsData){
            log.d(paramsData.field);
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.city.addCityList,function(data){
                log.d(data);
                if(data.code==200){
                    layObj.layer.msg('添加城市成功');
                    setTimeout(function(){
                        location.reload();
                    },1000);
                }else{
                    layObj.layer.msg('添加城市失败,请稍后再试');
                    setTimeout(function(){
                        location.reload();
                    },1000);
                }
            },paramsData.field);
        })
        form.on('submit(editcityInfo)',function(paramsData){
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.city.editCityList,function(data){
                if(data.code==200){
                    layObj.layer.closeAll();
                    cityObj.methods.updateCityInfo();
                }else{
                    layObj.layer.closeAll();
                    cityObj.methods.updateCityInfo();
                }
            },paramsData.field);
        })

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
            if(arrName.length>0){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.area.addAreaInfo,function(data){
                    log.d(data);
                    if(data.code==200){
                        layer.msg('添加成功');
                        setTimeout(function(){
                            layObj.layer.close(areaObj.data.closeIndex);
                             areaObj.methods.updatePageNum(1);
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                            layObj.layer.close(areaObj.data.closeIndex);
                             areaObj.methods.updatePageNum(1);
                        },1000);
                    }
                },dataForm);
            }else{
                $('.areaInfoInput').find('input').each(function(){
                    $(this).attr('name',Math.floor(Math.random()*1000));
                })
                layObj.layer.msg('请添加内容再提交');
            }
            
                
            return false;
        })

        form.on('submit(editorAreaType)',function(formParams){
            log.d(formParams.field)
            
            
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.area.addAreaInfo,function(data){
                    log.d(data);
                    if(data.code==200){
                        layer.msg('添加成功');
                        setTimeout(function(){
                            layObj.layer.close(areaObj.data.closeIndex);
                             areaObj.methods.updatePageNum(1);
                        },1000);
                        
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                            layObj.layer.close(areaObj.data.closeIndex);
                             areaObj.methods.updatePageNum(1);
                        },1000);
                    }
                },formParams.field);
                
            return false;
        })

        form.on('submit(editorAreaInfo)',function(formParams){
            log.d(formParams.field)
            
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.area.updateAreaSingleInfo,function(data){
                    log.d(data);
                    if(data.code==200){
                        layer.msg('添加成功');
                        setTimeout(function(){
                            layObj.layer.close(areaObj.data.closeIndex);
                             areaObj.methods.updatePageNum(1);
                        },1000);
                    }else{
                        layer.msg('网络错误，请稍后重试');
                        setTimeout(function(){
                             layObj.layer.close(areaObj.data.closeIndex);
                             areaObj.methods.updatePageNum(1);
                        },1000);
                    }
                },formParams.field);
                
            return false;
        })


    },500);

    $('.website-all-city-area').on('click','a',function(){
        var cId=$(this).data('id');
        console.log('dianji ')
        if(cityObj.data.isCanClick){
            cityObj.data.isCanClick=false;
            cityObj.data.isShow=!cityObj.data.isShow;
            if(cityObj.data.isShow){
                cityObj.methods.updateCityStatus(cId,this,1);
            }else{
                cityObj.methods.updateCityStatus(cId,this,0);
                
            }
        }   
    })

    $('.website-all-city-area').on('mouseenter','a',function(){
        $(this).find('.icon-display').show();
        $(this).find('.icon-edit').show();
    })

    $('.website-all-city-area').on('mouseleave','a',function(){
        $(this).find('.icon-edit').hide();
        $(this).find('.icon-display').hide();
    })

    $('.website-all-city-area').on('click','.icon-display',function(){
        var deleId=$(this).data('id');
        layObj.layer.confirm('你确认要停用此类型吗?',function(index){
                    
            layObj.layer.close(index);
            cityObj.methods.deleteCityInfo(deleId);

        })
        return false;
    })

    $('.website-all-city-area').on('click','.icon-edit',function(){
        var deleId=$(this).data('id');
        params.id=deleId;

        var cName=$(this).data('name');
        $('.cityName').text(cName);
        
        areaObj.methods.updateAreaTypeInfo();
         layObj.layer.open({
             type:1,
            content: $('.areaInfo'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:['90%','80%'],
            maxmin: true,
            end:function(){
                $('.areaInfo').hide();
            }
         })

       
        return false;
    })

    // $('.website-all-city-area').on('click','.icon-edit',function(){
    //     var deleId=$(this).data('id');
    //     var cName=$(this).data('name');
    //     var tpl=$('#editorCityCon').html();
    //      $('.editorCity').html('');
    //         layObj.laytpl(tpl).render({name:cName,id:deleId},function(html){
    //             $('.editorCity').apend(html);
                
    //         })
    //      layObj.layer.open({
    //          type:1,
    //         content: $('#editorCityInfo'), //这里content是一个DOM
    //         shade:[0.8,'#000'],
    //         area:'400px',
    //         maxmin: true,
    //         end:function(){
    //             $('#editorCityInfo').hide();
    //         }
    //      })

       
    //     return false;
    // })


    $('.website-all-area').on('dblclick','a',function(){
        console.log('shuangji')
        common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.city.editCityList,function(data){
            var tpl=$('#editorCityCon').html();
            layObj.laytpl(tpl).render(data.data,function(html){
                $('.editorCity').apend(html);
                layObj.layer.open({
                    type:1,
                    content: $('#editorCityInfo'), //这里content是一个DOM
                    shade:[0.8,'#000'],
                    area:'400px',
                    maxmin: true,
                    end:function(){
                        $('#editorCityInfo').hide();
                    }
                })
            })
        },{id:$(this).data('id')});
        
    })

    $('.createAreaInfoInput').on('click',function(){
        $('<input type="text" lay-verify="isNull" placeholder="请输入" autocomplete="off" class="layui-input">').appendTo($('.areaInfoInput')).attr('name',Math.floor(Math.random()*1000));
    })

})