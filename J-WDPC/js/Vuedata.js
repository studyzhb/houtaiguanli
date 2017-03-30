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
        imgLeft:''
	},
	filters:{

	},
	mounted:function() {
		
		this.$nextTick(function(){
			this.renderView();
		})
	},
	methods:{
		renderView:function(){
			var self=this;
			this.$http.get(ajaxAddress.preFix+ajaxAddress.area.areaData+'?cityid='+this.cityId+'&navid='+this.navId)
				.then(function(res){
					self.areaData=res.body.data;
                    console.log(self.areaData);
				});

            this.$http.get(ajaxAddress.preFix+ajaxAddress.Classify.Classifydata+'?cityid='+this.cityId+'&navid='+this.navId)
				.then(function(res){
					
                    res.body.data.forEach(function(item,index){
                        item.sortIndex='-1';
                    })
                    self.ClassifyData=res.body.data;

				}); 
		},
        getImageInfo:function(aIndex){
            var obj=this.$refs.aIndex[aIndex];
            var ofLeft=obj.offsetLeft+obj.offsetWidth/2-this.$refs.parIndex.offsetLeft-14;
            this.imgLeft=ofLeft;
			this.showIndex=aIndex;
        }

	}
})
