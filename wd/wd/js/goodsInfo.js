$(function(){
	var goodsListPage={
		cata:[],
		//选中的页码
		selectIndex:1,
		count:'1',
		//一级分类与二级分类
		sort:{
			firstsort:'',
			subsort:''
		},
		firstLoad:true,
		gotopage:function(){
			var me=this;
	        config.ajax('get',config.ajaxAddress.goodsInfo,function(obj){
	        	console.log(obj);
	            me.page(obj);
	        },{'p':me.selectIndex,'id':goodsListPage.sort.firstsort,'typeId'
	        :goodsListPage.sort.subsort});
	    },
		page:function(obj){
			goodsListPage.count=obj.count;
            $('#goodsInfoList').html('');
            $('#detailcount').text(obj.count);
        	var page=obj.count%config.pSort.pagecount==0?obj.count/config.pSort.pagecount:parseInt(obj.count/config.pSort.pagecount)+1;
        
         $('#detailpage').text(page);
         $('#pagecount').text(config.pSort.pagecount);
         // $('#pagewrap').html('');
         
         // for(var i=1;i<=page;i++){
         //     if(i==this.selectIndex){
         //         $('<a href="#" class="next active">').appendTo($('#pagewrap')).text(i);
         //         continue;
         //     }else if(i>3){
         //     	$('#pagewrap').append('...');
         //     	break;
         //     }
// }
             $('#pagewrap').find('a').text(goodsListPage.selectIndex);
         
        // $('#first-sort').html('');
		
		var arr=[];
		
		var templateCon=$('#table-goodsInfo').html();
		$.each(obj.data,function(index,item){
			arr.push(config.formatTemplate(item,templateCon));
		});
        $('#goodsInfoList').append(arr.join(''));
        },
        firstLoad:function(){
        	if(this.firstLoad){
        		//获取商品信息列表，包括分类

	config.ajax('get',config.ajaxAddress.goodsInfo,function(data){
		console.log(data);
		var aGoodsInfo=data;
		goodsListPage.page(data);

		goodsListPage.cata=aGoodsInfo.cata;
		// console.log(aGoodsInfo.cata.length);
		$.each(aGoodsInfo.cata,function(index,item){
			console.log(item);
			var $li=$('<li>').appendTo($('#first-sort')).html(item.type).attr('sort-id',item.id);
			$li.on('click',function(){
				$('.subclass').html('二级分类');
				$('#sub-sort').html('');
				var sort=$(this).text();
				goodsListPage.sort.firstsort=$(this).attr('sort-id');
				config.ajax('get',config.ajaxAddress.goodsInfo,function(data){
					//一级分类
					// console.log(data);
					goodsListPage.page(data);
				},{id:$(this).attr('sort-id')});
				$.each(goodsListPage.cata,function(index,item){
					if(sort==item.type){
						$.each(item.child,function(i,it){   
							var $subsort=$('<li>').appendTo($('#sub-sort')).html(it.type).attr('sub-sortid',it.id);
							$subsort.on('click',function(){
								goodsListPage.sort.subsort=$(this).attr('sub-sortid');
								//console.log(goodsListPage.sort.subsort);

								config.ajax('get',config.ajaxAddress.goodsInfo,function(data){

									//二级分类请求
									console.log(data);
									goodsListPage.page(data);
								},{'id':goodsListPage.sort.firstsort,'typeId':goodsListPage.sort.subsort});
							});
						});
					}
				});
			});
		});



		
		//$('#showcon').append(testArr.join(''));
	})
		this.firstLoad=false;
        	}
        }
	}


	goodsListPage.firstLoad();
	console.log(config.pSort.pagecount);
	

	// id="first-sort"



	//页码点击事件
// $('#pagewrap').on('click','a',function(){

//         goodsListPage.selectIndex=$(this).text();
//         goodsListPage.gotopage();
//         $(this).addClass('active').siblings().removeClass('active');
//     });

// });
	$('.prePage').on('click',function(){
        if(goodsListPage.selectIndex==1){
            return;
        }else{
            goodsListPage.selectIndex--;
            goodsListPage.gotopage();
        }
     });

     $('.nextPage').on('click',function(){
        if(goodsListPage.selectIndex==goodsListPage.count){
            return;
        }else{
            goodsListPage.selectIndex++;
           goodsListPage.gotopage();
        }
     });

 });


