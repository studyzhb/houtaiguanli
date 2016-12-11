
$(function(){
	var orderlist={
		goodslist:[],
		selectedList:[],
		updateOrderList:function(){
			var tempHtml=goodsContent.innerHTML;
			$('#goods-orderlist').html('');
			$.each(orderlist.selectedList,function(index,item){
				item.selectedindex=index;
				console.log(item);
				laytpl(tempHtml).render(item,function(html){
					$('#goods-orderlist').append(html);
				});
			});
		}
	}
	//复选框选中
	$('.checkall').on('click',function() {
		var bt=this.checked;
		$('.ischecked').each(function(){
            this.checked=bt;
        });
        //$('.ischecked').attr('checked',this.checked);
    });

    $('#searchedlist').on('click','.ischecked',function(){
        var ischecked=true;
        $('.ischecked').each(function(){
            if(!this.checked){
                ischecked=false;
            }
        });
        $('.checkall')[0].checked=ischecked;
    });


	

	$('#goods-coding').on('click',function(){
	
	var val=$(this).prev().find('input').val();

	config.ajax('get',config.ajaxAddress.searchOrder,function(data){
		console.log(data);
		orderlist.goodslist=data;
		$('#searchedlist').html('');
		var tempHtml=searchedcontent.innerHTML;
		$.each(data,function(index,item){
			item.selectedindex=index;
			laytpl(tempHtml).render(item,function(html){
				$('#searchedlist').append(html);
			});
		});

		layer.open({
	      type: 1,
	      content: $('#goods-list'), //这里content是一个DOM
	      shade:[0.8,'#000'],
	      area:'900px',
	      maxmin: true
	    })

	},{'coding':val});
	console.log(val);
});
$('#goods-barcode').on('click',function(){
	
	var val=$(this).prev().find('input').val();
	
	config.ajax('get',config.ajaxAddress.searchOrder,function(data){
		console.log(data);
	},{'barcode':val});
});
// console.log(goodsName);
$('#goodsName').on('click',function(){
	
	var val=$(this).prev().find('input').val();
	
	config.ajax('get',config.ajaxAddress.searchOrder,function(data){
		console.log(data);
	},{'name':val});
	layer.open({
      type: 1,
      content: $('#goods-list'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'900px',
      maxmin: true
    })
});

//选择之后添加到展示列表
$('#confirmorder').on('click',function(){
	console.log('goods confirm');
	$('.ischecked').each(function(){
        if(this.checked){
           orderlist.selectedList.push(orderlist.goodslist[this.value]);
        }
     });
	console.log(orderlist.selectedList);
	orderlist.updateOrderList();
	layer.closeAll();
});

//单据编号
$('#ordernum').val(new Date().getTime());

//保存数据库
$('#confirm-save').on('click',function(){
	if(orderlist.selectedList.length<=0){
		alert('请选择商品');
	}else{
		layer.open({type: 3});
		var arr=[];
		$.each(orderlist.selectedList,function(index,item){
			arr.push({'id':item.id,'unm':1});
		})
		$('#goods').val(arr.join(''));
		config.formSubmit('#orderlist-submit',config.ajaxAddress.addOrderList,function(data){
			console.log(data);
		});
	}
	console.log('save-111');
});


$('#goods-orderlist').on('click','.deleteGoods',function(){
	console.log($(this).attr('id'));
	orderlist.selectedList.splice($(this).attr('id'),1);
	orderlist.updateOrderList();
})

})

