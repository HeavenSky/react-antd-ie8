const isProd = process.env.NODE_ENV === "production";
const plugins = {
	autoprefixer: {},
	// "postcss-cssnext": {},
};
if (isProd) {
	plugins.cssnano = {};
}
module.exports = { plugins };