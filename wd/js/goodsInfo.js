$(function(){
	var goodsListPage={
		cata:[],
		page:function(obj){
            $('#goodsInfoList').html('');
            $('#detailcount').text(obj.count);
        var page=obj.count%2==0?obj.count/2:parseInt(obj.count/2)+1;
        
         $('#detailpage').text(page);
         
         $('#pagewrap').html('');
         
         for(var i=1;i<=page;i++){
             if(i==1){
                 $('<a href="#" class="next active">').appendTo($('#pagewrap')).text(i);
                 continue;
             }
             $('<a href="#" class="next">').appendTo($('#pagewrap')).text(i);
         }
        $('#first-sort').html('');
		
		var arr=[];
		
		var templateCon=$('#table-goodsInfo').html();
		$.each(obj.data,function(index,item){
			arr.push(config.formatTemplate(item,templateCon));
		});
        $('#goodsInfoList').append(arr.join(''));
        }
	}
	config.ajax('get',config.ajaxAddress.goodsInfo,function(data){
		//console.log(data);
		var aGoodsInfo=data;
		goodsListPage.page(data);
		goodsListPage.cata=aGoodsInfo.cata;
		$.each(aGoodsInfo.cata,function(index,item){
			var $li=$('<li>').appendTo($('#first-sort')).html(item.type).attr('sort-id',item.id);
			$li.on('click',function(){
				$('#sub-sort').html('');
				var sort=$(this).text();

				$.each(goodsListPage.cata,function(index,item){
					if(sort==item.type){
						$.each(item.child,function(i,it){
							$('<li>').appendTo($('#sub-sort')).html(it.type).attr('sub-sortid',it.id);
						});
					}
				});
			});
		});



		
		//$('#showcon').append(testArr.join(''));
	})

	// id="first-sort"



	


});