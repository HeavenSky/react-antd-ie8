const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const es3ifyPlugin = require('es3ify-webpack-plugin');

commonConfig = {
	entry: {
		app: [
			'es5-shim', 'es5-shim/es5-sham',
			'babel-polyfill',
			path.join(__dirname, 'src/index.js')
		]
	},
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		publicPath: './'
	},
	module: {
		postLoaders: [
			{
				test: /\.js$/,
				loaders: ['export-from-ie8/loader']
			}
		],
		loaders: [{
			test: /\.js$/,
			loaders: ['babel-loader?cacheDirectory=true'],
			include: path.join(__dirname, 'src')
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader?limit=8192'
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, 'src/index.html')
		}),/*
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'runtime'
		}),*/
		new es3ifyPlugin()
	],
	resolve: {
		alias: {
			actions: path.join(__dirname, 'src/actions'),
			components: path.join(__dirname, 'src/components'),
			constants: path.join(__dirname, 'src/constants'),
			containers: path.join(__dirname, 'src/containers'),
			reducers: path.join(__dirname, 'src/reducers')
		}
	}
};

module.exports = commonConfig;