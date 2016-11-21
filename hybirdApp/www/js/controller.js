app.controller('homeContrller', ['$scope', function($scope){
	$scope.data=["aaaa","dddddddd","cccccc","ddddddd","nnnn"];

	$scope.slideHasChanged = function(index){

	}
}])

app.controller('moreController',['$scope','$http','$timeout',function($scope,$http,$timeout){	
	$scope.a = 5;
	$scope.aa = []
	function fresh(index){
		$http({
			method:"GET",
			url:"http://2.liuliull.applinzi.com/data.json"
		}).success(function(data){
			for(var i =0; i<data[index].classify.length;i++){
				$scope.aa.push({
					"id":data[i].oid,
					"img":data[index].classify[i].imgs,
					"title":data[index].classify[i].menu,
					"retail":data[index].classify[i].retail
				})
			}
		}).error(function(){
			console.log("错误")
		})
	}
	fresh(2);
	$scope.doRefresh= function(index){
		$timeout(function(){
		 	fresh(index);
		    $scope.$broadcast('scroll.refreshComplete');
	    },1000)
	}
}])

// 详细介绍页面

app.controller('retailController',['$scope',"$http","$timeout", function($scope,$http,$timeout){
	var oId = window.location.href.split("?")[1];
	var pageCount = 4;
	$scope.oRetail = [];

	
	$scope.loadMore = function(){
		pageCount += 2;
		$scope.oRetail = [];
		ree(pageCount)
	}
	ree(4);
	function ree(pageCount){
		$http({
		method:"get",
		url:"http://2.liuliull.applinzi.com/data.json"
		}).success(function(data){
			if(pageCount >= data.length){
				alert("没有更过了");
				pageCount = data.length-1;
			}
			for(var i = 0;i<data.length;i++){
					
				if(data[i].oid == oId){
					for(var j = 0; j < pageCount; j++){									
						$scope.oRetail.push({
							menu:data[i].classify[j].menu,
							img:data[i].classify[j].imgs,
							retail:data[i].classify[j].retail,
							time:data[i].classify[j].times
						})
					}
				}
			}
		})
	}
}])

// 养生日记

app.controller('skinController', ['$scope',"$http", function($scope,$http){
	$scope.cai = [];
	function caipu(){
		$http({
			method:"get",
			url:"http://2.liuliull.applinzi.com/caipu.json"
		}).success(function(data){
			for(var i = 0; i<data.length;i++){
				$scope.cai.push({
					id:data[i].id,
					img:data[i].img,
					name:data[i].name,
					nutrition:data[i].nutrition
				})
			}
		}).error(function(data){
			console.log("错误");
		})
	}
	caipu();
	$scope.search = function(){	
		$scope.cai = [];
		$http({
			method:"get",
			url:"http://2.liuliull.applinzi.com/caipu.json"
		}).success(function(data){
			for(var i = 0; i<data.length;i++){
				if(data[i].name.indexOf($scope.name) != -1){
					$scope.cai.push({
						id:data[i].id,
						img:data[i].img,
						name:data[i].name,
						nutrition:data[i].nutrition
					})
				}				
			}
		}).error(function(data){
			console.log("错误");
		})
	}
}])

// 食谱 做法

app.controller('zuofaController', ['$scope',"$http", function($scope,$http){
	var oId = window.location.href.split("?")[1];
	$scope.set  = [];
	$scope.zuofa = []
	$http({
		method:"get",
		url:"http://2.liuliull.applinzi.com/caipu.json"
	}).success(function(data){
		for(var i =0;i<data.length;i++){
			if(data[i].id == oId){
				$scope.set.push({
					name:data[i].name,
					img:data[i].img,
					title:data[i].title
				})
				for(var j =0;j<data[i].zuofa.length;j++){
					$scope.zuofa.push(data[i].zuofa[j])
				}
			}
		}
	}).error(function(){
		console.log("error")
	})
}])


// 我的 页面

// 获取本地相册 和 拍照功能
app.controller('mineController', ['$scope','$cordovaCamera',function($scope,$cordovaCamera){
	$scope.choosePic = function(){
		var options = {
              quality: 50,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 100,
              targetHeight: 100,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: true
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
	            var image = document.getElementById('myImg');
	            // image.src=imageData;
	            image.src = "data:image/jpeg;base64," + imageData;
            }, function(err) {
            	alert("获取本地相机失败")
                CommonJs.AlertPopup(err.message);
           });
	}
}])

