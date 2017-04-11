require(['jquery','jquery-form','main','ajaxAddress','lay-model','log'],function($,jf,myObj,ajaxAddress,layObj,log){

    var common=myObj.load();
    var form;
    log.d(layObj);
    var navObj={
        //防止向上向下重复点击标志位
        isUpOrDownClick:false,
        /**
         * 展示导航列表信息
         */
        showNavlist:function(){

        },
        /**
         * 根据上移下移按钮进行排序
         * @param $obj 获取到当前行的jquery对象
         * @param sortWay 上移或者下移 1/-1
         */
        sortNavList:function($obj,sortWay){
            //当前元素的id 与 位置
            var currentId=$obj.data('id');
            var currentOrder=$obj.data('order');
            var targetId,targetOrder;
            if(sortWay>0){
               targetId = $obj.prev('tr').data('id');
               targetOrder = $obj.prev('tr').data('order');
            }else{
                targetId = $obj.next('tr').data('id');
                targetOrder = $obj.next('tr').data('order');
            }
        },
        /**
         * @param {Number} id 要排序的导航id 
         * @param {Number} order 要排序的位置
         */
        sortNavListByInput:function(id,order,oldOrder){
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.nav.sortNavlist,function(data){
                console.log(data);
                if(data.code==200){
                    location.reload();
                }
            },{id:id,displayorder:oldOrder,displayorderNew:order});
        }
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
			    
			  }
			  
			  //我们既支持上述函数式的方式，也支持下述数组的形式
			  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
			  ,pass: [
			    /^[\S]{6,12}$/
			    ,'密码必须6到12位，且不能出现空格'
			  ],
              isChangeCon:function(value){

              } 
			});

			//监听提交
		  form.on('submit(formDemo)', function(data1){
		    /*layer.alert(JSON.stringify(data.field), {
		      title: '最终的提交信息'
		    })*/
		  
		  	common.tools.formSubmit('#navForm',ajaxAddress.preFix+ajaxAddress.nav.addnavclassifyInfo,function(data){
			    console.log(data);
				if(data.code==200){
	                layer.msg('添加成功');
	                setTimeout(function(){
	                    
	                },1000);
	                
	            }else{
	                layer.msg('网络错误，请稍后重试');
	                setTimeout(function(){
	                    
	                },1000);
	            }
			});

		    return false;
		  });


          //编辑导航信息
		  form.on('submit(formEditDemo)', function(data1){
		    /*layer.alert(JSON.stringify(data.field), {
		      title: '最终的提交信息'
		    })*/
		  /**
           * TODO 判断哪个字段是否更新
           */
		  	common.tools.formSubmit('#editNavForm',ajaxAddress.preFix+ajaxAddress.nav.updatenavclassify,function(data){
			    console.log(data);
				if(data.code==200){
	                layer.msg('添加成功');
	                setTimeout(function(){
	                    
	                },1000);
	                
	            }else{
	                layer.msg('网络错误，请稍后重试');
	                setTimeout(function(){
	                    
	                },1000);
	            }
			});

		    return false;
		  });
    },500);

    /**
     * 请求服务器获取导航信息
     */
    layui.use(['laytpl'],function(){
        var tmp=sortContent.innerHTML;
        var laytpl=layui.laytpl;
        common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.nav.navclassifyInfo,function(data){
            log.d(data);
            if(data.code==200){
                laytpl(tmp).render(data.data,function(html){
                    $('#tableList').append(html);
                })
            }
            
        })
        

    })

    /**
     * 排序
     */
    //上移
    $('#tableList').on('click','.upSort',function(){
        //暂不使用
        if(navObj.isUpOrDownClick){
            navObj.isUpOrDownClick=false;
            navObj.sortNavList($(this).parents('tr'),1)
        }
    })
    //下移
    $('#tableList').on('click','.downSort',function(){
        if(navObj.isUpOrDownClick){
            navObj.isUpOrDownClick=false;
            navObj.sortNavList($(this).parents('tr'),-1)
        }
    })

    /**
     * 失去焦点时请求服务器进行排序
     */
    $('#tableList').on('blur','.sortInput',function(){
        var value=$(this).val().trim();
        var navId=$(this).data('id');
        var order=$(this).data('order');
        navObj.sortNavListByInput(navId,value,order);
    })


    /**
     * 编辑分类类型信息
     * 
     */
    $('#tableList').on('click','.editNavInfo',function(){
        var navId=$(this).data('id');
        var tmpl=editorNavCon.innerHTML;
        common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.nav.getClassifyById,function(data){
            if(data.code==200){
                $('.editorNavBox').html('');
                layObj.laytpl(tmpl).render(data.data,function(html){
                    
                    $('.editorNavBox').append(html);
                })

                layObj.layer.open({
                    type:1,
                    content: $('#editorNav'), //这里content是一个DOM
                    shade:[0.8,'#000'],
                    area:'600px',
                    maxmin: true
                })
                form.render('radio')
                
            }
            
            

        },{id:navId});

        
        
    })

    /**
     * 删除分类类型信息
     * 
     */
    $('#tableList').on('click','.deleteInfo',function(){
        var navId=$(this).data('id');
        var tmpl=editorNavCon.innerHTML;
        layObj.layer.alert('确认删除?',function(){
            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.nav.deletenavclassify,function(data){
                if(data.code==200){
                    layObj.layer.msg('删除成功');
                    setTimeout(function(){
	                    location.reload();
	                },1000);      
                }
            },{id:navId});
        })
        

        
        
    })


    //添加导航信息
    $('.addgoods').on('click',function(){
        
        layObj.layer.open({
            type:1,
            content: $('#alertDemo'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:['600px','400px'],
            maxmin: true
        })
    })

    
 

			


});