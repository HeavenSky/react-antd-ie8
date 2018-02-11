const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJSPlugin = webpack.optimize.UglifyJsPlugin;
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const lessLoader = new ExtractTextPlugin(
	"css/[name].[contenthash:5].css",
	{ allChunks: true }
);
const commonConfig = require("./webpack.common.config.js");
const publicConfig = {
	devtool: "cheap-module-source-map",
	module: {
		loaders: [
			{
				test: /_+\.css$/i,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&localIdentName=[hash:base64:8]", "postcss-loader"),
			},
			{
				test: /[^_]+\.css$/i,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader", "postcss-loader"),
			},
			{
				test: /\.less$/i,
				loader: lessLoader.extract(["css", "postcss", "less"]),
				// 这里不需要 style-loader, 加了反而报错
				// less在生产环境的编译配置很特殊 https://github.com/webpack-contrib/extract-text-webpack-plugin/blob/webpack-1/README.md
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": { "NODE_ENV": JSON.stringify("production") },
		}),
		new CleanWebpackPlugin(["dist"]),
		new UglifyJSPlugin({
			mangle: { screw_ie8: false },
			mangleProperties: { screw_ie8: false },
			compress: { screw_ie8: false },
			output: { screw_ie8: false },
		}),
		new ExtractTextPlugin(
			"css/[name].[contenthash:5].css",
			{ allChunks: true }
		),
		lessLoader,
	],
};

module.exports = merge(commonConfig, publicConfig);