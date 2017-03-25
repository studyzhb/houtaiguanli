require(['jquery','main','ajaxAddress','lay-model','log','params','img-single-load','baiduMap'],function($,myObj,ajaxAddress,layObj,log,params,upload,mapObj){
    
    var common=myObj.load();
    var fistLoad=true;
    
    var disObj={
        data:{
            navId:'',
            tempGoodsContent:$('#shopGoodsCon').html(),
            pageCount:0,
            currPage:'1'
        },
        methods:{
            updateShopList:function(data){
                 $('#tableWrapper').html('');
                 var obj={};
                 obj.data=data;
                 obj.navId=disObj.data.navId;
                 obj.cityid=params.id;
                 log.d(layObj);
                layObj.laytpl(disObj.data.tempGoodsContent).render(obj,function(html){
                    $('#tableWrapper').append(html);
                })
            },
            updatePage:function(){
                
                layui.use(['laypage', 'layer'],function(){
                    var laypage=layui.laypage;
                    var layer = layui.layer;
                    
                    laypage({
                        cont: 'page'
                        ,pages: disObj.data.pageCount //总页数
                        ,groups: 3 //连续显示分页数
                        ,jump:function(data){
                            //得到页数data.curr
                            disObj.methods.updatePageNum(data.curr);
                            disObj.data.currPage=data.curr;
                        }
                    });
                });

                fistLoad=false;
            },
            updatePageNum:function(num){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.discount.showlist,function(data){
                    log.d(data);
                    //page页数 pagesize每页个数 total总数
                    if(data.code==200){
                        $('.pageWrapper').show();
                        if(fistLoad){
                            disObj.methods.updatePage();
                        }
                        $('.detailCount').text(data.total);
                        //data.total%data.pagesize==0?data.total/data.pagesize:
                        disObj.data.pageCount=Math.ceil(data.total/data.pageSize);
                        // console.log(data.total/data.pagesize);
                        disObj.methods.updateShopList(data.data);
                    }else{
                        layObj.layer.msg(data.msg);
                        disObj.data.pageCount=0;
                        $('.pageWrapper').hide();
                         disObj.methods.updateShopList([]);
                    }
                },{page:num,cityid:params.id,navid:disObj.data.navId});
            },
            /**
             * @param {Number} id 要排序的导航id 
             * @param {Number} order 要排序的位置
             */
            sortNavListByInput:function(id,order,oldOrder){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.discount.sortBenefit,function(data){
                    if(data.code==200){
                        location.reload();
                    }
                },{id:id,oldPostion:oldOrder,newPostion:order});
            },
            sortDiscountOrderInfo:function(id,order,obj,tag){
                var targetEl={};
                var tId,tOrder;
                if(tag){
                    tId=obj.prev().data('id');
                    tOrder=obj.prev().data('order');
                    if(!tId){
                        targetEl='';
                    }else{
                        targetEl.id=tId||'';
                        targetEl.displayorder=order;
                    }
                    
                }else{
                     tId=obj.next().data('id');
                     tOrder=obj.next().data('order');
                    if(!tId){
                        targetEl='';
                    }else{
                        targetEl.id=tId||'';
                        targetEl.displayorder=order;
                    }
                }
                var arr=[];
                arr[0]={id:id,displayorder:tOrder};
                if(targetEl){
                    arr.push(targetEl);
                }
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.discount.sortDiscount,function(data){
                    if(data.code==200){
                        layObj.layer.msg('排序成功');
                        disObj.methods.updatePageNum(disObj.data.currPage);
                        
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{positionJson:JSON.stringify(arr)});
            },
            updateDiscountStatus:function(sta,id){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.discount.updateDiscountStatus,function(data){
                    if(data.code==200){
                        layObj.layer.msg(data.msg);
                        disObj.methods.updatePageNum(disObj.data.currPage);
                        
                    }else{
                        layObj.layer.msg(data.msg);
                        disObj.methods.updatePageNum(disObj.data.currPage);
                    }
                },{id:id,status:sta});
            },
            deleteDiscountInfo:function(id){
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.discount.deleteDiscountInfo,function(data){
                    if(data.code==200){
                       disObj.methods.updatePageNum(disObj.data.currPage);
                    }else{
                        disObj.methods.updatePageNum(disObj.data.currPage);
                        layObj.layer.msg(data.msg);
                    }
                },{id:id});
            },
            getSingleInfo:function(id){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.discount.showSingleInfo,function(data){
                    log.d(data);
                    
                    if(data.code==200){
                        var tpl=$('#formCon').html();
                        $('.formWrapper').html('');
                        $('#baiduPosition').data('info',data.data.itude)
                        $('.mapWrapper').append($('#mapContainer'));
                        var pArr=data.data.itude?data.data.itude.split(',')||[]:[];
                        new AMap.Marker({
                            position :pArr,
                            map : mapObj
                        })
                        // $('<script>').appendTo($('body')).attr('src','../js/baiduMap.js');
                        layObj.laytpl(tpl).render(data.data,function(html){
                            $('.formWrapper').append(html);
                            setTimeout(function(){
                                form.render();
                            },600);
                        });
                    
                    }
                },{id:id})
            }
        }
    }

    layui.use('laydate',function(){
       var laydate=layui.laydate;
        var start = {
            min: laydate.now()
            ,format: 'YYYY-MM-DD hh:mm:ss'
            ,max: '2099-06-16 23:59:59'
            ,istoday: false
            ,choose: function(datas){
                var timeStamp=Math.floor(new Date(datas).getTime());
                $(this.elem).next('input').val(Math.floor(timeStamp/1000));
                
                end.min = datas; //开始日选好后，重置结束日的最小日期
                end.start = datas //将结束日的初始值设定为开始日
            }
        };
        
        var end = {
            min: laydate.now()
            ,format: 'YYYY-MM-DD hh:mm:ss'
            ,max: '2099-06-16 23:59:59'
            ,istoday: false
            ,choose: function(datas){
                var timeStamp=Math.floor(new Date(datas).getTime());
                $(this.elem).next('input').val(Math.floor(timeStamp/1000));
                start.max = datas; //结束日选好后，重置开始日的最大日期
            }
        };

        $('#date').on('click',function(){
            log.d(layObj);
            start.elem = this;
            layObj.laydate(start);
        })
        $('#date01').on('click',function(){
            end.elem = this
            layObj.laydate(end);
        })

        $('.formWrapper').on('click','#date',function(){
            log.d(layObj);
            start.elem = this;
            layObj.laydate(start);
        })
        $('.formWrapper').on('click','#date01',function(){
            end.elem = this
            layObj.laydate(end);
        })
   })

   $('.cityName').text(unescape(params.name));

    /**
     * 图片上传
     */
    $('.imageadd').on('click',function(){
        upload.uploadImage(this);
    });

    /**
     * 编辑店铺详细信息
     */

     $('#tableWrapper').on('click','.editInfo',function(){
        //  log.d('nnnn');
         //open('editor-discountInfo.html?cityid='+params.id+'&id='+$(this).data('id')+"&navid="+disObj.data.navId,'_self');
         disObj.methods.getSingleInfo($(this).data('id'));
         layObj.layer.open({
             type:1,
            content: $('.editMenuForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:['95%','80%'],
            zIndex:10,
            maxmin: true,
            end:function(){
                $('.editMenuForm').hide();
            }
         })
    })

     /**
     * 删除详细信息
     */

     $('#tableWrapper').on('click','.deleteDiscountInfo',function(){
        //  log.d('nnnn');
         var dId=$(this).data('id');
         layObj.layer.confirm('你确定要执行删除操作?',function(index){
             layObj.layer.close(index);
             disObj.methods.deleteDiscountInfo(dId);
         })
         
     })

     /**
     * 状态改变
     */
    $('#tableWrapper').on('click','.icon-btn-sub',function(){
        var sta=$(this).data("status");
        var id=$(this).data("id");
        disObj.methods.updateDiscountStatus(sta,id);
    })

     /**
     * 失去焦点时请求服务器进行排序
     */
    $('#tableWrapper').on('blur','.sortInput',function(){
        var value=$(this).val().trim();
        var navId=$(this).data('id');
        var order=$(this).data('order');
        disObj.methods.sortNavListByInput(navId,value,order);
    })
     
    /**
     * 点击添加店铺先选择导航
     */
    $('.add-shop-info').on('click',function(){
        $('.menuForm')[0].reset();
        $('.imageadd').show().prevAll().remove();
        $('.addmapWrapper').append($('#mapContainer'));
        // 打开添加优惠信息窗口
        layObj.layer.open({
             type:1,
            content: $('.menuForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:['95%','80%'],
            zIndex:10,
            maxmin: true,
            end:function(){
                $('.menuForm').hide();
            }
         })

        // open('add-discountInfo.html?cityid='+params.id+'&navid='+disObj.data.navId,'_self');
    })

    $('.nav-menu-all-area').on('click','a',function(){
        $(this).addClass('active').siblings().removeClass('active');
        //log.d($(this))
        disObj.data.navId=$(this).data('id');
        // log.d(disObj.data.navId);
        disObj.methods.updatePageNum(disObj.data.currPage);
    });


    /**
     * 排序
     */
    $('#tableWrapper').on('click','.upSort',function(){
        
         
         var bid=$(this).data('id');
         var bOrder=$(this).data('order');
         disObj.methods.sortDiscountOrderInfo(bid,bOrder,$(this).parents('tr'),true);
     })

     $('#tableWrapper').on('click','.downSort',function(){
        
        var bid=$(this).data('id');
         var bOrder=$(this).data('order');
         disObj.methods.sortDiscountOrderInfo(bid,bOrder,$(this).parents('tr'),false);
     })

    /**
     * 
     */
    $('.alertWrapper').on('click','a',function(){

    })

    /**
     * 图片上传
     */
    $('.formWrapper').on('click','.imageadd',function(){
        upload.uploadImage(this);
    });

    
    /**
     * 获取城市列表
     */
    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.nav.getPrimaryNav,function(data){
        // log.d(data);
        var ind=params.navid;
        if(data.code==200){
            $.each(data.data,function(index,item){
                if(!ind&&index==0){
                    disObj.data.navId=item.id;
                    $('<a href="javascript:;" class="active">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                     disObj.methods.updatePageNum(disObj.data.currPage);
                }else if(index==ind){
                    disObj.data.navId=item.id;
                    $('<a href="javascript:;" class="active">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                     disObj.methods.updatePageNum(disObj.data.currPage);
                }
                else{
                    $('<a href="javascript:;">').html(item.name).data('id',item.id).appendTo($('.nav-menu-all-area'));
                }  
            })
           
        }
    })

    setTimeout(function(){
        form=layObj.form();
        
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
                    $(a).removeAttr("name");
                }   
            }
            });

            form.on('submit(shopInfo)',function(paraData){
                log.d(paraData.field)
                paraData.field.cityid=params.id;
                paraData.field.navid=disObj.data.navId;
                paraData.field.itude=paraData.field.longitude+','+paraData.field.latitude;
                paraData.field.longitude='';
                paraData.field.latitude='';
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.discount.addInfo,function(data){
                        log.d(data);
                        if(data.code==200){
                            layer.msg('添加成功');
                            setTimeout(function(){
                                layObj.layer.closeAll();
                                disObj.methods.updatePageNum(disObj.data.currPage);
                            },1000);
                            
                        }else{
                            layer.msg('网络错误，请稍后重试');
                            setTimeout(function(){
                                
                            },1000);
                        }
                    },paraData.field);
                    
                return false;
            });

            form.on('submit(editorDiscountInfo)',function(paraData){
            paraData.field.itude=paraData.field.longitude+','+paraData.field.latitude;
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.discount.updateInfo,function(data){
                log.d(data);
                if(data.code==200){
                    layObj.layer.msg('更新成功');
                    layObj.layer.closeAll();
                    disObj.methods.updatePageNum(disObj.data.currPage);
                }else{
                    layObj.layer.msg(data.msg);
                    disObj.methods.getSingleInfo();
                }
            },paraData.field);
        })
    },1000)


    
})