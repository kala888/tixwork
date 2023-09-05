module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/eslint')],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-debugger': 'warn',
  },
};
