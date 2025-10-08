import eslintNode from './src/eslint-config.mjs'

export default [
	{
		ignores: ['.base-frame-template', '.idea', '.semaphore', 'coverage', 'node_modules', 'resource', '.*.js', '.*.json'],
	},
	...eslintNode,
]
