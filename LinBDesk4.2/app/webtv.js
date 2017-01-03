/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.WebTV', {
    extend: 'Ext.ux.desktop.Module',

    requires: [ ],

    id:'webtv',
    init : function(){
        this.launcher = {
            text: '网络电视',
            iconCls:'icon-grid'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('webtv');
        if(!win){
            win = desktop.createWindow({
                id: 'webtv',
                title:'网络电视',
                width:814,
                height:580,
                iconCls: 'icon-grid',
                animCollapse:false,
                border: false,
                hideMode: 'offsets',
                layout: 'fit',
                html:'<iframe width=100% height=100% src="http://app.aplus.pptv.com/tgapp/baidu/live/main?s_param=3435&bd_user=0&bd_sig=1915887670151a39deb268da185fecef&canvas_pos=platform"></iframe>'
            });
        }
        return win;
    }
});
