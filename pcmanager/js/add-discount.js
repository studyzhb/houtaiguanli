require(['jquery','jquery-form','main','ajaxAddress','lay-model','log','image-upload'],function($,jf,myObj,ajaxAddress,layObj,log,upload){

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

    var formData={
        name:'111111',
        benefit_info:'111123214421',
        address:'2211111',
        pic_url:"['http://enclosure.wandlm.net/user-release/android_1489550372150.png']",
        cityid:params.cityid,
        navid:params.navid,
        introduce:'1111',
        release_begin:'1489644872',
        release_end:'1489648888'
        
    }


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

            form.on('submit(shopInfo)',function(paraData){
                log.d(paraData.field)
                paraData.field.cityid=params.cityid;
                paraData.field.navid=params.navid;
                
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.discount.addInfo,function(data){
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
                    },paraData.field);
                    
                return false;
            });
    },1000)
    // log.d(jedate)
    // $("#date").jeDate({
	//     isinitVal:true,
	//     festival:true,
	//     ishmsVal:false,
	//     minDate: '2016-06-16 23:59:59',
	//     maxDate: $.nowDate(0),
	//     format:"hh:mm:ss",
	//     zIndex:3000,
	//     choosefun:function(elem, val) {

	//     },     
	//     //选中日期后的回调, elem当前输入框ID, val当前选择的值
	// 	clearfun:function(elem, val) {},      
	// 	//清除日期后的回调, elem当前输入框ID, val当前选择的值
	// 	okfun:function(elem, val) {
	// 		console.log(val);
	// 		addShopPage.worktime.start=val;
	// 	},        
	// 	//点击确定后的回调, elem当前输入框ID, val当前选择的值
	// 	success:function(elem) {},            
	// 	//层弹出后的成功回调方法, elem当前输入框ID
	// });
	// $("#date01").jeDate({
	//     isinitVal:true,
	//     festival:true,
	//     ishmsVal:false,
	//     minDate: '2016-06-16 23:59:59',
	//     maxDate: '2016-07-16 21:59:59',
	//     format:"hh:mm:ss",
	//     zIndex:3000,
	//     okfun:function(elem, val) {
	// 		console.log(val);
	// 		addShopPage.worktime.end=val;
	// 	}
	// })
    

    /**
     * 图片上传
     */
    $('.imageadd').on('click',function(){
        upload.uploadImage(this,function(arrImage){
            log.d(arrImage);
            var arr=[];
            var arrInfo=[];
            $.each(arrImage,function(index,item){
                arrInfo.push(common.tools.formatTemplate({imgsrc:item.src},$('#image-suolve').html()));
                // $(this).before();
                arr.push(item.src);
            })
            $(this).before(arrInfo.join(''));
            $(this).parent('image-suolve').next('input').val(JSON.stringify(arr));
        });
    });

});