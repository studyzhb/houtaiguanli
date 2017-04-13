new Vue({
    el:'#app',
    data:{
        userOrderArr:'',
        user:'',
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
            this.shopId=paraObj.id;
            this.navName=unescape(paraObj.name);
            this.getUserOrder();
            this.getUser();
        },
    
        getUserOrder:function(){
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.userData.userOder+'?id='+this.shopId)
                    .then(function(res){
                        
                        self.userOrderArr=res.body.data;
                        console.log(self.userOrderArr);
                    })
        },
        getUser:function(){
            var self=this;
            this.$http.get(ajaxAddress.preFix+ajaxAddress.userData.user+'?id='+this.shopId)
                    .then(function(res){
                        
                        self.user=res.body.data;
                        console.log(self.user);
                    })
        }
    }
})
