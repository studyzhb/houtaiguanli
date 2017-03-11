define(function() {
    'use strict';
    var laytpl,layer,form;
    var resolve=false;
    
    var a=function(){
        return  layui.use(['laytpl','layer','form'],function(){
            laytpl = layui.laytpl;
            layer = layui.layer;
            form=layui.form();
            resolve=true;
        })
    }()
   


    return a;
    
    
});