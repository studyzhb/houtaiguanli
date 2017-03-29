$(function(){
	// console.log(laytpl);
	var url=location.href.split('?');
	if(!!url.length){
		var brandId=url;
	}
	var laytpl;
	
	console.log(brandId);
	var bid=brandId[1].split('=')[1];
	$('.brandId').val(brandId[1].split('=')[1]);
	$('.brandName').val(unescape(brandId[2].split('=')[1]));
	var tml=$('.editSortPic').html();
	
	layui.use('laytpl',function(){
		laytpl = layui.laytpl;
		config.ajax('get',config.ajaxAddress.editExpress,function(data){
				var item=data.data;
				if(!item.status){
					item.status=1;
				}
				laytpl(tml).render(item,function(html){
				$('#authorList').append(html);
			});
			layui.use('form',function(){
			
		});
		},{id:bid});	
	});
	$('.commit-author').on('click',function(){
		config.formSubmit('#authorForm',config.ajaxAddress.editExpress,function(data){
			console.log(data);
			if(data.code==200){
				//open('taskSort.html',"_self");
			}else{
				layer.msg('网络错误，请稍后重试');
			}
		});
	});

      $('#authorList').on('click','.imageaddc',function(){
          
          ImageWrapper.btap=false;
          upImage('image-suolve');
        })

      $('#authorList').on('click','.imageadd',function(){
          
          ImageWrapper.btap=true;
          upImage('image-suolve');
        })
});