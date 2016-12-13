$(function(){

	var supplierPage={
        selectIndex:1,
        count:'',
        isupdate:true,
		area_p:config.area_num.root,
        area:{
            provinces:'',
            city:'',
            county:''
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
        console.log(page,obj.address);
         $('#detailpage').text(page);
         $('#pagecount').text(config.pSort.pagecount);
         if(supplierPage.isupdate){
            $.each(obj.address,function(index,item){
                $('<a href="javascript:;" class="pro-area">').appendTo($('.provinces-supplier')).html(item);
            });
            supplierPage.isupdate=false;
         }
         
         $('#pagewrap').find('a').text(supplierPage.selectIndex);
        console.log(obj.data);
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
		layer.open({
			 type: 1,
		      content: $('#alertDemo'), //这里content是一个DOM
		      shade:[0.8,'#000'],
		      area:'900px',
		      maxmin: true
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
	config.ajax('get',config.ajaxAddress.showSupplierList,function(data){
		console.log(data);
		var tempHtml=supplierList.innerHTML;
		$('#supplier-wrapper').html('');
		$.each(data.data,function(index,item){

			laytpl(tempHtml).render(item,function(html){
				$('#supplier-wrapper').append(html);
			});
		});
	});

});