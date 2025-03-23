import eslintNode from './src/eslint-config.mjs'

export default [
	{
		ignores: ['.base-frame-tmp', '.idea', '.semaphore', 'coverage', 'node_modules', 'resource', '.*.js', '.*.json'],
	},
	...eslintNode,
]
