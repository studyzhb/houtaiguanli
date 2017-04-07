new Vue({
	el:'#app',
	data:{
        cityId:1,
        navId:1,
		areaData:[],
        ClassifyData:[],
        sortIndex:'',
        tag:false,
        showIndex:"0",
        imgLeft:'',
		selectedSortIndex:'0',
		goodslistArr:[],
		shoplistArr:[],
		//总页数
		pageCount:1,
		//每页个数
		pageSize:6,
		currentPage:1,
		benefitlistArr:[],
		parames:{
			cityid:1,
			navid:1,
			p:1
		},
		gOstag:false
	},
	filters:{
		json2single:function(value){
			
			var str=typeof eval(value)=='object'?JSON.parse(value)[0]:'';
			
			return str;
		}
	},
	mounted:function() {
		
		this.$nextTick(function(){
			this.renderView();
		})
	},
	methods:{
		renderView:function(){
			var self=this;
			
			//获取城市站点和导航
			this.getCityAndNav();
			
			this.getAreaList();

			this.getClassifyInfo();
			//true加载商品,false加载店铺
			if(this.gOstag){
				this.getGoodsInfo();
			}else{
				this.getShopInfo();
			}
			
			this.getBefenit();
			
		},
		getAreaList:function(){
			var self=this;
			/**
			 * 获取区域列表
			 */
			this.$http.get(ajaxAddress.preFix+ajaxAddress.area.areaData+'?cityid='+this.parames.cityid+'&navid='+this.parames.navid)
				.then(function(res){
					res.body.data.forEach(function(item,index){
						
						item.areaIndex=-1;
						
					});
					self.areaData=res.body.data;
                    
				});
		},
		getClassifyInfo:function(){
			var self=this;
			/**
			 * 获取分类列表
			 */
            this.$http.get(ajaxAddress.preFix+ajaxAddress.Classify.Classifydata+'?cityid='+this.parames.cityid+'&navid='+this.parames.navid)
				.then(function(res){
					
                    res.body.data.forEach(function(item,index){
                        item.sortIndex='-1';
                    })
                    self.ClassifyData=res.body.data;

				});
		},
		getGoodsInfo:function(){
			var self=this;
			/**
			 * 获取商品数据
			 */ 
			this.$http.get(ajaxAddress.preFix+ajaxAddress.list.goodslist,{params:this.parames})
						.then(function(res){
							if(res.body.code==200){
								self.goodslistArr=res.body.data;
							}else{
								self.goodslistArr=[];
							} 
						})
		},
		getShopInfo:function(){
			var self=this;
			/**
			 * 获取店铺数据
			 */ 
			this.$http.get(ajaxAddress.preFix+ajaxAddress.list.shoplist+'?cityid='+this.parames.cityid+'&navid='+this.parames.navid+'&p='+this.currentPage)
						.then(function(res){
							console.log(res);
							self.shoplistArr=res.body.data;
						})
		},
		getBefenit:function(){
			var self=this;
			/**
			 * 获取优惠信息数据
			 */ 
			this.$http.get(ajaxAddress.preFix+ajaxAddress.list.benefit+'?cityid='+this.parames.cityid+'&navid='+this.parames.navid)
						.then(function(res){
							console.log(res);
							self.benefitlistArr=res.body.data;
						})
		},
		searchResultInfo:function(obj,tag){
			this.extendParams(obj,tag);
			this.getGoodsInfo();
		},
		extendParams:function(obj,tag){

			if(tag){
				if(!this.parames.field){
					this.parames.field=[];
				}
				for(var i=0,j=this.parames.field;i<j.length;i++){
					
					for(var m in obj){
						if(j[i][m]){
							j[i][m]=obj[m];
							break;
						}
					}
				}
				this.parames.field.push(obj);
				return;
			}

			for(var i in obj){
				this.parames[i]=obj[i];
			}
		},
        getImageInfo:function(aIndex){
            var obj=this.$refs.aIndex[aIndex];
            var ofLeft=obj.offsetLeft+obj.offsetWidth/2-this.$refs.parIndex.offsetLeft-14;
            this.imgLeft=ofLeft;
			this.showIndex=aIndex;
        },
		//分类选中
		sortClick:function(sortItem,index,id){
			sortItem.sortIndex=index;
			var obj={};
			obj[sortItem.field]=id;
			this.searchResultInfo(obj,true);
		},
		//区域
		areaClick:function(item,pItem,index){
			var obj={};
			pItem.areaIndex=index;
			if(pItem.id=='1'){
				obj.areaid=item.id;
				
			}else{
				obj.business=item.id;
			}
			this.searchResultInfo(obj);
		},
		pageClick:function(n){
			this.currentPage=n;
			var obj={};
			obj.p=n;
			this.searchResultInfo(obj);
		},
		/**
		 * 获取导航信息
		 */
		getCityAndNav:function(){
			
		}


	}
})
