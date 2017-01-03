/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.AboutLinb', {
    extend: 'Ext.ux.desktop.Module',

    requires: [ ],

    id:'aboutlinb',
    init : function(){
        this.launcher = {
            text: '关于桌面',
            iconCls:'user-add'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('aboutlinb');
        if(!win){
            win = desktop.createWindow({
                id: 'aboutlinb',
                title:'关于桌面',
                width:700,
                height:370,
                iconCls: 'user-add',
                animCollapse:false,
                border: false,
                hideMode: 'offsets',
                layout: 'fit',
                html:'<iframe width=100% height=100% src="app/linb/index.html"></iframe>'
            });
        }
        return win;
    }
});
