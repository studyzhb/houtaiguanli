﻿/*!
* Ext JS Library 4.0
* Copyright(c) 2006-2011 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/

var windowIndex = 0;

Ext.define('MyDesktop.BogusModule', {
    extend: 'Ext.ux.desktop.Module',

    init : function(){
        this.launcher = {
            text: '子菜单项 '+(++windowIndex),
            iconCls:'bogus',
            handler : this.createWindow,
            scope: this,
            windowId:windowIndex
        }
    },

    createWindow : function(src){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('bogus'+src.windowId);
        if(!win){
            win = desktop.createWindow({
                id: 'bogus'+src.windowId,
                title:src.text,
                width:640,
                height:480,
                html : '<p>Something useful would be in here.</p>',
                iconCls: 'bogus',
                animCollapse:false,
                constrainHeader:true
            });
        }
        win.show();
        return win;
    },
        createMyWindow : function(src){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow(src.windowId);
        if(!win){
            win = desktop.createWindow({
                id: src.windowId,
                title:src.text,
                width:src.winwidth,
                height:src.winheight,
                html : '<iframe width="100%" height="100%" frameborder="0" src="' + src.url + '"></iframe>',
                iconCls: src.iconCls,
                hideMode: 'offsets',
                constrain: true,
                layout: 'fit',	
                animCollapse:false,
                constrainHeader:true
            });
        }
        win.show();
        return win;
    }
});