const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// less 生产环境的编译配置比较独特, 具体见 https://github.com/webpack-contrib/extract-text-webpack-plugin/blob/webpack-1/README.md
const lessLoader = new ExtractTextPlugin(
	'css/[name].[contenthash:5].css',
	{ allChunks: true },
);
const commonConfig = require('./webpack.common.config.js');
const publicConfig = {
	devtool: 'cheap-module-source-map',
	module: {
		loaders: [{
			test: /\.css$/i,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader'),
		}, {
			test: /\.less$/i,
			loader: lessLoader.extract(['css', 'postcss', 'less']),
		}],
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new UglifyJSPlugin({
			mangle: { screw_ie8: false },
			mangleProperties: { screw_ie8: false },
			compress: { screw_ie8: false },
			output: { screw_ie8: false },
		}),
		new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': JSON.stringify('production') },
		}),
		new ExtractTextPlugin(
			'css/[name].[contenthash:5].css',
			{ allChunks: true },
		),
		lessLoader,
	],
};

module.exports = merge(commonConfig, publicConfig);