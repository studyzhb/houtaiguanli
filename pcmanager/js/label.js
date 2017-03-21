require(['jquery','main','ajaxAddress','lay-model','log'],function($,myObj,ajaxAddress,layObj,log){

    var common=myObj.load();
   var form;
   
   var LabelObj={
       data:{
           $el:'',
           //标签列表模板数据
            tempLabelContent:$('#labelContent').html(),
            isClick:true
       },
        methods:{
            updateLabelPage:function(data){
                layObj.laytpl(LabelObj.data.tempLabelContent).render(data,function(html){
                    $('#all-sort-list').append(html);
                    setTimeout(function(){
                        form=layObj.form();
                        
                        form.render();

                        form.on('select(labelType)',function(data){
                            var typeid=$(data.elem).attr('data-ele');
                            var type=data.value;
                            common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.label.updateLabelType,function(res){
                                log.d(res);

                            },{id:typeid,type:type});
                        })
                        form.on('checkbox(labelStatusType)',function(data){
                            var typeid=$(data.elem).attr('data-ele');
                            
                            common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.label.updateLabelType,function(res){
                                log.d(res);
                                
                            },{id:typeid,status:data.elem.checked?1:0});
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
            }
        }
   }

   /**
    * 图标选中关闭
    */

    $('.typeArea').on('click','.icon-btn',function(){
        $(this).addClass('active').siblings().removeClass('active');
        
    })

   /**
    * 获取标签数据
    */
    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.label.showLabelList,function(data){
        log.d(data);
        if(data.code==200){
            LabelObj.methods.updateLabelPage(data.data);
        }else{
            layObj.layer.msg('获取数据失败,请稍后再试!!');
        }
    })


    $('#all-sort-list').on('click','.add-new-label',function(){
        log.d('11111');
        LabelObj.data.$el=$(this);
        var classType=$(this).data('type');
        var tpl;
        var dObj={};
        //classType:1 文字 2 图标
        if(classType==1){
            tpl=$('.text-wrapper').html();
            $('.typeArea').html('');
            layObj.laytpl(tpl).render(dObj,function(html){
                $('.typeArea').append(html);
            })
            
        }else{
            tpl=$('.icon-wrapper').html();
            $('.typeArea').html('');
            dObj={
                iconlist:['&#xe60c;','&#xe60c;','&#xe60c;']
            }
            layObj.laytpl(tpl).render(dObj,function(html){
                $('.typeArea').append(html);
            })
        }
        layObj.layer.open({
            type:1,
            content: $('#addTypeCon'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'400px',
            maxmin: true
        })

        
    })

    /**
     * 编辑标签
     */
    $('#all-sort-list').on('click','.labelCon',function(){
        var tmpl=editorNavCon.innerHTML;
        common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.label.getLabelInfoByTypeId,function(data){
            log.d(data);
            if(data.code==200){
                $('.editorNavBox').html('');
                layObj.laytpl(tmpl).render(data.data,function(html){
                    $('.editorNavBox').append(html);
                    form.render();
                })

                layObj.layer.open({
                    type:1,
                    content: $('#editorLabelCon'), //这里content是一个DOM
                    shade:[0.8,'#000'],
                    area:'400px',
                    maxmin: true
                })

            }
            
        },{typeid:$(this).data('id')})

        
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
                location.reload();
            }else{
                layObj.layer.msg('获取数据失败,请稍后再试!!');
            }
        },{typeid:LabelObj.data.$el.data('id'),name:labelCon});
        // LabelObj.data.$el.before($('<button class="layui-btn">
                    //     <i class="layui-icon">&#xe642;</i> {{item.name}}
                    //   </button>'));
        // form.render('checkbox');
    })


})