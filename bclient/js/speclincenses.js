$(function(){
    var fistLoad=true;
    var speclicenses={
		arrOrder:[],
		selectedindex:'',
		zongjia:'',
		del:[],
		orderlistId:'',
		status:'0',
		requrl:config.ajaxAddress.publicAddress+config.ajaxAddress.specApi.specInfo,
		pageCount:'',
		specInfo:{
			id:'',
			name:''
		},
		specArr:[],
		specInfoArr:[],
        updateList:function (data){
            var tempHtml=supplierList.innerHTML;
            $('#purchaselist').html('');
            if(fistLoad){

                this.updatePage();
                }
            $.each(data,function(index,item){
                item.selectedindex=index;
                console.log(item);
                laytpl(tempHtml).render(item,function(html){
                    $('#purchaselist').append(html);
                });
            });
        },

	updatePage:function (){
        var me=this;
		layui.use(['laypage', 'layer'],function(){
			var laypage=layui.laypage;
			var layer = layui.layer;
			laypage({
			    cont: 'page'
			    ,pages: speclicenses.pageCount //总页数
			    ,groups: 5 //连续显示分页数
			    ,jump:function(data){
			    	//得到页数data.curr
			    	// updatePageNum(data.curr);

			    	config.ajax('get',speclicenses.requrl,function(data){
						me.updateList(data.good_info);
					},{status:speclicenses.status,p:data.curr});
			    }
			  });
		});

	    fistLoad=false;
	}
	}
	
    config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.specApi.specInfo,function(data){
        console.log(data);
            if(data.code=='200'){
                speclicenses.updateList(data.data);
                speclicenses.specArr=data.special;
                speclicenses.specInfoArr=data.data;
                $.each(data.special_info,function(ind,item){
                    if(ind==0){
                        speclicenses.specInfo.id=item.id;
                        speclicenses.specInfo.title=item.title;
                    }
                    $('<option>').appendTo($('.stockList')).html(item.title).attr('value',item.special_id);
                })
                layui.use('form',function(){
                    form =layui.form();
                    form.on('select(special)', function(data){
                        speclicenses.specInfo.id=data.value;
                        
                    config.ajax('get',config.ajaxAddress.publicAddress+config.ajaxAddress.specApi.specInfo,function(data){
                        speclicenses.updateList(data.good_info);
                    },{special_id:data.value})
                    });
                })
            }else if(data.code=='311'){
                layer.msg('没有查询到专题列表,请先更新专题')
            }
			
		},{status:0});

    $('.updateSpec').on('click',function(){
        config.ajax('post',config.ajaxAddress.publicAddress+config.ajaxAddress.specApi.updateSpec,function(data){
            console.log(data,typeof data);
            if(data.code=='200'){
                layer.msg('更新成功');
                location.reload(true);
            }else{
                layer.msg('更新失败,请稍后再试')
            }
        })
    })

})