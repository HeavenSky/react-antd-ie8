const os = require("os");
const path = require("path");
const webpack = require("webpack");
const HappyPack = require("happypack");
const Es3ifyPlugin = require("es3ify-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const size = os.cpus().length;
const HappyPackPool = HappyPack.ThreadPool({ size });
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
		chunkFilename: "js/[name].[chunkhash:5].js",
		publicPath: "./",
	},
	module: {
		postLoaders: [{
			test: /\.jsx?$/i,
			loaders: ["happypack/loader?id=pre"],
		}],
		loaders: [
			{
				test: /\.jsx?$/i,
				loaders: ["happypack/loader?id=jsx"],
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
			threadPool: HappyPackPool,
			loaders: [{
				loader: "export-from-ie8/loader",
				options: {
					cacheDirectory: true,
				},
			}],
		}),
		new HappyPack({
			id: "jsx",
			threadPool: HappyPackPool,
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
		]),
		/*new webpack.ContextReplacementPlugin(
			/moment[\\/]locale$/i,
			/^\.\/zh-cn$/i,
		),*/
		new webpack.IgnorePlugin(/^\.\/locale$/i, /moment$/i),
		new Es3ifyPlugin(),
	],
	resolve: {
		alias: {
			/*actions: path.join(__dirname, "src/actions"),
			components: path.join(__dirname, "src/components"),
			containers: path.join(__dirname, "src/containers"),
			constants: path.join(__dirname, "src/constants"),
			reducers: path.join(__dirname, "src/reducers"),
			utils: path.join(__dirname, "src/utils"),*/
		},
		extensions: ["", ".js", ".jsx", ".json"],
		modules: [path.join(__dirname, "node_modules")],
	},
};
const addPagePlugin = name => {
	const app = name ? name + "/index" : "index";
	commonConfig.entry[app] = [
		path.join(__dirname, "src/views/" + app + ".js"),
	];
	const chunksList = ["shim", "public", app];
	commonConfig.plugins.push(
		new HtmlWebpackPlugin({
			filename: app + ".html",
			template: path.join(__dirname, "src/index.html"),
			chunks: chunksList,
			chunksSortMode: (a, b) => {
				const x = chunksList.indexOf(a.names[0]);
				const y = chunksList.indexOf(b.names[0]);
				return x - y;
			},
			inject: true,
			xhtml: true,
			hash: true,
		})
	);
};
const pageList = [""]; // 多页面打包
pageList.forEach(v => addPagePlugin(v));
commonConfig.output.publicPath = pageList.length > 1 ? "/" : "./";

module.exports = commonConfig;