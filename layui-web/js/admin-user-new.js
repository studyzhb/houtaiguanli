require(['jquery','main','ajaxAddress','lay-model','log','params'],function($,myObj,ajaxAddress,layObj,log,params){
    
    var common=myObj.load();
    var fistLoad=true;
    var form;
    
    
    // $('.cityName').text(unescape(params.name));
    var ShopObj={
        data:{
            navId:'',
            tempGoodsContent:$('#shopGoodsCon').html(),
            pageCount:0,
            shopid:'',
            arrLabel:[],
            labelJson:[],
            arrGoodsLabel:[],
            arrShopClassify:[],
            arrGoodsClassify:[],
            arrAreaGoods:[],
            sortObj:{},
            sortAnotherArr:[],
            currentPage:'1',
            currentRePage:'1',
            //当前处于哪个tab栏 1为全部列表,2为已推荐
            currentStatus:'1',
            searched:true,
            pageSize:10,
            addUser:{
                maxNum:''
            }
        },
        methods:{
            updateShopList:function(data){
                 $('#tableWrapper').html('');
                 var obj={};
                 obj.data=data;
                layObj.laytpl(ShopObj.data.tempGoodsContent).render(obj,function(html){
                    $('#tableWrapper').append(html);
                })
            },
            updatePage:function(para){
                
                layui.use(['laypage', 'layer'],function(){
                    var laypage=layui.laypage;
                    var layer = layui.layer;
                    laypage({
                        cont: 'page'
                        ,pages: ShopObj.data.pageCount //总页数
                        ,groups: 5 //连续显示分页数
                        ,jump:function(data){
                            //得到页数data.curr

                            if(ShopObj.data.currentPage!=data.curr){
                                ShopObj.data.currentPage=data.curr;
                                ShopObj.methods.updatePageNum(data.curr,para);
                            }               
                        }
                    });
                });

                fistLoad=false;
            },
            updatePageNum:function(num,para){
                
                var options={
                    p:num||ShopObj.data.currentPage,
                    cityid:params.id,
                    navid:ShopObj.data.navId
                }
                if(ShopObj.data.currentStatus=='1'){
                    $('.unedit').addClass('layui-this').siblings().removeClass('layui-this');
                }else{
                    $('.edited').addClass('layui-this').siblings().removeClass('layui-this');
                }
                para=$.extend({},options,para||{});
                log.d(options);
                $('#tableWrapper').html('');
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.user.showlist,function(data){
                    log.d(data);
                    if(data.code==200){
                        ShopObj.data.pageCount=Math.ceil(data.total/ShopObj.data.pageSize);
                        $('.detailCount').text(data.total);
                        ShopObj.methods.updateShopList(data.data);
                         if(fistLoad){
                            ShopObj.methods.updatePage(para);
                        }
                    }else{
                        ShopObj.data.pageCount=Math.ceil(data.total/ShopObj.data.pageSize);
                        $('.detailCount').text(data.total);
                        layObj.layer.msg(data.message);
                        ShopObj.methods.updateShopList([]);
                        if(fistLoad){
                            ShopObj.methods.updatePage(para);
                        }
                    }
                },options);
            },
            updateShopStatus:function(sta,id){
                //
                
                common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.obligation.goods.upordownGoods,function(data){
                    data=data.data;
                    if(data.code==200){
                        layObj.layer.msg(data.message);
                        if(ShopObj.data.currentStatus=='1'){
                            ShopObj.methods.updatePageNum(ShopObj.data.currPage);
                        }else{
                            ShopObj.methods.updateRecommendList(ShopObj.data.currentRePage);
                        }
                    }else{
                        layObj.layer.msg(data.message);
                    }
                },{id:id,status:sta});
            },
            /**
             * 获取单个用户信息
             */
            getSingleInfo:function(id){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.user.updateUserInfo,function(data){
                    
                    // if(data.code==200){
                        
                    // }
                    var tpl=formCon.innerHTML;
                    $('.formWrapper').html('');
                    var obj=data.data;
                    obj.role=data.role;
                    obj.dept=data.dept;
                    layObj.laytpl(tpl).render(obj,function(html){
                        $('.formWrapper').append(html);
                    })
                    form.render('select');
                },{id:id});
            },
            /**
             * 获取用户信息
             */
            getUserInfo:function(){
                common.tools.ajax('get',ajaxAddress.preFix+ajaxAddress.user.addUser,function(data){
                    if(data.jobNum.length<=0){
                        ShopObj.data.addUser.maxNum=80000;
                    }else{
                        ShopObj.data.addUser.maxNum=data.jobNum[0]['job_num']!=0?data.jobNum[0]['job_num']:80000;
                    }
                    $('.userCard').val(ShopObj.data.addUser.maxNum-0+1);
                    $.each(data.dept,function(index,item){
                        $('<option>').appendTo($('.deptlist')).html(item.name);
                        $.each(item.z,function(i,ites){
                            $('<option>').appendTo($('.deptlist')).attr('value',ites.id).html('----'+ites.name);
                        })
                    });
                    $.each(data.role,function(index,item){
                        $('<option>').appendTo($('.rolelist')).attr('value',item.id).html(item.name);
                    });
                    
                });
            },
            updateShopInfo:function(data){
                var tpl=$('#formCon').html();
                $('.formWrapper').html('');
                data.classArr=ShopObj.data.arrGoodsClassify;
               
                layObj.laytpl(tpl).render(data,function(html){
                    $('.formWrapper').append(html);
                    $('.editMenuForm').find('.img-content').html(data.introduce);
                    setTimeout(function(){
                        form.render();
                    },600);
                });
            },



        }
    }






    
    /**
     * 编辑店铺详细信息
     */
     $('#tableWrapper').on('click','.editInfo',function(){
        ShopObj.data.labelJson=[];
        ShopObj.data.sortObj={};
        ShopObj.data.sortAnotherArr=[];
        ShopObj.methods.getSingleInfo($(this).data('id'));
        layObj.layer.open({
             type:1,
            content: $('.editMenuForm'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:['95%','98%'],
            zIndex:1000,
            maxmin: true,
            end:function(){
                $('.editMenuForm').hide();
            }
         })
         
     })


     $('.idCard').on('blur',function(){
		
		// console.log($(this));
		if($(this).ValidateIdCard()){
			var area=getIcardaddress($(this).val().substr(0, 6));


			var bir=$(this).IdCardBirthday();
			var sex=$(this).IdCardSex()?'男':'女';
			var age=$(this).IdCardAge(bir);
			$('.addressInfo').val(area);
			$('.birthdayInfo').val(bir);
			$('.sexInfo').val(sex);
			$('.sexInfoId').val($(this).IdCardSex());
			$('.ageInfo').val(age);

		}else{
			// layer.open({
			// 	type:1,
			// 	content:CheckIdCard($(this).val())
			// })
			layer.msg('身份证信息不正确');
		}

		config.ajax('get',config.ajaxAddress.idcardcheck,function(data){
			console.log(data);
		},{carded:$(this).val()});

	});


    /**
     * 停用或启用
     */
    $('#tableWrapper').on('click','.TODO',function(){
        var sta=$(this).data("status");
        var id=$(this).data("id");
        if(sta=='0'){
            layObj.layer.confirm('你确定要执行此操作?',function(index){
                layObj.layer.close(index);
                 ShopObj.methods.updateShopStatus(sta,id);
            })
        }else{
             ShopObj.methods.updateShopStatus(sta,id);
        } 
    })



    /**
     * 点击添加债权金商品add-shop-info
     */
    $('.add-shop-goods').on('click',function(){

        // $('.productWrapper').html('');
        // $.each(ShopObj.data.arrGoodsClassify,function(index,item){  
        //     $('<option>').appendTo($('.productWrapper')).html(item.cname).attr('value',item.id);
        // })
        form.render('select');
        // 打开添加店铺信息窗口
        layObj.layer.open({
             type:1,
             title:'商品添加',
            content: $('#menuAddShop'), //这里content是一个DOM
            shade:[0.8,'#000'],
            area:['95%','98%'],
            zIndex:1000, 
            maxmin: true,
            end:function(){
                $('#menuAddShop').hide();
            }
         })
        // open('add-shop.html?navid='+ShopObj.data.navId+'&cityid='+params.id,'_self');
    })



     //获取商品信息
    ShopObj.methods.updatePageNum(ShopObj.data.currentPage);
    ShopObj.methods.getUserInfo();

   setTimeout(function(){
       log.d(layObj);
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
                    $(a).removeAttr("name");
                }   
            },
            findLabelToJson:function(value,a){
                
                // obj[$(a).attr('name')]=value;
                if(a.checked){
                    var obj={};
                    obj.id=$(a).attr('name');
                obj.name=value;
                ShopObj.data.labelJson.push(obj);
                }
                
            },
            sortToJson:function(value,a){
                var stock=ShopObj.data.sortObj[$(a).attr('name')]=ShopObj.data.sortObj[$(a).attr('name')]?ShopObj.data.sortObj[$(a).attr('name')]:[];
                if(a.checked){
                   stock.push(value);  
                }

            },
            sortAnotherToJson:function(value,a){
                
                if(a.checked){
                    ShopObj.data.sortAnotherArr.push(value);
                }
                
            }
            });


            /**
             * 添加员工信息
             */
            form.on('submit(shopInfo)',function(paraData){
                layObj.layer.load();
                common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.user.addUser,function(data){

                        if(data.code==200){
                            layObj.layer.closeAll();
                            layer.msg('添加成功');
                            ShopObj.methods.updatePageNum(ShopObj.data.currentPage);

                        }else{
                            
                            layer.msg(data.message);
                           
                        }
                    },paraData.field);
                    
                return false;
            });

  

            //编辑员工信息
            form.on('submit(editorDiscountInfo)',function(paraData){
                layObj.layer.load();

            common.tools.ajax('post',ajaxAddress.preFix+ajaxAddress.user.updateUserInfo,function(data){
                log.d(data);
                if(data.code==200){
                    layObj.layer.closeAll();
                    layObj.layer.msg('更新成功');
                    
                    ShopObj.methods.updatePageNum(ShopObj.data.currentPage);
                }else{
                    layObj.layer.closeAll('loading');
                    layObj.layer.msg(data.message);
                }
            },paraData.field);
        })
        //搜索
        form.on('submit(searchFilterGoods)',function(formParams){
 
            $('#searchedlist').html('');
            var tempHtml=searchedcontent.innerHTML;
            common.tools.ajax('post',ajaxAddress.obligationPreFix+ajaxAddress.obligation.goods.searchFilterGoods,function(data){
                    data=data.data;
                    if(data.code==200){
                        
                        layObj.laytpl(tempHtml).render(data.goods_list,function(html){
                            $('#searchedlist').append(html);
                        })

                        ShopObj.data.alertIndex=layer.open({
                          type: 1,
                          content: $('#goods-list'), //这里content是一个DOM
                          shade:[0.8,'#000'],
                          area:'900px',
                          maxmin: true,
                          end:function() {
                            // body...
                            $('#goods-list').hide();
                          }
                        })
                    }else{
                        
                        setTimeout(function(){
                            // layObj.layer.closeAll();
                            // classObj.methods.updatePageNum(1);
                        },1000);
                    }
                },formParams.field);
                
            return false;
        })




    },1000)


    
})