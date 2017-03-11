require(['jquery','jquery-form','main','ajaxAddress','lay-model','log'],function($,jf,myObj,ajaxAddress,layObj,log){

    var common=myObj.load();
   var form;
   setTimeout(function(){
    form=layObj.form();
   },1000)
    
   var LabelObj={
       data:{
           $el:''
       }
   }



    $('#all-sort-list').on('click','.add-new-label',function(){
        log.d('11111');
        LabelObj.data.$el=$(this);
        layObj.layer.open({
            type:1,
            content: $('#addTypeCon'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'400px',
            maxmin: true
        })

        
    })

    $('.saveGoodsNum').on('click',function(){
        layObj.layer.closeAll();
        LabelObj.data.$el.before($(' <input type="checkbox" title="标签内容已">'));
        form.render('checkbox');
    })


})