require(['jquery','main','ajaxAddress','lay-model','log'],function($,myObj,ajaxAddress,layObj,log){
    
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

    var areaObj={
        data:{

        },
        methods:{
            updateAreaType:function(data){
                $.each(data,function(index,item){
                    $('<option>').appendTo($('select.areaType')).attr('value',item.id).text(item.name);
                })
                form=layObj.form();
                form.render();
                
            }
        }
    }


    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.area.getAreaType,function(data){
         areaObj.methods.updateAreaType(data.data);
         
        log.d(data);
        if(data.code==200){
            
        }else{
            layObj.layer.msg(data.msg);
        }
       
        
    },{cityid:params.id})

    $('.arealist').on('click',function(){
        open('area.html?id='+params.id,'_self');
    })


    setTimeout(function(){
        form=layObj.form();
        form.on('submit(shopInfo)',function(formParams){
                log.d('tijiao ')
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
    },1000);

})