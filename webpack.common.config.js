const path = require('path');
const webpack = require('webpack');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

commonConfig = {
	entry: {
		app: [
			'es5-shim', 'es5-shim/es5-sham',
			'babel-polyfill',
			path.join(__dirname, 'src/index.js'),
		]
	},
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
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
			loader: 'url-loader?limit=3072',
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, 'src/index.html'),
		}),/*
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
		new webpack.optimize.CommonsChunkPlugin({ name: 'runtime' }),*/
		new es3ifyPlugin(),
	],
	resolve: {
		alias: {
			actions: path.join(__dirname, 'src/actions'),
			reducers: path.join(__dirname, 'src/reducers'),
			components: path.join(__dirname, 'src/components'),
			containers: path.join(__dirname, 'src/containers'),
			constants: path.join(__dirname, 'src/constants'),
			plugins: path.join(__dirname, 'src/plugins'),
			styles: path.join(__dirname, 'src/styles'),
			utils: path.join(__dirname, 'src/utils'),
			mock: path.join(__dirname, 'src/mock'),
			img: path.join(__dirname, 'src/img'),
		}
	}
};

module.exports = commonConfig;