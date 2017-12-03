const merge = require('webpack-merge');
const path = require('path');

const commonConfig = require('./webpack.common.config.js');

const devConfig = {
	devtool: 'cheap-module-eval-source-map',
	output: {
		/*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
		filename: '[name].[hash].js'
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loaders: ['style-loader', 'css-loader', 'postcss-loader']
		}, {
			test: /\.less$/,
			loaders: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
		}]
	},
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		historyApiFallback: true,
		inline: false, // ie8 不支持 会报错'不支持indexOf'
		colors: true,
		open: true,
		publicPath: '/',
		host: 'localhost',
		port: 8888,
		proxy: {
			'/action': {
				target: 'http://www.thebuddy.cn',
				secure: false,
				changeOrigin: true
			},
			'/askme': {
				target: 'http://www.aaskme.cn',
				secure: false,
				changeOrigin: true,
				pathRewrite: { '^/askme': '/consultant' }
			}
		}
	}
};

module.exports = merge(commonConfig, devConfig);