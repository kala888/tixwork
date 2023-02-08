const fabric = require('@umijs/fabric');

// airbnb 规则{singleQuote:true，jsxSingleQuote:false}
// singleQuote:true => Idea中 Editor->Code Style->TypeScript->Punctuation: use single quotes always. 保证IDEA中其他字段用单引号
// jsxSingleQuote:false =>Idea中 Editor->Code Style->HTML->Other: Generated quote marks: double. 保证IDEA中JSX 属性双引号

module.exports = {
  ...fabric.prettier,
};
