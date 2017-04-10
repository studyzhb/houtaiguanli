Vue.http.options.emulateJSON = true;
Vue.http.options.xhr = { withCredentials: true }
Vue.http.interceptors.push((request, next) => {
request.credentials = true
next()
})
new Vue({
	el:'#app',
	data:{
		navData:[],
		banImgData:[],
		mainData:[],
		navIdArr:[],
		navNameArr:[],
		bannerData:[],
		labelArr:[],//标签数组 【 ID=》 name】
		timer:"",
		index:"",
		navid:'',
		navtype:'',
		cityId:'0',
		labelFArr:[],
		laeblSArr:[],
		laeblTArr:[],
        isShowAllSortIndex:0,
		loginIndex:'-1',
		picCode:'',
		loginUser:{
			phone:'',
			password:'',
			code:''
		},
		registerUser:{
			phone:'',
			password:'',
			code:''
		},
		resetUser:{
			phone:'',
			password:'',
			code:''
		}
	},
	filters:{
		json2single:function(value){
			
			var str=typeof eval(value)=='object'?JSON.parse(value)[0]:'';
			return str;
		},
        
		
		
	},

	mounted:function() {
		
		this.$nextTick(function(){
			this.renderView();
			if(this.bannerData.length>0){
				this.active();
			}	
		})
	},
	methods:{
		/**
		 * 用户登录
		 */
		userLogin:function(){

			var body=this.loginUser;
			this.$http.post(ajaxAddress.preFix+ajaxAddress.user.login,{},{params:body})
				.then(function(res){
					console.log(res);
				})
		},
		//用户密码重置
		resetPassword:function(){

		},
		//用户注册
		registerUser:function(){
			var body=this.registerUser;
			this.$http.post(ajaxAddress.preFix+ajaxAddress.user.register,{},{params:body,method:'POST'})
					.then(function(res){
						console.log(res);
					})
		},
		//获取短信验证码
		getMesscode:function(){
			console.log('111');
			var phone=this.registerUser.phone;
			var code=this.registerUser.code;
			this.$http.post(ajaxAddress.preFix+ajaxAddress.user.getRegisterMessCode,{},{params:{phone:phone,code:code}})
					.then(function(res){
						console.log(res);
					})
		},
		getResetMesscode:function(){

		},
		updatePicCode:function(){
			this.picCode=ajaxAddress.preFix+ajaxAddress.user.getPicCode+'?v='+new Date().getTime();
		},
		parseUrl:function(value){
            this.isShowAllSortIndex=1;
			return goToWhere+value.id+'&name='+escape(value.name);
        },
		renderView:function(){
			
			var self=this;
			console.log(ajaxAddress.user)
			this.picCode=ajaxAddress.preFix+ajaxAddress.user.getPicCode;
            //获取导航
			this.$http.get(ajaxAddress.preFix+ajaxAddress.nav.showPrimaryNav+'?navtype=1')
				.then(function(res){
					// console.log(res);
					self.navData=res.body.data;
					self.navData.forEach(function(data){
						self.navIdArr.push({id:data.id,typeShop:[],typeGoods:[],benefit:[],nav_name:data.name});
						
					})			
					self.navIdArr.forEach(function(item) {
						self.navfun(item);
					});
					
					// console.log(self.navIdArr);
					
				});
			
			
		},
		setNameShop:function(value){

			var str = value + shopRecomendName;
			
			
				return str;
			
		},
		setNameGoods:function(value){

			var str = value + goodsRecomendName;
			
			
				return str;
			
		},
		//获得推荐/热门店铺方法
		navfun:function(navObj){
			this.$http.get(ajaxAddress.preFix+ajaxAddress.updataContent.hotContent+'?navid='+navObj.id)
				.then(function(res){
					// console.log(res.body.data);
					//navNameArr

					// res.body.data.forEeach(function(item){
					// 	item.
					// });
					if(res.body.data){
						navObj.typeShop=res.body.data||[];
					}
					
					
					
				})
		//获得推荐/热门商品方法
		 this.$http.get(ajaxAddress.preFix+ajaxAddress.updataContent.goods+'?navid='+navObj.id)
				.then(function(res){
					// console.log(res.body.data);
					var arr  = res.body.data instanceof Array? res.body.data.splice(9):[];
					navObj.typeGoods   = res.body.data;
					navObj.typeGoodsAd = arr;
					
					
				})
			// this.$http.get(ajaxAddress.preFix+ajaxAddress.updataCon+'?navid='+navObj.id)
			// .then(function(res){
			// 	// console.log(res.body.data);
			// 	navObj.benefit=res.body.data;
			// 	console.log(navObj.typeGoods);
				
			// })
		
		

		},
		
		getLabelInfo:function(str,lField){
			
			
			var arr=str?str.split(','):[];
			
			var nArr=[];
			var self=this;
			//{id, type,field}
			this.labelArr.forEach(function(item){
				arr.forEach(function(its){
					if(its==item.id){
						console.log(LabelField[lField]);
						console.log(item.field);
						if(LabelField[lField]==item.field){
							nArr.push(item);
						}
					}
				})
				
			})
			console.log(nArr);
			return nArr;
		},
		active:function(){
			var self=this;
			this.timer=setInterval(function () {
				go();
			},2000)
			function go(){
				self.index++;
				if(self.index > $('.notice-pic>li').size()-1){
					self.index = 0;
				}
				$('.notice-pic').stop(true,true).animate({
				'left':-$('.notice-pic>li').width()*self.index
				},300);
			};
		},
		updateNav:function(id){
			this.navid=id;
            
		},

	}
})
