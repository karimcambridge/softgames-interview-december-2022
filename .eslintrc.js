module.exports = {
	root: true,
	env: {
		'node': true,
		'es2020': true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		'ecmaVersion': 2020,
		'sourceType': 'module',
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	ignorePatterns: ['webpack.config.js'],
	rules: {
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'no-async-promise-executor': 'off',
		'semi': [
			'error',
			'always',
		],
		'quotes': [
			'error',
			'single',
		],
		'keyword-spacing': [
			'error',
			{
				'overrides': {
					'for': {
						'after': false,
					},
					'if': {
						'after': false
					},
					'while': {
						'after': false,
					},
					'catch': {
						'after': false,
					},
					'switch': {
						'after': false,
					}
				}
			}
		],
		'block-spacing': 0,
		'block-scoped-var': 2,
		'class-methods-use-this': 1,
		'no-empty-function': 2,
		'no-lone-blocks': 2,
		'no-self-compare': 2,
		'no-unused-expressions': 2,
		'no-undef': 0,
		//'no-unused-vars': 1,
		'prefer-spread': 2,
		'prefer-object-spread': 2,
		'prefer-rest-params': 2,
		'prefer-const': [
			'error',
			{
				'destructuring': 'any',
				'ignoreReadBeforeAssign': false,
			}
		],
		'func-style': [
			'error',
			'expression',
			{
				'allowArrowFunctions': true,
			}
		],
		'prefer-arrow-callback': 2,
		'arrow-spacing': [
			'error',
			{
				'before': true,
				'after': true,
			}
		],
		'arrow-parens': [
			'error',
			'as-needed',
		],
		'implicit-arrow-linebreak': [
			'error',
			'beside',
		],
	}
};