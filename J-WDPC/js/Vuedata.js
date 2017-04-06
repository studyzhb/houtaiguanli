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
		pageCount:0,
		//每页个数
		pageSize:6,
		currentPage:1,
		benefitlistArr:[],
		option:{
			cityid:this.cityId,
			navid:this.navId,
			p:this.currentPage
		}
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
			/**
			 * 获取区域列表
			 */
			this.$http.get(ajaxAddress.preFix+ajaxAddress.area.areaData+'?cityid='+this.cityId+'&navid='+this.navId)
				.then(function(res){

					self.areaData=res.body.data;
                    
				});
			/**
			 * 获取分类列表
			 */
            this.$http.get(ajaxAddress.preFix+ajaxAddress.Classify.Classifydata+'?cityid='+this.cityId+'&navid='+this.navId)
				.then(function(res){
					
                    res.body.data.forEach(function(item,index){
                        item.sortIndex='-1';
                    })
                    self.ClassifyData=res.body.data;

				});
			
			this.getGoodsInfo();
			
			this.getBefenit();
			
		},
		getGoodsInfo:function(){
			var self=this;
			console.log(this.option);

			/**
			 * 获取商品数据
			 */ 
			this.$http.get(ajaxAddress.preFix+ajaxAddress.list.goodslist+'?cityid='+this.cityId+'&navid='+this.navId,this.option)
						.then(function(res){
							console.log(res);
							self.goodslistArr=res.body.data;
						})
		},
		getShopInfo:function(){
			var self=this;
			/**
			 * 获取店铺数据
			 */ 
			this.$http.get(ajaxAddress.preFix+ajaxAddress.list.shoplist+'?cityid='+this.cityId+'&navid='+this.navId+'&p='+this.currentPage)
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
			this.$http.get(ajaxAddress.preFix+ajaxAddress.list.benefit+'?cityid='+this.cityId+'&navid='+this.navId)
						.then(function(res){
							console.log(res);
							self.benefitlistArr=res.body.data;
						})
		},
		searchResultInfo:function(obj){
			this.extendParams(obj);
			this.getGoodsInfo();
		},
		extendParams:function(obj){
			for(var i in obj){
				this.option[i]=obj[i];
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
			this.searchResultInfo(obj);
		},
		//区域
		areaClick:function(id,pId){
			var obj={};
			if(pId=='1'){
				obj.area=id;
			}else{
				obj.business=id;
			}
			this.searchResultInfo(obj);
		}


	}
})
