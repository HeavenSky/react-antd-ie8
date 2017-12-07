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
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
		}, {
			test: /\.less$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'less-loader'),
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist/*.*']),
		new UglifyJSPlugin({
			mangle: { screw_ie8: false },
			mangleProperties: { screw_ie8: false, },
			compress: { screw_ie8: false, },
			output: { screw_ie8: false },
		}),
		new ExtractTextPlugin('[name].[contenthash:5].css'),
	]
};

module.exports = merge(commonConfig, publicConfig);