new Vue({
	el:'.container-head',
	data:{
		navData:[{name:'zhang'},{name:'wang'}],
		navSlideData:[]
	},
	mounted:function() {
		this.$nextTick(function(){
			this.renderView();
		})
	},
	methods:{
		renderView:function(){
			var self=this;
			this.$http.get('http://web.yylm.com/public/unionindex/index/getNav?navtype=1&display=off')
				.then(function(res){
					//console.log(res.body.data);
					self.navData=res.body.data;
					// if(res.status==200){
					// 	self.navData=res;
					//console.log(self.navData);
					// }
					
				});
			
			this.$http.get('http://web.yylm.com/public/unionindex/index/getNav?navtype=2&display=on')
				.then(function(res){
					console.log(res.body.data);
					self.navSlideData=res.body.data;
					// if(res.status==200){
					// 	self.navData=res;
					console.log(self.navSlideData);
					// }
					
				})
		}
	}
})