require(['jquery','main','ajaxAddress','lay-model','log'],function($,myObj,ajaxAddress,layObj,log){
    
    var common=myObj.load();
    var fistLoad=true;
    var alertFirstLoad=true;
    var form;
    /**
     * 获取地址栏中参数信息
     */
    var params=function(){

        var paraData=location.href.split('?')||[];
        var readyData=paraData[1]?paraData[1]:'';
        var arrData=readyData.split('&')||[];
        log.d(location.href);
        var obj={};
        
        $.each(arrData,function(index,item){

            var arr=item.split('=')||[];
            
            obj[arr[0]]=arr[1];
            
        })

        return obj;
    }();


    layui.use('laydate', function(){
        var laydate = layui.laydate;
        
        var start = {
            min: '2017-04-30 23:59:59',
            format: 'YYYY-MM-DD'
            ,max: '2099-06-16 23:59:59'
            ,istoday: true
            ,choose: function(datas){
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日
            $(this.elem).next('input').val(datas);
            }
        };
        
        var end = {
            min: '2017-04-30 23:59:59',
            format: 'YYYY-MM-DD'
            ,max: '2099-06-16 23:59:59'
            ,istoday: true
            ,choose: function(datas){
            start.max = datas; //结束日选好后，重置开始日的最大日期
            $(this.elem).next('input').val(datas);
            }
        };
        
        $('.dateStart').on('click',function(){
            start.elem = this;
            laydate(start);
        })

        $('.dateEnd').on('click',function(){
            end.elem = this;
            laydate(end);
        })

        });


        setTimeout(function(){
            form=layObj.form();
            //下拉选择状态删除
            form.on('submit(searchResultByTel)',function(formParams){
                
                open('printPlatformExcel.html?time='+encodeURIComponent(JSON.stringify(formParams.field)),'_self');
                
                return false;
            })
        },500);


})