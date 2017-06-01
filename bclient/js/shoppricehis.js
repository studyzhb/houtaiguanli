require(['jquery','main','ajaxAddress','lay-model','log','params'],function($,myObj,ajaxAddress,layObj,log,params){
    
    var common=myObj.load();
    var fistLoad=true;
    var alertFirstLoad=true;
    var form;

    
    $('.cityName').text(unescape(params.name));
    var ShopObj={
        data:{
            navId:'',
            addInputId:0,
            tempGoodsContent:$('#shophis').html(),
            pageCount:0,
            shopid:'',
            arrLabel:[],
            labelJson:[],
            arrGoodsLabel:[],
            arrShopClassify:[],
            arrGoodsClassify:[],
            arrAreaGoods:[],
            sortObj:{},
            sortAnotherArr:[],
            currentPage:'1',
            currentRePage:'1',
            currentAlertPage:'1',
            //当前处于哪个tab栏 1为全部列表,2为已推荐
            currentStatus:'1',
            searched:true
        },
        methods:{
            updateAlertPage:function(){
                
                layui.use(['laypage', 'layer'],function(){
                    var laypage=layui.laypage;
                    var layer = layui.layer;
                    laypage({
                        cont: 'alertpage'
                        ,pages: ShopObj.data.alertPageCount //总页数
                        ,groups: 5 //连续显示分页数
                        ,jump:function(data){
                            //得到页数data.curr
                            if(ShopObj.data.currentAlertPage!=data.curr){
                                ShopObj.data.currentAlertPage=data.curr;
                                ShopObj.methods.getObligationHisInfo(data.curr);
                            }
                            
                        }
                    });
                });

                alertFirstLoad=false;
            },
            updateShopList:function(data){
                 var tempHtml=shophis.innerHTML;

			
				$('#purchaselist').html('');
				layObj.laytpl(tempHtml).render(data,function(html){
						$('#purchaselist').append(html);
					});
            },
            updatePage:function(para){
                
                layui.use(['laypage', 'layer'],function(){
                    var laypage=layui.laypage;
                    var layer = layui.layer;
                    laypage({
                        cont: 'page'
                        ,pages: ShopObj.data.pageCount //总页数
                        ,groups: 5 //连续显示分页数
                        ,jump:function(data){
                            //得到页数data.curr
                                
                                if(ShopObj.data.currentStatus=='1'){ 
                                    if(data.curr!=ShopObj.data.currentPage){
                                        ShopObj.data.currentPage=data.curr;
                                        ShopObj.data.currentRePage=data.curr;
                                        ShopObj.methods.updatePageNum(data.curr,para);
                                    }
                                    
                                }else if(ShopObj.data.currentStatus=='2'){
                                    if(data.curr!=ShopObj.data.currentRePage){
                                        ShopObj.data.currentRePage=data.curr;
                                        ShopObj.data.currentPage=data.curr;
                                        ShopObj.methods.updateRecommendList(data.curr,para);
                                    }
                                    
                                }
                            
                                             
                        }
                    });
                });

                fistLoad=false;
            },
            updateObligationBalance:function(){
                common.tools.ajax('get',ajaxAddress.obligationManagerPreFix+ajaxAddress.shopObligation.obligationBalance,function(data){
                    log.d(data);
                    if(data.code==200){
                        ShopObj.data.obligationMoneyBalance=data.data;
                        $('.obligationBalance').val(data.data||0);
                        
                    }else{
                        layObj.layer.msg(data.message);
                    }
                });
            },
            updatePageNum:function(num,para){
                
                var options={
                    p:num,
                }
                para=$.extend({},options,para||{});

                $('#tableWrapper').html('');
                
                common.tools.ajax('get',ajaxAddress.publicAddress+ajaxAddress.shopDetail.shopbalance,function(data){
                    log.d(data);
                    if(data.code==200){
                        ShopObj.data.obligationBalance=data.yue;
                        // ShopObj.data.pageCount=Math.ceil(data.data.all_num/10);
                        // $('.detailCount').text(data.data.all_num);
                        ShopObj.methods.updateShopList(data);
                        //分页，暂时不做
                        //  if(fistLoad){
                        //     ShopObj.methods.updatePage(options);
                        // }
                    }else{
                        layObj.layer.msg(data.message);
                        ShopObj.methods.updateShopList([]);
                    }
                },options);
            },

            updateShopStatus:function(sta,id){
                //
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.shop.updateShopStatus,function(data){
                    if(data.code==200){
                        layObj.layer.msg(data.msg);
                        if(ShopObj.data.currentStatus=='1'){
                            ShopObj.methods.updatePageNum(ShopObj.data.currPage);
                        }else{
                            ShopObj.methods.updateRecommendList(ShopObj.data.currentRePage);
                        }
                        
                    }else{
                        layObj.layer.msg(data.msg);
                    }
                },{id:id,status:sta});
            },
            getObligationHisInfo:function(p){
                var tml=$('#showGoodsContent').html();
                $('#goods-orderlist').html('');
                var obj={
                    p:p
                }
                common.tools.ajax('get',ajaxAddress.obligationManagerPreFix+ajaxAddress.obligation.showObligationHisInfo,function(data){
                    if(data.code==200){
                        layObj.layer.msg(data.message);
                        ShopObj.data.alertPageCount=Math.ceil(data.data.all_num/10)||1;
                        
                        $('.obligationTotal').html(data.data.all_num);
                        layObj.laytpl(tml).render(data.data.debt_list,function(html){
                            $('#goods-orderlist').append(html);
                        })
                        if(alertFirstLoad){
                            ShopObj.methods.updateAlertPage();
                        }
                        
                    }else{
                        ShopObj.data.alertPageCount=1;
                         layObj.laytpl(tml).render([],function(html){
                            $('#goods-orderlist').append(html);
                        })
                        if(alertFirstLoad){
                            ShopObj.methods.updateAlertPage();
                        }
                        $('.obligationTotal').text('0');
                        
                        layObj.layer.msg(data.message);
                    }
                },obj);
            },
            /**
             * 根据关键字查询
             */
            selectResult:function(){

            },
            //定位选择输入提示关键字
            focus_callback:function () {
               
            },
            autoSearch:function(){
                
            }
        }
    }



    $('#purchaselist').on('click','.obligation2balance',function(){
        layObj.layer.load();
		$('form').each(function(){
			this.reset();
		})
        if(ShopObj.data.obligationBalance){
             ShopObj.data.outputAlertIndex=layObj.layer.open({
				 type:1,
				 title:'余额提现，提现至店铺绑定银行卡',
				content: $('.outputMoneyWrapper'), //这里content是一个DOM
				shade:[0.8,'#000'],
				area:'600px',
				maxmin: true,
				end:function(){
					$('.outputMoneyWrapper').hide();
				}
			 })
        }else{
            layObj.layer.msg('您目前暂无余额可提');
            layObj.layer.closeAll('loading');
        }
       
    })

 
    
    
    /**
     * kaishi
     */
     ShopObj.methods.updatePageNum(ShopObj.data.currentPage);
     //获取债权金余额
     ShopObj.methods.updateObligationBalance();
     //债权金收益转余额
     $('.obligationMoney2balance').on('click',function(){
        layObj.layer.load();
        if(ShopObj.data.obligationMoneyBalance){
             layObj.layer.confirm('您的债权金收益为：'+ShopObj.data.obligationMoneyBalance+'将全部转为余额',function(index){
                layObj.layer.close(index);
                common.tools.ajax('post',ajaxAddress.obligationManagerPreFix+ajaxAddress.shopObligation.obligationScore2Balance,function(data){
                    layObj.layer.closeAll('loading');
                    ShopObj.methods.updateObligationBalance();
                    ShopObj.methods.updatePageNum(ShopObj.data.currentPage);
                    layObj.layer.msg(data.message);
                });
             })
        }else{
            layObj.layer.msg('您目前暂无收益可转');
            layObj.layer.closeAll('loading');
        }
    })

    //查看债权金历史
    $('.lookUpObligationHisInfo').on('click',function(){
        alertFirstLoad=true;
        ShopObj.methods.getObligationHisInfo(ShopObj.data.currentAlertPage);
        layObj.layer.open({
             type:1,
             title:'查看债权历史',
            content: $('#obligationTypeListInfo'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:['95%','90%'],
            maxmin: true,
            end:function(){
                ShopObj.data.isCanClick=true;
                ShopObj.data.cacheAlertData={};
                $('#obligationTypeListInfo').hide();
            }
        })
    })

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
            
            start.elem = this;
            layObj.laydate(start);
        })
        $('#date01').on('click',function(){
            end.elem = this;
            layObj.laydate(end);
        })

        

        $('#date03').on('click',function(){
            start.elem = this;
            
            layObj.laydate(start);
        })

        $('.formWrapper').on('click','#date-edit',function(){
            
            start.elem = this;
            layObj.laydate(start);
        })
        $('.formWrapper').on('click','#date-edit01',function(){
            end.elem = this
            layObj.laydate(end);
        })
   })


   setTimeout(function(){
       log.d(layObj);
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
            },
            findLabelToJson:function(value,a){
                
                // obj[$(a).attr('name')]=value;
                if(a.checked){
                    var obj={};
                    obj.id=$(a).attr('name');
                obj.name=value;
                ShopObj.data.labelJson.push(obj);
                }
                
            },
            sortToJson:function(value,a){
                var stock=ShopObj.data.sortObj[$(a).attr('name')]=ShopObj.data.sortObj[$(a).attr('name')]?ShopObj.data.sortObj[$(a).attr('name')]:[];
                if(a.checked){
                   stock.push(value);  
                }

            },
            sortAnotherToJson:function(value,a){
                
                if(a.checked){
                    ShopObj.data.sortAnotherArr.push(value);
                }
                
            }
            });



            form.on('submit(outputMoney)',function(paraData){
                log.d(paraData.field);
				layObj.layer.load();
				if(paraData.field.money>ShopObj.data.obligationBalance){
					layObj.layer.msg('超出余额，请修改后尝试');
					layObj.layer.closeAll('loading');
					return;
				}
                
                common.tools.ajax('post',ajaxAddress.obligationManagerPreFix+ajaxAddress.shopObligation.outputMoney,function(data){
					layObj.layer.msg(data.message);
					layObj.layer.closeAll('loading');
				    if(data.code==200){
                        layObj.layer.close(ShopObj.data.outputAlertIndex);
                        ShopObj.methods.updatePageNum(ShopObj.data.currPage); 
                        ShopObj.methods.updateObligationBalance();  
                    }else{
                        // layObj.layer.msg(data.msg);
                    }
                },paraData.field);

                return false;
            });






        /**
         * 搜索下拉选中
         */
        form.on('select(selectStatus)',function(data){
            ShopObj.data.selectedStatus=data.value;
        })


    },1500)


})