const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	entry: './public/index.ts',
	module: {
		rules: [
			{
				test: /\.ts(x)?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		// clean dist folder before every build
		new CleanWebpackPlugin(),
		// Uncomment this line to analyse your bundle
		// new BundleAnalyzerPlugin(),
	],
	externals: {
		react: 'react',
		'react-dom': 'react-dom',
		'react-router-dom': 'react-router-dom',
		'react-router-guards': 'react-router-guards',
		'@acpaas-ui/react-components': '@acpaas-ui/react-components',
		rxjs: 'rxjs',
		'rxjs/operators': 'rxjs/operators',
	},
	output: {
		filename: 'redactie-core.umd.js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'umd',
	},
};
