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
						if(item.status=='undefined'){
							item.status=1;
						}
						
						TaskObj.data.editorData=item;
						fn();
					
				},{id:bid});
			},
			updateStatus:function(id,sta){
				config.ajax('post',config.ajaxAddress.taskSort.editSort,function(data){
					console.log(data);
					if(data.code==200){
						layer.closeAll(); //疯狂模式，关闭所有层
						layer.msg('修改成功');
	                    TaskObj.methods.updatePageInfo();
						
					}else{
						layer.closeAll(); //疯狂模式，关闭所有层
						layer.msg('网络错误，请稍后重试');
	                    TaskObj.methods.updatePageInfo();
						
					}
				},{id:id,status:sta});
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
					layer.closeAll();
					layer.msg('添加成功');
					 //疯狂模式，关闭所有层
                    TaskObj.methods.updatePageInfo();
					
				}else{
					layer.closeAll();
					layer.msg('网络错误，请稍后重试');
					 //疯狂模式，关闭所有层
                    TaskObj.methods.updatePageInfo();
					
				}
			},paramsData.field);
		})

		//添加类型内容
		form.on('submit(subInfo)',function(paramsData){
			config.ajax('post',config.ajaxAddress.taskSort.addSort,function(data){
				console.log(data);
				if(data.code==200){
					layer.closeAll(); //疯狂模式，关闭所有层
                    TaskObj.methods.updatePageInfo();
					
				}else{
					layer.closeAll(); //疯狂模式，关闭所有层
					layer.msg('网络错误，请稍后重试');
                    TaskObj.methods.updatePageInfo();
					
				}
			},paramsData.field);
		})

		//bianji类型内容
		form.on('submit(editorForm)',function(paramsData){
			config.ajax('post',config.ajaxAddress.taskSort.editSort,function(data){
				console.log(data);
				if(data.code==200){
					layer.closeAll(); //疯狂模式，关闭所有层
					layer.msg('修改成功');
                    TaskObj.methods.updatePageInfo();
					
				}else{
					layer.closeAll(); //疯狂模式，关闭所有层
					layer.msg('网络错误，请稍后重试');
                    TaskObj.methods.updatePageInfo();
					
				}
			},paramsData.field);
		})

		//bianji类型内容
		form.on('submit(editorSubForm)',function(paramsData){
			config.ajax('post',config.ajaxAddress.taskSort.editSort,function(data){
				
				if(data.code==200){
					layer.closeAll(); //疯狂模式，关闭所有层
					layer.msg('添加成功');
                    TaskObj.methods.updatePageInfo();
					
				}else{
					layer.msg('网络错误，请稍后重试');
						layer.closeAll(); //疯狂模式，关闭所有层
					
                    TaskObj.methods.updatePageInfo();
              
					
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

	$('#all-sort-list').on('click','.icon-btn',function(){
		var id=$(this).data('id');
		var sta=$(this).data('status');
		TaskObj.methods.updateStatus(id,sta);
	});
	$('#all-sort-list').on('click','.icon-sub-btn',function(){
		
		var id=$(this).data('id');
		var sta=$(this).data('status');
		TaskObj.methods.updateStatus(id,sta);
	});

	//±à¼­·ÖÀà
	$('#all-sort-list').on('click','.editor-sub-sort',function(){
		$('#authorSubList').html('');
		var pId=$(this).data('pid');
		TaskObj.methods.getEditInfoById($(this).data('id'),function(){
			TaskObj.data.editorData.tagType=true;
			TaskObj.data.editorData.sortData=TaskObj.data.sortData;
			TaskObj.data.editorData.pId=pId;
			console.log(TaskObj.data.editorData.sortData);
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