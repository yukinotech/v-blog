const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//解析公共css
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//引入webpack模块，ProvidePlugin是webpack身上的一个插件
const webpack=require('webpack'); 

module.exports = {
    entry: {
        index: './public/assets/index.js',
        Publish: './public/assets/Publish.js',
        Login: './public/assets/Login.js',
        ArticleShow: './public/assets/ArticleShow.js',
        ChangeArticle: './public/assets/ChangeArticle.js',
        Register: './public/assets/Register.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        }, {
            test: /\.css$/,
            include: path.resolve(__dirname, 'public/css'),
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }, {
            test: /\.css$/,
            include: path.resolve(__dirname, 'public/assets'),
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[name]__[local]--[hash:base64:5]'
                }
            }]
        }, {
            test: /\.(png|jpg|jpeg|svg)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'img/[hash].[name].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist/index.html'),
            template: './public/index.html',
            inject: false,
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist/login.html'),
            template: './public/login.html',
            inject: false,
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist/publish.html'),
            template: './public/publish.html',
            inject: false,
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist/ArticleShow.html'),
            template: './public/ArticleShow.html',
            inject: false,
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist/ChangeArticle.html'),
            template: './public/ChangeArticle.html',
            inject: false,
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist/Register.html'),
            template: './public/Register.html',
            inject: false,
        }),
        new ExtractTextPlugin("css/styles.css"),
        // new webpack.ProvidePlugin({ //它是一个插件，所以需要按插件的用法new一个
        //     react:'react',    //接收名字:模块名
        //     reactDom:'react-dom',
        // })
    ],
    // optimization:{  //优化
    //     splitChunks:{
    //         cacheGroups:{//缓存组，一个对象。它的作用在于，可以对不同的文件做不同的处理
    //             commonjs:{
    //                 name:'common',      //输出的名字（提出来的第三方库）
    //                 test: /\.js/,       //通过条件找到要提取的文件
    //                 chunks:'initial'    //对所有文件进行处理
    //             }
    //         }
    //     }
    // },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 3000
    },
    mode: 'development'
}