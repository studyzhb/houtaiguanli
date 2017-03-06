define(function() {
    'use strict';
    var laytpl,layer;
    var resolve=false;
    var a=layui.use(['laytpl','layer','form'],function(){
        laytpl = layui.laytpl;
        layer = layui.layer;
        resolve=true;
    })

    
    return a;
    
    
});