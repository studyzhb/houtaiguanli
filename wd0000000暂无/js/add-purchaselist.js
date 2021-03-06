
$(function(){
	var orderlist={
		goodslist:[],
		supplierId:'',
		selectedList:[],
		dposit:0,
		isCanClick:true,
		isCanSearch:true,
		updateOrderList:function(){
			var tempHtml=goodsContent.innerHTML;
			$('#goods-orderlist').html('');
			orderlist.dposit=0;
			$.each(orderlist.selectedList,function(index,item){
				item.selectedindex=index;
				console.log(item);
				
				orderlist.dposit+=item.number*item.buyprice;
				laytpl(tempHtml).render(item,function(html){
					$('#goods-orderlist').append(html);
				});
			});
			$('.printdposit').text(orderlist.dposit.toFixed(2));
		}
	}

	$('#goods-orderlist').on('dblclick','.dbclickchange',function(){
		console.log('dbclick');

		var $input=$('<input type="text" placeholder="请输入" autocomplete="off" class="layui-input" style="position:absolute;left:0;top:0;">').appendTo($(this));
		$input.focus();
		$input.on('focus',function(){

		});
		$input.on('keyup',function(e){
			
			console.log(e.keyCode);
			if(e.keyCode==13){
				var ind=$(this).parent().data('value')-0;
			// console.log(ind);
			orderlist.selectedList[ind].number=$(this).val();
			$(this).parent().text(this.value);
			$(this).remove();
			orderlist.updateOrderList();
			}
		})
		$input.on('blur',function(){
			
			
			var ind=$(this).parent().data('value')-0;
			// console.log(ind);
			orderlist.selectedList[ind].number=$(this).val();
			$(this).parent().text(this.value);
			$(this).remove();
			orderlist.updateOrderList();
		});
		return false;
	});

	var purchasePage={
		arrOrder:[],
		selectedindex:'',
		zongjia:'',
		del:''
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


	//获取供应商列表
	config.ajax('get',config.ajaxAddress.addOrderList,function(data){
		console.log(data);
		$.each(data.supplier,function(index,item){
			$('<option>').appendTo($('.supplierList')).html(item.name).attr('value',item.id);
		});
		$.each(data.dept_id,function(index,item){
			$('<option>').appendTo($('.stockList')).html(item.name).attr('value',item.id);
		});
		$.each(data.gg,function(index,item){
			
			$('<option>').appendTo($('.ggList')).html(item.gg).attr('value',item.id);
		});
		layui.use('form',function(){
			var form = layui.form();
			form.on('select(supplier)', function(data){
			  //console.log(addShopPage.area.pro);
			  console.log(data.value);
			  orderlist.supplierId=data.value;
			});
		});
	});

	$('#goods-coding').on('click',function(){
	if(orderlist.isCanSearch){
			orderlist.isCanSearch=false;
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
	      maxmin: true,
	      end:function() {
	      	// body...
	      	orderlist.isCanSearch=true;
	      }
	    })

	},{'coding':val,'supplier_id':orderlist.supplierId});
	}
});
$('#goods-barcode').on('click',function(){
	if(orderlist.isCanSearch){
			orderlist.isCanSearch=false;
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
	      maxmin: true,
	      end:function() {
	      	// body...
	      	orderlist.isCanSearch=true;
	      }
	    })
	},{'barcode':val,'supplier_id':orderlist.supplierId});
}
});
// console.log(goodsName);
$('#goodsName').on('click',function(){
	if(orderlist.isCanSearch){
			orderlist.isCanSearch=false;
	var val=$(this).prev().find('input').val();
	
	config.ajax('get',config.ajaxAddress.searchOrder,function(data){
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
	      maxmin: true,
	      end:function() {
	      	// body...
	      	orderlist.isCanSearch=true;
	      }
	    })
	},{'name':val,'supplier_id':orderlist.supplierId});
	}
});

//选择之后添加到展示列表
$('#confirmorder').on('click',function(){
	// console.log('goods confirm');
	$('.ischecked').each(function(){
        if(this.checked){
           orderlist.selectedList.push(orderlist.goodslist[this.value-0]);
        }
     });
	$.each(orderlist.goodslist,function(index,item){
			item.number=1;
		});
	deleteRepeat();
	console.log(orderlist.selectedList);
	orderlist.updateOrderList();
	layer.closeAll();
});
//删除重复的ID
function deleteRepeat(){
	var obj={};
	var arr=[];
	$.each(orderlist.selectedList,function(index,item){
		if(!obj[item.id]){
			arr.push(item);
			obj[item.id]=1;
		}
	});
	console.log(arr);
	
	orderlist.selectedList=arr;

}




//单据编号
$('#ordernum').val(new Date().getTime());

//保存数据库
$('#confirm-save').on('click',function(){
	if(orderlist.isCanClick){
		orderlist.isCanClick=false;
		if(orderlist.selectedList.length<=0){
			if(layer){
			layer.msg('请选择商品');
				
			}else{
				alert('请选择商品');
			}
		}else{
			layer.open({type: 3});
			var arr=[];
			$.each(orderlist.selectedList,function(index,item){
				arr.push({'good_id':item.id,'unm':item.number});
			})
			$('#goods').val(JSON.stringify(arr));
			// console.log($('#goods').val());
			config.formSubmit('#orderlist-submit',config.ajaxAddress.addOrderList,function(data){
				console.log(data);
				 if(data.code==200){
	                layer.msg('添加成功');
	                setTimeout(function(){
	                    open('purchaselist.html','_self');
	                },500);
	                
	            }else{
	                layer.msg('网络错误，请稍后重试');
	                orderlist.isCanClick=true;
	                setTimeout(function(){
	                    open('purchaselist.html','_self');
	                },500);
	            }
			});
		}
	}else{
		layer.msg('请勿重复点击');
	}
	
	console.log('save-111');
});


$('#goods-orderlist').on('click','.deleteGoods',function(){
	console.log($(this).attr('id'));
	orderlist.selectedList.splice($(this).attr('id'),1);
	orderlist.updateOrderList();
})
var tanchuindex;
$('#goods-orderlist').on('click','.editorSingGood',function(){
	console.log($(this).attr('id'));
	// orderlist.selectedList.splice($(this).attr('id'),1);
	purchasePage.selectedindex=$(this).attr('id');
	tanchuindex=layer.open({
		type:1,
		content: $('#goodsNum'), //这里content是一个DOM
      shade:[0.8,'#000'],
      area:'400px',
      maxmin: false
	})

	// orderlist.updateOrderList();
})

$('.saveGoodsNum').on('click',function(){
	
	var num=$('.singleNum').val();
	var ind=purchasePage.selectedindex-0;
	// console.log(num);
	orderlist.selectedList[ind].number=num;
	// purchasePage.arrOrder[ind].singlePrice=(num*purchasePage.arrOrder[ind].price).toFixed(2);
	// purchasePage.zongjia+=purchasePage.arrOrder[ind].singlePrice-0;
	// var tempHtml=singleOrderList.innerHTML;
	if(num==0){
		purchasePage.del+=orderlist.selectedList[ind].id;
		
		layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(i){
  			//do something
  			
  			orderlist.selectedList.splice(ind,1);
  			orderlist.updateOrderList();
  			
		  layer.close(i);
		});
	}else{
		
		orderlist.updateOrderList();
	}
	
	layer.close(tanchuindex);
});




})

