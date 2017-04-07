new Vue({
	el:'#app',
	data:{
        cityId:1,
        navId:1,
        goodsDetailArr:[],
        goodsId:'1'
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
            this.getGoodsInfo();
		},
		getGoodsInfo:function(){
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.detail.goodsDetail+'?id='+this.goodsId)
                    .then(function(res){
                        console.log(res);
                        self.goodsDetailArr=res.body.data;
                    })
        }

	}
})
