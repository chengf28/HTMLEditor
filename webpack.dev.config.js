const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: './src/index.ts', // 打包入口：指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        // library: 'HTMLEditor',
        // libraryTarget: 'umd',
        // umdNamedDefine: true
    }, // 出口
    resolve: {
        extensions: ['.tsx', '.ts', '.js','.scss'],
    }, // 配置解析：配置别名、extensions 自动解析确定的扩展等等
    devServer: {
        port: 8089,
        open: true,
        compress: true,
        hot:true,
        host:'localhost',
        contentBase: path.resolve(__dirname, 'public')

    }, // 开发服务器：run dev/start 的配置，如端口、proxy等
    module: {
        rules: [
            {
                test:/\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname,'src')]
            },
            {
                test:/\.html$/,
                use:'raw-loader',
                exclude:/node_modules/,
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: [path.resolve(__dirname, 'src')],
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')]// 添加css中的浏览器前缀
                        }
                    },
                    'sass-loader',
                ]
            },
            {
                test:/\.js$/,
                include:[path.resolve(__dirname,'src')],
                use:[
                        'babel-loader',
                    ]
            },{
                test:/\.(png|jgeg|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        outputPath:'images/', // 输出到images文件夹
                        limit:500, //小于500B的直接转成BASE64
                    }
                }]
            }
        ]
    }, // 模块配置：配置loader（处理非 JavaScript 文件，比如 less、sass、jsx、图片等等）等
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
    ] // 插件的配置：打包优化、资源管理和注入环境变量
}
if (module.hot) {
    module.hot.accept()
}