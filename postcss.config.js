module.exports = {
	plugins: {
		'postcss-cssnext': {
			broswers: [
				'> 1%',
				'ie >= 8',
				'last 2 versions',
			],
		},
	},
};