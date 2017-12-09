const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = require('./webpack.common.config.js');
const publicConfig = {
	devtool: 'cheap-module-source-map',
	module: {
		loaders: [{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader'),
		}, {
			test: /\.less$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader', 'less-loader'),
		}],
	},
	plugins: [
		new CleanWebpackPlugin([
			'dist/*.*',
			'dist/css',
			'dist/img',
			'dist/js',
		]),
		new UglifyJSPlugin({
			mangle: { screw_ie8: false },
			mangleProperties: { screw_ie8: false, },
			compress: { screw_ie8: false, },
			output: { screw_ie8: false },
		}),
		new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': JSON.stringify('production') },
		}),
		new ExtractTextPlugin({
			filename: 'css/[name].[contenthash:5].css',
			allChunks: true,
		}),
	],
};

module.exports = merge(commonConfig, publicConfig);