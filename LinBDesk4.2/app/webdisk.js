/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.webdisk', {
    extend: 'Ext.ux.desktop.Module',

    requires: [ ],

    id:'webdisk',
    init : function(){
        this.launcher = {
            text: '网络云盘',
            iconCls:'webdisk-icon'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('webdisk');
        if(!win){
            win = desktop.createWindow({
                id: 'webdisk',
                title:'网络云盘',
                width:850,
                height:593,
                iconCls: 'webdisk-icon',
                animCollapse:false,
                border: false,
                hideMode: 'offsets',
                layout: 'fit',
                html:'<iframe width=100% height=100% src="http://demo.linbsoft.com/zykdsk/webdisk.htm"></iframe>'
            });
        }
        return win;
    }
});
