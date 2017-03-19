require(['jquery','main','log','lay-model','ajaxAddress'],function($,myObj,log,layObj,ajaxAddress){

    var common=myObj.load();
    var form;
    common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.city.citylist,function(data){
        if(data.code==200){
            $.each(data.data,function(index,item){
                 $('<a href="javascript:;">').html(item.name).data('id',item.id).appendTo($('.website-all-area'));
            })
           
        }
        
    })

    $('.addCity').on('click',function(){

        layObj.layer.open({
            type:1,
            content: $('#authorForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'400px',
            maxmin: true
        })
    })

    setTimeout(function(){
        form=layObj.form();
        
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
                log.d(data);
            },paramsData.field);
        })
    },500);

    $('.website-all-area').on('click','a',function(){
        common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.city.editCityList,function(data){
            var tpl=$('#editorCityCon').html();
            layObj.laytpl(tpl).render(data.data,function(html){
                $('.editorCity').apend(html);
                layObj.layer.open({
                    type:1,
                    content: $('#editorCityInfo'), //这里content是一个DOM
                    shade:[0.8,'#000'],
                    area:'400px',
                    maxmin: true
                })
            })
        },{id:$(this).data('id')});
        
    })


})