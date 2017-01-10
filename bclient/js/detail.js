$(function(){
	var detailPage={
		getData:function(){
			var me=this;
			$.get("../jsontxt/details.txt",function(data){
				//更新标题
//				arrKind.forEach(function(title,n){
//					var bytex=n==arrKind.length-1?"":" /";
//					$("<a href='listpage.html?name='>").appendTo($(".goods_detail_title")).html(title+bytex);
//				});
				var arrKind=kind.split(",");
				$(".goods_detail_title").html("<a href='index.html'>首页 </a>/<a href='listpage.html?name="+escape(arrKind[0])+"'>"+arrKind[0]+"</a>/"
											+"<a href='listpage.html?name="+escape(arrKind[0])+"?kind_s="+escape(arrKind[1])+"'>"+arrKind[1]+"</a>/"
											+"<a href='javascript:;'>"+arrKind[2]+"</a>");
				var oDetailGoods=eval("("+data+")");
				
				console.log(arrKind)
				me.oAllC=oDetailGoods[arrKind[0]][arrKind[1]][arrKind[2]];
				//上半部分对象
				if(me.oAllC){
					me.oTopPart=me.oAllC["intro"];
					me.id=me.oAllC.id;
					//上半部分图片
					me.oTopPart.arrPic=me.oTopPart.piclist;
					//上半部分内容
					me.oTopPart.oCon=me.oTopPart.con;
					//展示图片对象区
					me.oBoPicshow=me.oAllC.picshow;
					me.spec_goods=me.oBoPicshow.detailGoods.goods_spec;
					me.boPicList=me.oBoPicshow.detailGoods.pic_intro;
					me.updatePage();
				}else{
					alert("数据有误，请换个在尝试....");
					location.href="index.html";
					return;
				}
				
				
			});
		},
		updatePage:function(){
			//默认显示第0张
			$(".sview_area div img").attr("src",this.oTopPart.arrPic[0]);
			//上半部分左侧区域更新
			$.each(this.oTopPart.arrPic,function(a,item){
				$("<li>").appendTo($(".goods_smalllist")).html("<img src="+item+"/>");
			});
			//上半部分右侧内容介绍区
			var me=this;
			var arrCon=this.oTopPart.oCon.summary;
			$(".rigth_detail_box .goodsname").html("<h1>"+this.oTopPart.oCon.goodsName[0]+"</h1><p>"+this.oTopPart.oCon.goodsName[1]+"</p>");
			$(".summary .price").find("span").eq(0).text(this.oTopPart.oCon.summary[0][0]).next().text(this.oTopPart.oCon.summary[0][1]);
			$.each(this.oTopPart.oCon.summary,function(n1,pc){
				var p="";
				if(n1>0&&n1<me.oTopPart.oCon.summary.length-1){
					p=pc;
				}
				$(".summary li").find("i").eq(n1-1).text(p);
			});
			$.each(arrCon[arrCon.length-1],function(b,gif){
				$(".summary li.give_gifts .gifts").append($("<li><a>"+gif+"</a></li>"));
			});
			
			//下半部分信息
//			规格信息概括
			var sn=0;
			for (var i in this.spec_goods) {
				if(sn<9){
					var $gli=$("<li>").appendTo($("#guige_spec"));
					$("<span>").appendTo($gli).html(i+" ： ");
					$("<span>").appendTo($gli).html(this.spec_goods[i]);
				}
				var $gtr=$("<tr>").appendTo($(".goods_specfication .goods_spec_parameters tbody"));
				$("<td>").appendTo($gtr).html(i);
				$("<td>").appendTo($gtr).html(this.spec_goods[i]);
				sn++;
			}

			//图片信息
			$.each(this.boPicList,function(c,picCon){
				$("<img src="+picCon+"/>").appendTo($("#bottom_pic"));
			});
		},
		addShoppingCar:function(){
			var goodstotal=cookieUntil.getCookie("goodstotal")?cookieUntil.getCookie("goodstotal"):0;
			var goodssum=cookieUntil.getCookie(this.id)?cookieUntil.getCookie(this.id):0;
			var addNum=Number($('.wrapGoodsNum input').val());
			goodssum>0?goodstotal=Number(goodstotal):goodstotal=Number(goodstotal)+1;
			cookieUntil.setCookie(this.id,Number(goodssum)+addNum,7);
			cookieUntil.setCookie("goodstotal",goodstotal,7);
			$(".shoppingcar a").find("em").html(goodstotal);
			console.log($(".shoppingcar a").find("em"))
			console.log(goodstotal);
		}
	}
	
	detailPage.getData();
	/**
	 * 放大镜
	 */
	$(".sview_area").hover(function(){
		$(".selecArea").show();
		var imgcon=$(".sview_area div img").attr("src");
		var $img=$("<img src="+imgcon+"/>").appendTo($(".showSelectArea")).css({width:400*460/86+"px",height:440*460/86+"px"});
		$(".showSelectArea").show();
		$(this).on("mousemove",function(e){
			var x=e.pageX-$(this).offset().left-$(".selecArea").outerWidth()/2;
			var y=e.pageY-$(this).offset().top-$(".selecArea").outerHeight()/2;
			if(x<0){
				x=0;
			}else if(x>$(this).outerWidth()-$(".selecArea").outerWidth()){
				x=$(this).outerWidth()-$(".selecArea").outerWidth();
			}
			if(y<0){
				y=0
			}else if(y>$(this).outerHeight()-$(".selecArea").outerHeight()){
				y=$(this).outerHeight()-$(".selecArea").outerHeight();
			}
			$(".selecArea").css({left:x,top:y});
			var persentX=x/($(this).outerWidth()-$(".selecArea").outerWidth());
			var persentY=y/($(this).outerHeight()-$(".selecArea").outerHeight());
			
			$img.css({left:(400-$img.outerWidth())*persentX,top:(440-$img.outerHeight())*persentY});
		});
	},function(){
		$(".selecArea").hide();
		$(".showSelectArea").hide().html("");
		$(this).off("mousemove");
	});
	
	$(".goods_pic_message span").click(function(){
		$(this).addClass("on").siblings().removeClass();
		$("#bottom_tab").children().eq($(this).index()).show().siblings().hide();
	});
	
	$(".goods_smalllist").on("click","li",function(){
		$(this).addClass("curr").siblings().removeClass("curr");
		var src=$(this).find("img").attr("src");
		$(".sview_area div img").attr("src",src);
	});
	
	/*
	 * 购物车
	 */
	$("#addCar").on("click",function(){
		$(".zhezhao").show();
		$(".tanchu").css({width:"80%",height:"80%",left:"20%",top:"20%"}).show().animate({left:"50%",top:"50%",width:"440px",height:"208px",opacity:0.9},500,function(){
			$(this).css("display","block");
			$(".zhezhao .wait").hide();
		});
		//添加购物车
		detailPage.addShoppingCar();
	});
	
	$(".tanchu").on("click","div.close,span.go_close",function(){
		$(".tanchu").hide();
		$(".zhezhao").hide();
	});
	
	$(".btn_go_buy .toShoppingcar").click(function(){
		location.href="shoppingList.html";
	});
	
	
	$(".wrapGoodsNum .addNum").click(function(){
		var num=Number($('.wrapGoodsNum input').val());
		num<=1?num=1:num=num-1;
		$('.wrapGoodsNum input').val(num);
	});
	
	$(".wrapGoodsNum .reduce").click(function(){
		var num=Number($('.wrapGoodsNum input').val());
		num=num+1;
		$('.wrapGoodsNum input').val(num);
	});
	
	
	
});