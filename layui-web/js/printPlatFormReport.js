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

    var user=common.cookieUtil.getCookie('username')||'';
    $('.printUser').text(user);

    var time=JSON.parse(decodeURIComponent(params.time))||{};

    var printObj={
        data:{
             outAndInputTotalMoneyTpl:$('#printOrderList01').html(),
             shopOutAndInputTotalTpl:$('#printOrderList02').html(),
             outAndInputPersonTotalTpl:$('#printOrderList03').html(),
             everyShopInfoTpl:$('#printOrderList04').html()
        },
        methods:{
            //渲染数据
            renderUpdateData:function(tml,data){
                
                layObj.laytpl(tml).render(data,function(html){
                    $('body').append(html);
                })
            },
            updatePageNum:function(){
                printObj.methods.getOutAndInputTotalMoney();
                printObj.methods.getShopOutAndInputTotal();
                printObj.methods.getEveryShopInfo();
                printObj.methods.getOutAndInputPersonTotal();
            },
            
            getOutAndInputTotalMoney:function(){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.platForm.outAndInputTotalMoney,function(data){
                    alertFirstLoad=true;
                    if(data.code==200){
                        printObj.methods.renderUpdateData(printObj.data.outAndInputTotalMoneyTpl,data.data);
                    }else{
                        layObj.layer.closeAll('loading');
                        layObj.layer.msg(data.message);
                    }
                },time);
            },
            getShopOutAndInputTotal:function(){
                common.tools.ajax('get',ajaxAddress.obligationPreFix+ajaxAddress.platForm.shopOutAndInputTotal,function(data){
                    alertFirstLoad=true;

                    if(data.code==200){
                        data.total={debt_total:0,debt_id_total:0,debt_inline_total:0,debt_outline_total:0,buy_back_total:0,vip_total:0};
                        $.each(data.data,function(index,item){
                            data.total.debt_total+=item.debt_count||0;
                            data.total.debt_id_total+=item.debt_id_count||0;
                            data.total.debt_inline_total+=item.inline_count||0;
                            data.total.debt_outline_total+=item.outline_count||0;
                            data.total.buy_back_total+=item.buy_back_count||0;
                            data.total.vip_total+=item.vip_count||0;
                        })
                        printObj.methods.renderUpdateData(printObj.data.shopOutAndInputTotalTpl,data);
                    }else{
                        layObj.layer.closeAll('loading');
                        layObj.layer.msg(data.message);
                    }
                },time);
            },
            getOutAndInputPersonTotal:function(){
                common.tools.ajax('get',ajaxAddress.obligationPreFix+ajaxAddress.platForm.outAndInputPersonTotal,function(data){
                    alertFirstLoad=true;
                    if(data.code==200){
                        data.total={inputTotal:0,outputTotal:0,vipTotal:0};
                        $.each(data.data,function(index,item){
                            data.total.inputTotal+=item.in_count||0;
                            data.total.outputTotal+=item.out_count||0;
                            data.total.vipTotal+=item.vip_count||0;
                        })
                       printObj.methods.renderUpdateData(printObj.data.outAndInputPersonTotalTpl,data);
                    }else{
                        layObj.layer.closeAll('loading');
                        layObj.layer.msg(data.message);
                    }
                },time);
            },
            getEveryShopInfo:function(){
                common.tools.ajax('get',ajaxAddress.obligationPreFix+ajaxAddress.platForm.everyShopInfo,function(data){
                    alertFirstLoad=true;
                    if(data.code==200){
                        var o=printObj.methods.mergeData(data.data);
                       printObj.methods.renderUpdateData(printObj.data.everyShopInfoTpl,o);
                    }else{
                        layObj.layer.closeAll('loading');
                        layObj.layer.msg(data.message);
                    }
                },time);
            },
            mergeData:function(data){
                var obj={};
                for(var i in data){
                    obj[i]={};
                    obj[i].data=[];
                    obj[i].total={
                            inputTotal:0,outputTotal:0,backTotal:0
                        }
                    $.each(data[i].bay_back,function(index,item){
                        
                        
                        obj[i].data.push({time:item.time,backCount:item.count});
                        obj[i].total.backTotal+=item.count;
                    })
                    $.each(data[i].in_count,function(index,item){
                        $.each(obj[i].data,function(ind,its){
                            if(item.time==its.time){
                                its.in_count=item.count;
                                item.status=true;
                                obj[i].total.inputTotal+=item.count;
                            }
                        })
                    })
                    $.each(data[i].in_count,function(index,item){
                        if(!item.status){
                            obj[i].data.push({time:item.time,in_count:item.count});
                            obj[i].total.inputTotal+=item.count;
                        }
                    })
                    $.each(data[i].out_count,function(index,item){
                        $.each(obj[i].data,function(ind,its){
                            if(item.time==its.time){
                                its.out_count=item.count;
                                item.status=true;
                                obj[i].total.outputTotal+=item.count;
                            }
                        })
                    })
                    $.each(data[i].out_count,function(index,item){
                        if(!item.status){
                            obj[i].data.push({time:item.time,out_count:item.count});
                            obj[i].total.outputTotal+=item.count;
                        }
                    })
                }
                
                

                return obj;
            }
        }
    }

    printObj.methods.updatePageNum();





})