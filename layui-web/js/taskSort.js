$(function(){
	var laytpl;
	var form;
	var tml=$('.editSortPic').html();
	var TaskObj={
		data:{

		},
		methods:{
			updatePageInfo:function(){
				config.ajax('get',config.ajaxAddress.taskSort.showSort,function(data){

					var tempHtml=sortContent.innerHTML;
					$('#all-sort-list').html('');
					$.each(data.classify_data,function(index,item){
						item.index=index;
						if(!item.status){
							item.status=1;
						}
						laytpl(tempHtml).render(item,function(html){
							$('#all-sort-list').append(html);
						});
					});
				});
			},
			getParSortInfo:function(){
				config.ajax('get',config.ajaxAddress.taskSort.addSort,function(data){
					
					TaskObj.data.sortData=data.data;
					
					
					
				})
			},
			getEditInfoById:function(bid,fn){
				config.ajax('get',config.ajaxAddress.taskSort.editSort,function(data){
						var item=data.data;
						if(!item.status){
							item.status=1;
						}

						TaskObj.data.editorData=item;
						fn();
					
				},{id:bid});
			}
		}
	}

	layui.use(['laytpl','form'],function(){
		laytpl = layui.laytpl;	
		form=layui.form();
		TaskObj.methods.updatePageInfo();
		TaskObj.methods.getParSortInfo();
		//添加分类
		form.on('submit(shopInfo)',function(paramsData){
			layer.open({type:3});
			config.ajax('post',config.ajaxAddress.taskSort.addSort,function(data){
				console.log(data);
				if(data.code==200){
					layer.msg('添加成功');
					//open('taskSort.html',"_self");
					
				}else{
					layer.msg('网络错误，请稍后重试');
					//open('taskSort.html',"_self");
					
				}
			},paramsData.field);
		})

		//添加类型内容
		form.on('submit(subInfo)',function(paramsData){
			config.ajax('post',config.ajaxAddress.taskSort.addSort,function(data){
				console.log(data);
				if(data.code==200){
					layer.msg('添加成功');
					//open('taskSort.html',"_self");
					
				}else{
					layer.msg('网络错误，请稍后重试');
					//open('taskSort.html',"_self");
					
				}
			},paramsData.field);
		})

		//bianji类型内容
		form.on('submit(editorForm)',function(paramsData){
			config.ajax('post',config.ajaxAddress.taskSort.editSort,function(data){
				console.log(data);
				if(data.code==200){
					layer.msg('添加成功');
					
					
				}else{
					layer.msg('网络错误，请稍后重试');
					
					
				}
			},paramsData.field);
		})

		//bianji类型内容
		form.on('submit(editorSubForm)',function(paramsData){
			config.ajax('post',config.ajaxAddress.taskSort.editSort,function(data){
				
				if(data.code==200){
					layer.msg('添加成功');
					
					
				}else{
					layer.msg('网络错误，请稍后重试');
					
					
				}
			},paramsData.field);
		})



	});

	//±à¼­·ÖÀà
	$('#all-sort-list').on('click','.editor-brand',function(){
		$('#authorList').html('');
		TaskObj.methods.getEditInfoById($(this).data('id'),function(){
			laytpl(tml).render(TaskObj.data.editorData,function(html){
				$('#authorList').append(html);
			});
			form.render();
		});
		
		layer.open({
             type:1,
             zIndex:10,
            content: $('#editorForm'), //ÕâÀïcontentÊÇÒ»¸öDOM
            shade:[0.8,'#000'],
            area:'400px',
            maxmin: true,
            end:function(){
                
               $('#editorForm').hide();
            }
        })
	});

	//±à¼­·ÖÀà
	$('#all-sort-list').on('click','.editor-sub-sort',function(){
		$('#authorSubList').html('');
		TaskObj.methods.getEditInfoById($(this).data('id'),function(){
			laytpl(tml).render(TaskObj.data.editorData,function(html){
				$('#authorSubList').append(html);
			});
			form.render();
		});
		
		layer.open({
             type:1,
             zIndex:10,
            content: $('#editorSubForm'), //ÕâÀïcontentÊÇÒ»¸öDOM
            shade:[0.8,'#000'],
            area:'400px',
            maxmin: true,
            end:function(){
                
               $('#editorSubForm').hide();
            }
        })
	});

	$('#all-sort-list').on('click','.addAreaCon',function(){

		$('#authorConForm')[0].reset();
   		$('.parTypeId').val($(this).data('type'));
        $('.parClassId').val($(this).data('id'));
        layer.open({
             type:1,
             zIndex:10,
            content: $('#authorConForm'), //ÕâÀïcontentÊÇÒ»¸öDOM
            shade:[0.8,'#000'],
            area:'400px',
            maxmin: true,
            end:function(){
                
               $('#authorConForm').hide();
            }
        })

		
	});


	//Ìí¼Ó·ÖÀàÀàÐÍ
    $('.addArea').on('click',function(){
        $('#authorForm')[0].reset();
   
        
        layer.open({
             type:1,
             zIndex:10,
            content: $('#authorForm'), //ÕâÀïcontentÊÇÒ»¸öDOM
            shade:[0.8,'#000'],
            area:['400px','400px'],
            maxmin: true,
            end:function(){
                
               $('#authorForm').hide();
            }
        })
    })



});