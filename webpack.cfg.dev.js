const path = require("path");
const dir = path.join.bind(path, __dirname);

const webpack = require("webpack");
const HappyPack = require("happypack");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const devConfig = {
	devtool: "cheap-eval-source-map",
	// devtool: "cheap-module-eval-source-map",
	output: {
		/*这里本来应该是[chunkhash]的，但是由于[chunkhash]和webpack-dev-server --hot不兼容。只能妥协*/
		filename: "js/[name].[hash:5].js",
	},
	module: {
		loaders: [
			{
				test: /_\.css$/i,
				loader: "happypack/loader?cacheDirectory=true&id=cssm",
			},
			{
				test: /[^_]\.css$/i,
				loader: "happypack/loader?cacheDirectory=true&id=css",
			},
			{
				test: /\.less$/i,
				loader: "happypack/loader?cacheDirectory=true&id=less",
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": { "NODE_ENV": JSON.stringify("development") },
		}),
		new HappyPack({
			id: "cssm",
			threads: 4,
			loaders: [
				"style-loader",
				"css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]",
			],
		}),
		new HappyPack({
			id: "css",
			threads: 4,
			loaders: ["style-loader", "css-loader", "postcss-loader"],
		}),
		new HappyPack({
			id: "less",
			threads: 4,
			loaders: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
		}),
		new FriendlyErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
		// new webpack.NoEmitOnErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		contentBase: dir("dist"),
		historyApiFallback: true,
		compress: true,
		hotOnly: true,
		inline: false, // ie11以下不支持inline
		noInfo: true,
		https: false,
		quiet: false,
		open: false,
		hot: true,
		clientLogLevel: "error",
		publicPath: "/",
		host: "0.0.0.0",
		port: 8888,
		proxy: {
			"/proxy/abc": {
				target: "http://abc.com",
				secure: false,
				changeOrigin: true,
			},
			"/proxy/xyz": {
				target: "https://xyz.com",
				secure: true,
				changeOrigin: true,
				pathRewrite: { "^/proxy/xyz": "/abc" },
			},
		},
	},
};

module.exports = devConfig;