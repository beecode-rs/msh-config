import eslintJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import noLoops from 'eslint-plugin-no-loops'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import noOnlyTests from 'eslint-plugin-no-only-tests'
import eslintPluginImport from 'eslint-plugin-import'
import globals from 'globals'

const namingConvention = () => {
	// prettier-ignore
	return [
		{ selector: ['default'],                 format: null,           modifiers: ['public'],    leadingUnderscore: 'allow' },
		{ selector: ['default'],                 format: ['camelCase'],  modifiers: ['protected'], leadingUnderscore: 'require' },
		{ selector: ['default'],                 format: ['camelCase'],  modifiers: ['private'],   prefix: ['__'] },
		{ selector: ['accessor'],                format: ['camelCase'],  modifiers: ['public'],    leadingUnderscore: 'forbid' },
		{ selector: ['accessor'],                format: ['camelCase'],  modifiers: ['protected'], leadingUnderscore: 'require' },
		{ selector: ['accessor'],                format: ['camelCase'],  modifiers: ['private'],   prefix: ['__'] },
		{ selector: ['enum'],                    format: ['PascalCase'] },
		{ selector: ['enumMember'],              format: ['UPPER_CASE'] },
		{ selector: ['classMethod', 'accessor'], format: ['PascalCase'], modifiers: ['public', 'static'] },
		{ selector: ['classProperty'],           format: ['UPPER_CASE'], modifiers: ['public', 'static'] },
	]
}

export default defineConfig([
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{ files: ['**/*.{js,mjs,cjs,ts}'], languageOptions: { globals: globals.browser } },
	{ files: ['**/*.{js,mjs,cjs,ts}'], plugins: { eslintJs }, extends: ['eslintJs/recommended'] },
	tseslint.configs.recommendedTypeChecked,
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	{
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			'no-loops': noLoops,
			'no-only-tests': noOnlyTests,
			'sort-keys-fix': sortKeysFix,
			import: eslintPluginImport,
		},
		files: ['**/*.ts'],
		rules: {
			// DISABLE STRICT
			'@typescript-eslint/consistent-type-definitions': 'off',
			'@typescript-eslint/no-redundant-type-constituents': 'warn',

			'@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],

			'@typescript-eslint/dot-notation': 'off',

			'@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],

			'@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],

			'@typescript-eslint/naming-convention': ['error', ...namingConvention()],

			// TYPESCRIPT
			'@typescript-eslint/ban-ts-comment': ['warn', { 'ts-expect-error': 'allow-with-description' }],
			'@typescript-eslint/no-empty-interface': 'off',

			'@typescript-eslint/no-floating-promises': ['error'],

			'@typescript-eslint/no-non-null-assertion': 'off',

			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],

			'@typescript-eslint/no-unsafe-assignment': 'warn',
			'@typescript-eslint/no-unsafe-call': 'warn',
			'@typescript-eslint/no-unsafe-member-access': 'warn',
			'@typescript-eslint/no-unsafe-return': 'warn',
			'@typescript-eslint/no-unsafe-argument': 'warn',
			'@typescript-eslint/no-unsafe-enum-comparison': 'warn',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/unbound-method': 'warn',
			curly: 'error',

			// IMPORT
			'import/namespace': [
				'error',
				{
					allowComputed: true,
				},
			],

			'import/newline-after-import': 'error',

			'import/no-unresolved': 'off',

			'import/order': [
				'error',
				{
					alphabetize: {
						caseInsensitive: false,
						order: 'asc',
					},
					groups: [['index', 'sibling', 'parent', 'internal', 'external', 'builtin', 'object']],
					'newlines-between': 'always',
				},
			],

			// PRETTIER
			'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

			'no-confusing-arrow': 'error',

			'no-console': 'error',

			'no-constant-condition': 'error',

			'no-duplicate-imports': 'error',

			// NO_LOOPS
			'no-loops/no-loops': 'error',

			'no-mixed-spaces-and-tabs': 'error',

			//NO_ONLY_TESTS
			'no-only-tests/no-only-tests': 'error',

			'no-ternary': 'error',

			'padding-line-between-statements': [
				'error',
				{ blankLine: 'always', next: 'return', prev: '*' },
				{ blankLine: 'always', next: ['cjs-export', 'export'], prev: '*' },
			],

			// ESLINT
			// 'no-restricted-imports': [
			// 	'error',
			// 	{
			// 		patterns: [
			// 			{
			// 				group: ['**/index'],
			// 				message: 'Please use `.../something` instead of ``.../something/index`',
			// 			},
			// 		],
			// 	},
			// ],
			'prefer-arrow-callback': 'error',

			'prefer-template': 'error',

			'sort-imports': [
				'error',
				{
					ignoreDeclarationSort: true,
				},
			],
			// SORT_KEYS_FIX
			'sort-keys-fix/sort-keys-fix': ['error', 'asc', { caseSensitive: false, natural: true }],
		},
		settings: {
			'import/resolver': {
				node: {
					paths: ['./'],
				},
			},
		},
	},
])
