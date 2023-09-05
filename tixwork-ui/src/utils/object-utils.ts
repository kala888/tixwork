import _ from 'lodash';

export const noop = () => {};

// null=> true
// true=> true
// 1 => false
// [1,2]=> false
// {} => true
// {a:'1'} => false
const isEmpty = (value: any) => {
  if (_.isNumber(value) || _.isBoolean(value)) {
    return false;
  }
  if (_.isNil(value)) {
    return true;
  }
  if (_.isString(value)) {
    return value.length === 0;
  }
  return _.isEmpty(value);
};

const isNotEmpty = (value: any) => {
  return !isEmpty(value);
};

const toBoolean = (value: any) => {
  if (isEmpty(value)) {
    return false;
  }
  if (_.isString(value)) {
    const p = value.toLowerCase().trim();
    if (p === 'true') {
      return true;
    }
    if (p === 'false') {
      return false;
    }
  }
  return value;
};

function parseToObject(json: any, defaultValue: any = {}) {
  if (_.isObject(json)) {
    return json;
  }
  if (_.isString(json)) {
    try {
      return JSON.parse(json);
    } catch (e) {
      return defaultValue;
    }
  }
  return defaultValue;
}

function parseToArray(obj: any) {
  if (_.isNil(obj)) {
    return [];
  }
  const result = parseToObject(obj);
  if (!Array.isArray(result)) {
    return [result];
  }
  return result;
}

function parseToString(obj: any) {
  if (_.isObject(obj)) {
    return JSON.stringify(obj);
  }
  return obj;
}

const ObjectUtils = {
  isEmpty,
  isNotEmpty,
  noop,
  toBoolean,
  parseToObject,
  parseToArray,
  parseToString,
};
export default ObjectUtils;
