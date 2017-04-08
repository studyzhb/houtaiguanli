$(function(){
    
    var Index={
        data:{

        },
        methods:{
            updateInfo:function(data){
                console.log("neitong");
                $(".menuList").html('');
                var tpl=$('#slideCon').html();
                laytpl(tpl).render(data,function(html){
                   $(".menuList").append(html);
                })
            },
            updateHotShopInfo:function(data){
                $(".allicences-con-box").html('');
                var tpl=$('#HotShop').html();
                console.log("neirong");
                laytpl(tpl).render(data,function(html){
                    $(".allicences-con-box").append(html);
                })
            },
            // banner图
            updateBannerList:function(){
                config.ajax('get',ajaxAddress.preFix+ajaxAddress.Banner.banner,function(data){
                    console.log(data);
                    if(data.code==200){
                        $('.notice-pic').html('');
                        $.each(data.data,function(index,item){
                            $.each(typeof item.slide_src=='string'&&eval(item.slide_src)?eval(item.slide_src):item.slide_src,function(index,obj){
                                $('<li>').appendTo($('.notice-pic')).html('<img src="'+obj+'" data-id='+item.id+'/>');
                            });
                        })
                    }
                },{station:1,city_id:4});
            },
            // 导航
            updateNavList:function(navtype,tag){
                config.ajax('get',ajaxAddress.preFix+ajaxAddress.Nav.showPrimaryNav,function(data){
                    console.log(data);
                    if(data.code==200){
                        if(navtype==1){
                            $('.wd-nav-area li:not(.Notclear)').remove();
                                $.each(data.data,function(index,item){
                                        $('<li>').appendTo($('.wd-nav-area')).html('<a href="'+item.url+'" data-id='+item.id+'>'+item.name+'</a>');   
                                })
                        }else{
                            Index.methods.updateInfo(data.data);   
                        }
                    }
                },{navtype:navtype,display:tag});
            },
            
            // 美食热门商家
            updateHotShop:function(){
                config.ajax('get',ajaxAddress.preFix+ajaxAddress.updataContent.hotContent,function(data){
                    console.log(data);
                    if(data.code==200){
                         Index.methods.updateHotShopInfo(data.data);  
                    }
                },{cityid:1})
            }

        }
    }



    Index.methods.updateBannerList();
    Index.methods.updateNavList(1);
    Index.methods.updateNavList(2,'on');
    Index.methods.updateHotShop();

})