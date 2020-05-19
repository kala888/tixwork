module.exports = {
  "extends": ["taro/react"],
  "rules": {
    "no-unused-vars": ["error", { "varsIgnorePattern": "Taro" }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }],
    "react/sort-comp": [0],
    "react/react-in-jsx-scope": [0],
    "react/jsx-uses-react": 2
  },
    "parser": "babel-eslint"
  }
