/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.WebExcel', {
    extend: 'Ext.ux.desktop.Module',

    requires: [ ],

    id:'webexcel',
    init : function(){
        this.launcher = {
            text: 'WEB电子表格',
            iconCls:'icon-grid'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('webexcel');
        if(!win){
            win = desktop.createWindow({
                id: 'webexcel',
                title:'WEB电子表格',
                width:930,
                height:580,
                iconCls: 'icon-grid',
                animCollapse:false,
                border: false,
                hideMode: 'offsets',
                layout: 'fit',
                html:'<iframe width=100% height=100% src="http://demo.linbsoft.com/zykdsk/webexcel/index.html"></iframe>'
            });
        }
        return win;
    }
});
