const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HappyPack = require("happypack");
const Es3ifyPlugin = require("es3ify-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const currentConfig = require(isProd ? "./webpack.cfg" : "./webpack.cfg.dev");
const commonConfig = {
	entry: {
		shim: [
			"es5-shim", // 支持 IE8 所必须,且顺序在babel-polyfill前
			"es5-shim/es5-sham",
			"console-polyfill",
			"babel-polyfill",
			"media-match", // 支持 antd 所必须
		],
		public: [
			path.join(__dirname, "src/utils/public.js"),
		],
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "js/[name].[chunkhash:5].js",
		// 用import()按需加载 https://doc.webpack-china.org/api/module-methods/#import-
		chunkFilename: "js/[name].[chunkhash:5].js",
		publicPath: "./",
	},
	module: {
		postLoaders: [{
			test: /\.jsx?$/i,
			loader: "happypack/loader?cacheDirectory=true&id=pre",
		}],
		loaders: [
			{
				test: /\.jsx?$/i,
				loader: "happypack/loader?cacheDirectory=true&id=jsx",
				include: path.join(__dirname, "src"),
				exclude: path.join(__dirname, "src/static"),
			},
			{
				test: /\.(jpe?g|png|gif|bmp|ico)(\?.*)?$/i,
				loader: "url-loader?limit=6144&name=img/[name].[hash:5].[ext]",
			},
			{
				test: /\.(woff2?|svg|ttf|otf|eot)(\?.*)?$/i,
				loader: "url-loader?limit=6144&name=font/[name].[hash:5].[ext]",
			},
		],
	},
	plugins: [
		new HappyPack({
			id: "pre",
			threads: 4,
			loaders: [{
				loader: "export-from-ie8/loader",
				options: {
					cacheDirectory: true,
				},
			}],
		}),
		new HappyPack({
			id: "jsx",
			threads: 4,
			loaders: [{
				loader: "babel-loader",
				options: {
					cacheDirectory: true,
				},
			}],
		}),
		new CopyWebpackPlugin([
			{
				from: "src/static",
				to: "static",
			},
			{
				context: "node_modules/jquery/dist",
				from: "jquery.min.js",
				to: "static/js",
			},
			{
				context: "node_modules/jquery-ui-dist",
				from: "jquery-ui.min.js",
				to: "static/js",
			},
		]),
		new webpack.optimize.CommonsChunkPlugin({
			name: "runtime",
			minChunks: Infinity,
		}),
		/*new webpack.ContextReplacementPlugin(
			/moment[\\/]locale$/i,
			/^\.\/zh-cn$/i,
		),*/
		new webpack.IgnorePlugin(/^\.\/locale$/i, /moment$/i),
		new Es3ifyPlugin(),
	],
	resolve: {
		alias: {
			/*api: path.join(__dirname, "src/api"),
			components: path.join(__dirname, "src/components"),
			containers: path.join(__dirname, "src/containers"),
			constants: path.join(__dirname, "src/constants"),
			reducers: path.join(__dirname, "src/reducers"),
			actions: path.join(__dirname, "src/actions"),
			routes: path.join(__dirname, "src/routes"),
			styles: path.join(__dirname, "src/styles"),
			views: path.join(__dirname, "src/views"),
			utils: path.join(__dirname, "src/utils"),
			"@": path.join(__dirname, "src"),*/
		},
		extensions: ["", ".js", ".jsx", ".json"],
	},
	performance: {
		hints: false,
	},
};
const addPagePlugin = name => {
	const app = name ? name + "/index" : "index";
	commonConfig.entry[app] = [
		path.join(__dirname, "src/views/" + app + ".js"),
	];
	commonConfig.plugins.push(
		new HtmlWebpackPlugin({
			filename: app + ".html",
			template: path.join(__dirname, "src/index.html"),
			title: app + " Home Page",
			chunks: ["runtime", "shim", "public", app],
			chunksSortMode: "manual",
			inject: true,
			xhtml: true,
			hash: true,
		})
	);
};
const pageList = [""]; // 多页面打包
pageList.forEach(v => addPagePlugin(v));
commonConfig.output.publicPath = pageList.length > 1 ? "/" : "./";

module.exports = merge(commonConfig, currentConfig);