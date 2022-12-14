const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
	return ({
		stats: 'minimal',
		entry: './src/index.ts',

		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.js',
		},

		// Config for your testing server
		devServer: {
			host: '0.0.0.0',
			port: 7474,
			compress: true,
			static: false,
			client: {
				logging: 'warn',
				overlay: {
					errors: true,
					warnings: true,
				},
				progress: true,
			},
		},

		// Web games are bigger than pages, disable the warnings that our game is too big.
		performance: { hints: false },

		experiments: {
			topLevelAwait: true
		},

		// Enable sourcemaps while debugging
		devtool: argv.mode === 'development' ? 'eval-source-map' : undefined,

		// Minify the code when making a final build
		optimization: {
			minimize: argv.mode === 'production',
			minimizer: [new TerserPlugin({
				terserOptions: {
					ecma: 6,
					compress: { drop_console: true },
					output: { comments: false, beautify: false },
				},
			})],
		},
		module: {
			rules: [
				{
					test: /\.ts(x)?$/,
					loader: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: [
				'.tsx',
				'.ts',
				'.js',
			],
		},
		plugins: [
			new CopyPlugin({
				patterns: [{
					from: 'static/',
					noErrorOnMissing: true,
				}],
			}),

			// Make an index.html from the template
			new HtmlWebpackPlugin({
				template: 'src/index.ejs',
				hash: true,
				minify: false,
			})
		],
	});
}