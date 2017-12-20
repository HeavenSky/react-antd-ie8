const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.config.js');
const devConfig = {
	devtool: 'cheap-module-eval-source-map',
	output: {
		/*这里本来应该是[chunkhash]的，但是由于[chunkhash]和webpack-dev-server --hot不兼容。只能妥协*/
		filename: 'js/[name].[hash:5].js',
	},
	module: {
		loaders: [{
			test: /\.css$/i,
			loaders: ['style-loader', 'css-loader', 'postcss-loader'],
		}, {
			test: /\.less$/i,
			loaders: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
		}],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': JSON.stringify('development') },
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		historyApiFallback: true,
		inline: false, // ie9以下不支持会报错
		colors: true,
		open: false,
		publicPath: '/',
		host: 'localhost',
		port: 8888,
		proxy: {
			'/action': {
				target: 'http://www.thebuddy.cn',
				secure: false,
				changeOrigin: true,
			},
			'/askme': {
				target: 'http://www.aaskme.cn',
				secure: false,
				changeOrigin: true,
				pathRewrite: { '^/askme': '/consultant' },
			},
		},
	},
};

module.exports = merge(commonConfig, devConfig);