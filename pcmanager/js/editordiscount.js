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

    var disObj={
        data:{

        },
        methods:{
            getSingleInfo:function(){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.discount.showSingleInfo,function(data){
                    log.d(data);
                },params)
            }
        }
    }


    setTimeout(function(){

        form=layObj.form();

        form.on('submit(shopInfo)',function(){
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.discount.updateInfo,function(data){
                log.d(data);
            },params)
        })

    },500)


})