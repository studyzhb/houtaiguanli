


/*导师详情页js效果实现*/

	/*后台数据回去*/
	
	jQuery.ajax = (function(_ajax){
    var protocol = location.protocol,
        hostname = location.hostname,
        exRegex = RegExp(protocol + '//' + hostname),
        YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
        query = 'select * from html where url="{URL}" and xpath="*"';
    
    function isExternal(url) {
        return !exRegex.test(url) && /:\/\//.test(url);
    }
    
    return function(o) {
        
        var url = o.url;
        
        if ( /get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url) ) {
            
            // Manipulate options so that JSONP-x request is made to YQL
            
            o.url = YQL;
            o.dataType = 'json';
            
            o.data = {
                q: query.replace(
                    '{URL}',
                    url + (o.data ?
                        (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data)
                    : '')
                ),
                format: 'xml'
            };
            
            // Since it's a JSONP request
            // complete === success
            if (!o.success && o.complete) {
                o.success = o.complete;
                delete o.complete;
            }
            
            o.success = (function(_success){
                return function(data) {
                    
                    if (_success) {
                        // Fake XHR callback.
                        _success.call(this, {
                            responseText: data.results[0]
                                // YQL screws with <script>s
                                // Get rid of them
                                .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
                        }, 'success');
                    }
                    
                };
            })(o.success);
            
        }
        return _ajax.apply(this, arguments);
        
    };
    
})(jQuery.ajax);
jQuery.support.cors=true;

$(function(){
	var http = "http://192.168.1.66:8080/m/mentor?id="
	 $.ajax({
        type:'GET',
        // async:false,
        url:http+"448",
        dataType:'json',
        cache:true,
        contentType:'application/json;charset=utf-8',       
        success:function(data){
            var nImgLength = 1;
            if(nImgLength>=5){
                nImgLength=5
            }
            console.log(data.result.mentorPhoto)
           var oDiv = $("<div>").addClass('img-show'+nImgLength)
           console.log(data.result.mentorPhotos)
           for(var i=0;i<1;i++){

                var aImg = $("<img scr="+"sunvhui-test.oss-cn-shanghai.aliyuncs.com/banner1.jpg"+">").addClass('img'+nImgLength)
                oDiv.append(aImg)  
           }
           $('.content-one').html(data.result.mentorSynopsis)
           //console.log(data)
           $(".img-place").html(oDiv)
            console.log("成功")

         },
        error:function(XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(XMLHttpRequest.responseText);
                console.log(textStatus);
                console.log(errorThrown);
                console.log(textStatus);
        }
      });
})
