require(['jquery','main','ajaxAddress','lay-model','log'],function($,myObj,ajaxAddress,layObj,log){

    var common=myObj.load();
   var form;
   
   var LabelObj={
       data:{
           $el:'',
           navId:'',
           //标签列表模板数据
            tempLabelContent:$('#labelContent').html(),
            isClick:true,
            editLabelEl:'',
            iconlist:[]
       },
        methods:{
            updateLabelPage:function(data){
                $('#all-sort-list').html('');
                layObj.laytpl(LabelObj.data.tempLabelContent).render(data,function(html){
                    $('#all-sort-list').append(html);
                    setTimeout(function(){
                        form=layObj.form();
                        
                        form.render();

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
                                    $(a).val('').removeAttr('name');
                                }  
                            }
                            });


                        form.on('select(labelType)',function(data){
                            var typeid=$(data.elem).attr('data-ele');
                            var type=data.value;
                            layObj.layer.confirm('你确认要更改此类型吗?',function(index){
                    
                                    layObj.layer.close(index);

                                    common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.label.updateLabelType,function(res){
                                        log.d(res);

                                    },{id:typeid,type:type});

                                },function(index){
                                    layObj.layer.close(index);
                                    LabelObj.methods.updatePageNum();
                                })
                            
                            
                        })
                        form.on('checkbox(labelStatusType)',function(data){
                            var typeid=$(data.elem).attr('data-ele');
                            
                            common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.label.updateLabelType,function(res){
                                log.d(res);
                                
                            },{id:typeid,status:data.elem.checked?1:0});
                        })

                        form.on('submit(formEditDemo)',function(formParams){
                            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.label.updateLabelCon,function(res){
                                log.d(res);
                                if(res.code==200){
                                    layObj.layer.closeAll();
                                    // LabelObj.data.editLabelEl.text(formParams.field.name);
                                    LabelObj.methods.updatePageNum();
                                }else{
                                    layObj.layer.msg(res.msg);
                                    layObj.layer.closeAll('iframe');
                                    LabelObj.methods.updatePageNum();
                                }
                            },formParams.field);
                        })
                        

                        form.on('submit(formEditType)',function(formParams){
                            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.label.updateLabelType,function(res){
                                log.d(res);
                                if(res.code==200){
                                    layObj.layer.closeAll();
                                    // LabelObj.data.editLabelEl.text(formParams.field.name);
                                    LabelObj.methods.updatePageNum();
                                }else{
                                    layObj.layer.msg(res.msg);
                                    layObj.layer.closeAll('iframe');
                                    LabelObj.methods.updatePageNum();
                                }
                            },formParams.field);
                        })
                        
                        form.on('submit(saveLabelInfo)',function(formParams){
                            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.label.addLabelConByType,function(res){
                                log.d(res);
                                if(res.code==200){
                                    layObj.layer.closeAll();
                                    // LabelObj.data.editLabelEl.text(formParams.field.name);
                                    LabelObj.methods.updatePageNum();
                                }else{
                                    layObj.layer.msg(res.msg);
                                    layObj.layer.closeAll('iframe');
                                    LabelObj.methods.updatePageNum();
                                }
                            },formParams.field);
                        })


                    },300);
                });
            },
            addLabelConByLabelType:function(str){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.label.addLabelConByType,function(data){
                    log.d(data);
                    if(data.code==200){
                        location.reload();
                    }else{
                        layObj.layer.msg('获取数据失败,请稍后再试!!');
                    }
                },{typeid:LabelObj.data.$el.data('id'),name:str});
            },
            updatePageNum:function(){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.label.showLabelList,function(data){
                    log.d(data);
                    if(data.code==200){
                        LabelObj.methods.updateLabelPage(data.data);
                    }else{
                        layObj.layer.msg('获取数据失败,请稍后再试!!');
                    }
                },{navid:LabelObj.data.navId})
            },
            deleteLabelInfo:function(dId){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.label.deleteLabelInfo,function(data){
                    log.d(data);
                    if(data.code==200){
                        LabelObj.methods.updatePageNum();
                    }else{
                        layObj.layer.msg('删除失败,请稍后再试!!');
                        setTimeout(function(){
                            LabelObj.methods.updatePageNum();
                        },500);
                    }
                },{id:dId})
            },
            getIconList:function(lid){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.label.getIconList,function(data){
                    log.d(data);
                    if(data.code==200){
                        var tpl=$('.icon-wrapper').html();
                        $('.typeArea').html('');
                        LabelObj.data.iconlist=data.data;
                        layObj.laytpl(tpl).render({iconlist:data.data,id:lid},function(html){
                            $('.typeArea').append(html);
                        })
                        return data.data;
                    }else{
                        return '';
                    }
                })
            },
            updateLabelTypeStatus:function(sta,id){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.label.updateLabelTypeStatus,function(data){
                    log.d(data);
                    if(data.code==200){
                        LabelObj.methods.updatePageNum();
                    }else{
                        LabelObj.layer.msg(data.msg)
                       LabelObj.methods.updatePageNum();
                    }
                },{status:sta,id:id,navid:LabelObj.data.navId});
            }
        }
   }

   /**
    * 图标选中关闭
    */

    $('.typeArea').on('click','.icon-btn',function(){
        $(this).addClass('active').siblings().removeClass('active');
        $(this).siblings('#iconId').val($(this).data('id'));
        // $('#iconId').val($(this).data('id'));
    })

    $('.editorNavBox').on('click','.icon-btn',function(){
        $(this).addClass('active').siblings().removeClass('active');
        $(this).siblings('.iconSelectedInput').val($(this).data('id'));
    })

    /**
     * 滑动展示介绍信息
     */
    $('#all-sort-list').on('click','.labelCon',function(){
        
        layObj.layer.tips(' '+$(this).data('info')+'  ',this);
        setTimeout(function(){
            layObj.layer.closeAll('tips');
        },1000)
    })

     /**
     * 状信息
     */
    $('#all-sort-list').on('click','.labelItem',function(){
        var sta=$(this).data('status');
        var tId=$(this).data('id');
        
        LabelObj.methods.updateLabelTypeStatus(sta,tId);
        
    })

    /**
     * 删除信息
     */
    $('#all-sort-list').on('click','.deleteLabelCon',function(){
        var deleId=$(this).data('id');
        layObj.layer.confirm('你确认删除此标签内容吗?',function(index){
            layObj.layer.close(index);
            LabelObj.methods.deleteLabelInfo(deleId);
        })
    })
    

    // $('#all-sort-list').on('mouseleave','.labelCon',function(){
    //     console.log('2222');
    //     layObj.layer.closeAll('tips');
    // })

   /**
    * 获取标签数据
    *
    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.label.showLabelList,function(data){
        log.d(data);
        if(data.code==200){
            LabelObj.methods.updateLabelPage(data.data);
        }else{
            layObj.layer.msg('获取数据失败,请稍后再试!!');
        }
    })
    */

    $('#all-sort-list').on('click','.add-new-label',function(){
        
        LabelObj.data.$el=$(this);
        var classType=$(this).data('type');
        var tpl;
        var dObj={};
        var lid=$(this).data('id');
        //classType:1 文字 2 图标
        if(classType==1||classType==3){
            tpl=$('.text-wrapper').html();
            $('.typeArea').html('');
            layObj.laytpl(tpl).render({id:lid},function(html){
                $('.typeArea').append(html);
            })
            
        }else{
            
            LabelObj.methods.getIconList(lid)

        }
        layObj.layer.open({
            type:1,
            title:LabelObj.data.navName,
            content: $('#addTypeCon'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'400px',
            maxmin: true,
            end:function(){
                $('#addTypeCon').hide();
            }
        })

        
    })

    /**
     * 编辑标签
     */
    $('#all-sort-list').on('click','.editlabelCon',function(){
        var tmpl=editorNavCon.innerHTML;
        var lName=$(this).data('name');
        var lId=$(this).data('id');
        var lClass=$(this).data('class');
        var lTypeid=$(this).data('typeid');
        var lIntro=$(this).data('info');
        LabelObj.data.editLabelEl=$(this).prev();
        $('.editorNavBox').html('');
        var obj={id:lId,name:lName,typeid:lTypeid,introduce:lIntro,class:lClass};
        if(lClass=='2'){
            obj.iconlist=LabelObj.data.iconlist;
        }
        layObj.laytpl(tmpl).render(obj,function(html){
            $('.editorNavBox').append(html);
        })
        layObj.layer.open({
            type:1,
            title:LabelObj.data.navName,
            content: $('#editorLabelCon'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'400px',
            maxmin: true,
            end:function(){
                $('#editorLabelCon').hide();
            }
        })

        /**common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.label.getLabelInfoByTypeId,function(data){
            log.d(data);
            if(data.code==200){
                

                layObj.layer.open({
                    type:1,
                    title:LabelObj.data.navName,
                    content: $('#editorLabelCon'), //这里content是一个DOM
                    shade:[0.8,'#000'],
                    area:'400px',
                    maxmin: true,
                    end:function(){
                        $('#editorLabelCon').hide();
                    }
                })

            }
            
        },{typeid:$(this).data('id')})**/

        
    })

    $('.editorNavBox').on('click','icon-btn',function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.iconSelectedInput').val($(this).data('id'));
    })

    /**
     * 编辑标签类型
     */
    $('#all-sort-list').on('click','.editlabelItem',function(){
        var tmpl=editorLabelTypeInfo.innerHTML;
        var lName=$(this).data('name');
        var lId=$(this).data('id');
        var lIntro=$(this).data('info');
        $('.editorLabelWrapper').html('');
        layObj.laytpl(tmpl).render({id:lId,name:lName,introduce:lIntro},function(html){
            $('.editorLabelWrapper').append(html);
        })
        layObj.layer.open({
            type:1,
            title:LabelObj.data.navName,
            content: $('#editorTitle'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'400px',
            maxmin: true,
            end:function(){
                $('#editorTitle').hide();
            }
        })
    })


    /**
     * 添加标签内容
     */
    $('.saveGoodsNum').on('click',function(){

        var labelCon=$('.singleNum').val().trim();
        layObj.layer.load();
        layObj.layer.closeAll();

        common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.label.addLabelConByType,function(data){
            log.d(data);
            if(data.code==200){
                // location.reload();
                layObj.layer.closeAll('iframe');
                LabelObj.methods.updatePageNum();
            }else{
                layObj.layer.msg('获取数据失败,请稍后再试!!');
                layObj.layer.closeAll('iframe');
                LabelObj.methods.updatePageNum();
            }
        },{typeid:LabelObj.data.$el.data('id'),name:labelCon});
        // LabelObj.data.$el.before($('<button class="layui-btn">
                    //     <i class="layui-icon">&#xe642;</i> {{item.name}}
                    //   </button>'));
        // form.render('checkbox');
    })

    /**
     * 获取导航列表
     */
    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.nav.getPrimaryNav,function(data){
        // log.d(data);
        var ind;
       
        if(data.code==200){
            $.each(data.data,function(index,item){
            if(ind&&item.id==ind||index==0&&!ind){
                    LabelObj.data.navId=item.id;
                    LabelObj.data.navName=item.name;
                    $('<a href="javascript:;" class="active">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                }else{
                    $('<a href="javascript:;">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                } 
             
            })
            LabelObj.methods.updatePageNum(1);
           
        }
    })

    $('.nav-menu-all-area').on('click','a',function(){
        $(this).addClass('active').siblings().removeClass('active');
        
        LabelObj.data.navId=$(this).data('id');
        LabelObj.data.navName=$(this).text();
        
        LabelObj.methods.updatePageNum(1);
    });


})