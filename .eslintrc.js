module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    allowImportExportEverywhere: false,
    // codeFrame: false,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  extends: [
    'eslint:recommended',
    // 'react',
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
  ],
  plugins: [
    'react',
    // 'import',
  ],
  settings: {
    react: {
      version: '16.0',
      pragma: 'h',  // Pragma to use, default to "React"
    },
    // 'import/extensions': [ '.js', '.jsx', '.scss', '.css', ],
    // 'import/resolver': {
    //   'babel-module': {},
    // },
  },
  env: {
    node: true,
    es6: true,
    // jest: true,
  },
  rules: {
    // 'import/no-amd': ['warn', 'always'],
    // 'import/no-commonjs': ['warn', 'always'],
    // 'import/no-unresolved': 'error',
    'class-methods-use-this': ['warn'],
    'comma-dangle': ['off', 'always'],
    'eol-last': 'off',
    'jsx-quotes': ['warn', 'prefer-double'],
    'no-alert': 'off',
    'no-console': ['warn', {allow: ['warn', 'error']}],
    'no-debugger': 'warn',
    'no-eval': 'error',
    'no-lone-blocks': 'off',
    'no-trailing-spaces': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'warn',
    'no-var': 'warn',
    'quotes': ['warn', 'single'],
    'semi': ['error', 'always'],
    'curly': 'error',
    'no-extend-native': 'error',
    'no-new-wrappers': 'error',
    'no-with': 'error',
    'no-undef': 'error',
    'indent': ['error', 2, {'SwitchCase': 1}],
    'no-array-constructor': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-new-object': 'error',
    'no-useless-escape': 'off',
    'react/jsx-no-bind': 'error',
    'react/jsx-no-duplicate-props': ['warn', {ignoreCase: true}],
    'react/jsx-tag-spacing': ['warn', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'allow-multiline'
    }],
    'react/forbid-prop-types': ['warn', {'forbid': ['any']}],
    'react/jsx-boolean-value': 'warn',
    'react/jsx-closing-bracket-location': ['warn', 'after-props'],
    'react/jsx-curly-spacing': 'warn',
    'react/jsx-handler-names': ['warn', {
      eventHandlerPrefix: 'handle',
      eventHandlerPropPrefix: 'on',
    }],
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-key': 'warn',
    'react/jsx-max-props-per-line': 'off',
    'react/sort-comp': 'warn',
    'react/jsx-indent': ['warn', 2],
    'react/jsx-first-prop-new-line': ['off', 'multiline'],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/react-in-jsx-scope': 'error',
  },
};
