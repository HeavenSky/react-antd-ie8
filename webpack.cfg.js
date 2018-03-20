const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const lessLoader = new ExtractTextPlugin(
	"css/[name].[contenthash:5].css",
	{ allChunks: true }
);
const publicConfig = {
	devtool: false,
	// devtool: "source-map",
	module: {
		loaders: [
			{
				test: /_\.css$/i,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&localIdentName=[hash:base64:8]", "postcss-loader"),
			},
			{
				test: /[^_]\.css$/i,
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
		new CleanWebpackPlugin(["dist"]),
		new webpack.DefinePlugin({
			"process.env": { "NODE_ENV": JSON.stringify("production") },
		}),
		// new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		// new webpack.HashedModuleIdsPlugin(),
		new UglifyJSPlugin({
			sourceMap: false,
			uglifyOptions: { ie8: true },
		}),
		new ExtractTextPlugin(
			"css/[name].[contenthash:5].css",
			{ allChunks: true }
		),
		lessLoader,
	],
};

module.exports = publicConfig;