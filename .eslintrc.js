module.exports = {
	extends: ['./eslint-config.js'].map(require.resolve),
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: './tsconfig.json',
	},
}
