require(['jquery','main','ajaxAddress','lay-model','log'],function($,myObj,ajaxAddress,layObj,log){

    var common=myObj.load();
    var form;
    var navObj={
        //防止向上向下重复点击标志位
        isUpOrDownClick:true,
        data:{
            checkTypeId:'',
            checkNum:0,
            arrRemo:[]
        },
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

    /**
     * 请求服务器获取导航信息
     */
    layui.use(['laytpl'],function(){
        var tmp=sortContent.innerHTML;
        var laytpl=layui.laytpl;
        common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.nav.showNavlist,function(data){
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
     * 编辑导航信息
     * 
     */
    $('#tableList').on('click','.editNavInfo',function(){
        var navId=$(this).data('id');
        var tmpl=editorNavCon.innerHTML;
        //暂不使用
        if(navObj.isUpOrDownClick){
            navObj.isUpOrDownClick=false;
            common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.nav.getSingleNavInfoById,function(data){
                if(data.code==200){
                    console.log(data);
                    $('.editorNavBox').html('');
                    layObj.laytpl(tmpl).render(data.data,function(html){
                        
                        $('.editorNavBox').append(html);
                        form.render();
                    })
                    // form.render();
                    layObj.layer.open({
                        type:1,
                        content: $('#editorNav'), //这里content是一个DOM
                        shade:[0.8,'#000'],
                        area:'600px',
                        maxmin: true,
                        end:function(){
                            log.d('关闭');
                            navObj.isUpOrDownClick=true;
                            $('#editorNav').hide();
                        }
                    })
                    // form.render('radio')
                    
                }
                
                

            },{id:navId});
        }
        

        
        
    })


    $('#tableList').on('click','.addRecommend',function(){
        
        var navId=$(this).data('id');
        navObj.data.navId=navId;
        navObj.data.arrRemo=[];
        navObj.data.checkTypeId='';
        navObj.data.checkNum=0;
        common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.classify.updateRecommend,function(data){
            
            if(data.code==200){
                var tpl=$('#recommendInfo').html();
                $('.recommendWrapper').html('');
                $.each(data.data,function(index,item){
                    $.each(item.data,function(ind,its){
                        if(its.selected){
                            navObj.data.checkNum++;
                            navObj.data.checkTypeId=item.id;
                        }
                    })
                })
                layObj.laytpl(tpl).render(data.data,function(html){
                    $('.recommendWrapper').append(html);
                   form.render();
                })
                
                layObj.layer.open({
                    type:1,
                    content: $('.recommendCon'), //这里content是一个DOM
                    shade:[0.8,'#000'],
                    area:'600px',
                    maxmin: true,
                    end:function(){
                        log.d('关闭');
                        $('.recommendCon').hide();
                    }
                })
                // form.render('radio')
                
            }else if(data.code==300){
                layObj.layer.msg('暂无数据');
            }

        },{id:navId});
    })

    $('.saveRecommend').on('click',function(){
        console.log('11-click');
        navObj.data.arrRemo=[];
        navObj.data.checkTypeId='';
        navObj.data.checkNum=0;
    })

    //添加导航信息
    $('.addgoods').on('click',function(){
        
        layObj.layer.open({
            type:1,
            content: $('#alertDemo'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:'600px',
            maxmin: true,
            end:function(){
                $('#alertDemo').hide();
            }
        })
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
			    
			  }
			  
			  //我们既支持上述函数式的方式，也支持下述数组的形式
			  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
			  ,pass: [
			    /^[\S]{6,12}$/
			    ,'密码必须6到12位，且不能出现空格'
			  ],
              checkIsCanSelect:function(value,a){
                        var seleId=$(a).data('id');
                        
                      if(navObj.data.checkNum<=0){
                          navObj.data.arrRemo=[];
                      }
                      if(a.checked){
                          if(!navObj.data.checkTypeId){
                              navObj.data.checkTypeId=seleId;
                          }
                          if(!navObj.data.checkNum){
                              navObj.data.checkTypeId=seleId;
                          }
                            
                          
                          navObj.data.checkNum++;
                          if(navObj.data.checkNum==1){
                                var obj={};
                                obj.id=$(a).attr('value');
                                obj.name=$(a).attr('title');
                                navObj.data.checkTypeId=seleId;
                                    navObj.data.arrRemo.push(obj);
                            }else if(navObj.data.checkNum>2){
                                return '只能选择同一类型';
                            }else{
                                if(navObj.data.checkTypeId==seleId){
                                    var obj={};
                                obj.id=$(a).attr('value');
                                obj.name=$(a).attr('title');
                                navObj.data.checkTypeId=seleId;
                                    navObj.data.arrRemo.push(obj);
                                }else{
                                     return '只能选择同一类型';
                                }
                            }
                      }

                      

                //   if(navObj.data.checkNum>2){
                //       layObj.layer.msg('超过最大数量');
                //       return '最多只能选择2个'
                //   }else{
                      
                //       if(a.checked){
                //           if(navObj.data.checkTypeId!=seleId){
                //             //   a.checked=false;
                //             //   form.render();
                //               return '只能选择同一类型';
                //           }else{
                //               var obj={};
                //             obj.id=$(a).attr('value');
                //             obj.name=$(a).attr('title');
                //               navObj.data.arrRemo.push(obj);
                //             //   navObj.data.checkTypeId=seleId;
                              
                //             //   console.log(navObj.data.arrRemo);
                //           }
                //       }else{
                //           $.each(navObj.data.arrRemo,function(index,item){
                //               if(item.id==seleId){
                //                 navObj.data.arrRemo.split(index,1);
                //                 index--;
                //               }
                //           })
                //       }
                      
                //   }
                  
              } 
              ,isChangeValue:function(value,a){
                    if($(a).data('info')==value){
                        $(a).val('');
                        $(a).removeAttr("name");
                    }  
                },
                isChangeNull:function(value,a){
                    if($(a).data('info')==value){
                        $(a).val('');
                        
                    } 
                }
			});

            /**form.on('checkbox(clickRecommend)',function(data){
               var seleId=$(data.elem).data('id')
                if(navObj.data.checkNum<=0){
                    navObj.data.checkNum=0;
                    navObj.data.checkTypeId='';
                }
                if(data.elem.checked){

                    if(!navObj.data.checkTypeId){
                        navObj.data.checkTypeId=seleId;
                    }
                    if(navObj.data.checkTypeId!=seleId){
                        layObj.layer.msg('只能选择一种类型');
                        data.elem.checked=false;
                        form.render('checkbox');
                    }else{
                        navObj.data.checkNum++;
                        var obj={};
                        obj.id=$(data.elem).attr('value');
                        obj.name=$(data.elem).attr('title');
                        
                        navObj.data.arrRemo.push(obj);
                    }
                    
                }else{
                    navObj.data.checkNum--;
                }
            })**/

			//监听提交
		  form.on('submit(formDemo)', function(data1){
		    /*layer.alert(JSON.stringify(data.field), {
		      title: '最终的提交信息'
		    })*/
            
		  	common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.nav.addNavInfo,function(data){
			    
				if(data.code==200){
                    
	                layer.msg('添加成功');
	                setTimeout(function(){
	                    location.reload();
	                },1000);
	                
	            }else{
                    
	                layer.msg('网络错误，请稍后重试');
	                setTimeout(function(){
	                    location.reload();
	                },1000);
	            }
			},data1.field);

		    return false;
		  });

          //监听提交
		  form.on('submit(saveRecommend)', function(data1){
              navObj.data.checkNum=0;
		    console.log('click-submit');
		  	common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.classify.commitRecommend,function(data){
			    navObj.data.arrRemo=[];
                navObj.data.checkTypeId='';
                navObj.data.checkNum=0;
				if(data.code==200){
	                layer.msg('添加成功');
	                setTimeout(function(){
	                    location.reload();
	                },1000);
	                
	            }else{
	                layer.msg('网络错误，请稍后重试');
	                setTimeout(function(){
	                    location.reload();
	                },1000);
	            }
              },{recommend:JSON.stringify(navObj.data.arrRemo),id:navObj.data.navId});

		    return false;
		  });

          //编辑导航信息
		  form.on('submit(formEditDemo)', function(data1){
		    /*layer.alert(JSON.stringify(data.field), {
		      title: '最终的提交信息'
		    })*/
		  
		  	common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.nav.updateNav,function(data){
			    
				if(data.code==200){
	                layer.msg('添加成功');
	                setTimeout(function(){
	                    location.reload();
	                },1000);
	                
	            }else{
	                layer.msg('网络错误，请稍后重试');
	                setTimeout(function(){
	                    location.reload();
	                },1000);
	            }
			},data1.field);

		    return false;
		  });
    },1000);

			


});