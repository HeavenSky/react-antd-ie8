const path = require('path');
const webpack = require('webpack');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

commonConfig = {
	entry: {
		app: [
			'es5-shim',
			'es5-shim/es5-sham',
			'babel-polyfill',
			path.join(__dirname, 'src/index.js'),
		],
	},
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'js/[name].[chunkhash:5].js',
		chunkFilename: 'js/[name].[chunkhash:5].js',
		publicPath: './',
	},
	module: {
		postLoaders: [{
			test: /\.js$/,
			loaders: ['export-from-ie8/loader'],
		}],
		loaders: [{
			test: /\.js$/,
			loaders: ['babel-loader?cacheDirectory=true'],
			include: path.join(__dirname, 'src'),
		}, {
			test: /\.(bmp|gif|ico|jpg|png)$/,
			loader: 'url-loader?limit=3072&name=img/[name].[hash:5].[ext]',
		}],
	},
	plugins: [
		new CopyWebpackPlugin([{
			from: path.join(__dirname, 'src/static'),
			to: 'static',
		}]),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, 'src/index.html'),
		}),
		new es3ifyPlugin(),
	],
	resolve: {
		alias: {
			actions: path.join(__dirname, 'src/actions'),
			reducers: path.join(__dirname, 'src/reducers'),
			components: path.join(__dirname, 'src/components'),
			containers: path.join(__dirname, 'src/containers'),
			constants: path.join(__dirname, 'src/constants'),
			utils: path.join(__dirname, 'src/utils'),
		},
	},
};

module.exports = commonConfig;