require(['jquery','main','ajaxAddress','lay-model','image-upload','log'],function($,myObj,ajaxAddress,layObj,upload,log){

    var common=myObj.load();

    /**
     * 图片上传
     */
    $('.imageadd').on('click',function(){
        upload.uploadImage(this);
    });

})