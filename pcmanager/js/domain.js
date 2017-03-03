require.config({
    paths:{
        "jquery":"jquery-1.12.4.min",
        "jquery.form":"jquery.form",
        "config":"config",
        "main":"main"
    },
    shim:{
        "jquery.form" : {
            deps : ["jquery"]
        }
    }

})
