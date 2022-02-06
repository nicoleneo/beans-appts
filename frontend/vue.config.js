module.exports = {
	publicPath: process.env.NODE_ENV === 'development' ? '/' : '/frontend/',
	filenameHashing: true,
	configureWebpack: {
		output: { filename: "[name].[hash].bundle.js" },
		devServer: {
			headers: { 'Access-Control-Allow-Origin': '*' },
		  },
	},
	transpileDependencies: ["vuetify"],
};
