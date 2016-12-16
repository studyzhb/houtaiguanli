$(function(){

	var supplierPage={
        selectIndex:1,
        count:'',
        pagecount:'',
        isupdate:true,
		area_p:config.area_num.root,
        area:{
            provinces:'',
            city:'',
            county:'',
            state_type:'',
            run:''
        },
        addProvince:function(){
            //创建省份类select
            $('#province-list').html('');
            var me=this;
            $.each(this.area_p.province,function(index,item){
                var $li=$('<li>').appendTo($('#province-list')).html(item['-Name']);
                $li.on('click',function(){
                    me.area.provinces=$(this).text();
                    me.addCity($(this).text());
                });
            });
        },
        addCity:function(parVal){
            $('#city-list').html('');
             var me=this;
            $.each(this.area_p.province,function(index,item){
                if(item['-Name']==parVal){
                    $.each(item.city,function(i,cityO){
                    	// console.log(cityO);
                        var $li=$('<li>').appendTo($('#city-list')).html(cityO['-Name']);
                        $li.on('click',function(){
                            me.area.city=$(this).text();
                            console.log(me.area.provinces);
                            me.addCountry(me.area.provinces,$(this).text());
                        });
                    })
                }
            });
        },
        addCountry:function(parP,parC){
            $('#contry-list').html('');
             var me=this;
            $.each(this.area_p.province,function(index,item){
                if(item['-Name']==parP){
                    $.each(item.city,function(i,cityO){
                        if(cityO['-Name']==parC){
                            $.each(cityO.district,function(a,contryO){
                            	//console.log(contryO['-Id']);
                               var $li=$('<li id='+contryO['-Id']+'>').appendTo($('#contry-list')).html(contryO['-Name']);
                                $li.on('click',function(){
                                    me.area.county=$(this).text();
                                    me.createSupplierNum($(this).attr('id'));
                                });
                            })
                        }
                    })
                }
            });
        },
        selectResu:function(){
             
            
        },
        createSupplierNum:function(val){
        	// console.log(typeof val)
        	// val+=Math.floor(Math.random()*1000);
        	// $('#supplierNum').val(val);

            var tempVal=val;
            val+=Math.floor(Math.random()*(9001)+1000);
            var me=this;
            config.ajax('post',config.ajaxAddress.supplierNum,function(data){
                console.log(data);
                if(data.code==200){
                    $('#supplierNum').val(val);
                    return;
                }else{
                    me.createSupplierNum(tempVal);
                }
            },{coding:val});

        },
        page:function(obj){
            supplierPage.count=obj.count;
            $('#supplier-message-list').html('');
            $('#detailcount').text(obj.count);
        var page=obj.count%config.pSort.pagecount==0?obj.count/config.pSort.pagecount:parseInt(obj.count/config.pSort.pagecount)+1;
        // console.log(page,obj.address);
         $('#detailpage').text(page);
         $('#pagecount').text(config.pSort.pagecount);
         if(supplierPage.isupdate){
            $.each(obj.address,function(index,item){
                $('<a href="javascript:;" class="pro-area">').appendTo($('.provinces-supplier')).html(item);
            });
            supplierPage.isupdate=false;
         }
         
         $('#pagewrap').find('a').text(supplierPage.selectIndex);
        // console.log(obj.data);
        var arr=[];
        var supplierhtml=$('#showSupplierList').html();
        $.each(obj.data,function(index,item){
            arr.push(config.formatTemplate(item,supplierhtml));
        });
        $('#supplier-message-list').append(arr.join(''));
        }
    }

    supplierPage.addProvince();

	//添加供应商信息
	$('.addSupplier').on('click',function(){

        $('#supplierNum').val('');
        config.ajax('get',config.ajaxAddress.addSupplier,function(data){
            $.each(data.run,function(index,item){
                // console.log(item);
                var $li=$('<li>').appendTo($('#run_type')).html(item.run).attr('id',item.id);
                $li.on('click',function(){
                     supplierPage.area.run=$(this).attr('id');
                });
            });
            $.each(data.statements,function(index,item){
                console.log(item);
                var $li=$('<li>').appendTo($('#method_type')).html(item.statements).attr('id',item.id);
                $li.on('click',function(){
                    supplierPage.area.state_type=$(this).attr('id');
                });
            });
            layer.open({
             type: 1,
              content: $('#alertDemo'), //这里content是一个DOM
              shade:[0.8,'#000'],
              area:'900px',
              maxmin: true
            })
        })
		
	});
	//编辑供应商信息
	$('#supplier-wrapper').on('click','.editorSingleSupplier',function(){
        console.log($(this).data('id'));
        //请求TODO

        
		layer.open({
			type: 1,
	      content: $('#editorSupplier'), //这里content是一个DOM
	      shade:[0.8,'#000'],
	      area:'900px',
	      maxmin: true
		})
	});

	var laytpl;
	layui.use('laytpl',function(){
		laytpl=layui.laytpl;



	});
	/*config.ajax('get',config.ajaxAddress.showSupplierList,function(data){
		console.log(data);
		var tempHtml=supplierList.innerHTML;
		$('#supplier-wrapper').html('');
		$.each(data.data,function(index,item){

			laytpl(tempHtml).render(item,function(html){
				$('#supplier-wrapper').append(html);
			});
		});
	});*/
var fistLoad=true;
updatePageNum(0);
function updatePageNum(p1){
    config.ajax('get',config.ajaxAddress.showSupplierList,function(data){
        console.log(data);
        supplierPage.pagecount=data.count;
        var tempHtml=supplierList.innerHTML;
        $('#supplier-wrapper').html('');
        if(fistLoad){

                updatePage();
            }
        $.each(data.data,function(index,item){

            laytpl(tempHtml).render(item,function(html){
                $('#supplier-wrapper').append(html);
            });
        });
    },{p:p1});
        
    }

    $('#editorinfo').on('click',function(){
       config.formSubmit('.editorForm',config.ajaxAddress.updateSupplier,function(data){
        // console.log(data);
       })
    });

     $('#addInfo').on('click',function(){
        layer.open({type:3});
        $('.ppro').val(supplierPage.area.provinces);
        $('.ppcity').val(supplierPage.area.city);
        $('.ppcounty').val(supplierPage.area.county);
        $('.ppstate').val(supplierPage.area.state_type);
        $('.pprun').val(supplierPage.area.run);
        config.formSubmit('.addForm',config.ajaxAddress.addSupplier,function(data){
            console.log(data);
            if(data.code==200){
                layer.msg('添加成功');
                setTimeout(function(){
                    open('supplier.html',"_self");
                },500);
            }else{
                layer.msg('网络错误，请稍后重试');
                setTimeout(function(){
                    open('supplier.html',"_self");
                },500);
            }
       })
    });


    function updatePage(){
    layui.use(['laypage', 'layer'],function(){
        var laypage=layui.laypage;
        var layer = layui.layer;
        laypage({
            cont: 'page'
            ,pages: supplierPage.pagecount //总页数
            ,groups: 5 //连续显示分页数
            ,jump:function(data){
                //得到页数data.curr
                updatePageNum(data.curr);
            }
          });
    });

    fistLoad=false;
}


});