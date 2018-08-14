module.exports = {
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2017
  },
  env: {
    node: true,
    es6: true,
    jest: true
  },
  rules: {
    'no-console': 'off'
  }
};
