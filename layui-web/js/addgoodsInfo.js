$(function(){

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
         $('.add-alert-area').css('z-index','9999').show();
         
        //$('#singleWillAddInfo').ajaxSubmit(options);
        config.formSubmit('#singleWillAddInfo',config.ajaxAddress.addgoodsInfo,function(data){
            if(data.code==200){
                alert('添加成功');
                open('goodsInfo.html','_self');
            }
        });
        
    })

//添加商品信息，先获取需要选择的数据
    config.ajax('get',config.ajaxAddress.addgoodsInfo,function(data){
        // console.log(data);
        //brand品牌 method计价方式 supplier:主供应商 gg:规格 types:商品分类
        $.each(data.brand,function(index,item){
            $('<li>').appendTo($('#add-goods-brand')).html(item.brand).attr('value',item.id);
        });
        $.each(data.method,function(index,item){
            $('<li>').appendTo($('#goods-method')).html(item.method).attr('value',item.id);
        });
        $.each(data.gg,function(index,item){
            $('<li>').appendTo($('#gg')).html(item.gg).attr('value',item.id);
        });
        $.each(data.supplier,function(index,item){
            $('<li>').appendTo($('#main-supplier')).html(item.name).attr('value',item.id);
        });
        $.each(data.types,function(index,item){
            // item.
            
            goodsHouse.goodsType.cata1.push(item.type);
            goodsHouse.goodsType.cata2[index]=[];
            if(item.child){
                $.each(item.child,function(i,ites){

                    // console.log(index,goodsHouse.goodsType.cata2[index]);

                    (goodsHouse.goodsType.cata2[index]).push({id:ites.id,val:ites.type});
                });
            }
            
            $('<option>').appendTo($('#catagory1')).html(item.type).attr('value',index);
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
        console.log('add');
        var html=$('#'+goodsHouse.goodsContent).html();
        console.log();
        $('.'+goodsHouse.appendPar).append(config.formatTemplate({
            barcode:$('.barcode').val(),
            fullname:$('.goods-fullname').val()
        },html));
 
    })

	var laytpl;	
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
	});
	layui.use('form',function(){
			
		});
$('#purchaselist').on('click','.lookorderInfo',function(){
	$('.mutigoods').html('');
	$('.muticoding').html('');
	layer.open({
		type:1,
		content: $('#editorgoodsInfo'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'900px',
      maxmin: true
	})
});

$('.addgoods').on('click',function(){
	$('.mutigoods').html('');
	$('.muticoding').html('');
	layer.open({
		type:1,
		content: $('#addgoodsInfo'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'900px',
      maxmin: true
	})
});

config.ajax('get',config.ajaxAddress.goodsInfo,function(data){
	var tempHtml=supplierList.innerHTML;
	$('#purchaselist').html('');
	goodsHouse.pageCount=data.count;
	updatePage();
	$.each(data.data,function(index,item){
		item.selectedindex=index;
		console.log(item);
		laytpl(tempHtml).render(item,function(html){
			$('#purchaselist').append(html);
		});
	});
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
		    	
		    }
		  });
	});
}
	
});