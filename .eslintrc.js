module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'import',
		'react',
		'react-hooks',
		'prettier',
	],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'plugin:prettier/recommended',
		'prettier/@typescript-eslint',
		'prettier/react',
	],
	env: {
		'browser': true,
		'amd': true,
		'node': true
	},
	rules: {
		'@typescript-eslint/no-var-requires': 0,
		'import/order': 2,
		'import/first': 2,
		'import/exports-last': 2,
		'import/no-duplicates': 2,
		'quotes': [2, 'single'],
		'comma-dangle': ['error', {
			'arrays': 'always-multiline',
			'objects': 'always-multiline',
			'imports': 'always-multiline',
			'exports': 'always-multiline',
			'functions': 'never'
		}],
		'semi': 'off',
		'@typescript-eslint/semi': ['error', 'always', { 'omitLastInOneLineBlock': true}],
		"react/prop-types": "off"
	}
};
