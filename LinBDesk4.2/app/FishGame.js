/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.FishGame', {
    extend: 'Ext.ux.desktop.Module',

    requires: [ ],

    id:'fishgame',
    init : function(){
        this.launcher = {
            text: '捕鱼达人',
            iconCls:'user-girl'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('fishgame');
        if(!win){
            win = desktop.createWindow({
                id: 'fishgame',
                title:'捕鱼达人',
                width:800,
                height:560,
                iconCls: 'user-girl',
                animCollapse:false,
                border: false,
                hideMode: 'offsets',
                layout: 'fit',
                html:'<iframe width=100% height=100% src="http://demo.linbsoft.com/linbdesk/app/fish/demo.html"></iframe>'
            });
        }
        return win;
    }
});
