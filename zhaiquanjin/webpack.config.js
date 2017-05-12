const HtmlWebpackPlugin=require('html-webpack-plugin');
const path = require('path');
const config={
    entry:{
        index:'./src/assets/js/index.js',
        myAccount:'./src/assets/js/myAccount.js',
        order:'./src/assets/js/order.js',
        pay:'./src/assets/js/pay.js',
    }, 
    output:{
        // publicPath:'',
        filename:'[name]-bundle.js',
        path:path.resolve(__dirname,'dist/js')    
    },
    module:{
        rules:[
            {test:/\.(scss|sass)/,use:[{
                loader: "style-loader"
            }, {
                loader: "css-loader", options: {
                    sourceMap: true
                }
            }, {
                loader: "sass-loader", options: {
                    sourceMap: true
                }
            }]},
             {test: /\.(jade|pug)$/, use: 'pug-loader?'},
             { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'../html/index.html',
            template:'src/assets/index.jade',
            chunks:['index'],
            title:'ceshi',
            minify:false
        }),
        new HtmlWebpackPlugin({
            filename:'../html/myAccount.html',
            template:'src/assets/myAccount.pug',
            title:'ceshi',
            chunks:['myAccount'],
            minify:false
        }),
        new HtmlWebpackPlugin({
            filename:'../html/order.html',
            template:'src/assets/order.pug',
            title:'ceshi',
            chunks:['order'],
            minify:false
        }),
        new HtmlWebpackPlugin({
            filename:'../html/pay.html',
            template:'src/assets/pay.pug',
            chunks:['pay'],
            title:'ceshi',
            minify:false
        })
    ],
    resolve:{

    }
}

module.exports=config;