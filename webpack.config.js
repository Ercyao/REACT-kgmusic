//const path = require('path');
//
//const ROOT_PATH = path.resolve(__dirname);
//
//module.exports = {
//  entry: path.resolve(__dirname, './public/main.js'),
//  output: {
//      path: path.resolve(__dirname, './public/out'),
//      filename: 'bundle.js'
//  },
//  module: {
//      loaders: [{
//          test: /\.jsx?$/,
//          loaders: ['babel-loader?presets[]=es2015,presets[]=react']
//      }]
//  }
//};
    

const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成build文件夹及文件：
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
		devtool: 'eval-source-map',
    entry: {
        app: [path.resolve(SRC_PATH, 'index.js')]
    },
    output: {
        path: BUILD_PATH,
        filename: 'js/[name].[hash:5].js',
        publicPath: '/'
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css", ".scss"]
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel-loader?presets[]=es2015,presets[]=react']
        },
        {
	        test: /\.css$/,
	        loaders: ['style-loader','css-loader', 'autoprefixer-loader']
	     },
		{
	        test: /\.js$/,
	        loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0',
	        exclude: /node_modules/
	    },
	    {
	        test: /\.json/,
	        loader: 'json-loader'
	    },
	    {
			test: /\.(eot|woff|svg|ttf|woff2|gif)(\?|$)/,
			loader: 'file-loader?name=[hash].[ext]'
		},
	    {
			test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'file-loader?name=./fonts/[name].[ext]'
		},
		{
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader?limit=8192&name=./images/[hash].[ext]'
		}]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            title: 'react-music',
            favicon: './src/static/img/favicon.ico',
            template: './index.html',
            filename: 'index.html',
            inject: 'body'
        }),
//      new ExtractTextPlugin("css/main.css"),
        new OpenBrowserPlugin({url: 'http://localhost:8888'})
    ]
};



