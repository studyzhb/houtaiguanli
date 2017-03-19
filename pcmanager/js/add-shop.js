require(['jquery','jquery-form','main','ajaxAddress','lay-model','image-upload','log'],function($,jf,myObj,ajaxAddress,layObj,upload,log){

    var common=myObj.load();

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
    
    
   layui.use('laydate',function(){
       var laydate=layui.laydate;
        var start = {
            min: laydate.now()
            ,format: 'YYYY-MM-DD hh:mm:ss'
            ,max: '2099-06-16 23:59:59'
            ,istoday: false
            ,choose: function(datas){
                var timeStamp=Math.floor(new Date(datas).getTime());
                $(this.elem).next('input').val(timeStamp);
                
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
                $(this.elem).next('input').val(timeStamp);
                start.max = datas; //结束日选好后，重置开始日的最大日期
            }
        };

        $('#date').on('click',function(){
            log.d(layObj);
            start.elem = this;
            layObj.laydate(start);
        })
        // $('#date01').on('click',function(){
        //     end.elem = this
        //     layObj.laydate(end);
        // })
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
                    $(a).val('');
                }  
            }
            });
            log.d(form);
            form.on('submit(shopInfo)',function(paramsData){
                log.d(params);
                paramsData.field.cityid=params.cityid;
                paramsData.field.navid=params.navid;
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.shop.addShopList,function(data){
                        log.d(data);
                        if(data.code==200){
                            layer.msg('添加成功');
                            setTimeout(function(){
                                open('shop.html?id='+params.cityid+'&navid='+params.navid,'_self');
                            },1000);
                            
                        }else{
                            layer.msg('网络错误，请稍后重试');
                            setTimeout(function(){
                                
                            },1000);
                        }
                    },paramsData.field);
                    
                return false;
            })
    },1000)

    

    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.label.getLabelListByNavId,function(data){
        log.d(data);
        var tmpl=$('#labelCon').html();
        layObj.laytpl(tmpl).render(data,function(){
            
        })

    },params);

    

    /**
     * 图片上传
     */
    $('.imageadd').on('click',function(){
        console.log('dianji')
        upload.uploadImage(this);
    });

});