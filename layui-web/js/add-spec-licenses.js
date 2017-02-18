
$(function(){
	var orderlist={
		goodslist:[],
		supplierId:'',
		selectedList:[],
		dposit:0,
		isCanClick:true,
		updateOrderList:function(){
			var tempHtml=goodsContent.innerHTML;
			$('#goods-orderlist').html('');
			$.each(orderlist.selectedList,function(index,item){
				item.selectedindex=index;
				laytpl(tempHtml).render(item,function(html){
					$('#goods-orderlist').append(html);
				});
			});

		}
	}

	var specInfo=JSON.parse(decodeURIComponent(location.href.split('?')[1].split('&')[1]));
	$('#specName').val(specInfo.title)
	$('#specId').val(specInfo.id)


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



    //搜索商品
	$('#goods-coding').on('click',function(){
	
		var val=$(this).prev().find('input').val();

		config.ajax('get',config.ajaxAddress.specialSubject.addSpecGoods,function(data){
			console.log(data);
			if(data.code==200){
				orderlist.goodslist=data.data;
				$('#searchedlist').html('');
				var tempHtml=searchedcontent.innerHTML;
				$.each(data.data,function(index,item){
					item.selectedindex=index;
					laytpl(tempHtml).render(item,function(html){
						$('#searchedlist').append(html);
					});
				});

				layer.open({
			      type: 1,
			      content: $('#goods-list'), //这里content是一个DOM
			      shade:[0.8,'#000'],
			      area:['900px','600px'],
			      maxmin: true
			    })
			}else{
				layer.msg('获取失败');
			}
			

		},{'field':val,'special_id':specInfo.id});

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
				arr.push(item.id);
			})
			$('#goods').val(JSON.stringify(arr));

			config.formSubmit('#orderlist-submit',config.ajaxAddress.specialSubject.addSpecGoods,function(data){
				console.log(data);
				 if(data.code==200){
	                layer.msg('添加成功');
	                setTimeout(function(){
	                    open('spec-licenses.html','_self');
	                },500);
	                
	            }else{
	                layer.msg('网络错误，请稍后重试');
	                orderlist.isCanClick=true;
	                setTimeout(function(){
	                    open('spec-licenses.html','_self');
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

