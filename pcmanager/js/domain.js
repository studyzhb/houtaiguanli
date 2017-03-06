

require.config({
　　　　paths: {
　　　　　　"jquery": "./jquery-1.12.4.min",
　　　　},
    shim:{
        "jquery-form" : {
            deps : ["jquery"]
        }
    }
　　});
