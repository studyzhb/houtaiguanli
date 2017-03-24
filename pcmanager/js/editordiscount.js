require(['jquery','jquery-form','main','ajaxAddress','lay-model','img-single-load','log','params'],function($,jf,myObj,ajaxAddress,layObj,upload,log,params){

    var common=myObj.load();

    var form;

    

    var disObj={
        data:{

        },
        methods:{
            getSingleInfo:function(){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.discount.showSingleInfo,function(data){
                    log.d(data);
                    if(data.code==200){
                        var tpl=$('#formCon').html();
                        layObj.laytpl(tpl).render(data.data,function(html){
                            $('.formWrapper').append(html);
                            setTimeout(function(){
                                form.render();
                            },600);
                        });
                    
                    }
                },params)
            },
            updateDiscountInfo:function(data){
                var tpl=$('#formCon').html();
                $('.formWrapper').html('');
                layObj.laytpl(tpl).render({},function(html){
                    $('.formWrapper').append(html);
                    setTimeout(function(){
                        form.render();
                    },600);
                });
            }
        }
    }

    disObj.methods.getSingleInfo();

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
			    
			  }
			  
			  //我们既支持上述函数式的方式，也支持下述数组的形式
			  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
			  ,pass: [
			    /^[\S]{6,12}$/
			    ,'密码必须6到12位，且不能出现空格'
			  ]
              ,isChangeValue:function(value,a){
                    if($(a).data('info')==value){
                        
                        $(a).removeAttr("name");
                    }  
                },
                isChangeNull:function(value,a){
                    if($(a).data('info')==value){
                        $(a).val('');
                        
                    } 
                }
			});

        form.on('submit(shopInfo)',function(paraFormData){
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.discount.updateInfo,function(data){
                log.d(data);
                if(data.code==200){

                }else{

                }
            },paraFormData.field);
        })

    },500)

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

   /**
     * 图片上传
     */
    $('.formWrapper').on('click','.imageadd',function(){
        upload.uploadImage(this);
    });

    /**
     * 跳转到列表页
     */

    $('.discountList').on('click',function(){
        location.href="discountInfo.html?id="+params.cityid+'&navid='+params.navid;
    })


})