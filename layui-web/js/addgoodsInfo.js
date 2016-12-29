$(function(){
var laytpl; 
var isClick=true;
var fistLoad=true;
    layui.use('laytpl',function(){
        laytpl = layui.laytpl;

    $('#purchaselist').on('click','.lookorderInfo',function(){
    $('.mutigoods').html('');
    $('.muticoding').html('');
    $('.baseSingleInfo').html('');
    //console.log($(this).data('id'));
    var htm=$('#goodsContent').html();
    var htmdecode=$('#duomaedit').html();
    var htmdename=$('#duopinedit').html();
    $('.baseSingleInfo').html('');
    //console.log(htmdecode,htmdename);
    $('.mutigoods').html('');
    $('.muticoding').html('');
    config.ajax('get',config.ajaxAddress.goodsEditor,function(data){
        // console.log(data);
        
        $('.baseSingleInfo').append(config.formatTemplate(data.good[0],htm));
        $.each(data.good[1],function(index,item){
            //console.log(item);
            item.fullname=data.good[0].name;
            item.barcode=data.good[0].barcode;
            $('.muticoding').append(config.formatTemplate(item,htmdecode));
        });
        $.each(data.good[2],function(index,item){
            item.fullname=data.good[0].name;
            item.barcode=data.good[0].barcode;
             $('.mutigoods').append(config.formatTemplate(item,htmdename));
        });
        
        // ======================================
        $.each(data.goodBrand,function(index,item){
            var $li=$('<li>').appendTo($('.add-goods-brand')).html(item.brand).attr('value',item.id);
            $li.on('click',function(){
                $('.good_brand_id').val($(this).attr('value'));
            })
        });
        $.each(data.method,function(index,item){
            var $li=$('<li>').appendTo($('.goods-method')).html(item.method).attr('value',item.id);
            $li.on('click',function(){
                $('.method_id').val($(this).attr('value'));
            })
        });
        $.each(data.gg,function(index,item){
            var $li=$('<li>').appendTo($('.gg')).html(item.gg).attr('value',item.id);
            $li.on('click',function(){
                $('.gg_id').val($(this).attr('value'));
            })
        });
        $.each(data.supplier,function(index,item){
            var $li=$('<li>').appendTo($('.main-supplier')).html(item.name).attr('value',item.id);
            $li.on('click',function(){
                $('.supplier_id').val($(this).attr('value'));
            })
        });
        $.each(data.goodType,function(index,item){
            // item.
             $('<li>').appendTo($('.sort_goods')).html(item.type);
            // console.log(item);
            goodsHouse.goodsType.cata1.push(item.type);
            goodsHouse.goodsType.cata2[index]=[];
            if(item.child){
                $.each(item.child,function(i,ites){

                    // console.log(index,goodsHouse.goodsType.cata2[index]);
                    //console.log(ites)
                    var $li=$('<li>').appendTo($('.sort_goods')).html('--'+ites.type).attr('value',ites.id);
                    $li.on('click',function(){
                        $('.good_type_id').val($(this).attr('value'));
                    })
                });
            }
            
           
        });

        // ===========================================
        
        layer.open({
            type:1,
            content: $('#editorgoodsInfo'), //这里content是一个DOM
          shade:[0.8,'#000'],
          area:'900px',
          maxmin: true
        })

    },{id:$(this).data('id')});

    
});


        //添加商品信息，先获取需要选择的数据
    config.ajax('get',config.ajaxAddress.addgoodsInfo,function(data){
        // console.log(data);
        //brand品牌 method计价方式 supplier:主供应商 gg:规格 types:商品分类
        $.each(data.brand,function(index,item){
            var $li=$('<li>').appendTo($('.add-goods-brand')).html(item.brand).attr('value',item.id);
            $li.on('click',function(){
                $('.good_brand_id').val($(this).attr('value'));
            })
        });
        $.each(data.method,function(index,item){
            var $li=$('<li>').appendTo($('.goods-method')).html(item.method).attr('value',item.id);
            $li.on('click',function(){
                $('.method_id').val($(this).attr('value'));
            })
        });
        $.each(data.gg,function(index,item){
            var $li=$('<li>').appendTo($('.gg')).html(item.gg).attr('value',item.id);
            $li.on('click',function(){
                $('.gg_id').val($(this).attr('value'));
            })
        });
        $.each(data.supplier,function(index,item){
            var $li=$('<li>').appendTo($('.main-supplier')).html(item.name).attr('value',item.id);
            $li.on('click',function(){
                $('.supplier_id').val($(this).attr('value'));
            })
        });
        $.each(data.types,function(index,item){
            // item.
             $('<li>').appendTo($('.sort_goods')).html(item.type);
            //console.log(item);
            goodsHouse.goodsType.cata1.push(item.type);
            goodsHouse.goodsType.cata2[index]=[];
            if(item.child){
                $.each(item.child,function(i,ites){

                    // console.log(index,goodsHouse.goodsType.cata2[index]);
                    //console.log(ites)
                    var $li=$('<li>').appendTo($('.sort_goods')).html('--'+ites.type).attr('value',ites.id);
                    $li.on('click',function(){
                        $('.good_type_id').val($(this).attr('value'));
                    })
                });
            }
            
           
        });

    });

    updatePageNum();

    });
    layui.use('form',function(){
            
    });

    function updatePageNum(p1){
        config.ajax('get',config.ajaxAddress.goodsInfo,function(data){
            console.log(data);
            var tempHtml=supplierList.innerHTML;
            $('#purchaselist').html('');
            goodsHouse.pageCount=data.count;
            if(fistLoad){

                updatePage();
            }
            $.each(data.data,function(index,item){
                item.selectedindex=index;
                // console.log(item);
                laytpl(tempHtml).render(item,function(html){
                    $('#purchaselist').append(html);
                });
            });
            $('.detailCount').text(data.num);
        },{p:p1,status:0});
    }


var goodsHouse={
        appendPar:'muticoding',
        goodsContent:'duoma',
        goodsType:{
            cata1:[],
            cata2:{}
        },
        goodsData:{
            goodsName:'',
            goodsCode:''
        },
        goodsId:'',
        pageCount:''
    }

    //添加商品信息
    $('#btnSubmit').on('click',function(){
         
         layer.open({type:3});
        //$('#singleWillAddInfo').ajaxSubmit(options);
        config.formSubmit('#singleWillAddInfo',config.ajaxAddress.addgoodsInfo,function(data){
            //console.log(data);
            if(data.code==200){
                layer.msg('添加成功');
                setTimeout(function(){
                    open('addgoodsInfo.html','_self');
                },500)
                
            }else{
                layer.msg('网络错误，请稍后重试');
                setTimeout(function(){
                    open('addgoodsInfo.html','_self');
                },500)
            }
        });
        
    })

    $('.editorgoodsinfo').on('click',function(){
        layer.open({type:3});
        config.formSubmit('#editorSingle',config.ajaxAddress.goodsEditor,function(data){
            // console.log(data);
            if(data.code==200){
                layer.msg('添加成功');
                setTimeout(function(){
                    open('addgoodsInfo.html','_self');
                },500)
                
            }else{
                layer.msg('网络错误，请稍后重试');
                setTimeout(function(){
                    open('addgoodsInfo.html','_self');
                },500)
            }
        });
    });

	$('.addmore-goods-name').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.editorInput').text('商品多品');
        
        goodsHouse.appendPar='mutigoods';
        goodsHouse.goodsContent='duopin';
        $('.'+goodsHouse.appendPar).show();
        $('.muticoding').hide();
    });
    $('.addmore-goods-coding').addClass('active');
    $('.addmore-goods-coding').on('click',function(){
        $('.editorInput').text('商品多码');
        $(this).addClass('active').siblings().removeClass('active');
        
        goodsHouse.appendPar='muticoding';
        goodsHouse.goodsContent='duoma';
        $('.'+goodsHouse.appendPar).show();
        $('.mutigoods').hide();
    });

    //添加一品多码
    
    $('.addmoregoods').on('click',function(){
        // console.log($('.barcode').attr('value'),$('.goods-fullname').val());
        var html=$('#'+goodsHouse.goodsContent).html();
        
        $('.'+goodsHouse.appendPar).append(config.formatTemplate({
            barcode:$('.barcode').val(),
            fullname:$('.goods-fullname').val()
        },html));
 
    })

	


