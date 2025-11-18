import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'indent': ['error', 2],
      'linebreak-style': 0,
      'comma-dangle': ['error', 'never'],
      'no-trailing-spaces': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'eqeqeq': 'error',
      'func-style': ['error', 'expression'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-confusing-arrow': ['error', { 'allowParens': true }],
      'no-array-constructor': 'error',
      'no-new-object': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 0,
      'react/display-name': 0,
      'react/react-in-jsx-scope': 0
    }
  }
]
