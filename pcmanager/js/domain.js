
require.config({
　　　　paths: {
　　　　　　"jquery": "jquery",
            "config":"config",
            "gaodeMap":"http://webapi.amap.com/maps?v=1.3&key=3ee94aaafab3217e125bbebc24942494&plugin=AMap.PlaceSearch,AMap.AdvancedInfoWindow"
　　　　},
    shim:{
        "jquery-form" : {
            deps : ["jquery"]
        },
        "gaodeMap":{
            exports:'gDMap'
        }
    }
　　});
