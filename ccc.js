if(data.code==200){
                layer.msg('添加成功');
                setTimeout(function(){
                    open('addgoodsInfo.html','_self');
                },500)
                
            }else{
                layer.msg('网络错误，请稍后重试');
                setTimeout(function(){
                    open('addgoodsInfo.html','_self');
                },500)
            }