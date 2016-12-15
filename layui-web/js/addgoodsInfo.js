$(function(){
var laytpl; 
var fistLoad=true;
    layui.use('laytpl',function(){
        laytpl = layui.laytpl;

        //添加商品信息，先获取需要选择的数据
    config.ajax('get',config.ajaxAddress.addgoodsInfo,function(data){
        // console.log(data);
        //brand品牌 method计价方式 supplier:主供应商 gg:规格 types:商品分类
        $.each(data.brand,function(index,item){
            var $li=$('<li>').appendTo($('#add-goods-brand')).html(item.brand).attr('value',item.id);
            $li.on('click',function(){
                $('.good_brand_id').val($(this).attr('value'));
            })
        });
        $.each(data.method,function(index,item){
            var $li=$('<li>').appendTo($('#goods-method')).html(item.method).attr('value',item.id);
            $li.on('click',function(){
                $('.method_id').val($(this).attr('value'));
            })
        });
        $.each(data.gg,function(index,item){
            var $li=$('<li>').appendTo($('#gg')).html(item.gg).attr('value',item.id);
            $li.on('click',function(){
                $('.gg_id').val($(this).attr('value'));
            })
        });
        $.each(data.supplier,function(index,item){
            var $li=$('<li>').appendTo($('#main-supplier')).html(item.name).attr('value',item.id);
            $li.on('click',function(){
                $('.supplier_id').val($(this).attr('value'));
            })
        });
        $.each(data.types,function(index,item){
            // item.
             $('<li>').appendTo($('#sort_goods')).html(item.type);
            console.log(item);
            goodsHouse.goodsType.cata1.push(item.type);
            goodsHouse.goodsType.cata2[index]=[];
            if(item.child){
                $.each(item.child,function(i,ites){

                    // console.log(index,goodsHouse.goodsType.cata2[index]);
                    //console.log(ites)
                    var $li=$('<li>').appendTo($('#sort_goods')).html('--'+ites.type).attr('value',ites.id);
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
            var tempHtml=supplierList.innerHTML;
            $('#purchaselist').html('');
            goodsHouse.pageCount=data.count;
            if(fistLoad){

                updatePage();
            }
            $.each(data.data,function(index,item){
                item.selectedindex=index;
                console.log(item);
                laytpl(tempHtml).render(item,function(html){
                    $('#purchaselist').append(html);
                });
            });
        },{p:p1});
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
        console.log($('.barcode').attr('value'),$('.goods-fullname').val());
        var html=$('#'+goodsHouse.goodsContent).html();
        
        $('.'+goodsHouse.appendPar).append(config.formatTemplate({
            barcode:$('.barcode').val(),
            fullname:$('.goods-fullname').val()
        },html));
 
    })

	
$('#purchaselist').on('click','.lookorderInfo',function(){
	$('.mutigoods').html('');
	$('.muticoding').html('');
    //console.log($(this).data('id'));
    var htm=$('#goodsContent').html();
    config.ajax('get',config.ajaxAddress.goodsEditor,function(data){
        $('#singleWillAddInfo').append(config.formatTemplate(data.good[0],htm));
    },{id:$(this).data('id')});

	// layer.open({
	// 	type:1,
	// 	content: $('#editorgoodsInfo'), //这里content是一个DOM
 //      shade:[0.8,'#000'],
 //      area:'900px',
 //      maxmin: true
	// })
});

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


	
});