$('.addgoods').on('click',function(){
	$('.mutigoods').html('');
	$('.muticoding').html('');
    // $('#singleWillAddInfo').append($('#goodsContent').html());
	layer.open({
		type:1,
		content: $('#addgoodsInfo'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'900px',
      maxmin: true
	})
});




function updatePage(){
	layui.use(['laypage', 'layer'],function(){
		var laypage=layui.laypage;
		var layer = layui.layer;
		laypage({
		    cont: 'page'
		    ,pages: goodsHouse.pageCount //总页数
		    ,groups: 5 //连续显示分页数
		    ,jump:function(data){
		    	//得到页数data.curr
		    	updatePageNum(data.curr);
		    }
		  });
	});

    fistLoad=false;
}


$('.alertCon-wrapper').on('click','.method_typealert',function(){
    var me=this;

    $('#province-list').html('');
    $('.sortspec').html('');
    var i;

    config.ajax('get',config.ajaxAddress.addgoodsInfo,function(data){
         
        $.each(data.method,function(index,item){
            var $li=$('<a>').appendTo($('#province-list')).html(item.method).attr('value',item.id);
            $li.on('click',function(){
                $(me).val($(this).html());
                $('.method_id').val($(this).attr('value'));
                isClick=true;
                layer.close(i);
            })
        });
       
       
    })
    if(isClick){

        i=layer.open({
        type:1,
        content: $('#alertMessage'), //这里content是一个DOM
          shade:[0.8,'#000'],
          area:'900px',
          maxmin: true,
          end:function(){
            // console.log('end');
            isClick=true;
          }
        })
        isClick=false;
    }
    
    
    return false;
});

function updateInfo(){

}



$('.alertCon-wrapper').on('click','.retailsalert',function(){
    var me=this;
    $('#province-list').html('');
    $('.sortspec').html('');
    var i;
    
    config.ajax('get',config.ajaxAddress.addgoodsInfo,function(data){
         
        
        $.each(data.gg,function(index,item){
            var $li=$('<a>').appendTo($('#province-list')).html(item.gg).attr('value',item.id);
            $li.on('click',function(){
                $(me).val($(this).html());
                $('.gg_id').val($(this).attr('value'));
                isClick=true;
                layer.close(i);

            })
        });
    });
    if(isClick){
        
        i=layer.open({
        type:1,
        content: $('#alertMessage'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'900px',
      maxmin: true,
          end:function(){
            // console.log('end');
            isClick=true;
          }
    })
        isClick=false;
    }
    
    return false;
});
$('.alertCon-wrapper').on('click','.sortalert',function(){
    
    var me=this;
    $('#province-list').html('');
    $('.sortspec').html('');
    console.log('fenlei');
    var ind;
    config.ajax('get',config.ajaxAddress.addgoodsInfo,function(data){
         
        $.each(data.types,function(index,item){
            // item.
             $('<dt class="wordindex" style="margin-right:7px;">').appendTo($('.sortspec')).html(item.type);
            //console.log(item);
            goodsHouse.goodsType.cata1.push(item.type);
            goodsHouse.goodsType.cata2[index]=[];
            if(item.child){
                var $dd=$('<dd>').appendTo($('.sortspec'));
                $.each(item.child,function(i,ites){

                    // console.log(index,goodsHouse.goodsType.cata2[index]);
                    //console.log(ites)
                    var $li=$('<a>').appendTo($dd).html('--'+ites.type).attr('value',ites.id);
                    $li.on('click',function(){
                        $(me).val($(this).html().substring(2));
                        $('.good_type_id').val($(this).attr('value'));
                        isClick=true;
                        layer.close(ind);

                    })
                });

            }
            
           
        });


        if(isClick){
            
            ind=layer.open({
        type:1,
        content: $('#alertMessage'), //这里content是一个DOM
          shade:[0.8,'#000'],
          area:'900px',
          maxmin: true,
          end:function(){
            // console.log('end');
            isClick=true;
          }
        })
            isClick=false;
        }
        
        
    })

return false;
});
$('.alertCon-wrapper').on('click','.goodsbrandalert',function(){

    var me=this;
    $('#province-list').html('');
    $('.sortspec').html('');
    var i;
    config.ajax('get',config.ajaxAddress.addgoodsInfo,function(data){
         $.each(data.brand,function(index,item){
            var $li=$('<a>').appendTo($('#province-list')).html(item.brand).attr('value',item.id);
            $li.on('click',function(){
                $(me).val($(this).html());
                $('.good_brand_id').val($(this).attr('value'));
                isClick=true;
                layer.close(i);
            });
        }); 

         if(isClick){
            
            i=layer.open({
        type:1,
        content: $('#alertMessage'), //这里content是一个DOM
          shade:[0.8,'#000'],
          area:'900px',
          maxmin: true,
          end:function(){
            // console.log('end');
            isClick=true;
          }
        })
            isClick=false;
        }
    
         
    })
    return false;
});
$('.alertCon-wrapper').on('click','.supplieralert',function(){
    
    var me=this;
    $('#province-list').html('');
    $('.sortspec').html('');
    var i;
    config.ajax('get',config.ajaxAddress.addgoodsInfo,function(data){
         
        $.each(data.supplier,function(index,item){
            var $li=$('<a>').appendTo($('#province-list')).html(item.name).attr('value',item.id);
            $li.on('click',function(){
                $(me).val($(this).html());
                $('.supplier_id').val($(this).attr('value'));
                isClick=true;
                layer.close(i);
            })

        });
        if(isClick){
            
            i=layer.open({
                type:1,
                content: $('#alertMessage'), //这里content是一个DOM
              shade:[0.8,'#000'],
              area:'900px',
              maxmin: true,
              end:function(){
                // console.log('end');
                isClick=true;
              }
            })
            isClick=false;
        }

        
       
    })



    return false;
});



/*
价格监测
*/
$('.alertCon-wrapper').on('keyup','.buyprice',function(){
    
});
$('.alertCon-wrapper').on('keyup','.retails',function(){
    
});
$('.alertCon-wrapper').on('keyup','.wholesale',function(){
    
});
$('.alertCon-wrapper').on('keyup','.gross',function(){
   
});
$('.alertCon-wrapper').on('keyup','.incomerat',function(){
   
});
$('.alertCon-wrapper').on('keyup','.salesrate',function(){
    
});
$('.alertCon-wrapper').on('keyup','.oiningprice',function(){
    
});
$('.alertCon-wrapper').on('keyup','.vipprice',function(){
    
});
$('.alertCon-wrapper').on('keyup','.vippricet',function(){
    
});
$('.alertCon-wrapper').on('keyup','.vippriceo',function(){
    
});
$('.alertCon-wrapper').on('keyup','.inimumprice',function(){
    
});










	
});