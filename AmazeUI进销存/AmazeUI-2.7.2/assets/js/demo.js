$(function(){
	//这个是表单页删除
	//这个是首页表单删除
	$(".plus-btn").click(function(){
		$(".wrap input").val("");
	})
	$(".btn-left").click(function(){
		var ipt1 = $(".ipt-one").val();
		var ipt2 = $(".ipt-two").val();
		var ipt3 = $(".ipt-tre").val();
		var ipt4 = $(".ipt-fou").val();
		var ipt5 = $(".ipt-fiv").val();
		var ipt6 = $(".ipt-six").val();
		var ipt7 = $(".ipt-sev").val();
		console.log(ipt1);
		console.log(ipt2);
		console.log(ipt3);
		console.log(ipt4);
		console.log(ipt5);
		console.log(ipt6);
		console.log(ipt7);
		$(".table-main").append('<tbody><tr><td>'+ ipt1 +'</td><td>'+ipt2+'</td><td>'+ipt3+'</td><td>'+ipt4+'</td><td class="am-hide-sm-only">'+ipt5+'</td><td>'+ipt6+'</td><td class="am-hide-sm-only">'+ipt7+'</td><td><div class="am-btn-toolbar"><div class="am-btn-group am-btn-group-xs"><button class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-pencil-square-o"></span> 编辑</button><button class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"><span class="am-icon-trash-o"></span> 删除</button></div></div></td></tr></tbody>');

	})
	
	
	$(".plus-btn").click(function(){
		$(".wrap input").val("");
	})
	
//	$("body").on('click','.am-text-danger',function(){
//				$(this).parent().parent().parent().parent().remove();
//			})
	
	

	
	$(".an-yg-stop").click(function(){
		var clearWord = $(this).text();
		if (clearWord == "恢复") {
			$(this).text("停用");
		}else if (clearWord == "停用") {
			$(this).text("恢复");
		}
	})
	
	

//	   $("#ogin-one").click(function(){
//	    var ogin1 = $(".ogin-li-one").val();
//		var ogin2 = $(".ogin-li-two").val();
//		var ogin3 = $(".ogin-li-tre").val();
//		var ogin4 = $(".ogin-li-fou").val();
//		var ogin5 = $(".ogin-li-fiv").val();
//		var ogin6 = $("#lnglatX").val();
//		var ogin7 = $("#lnglatY").val();
//		var ogin8 = "data-am-modal='{target:'#pop1'}'";
//		console.log(ogin1);
//		console.log(ogin2);
//		console.log(ogin3);
//		console.log(ogin4);
//		console.log(ogin5);
//		console.log(ogin6);
//		console.log(ogin7);
//		$("#staf-one").append('<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;'+ogin1+'</td><td>'+ogin2+'</td><td>'+ogin3+'</td><td>'+ogin4+'</td><td class="am-hide-sm-only">'+ogin5+'</td><td>'+ogin6+'</td><td class="am-hide-sm-only">'+ogin7+'</td><td ><div class="am-btn-toolbar"><div class="am-btn-group am-btn-group-xs"><a class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-pencil-square-o"></span> 编辑</a><a class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-plus"'+ogin8+'>新增</span></a></div></div></td></tr>');
//		
//	  })
	    
	    
	    
	    $(".ogin-open").click(function(){
	    	var classImgs = $(this).find('span').attr('class');
	    	var classText = $(this).find('span').text();
	    	console.log(classImgs);
	    	if (classImgs == 'am-icon-chevron-down'&&classText == '展开') {
	    	$(this).find('span').attr('class','am-icon-chevron-right').text('合并');
	    	}else if (classImgs == 'am-icon-chevron-right'&&classText == '合并') {
	    	$(this).find('span').attr('class','am-icon-chevron-down').text('展开');
	    	}
	    })
	    
	    
	    
	    
	    $(".frome-Btn-one").click(function(){
	    	$(".form-clear").val("");
	    })



	
})








