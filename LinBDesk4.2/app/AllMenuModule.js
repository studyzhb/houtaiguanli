/*!
* Ext JS Library 4.0
* Copyright(c) 2006-2011 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/

Ext.define('MyDesktop.AllMenuModule', {
    extend: 'MyDesktop.BogusModule',

    init : function() {

        this.launcher = {
            text: '所有程序',
            iconCls: 'bogus',
            handler: function() {
                return false;
            },
            menu: {
                items: []
            }
        };
        this.launcher.menu.items.push({
                text: '百度 ',
                iconCls:'bogus',
                url:'http://www.baidu.com',
                winwidth:700,
                winheight:400,
                handler : this.createMyWindow,
                scope: this,
                windowId: 'baidu'
            });
            
         this.launcher.menu.items.push({
                text: 'LinbSoft',
                iconCls:'bogus',
                url:'http://www.linbsoft.com',
                winwidth:800,
                winheight:500,
                handler : this.createMyWindow,
                scope: this,
                windowId: 'linbsoft'
            });   

    }
}); 