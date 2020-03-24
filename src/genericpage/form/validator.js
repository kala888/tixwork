import Schema from 'async-validator'
import toNumber from 'lodash/toNumber'
import isFunction from 'lodash/isFunction'
import { isEmpty } from '@/nice-router/nice-router-util'

function transformValue(type, value) {
  const validatorType = TYPE_MAPPING[type] || type
  return validatorType === 'integer' || validatorType === 'double' ? toNumber(value) : value
}

function getSpecialValidator(rule, type) {
  console.log('for field type', type, ':', rule, 'with special validator? no...')
  return null
}

//validate OOTB type:
// string, number, boolean, method, regexp, integer, float, array, object
// enum, date, url, hex, email, any
const TYPE_MAPPING = {
  text: 'string',
  longText: 'string',
  money: 'integer',
  switch: 'boolean',
}

function handleErrors(errors = [], fields) {
  console.log('fields', fields)
  return errors.map((err) => err.message)
}

const validator = (field = {}, value) => {
  const { id, rules, type } = field
  if (isEmpty(id) || isEmpty(rules)) {
    return Promise.resolve()
  }

  const ruleList = rules.map((it) => {
    const rule = {
      ...it,
    }
    if (it.type) {
      rule.type = TYPE_MAPPING[it.type] || it.type
    }
    const specialValidator = getSpecialValidator(it, type)
    if (isFunction(specialValidator)) {
      rule.validator = specialValidator
    }
    return rule
  })

  // processedRules.push({
  //   type: validatorType, // 通过增加rule方式做类型检测
  // })
  const schema = new Schema({ [id]: ruleList })
  const fieldValue = transformValue(type, value)
  const source = { [id]: fieldValue }
  return schema
    .validate(source)
    .then((res) => {
      console.log('validate result', res)
      return []
    })
    .catch(({ errors, fields }) => {
      return handleErrors(errors, fields)
    })
}

export default validator
