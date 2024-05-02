module.exports = {
	extends: [
		"standard",
		"plugin:promise/recommended",
		"plugin:react-hooks/recommended",
		"eslint:recommended",
		"prettier",
		"plugin:react/recommended"
	],
	parserOptions: {
		parser: "@babel/eslint-parser",
		ecmaFeatures: {
			jsx: true,
			modules: true
		},
		ecmaVersion: "latest",
		sourceType: "module"
	},
	settings: {
		createClass: "createReactClass",
		fragment: "Fragment",
		pragma: "React",
		react: {
			version: "detect"
		}
	},
	env: {
		browser: true,
		node: true,
		es6: true
	},
	plugins: ["react", "promise", "react-func", "only-ascii", "prettier"],
	ignorePatterns: ["**/schema.*"],
	rules: {
		"no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
		semi: ["error", "always"],
		quotes: ["error", "double"],
		"linebreak-style": ["off"],
		"no-useless-escape": ["warn"],
		"no-console": ["off"],
		"space-before-function-paren": [
			"error",
			{
				anonymous: "always",
				named: "always",
				asyncArrow: "always"
			}
		],
		"object-curly-spacing": [2, "always"],
		"require-atomic-updates": "off",
		"prefer-const": "error",
		"dot-notation": "error",
		"no-var": "error",
		"no-unused-vars": "error",
		"no-undef": "off",
		"no-tabs": "off",
		"react-func/max-lines-per-function": [
			"warn",
			{
				max: 50,
				skipBlankLines: true,
				skipComments: true,
				IIFEs: true
			}
		],
		"max-lines": [
			"warn",
			{
				max: 500,
				skipBlankLines: true,
				skipComments: true
			}
		],

		"max-len": [
			"warn",
			{
				code: 200,
				comments: 200,
				tabWidth: 4,
				ignoreUrls: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreRegExpLiterals: true,
				ignoreTrailingComments: true
			}
		],

		"max-statements": ["warn", { max: 25 }, { ignoreTopLevelFunctions: true }],
		"max-depth": ["warn", { max: 5 }],
		"max-params": ["warn", { max: 5 }],
		complexity: ["warn", { max: 20 }],
		curly: ["error", "all"],
		"no-unneeded-ternary": "warn",
		"new-cap": "off",
		eqeqeq: "off",
		camelcase: "off",
		"no-return-await": "off",
		"no-use-before-define": "off",
		"promise/param-names": "off",
		"promise/no-return-wrap": "off",
		"no-unused-expressions": "off",
		"spaced-comment": "error",
		"no-multi-spaces": "error",
		"eol-last": "error",
		"comma-spacing": "error",
		"space-before-blocks": "error",
		"key-spacing": "error",
		"keyword-spacing": "error",
		"space-in-parens": "error",
		"space-infix-ops": "error",
		"no-trailing-spaces": "error",
		"brace-style": [
			2,
			"1tbs",
			{
				allowSingleLine: false
			}
		],
		"arrow-spacing": "error",
		"block-spacing": "error",
		"semi-spacing": "error",
		"padded-blocks": "error",
		"rest-spread-spacing": "error",
		"template-curly-spacing": "error",
		"no-sequences": "error",
		"import/no-duplicates": "error",
		"no-multiple-empty-lines": "error",
		"operator-linebreak": "error",
		"jsx-quotes": "off",
		"react/jsx-indent-props": "off",
		"react/display-name": "off",
		"react/jsx-no-bind": "off",
		"react/prop-types": "off",
		"react/jsx-boolean-value": "off",
		"react/no-did-update-set-state": "off",
		"react/jsx-no-duplicate-props": "off",
		"handle-callback-err": "off",
		"no-undef-init": "off",
		"no-throw-literal": "off",
		"no-array-constructor": "off",
		"no-useless-return": "off",
		"no-useless-constructor": "off",
		"import/first": "off",
		"standard/computed-property-even-spacing": "off",
		"require-await": "warn",
		"no-irregular-whitespace": "error",
		"template-tag-spacing": "error",
		"prefer-template": "error",
		"only-ascii/only-ascii": 2,
		"id-length": "off"
	}
};
