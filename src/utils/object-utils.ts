import _ from 'lodash';

// null=> true
// true=> true
// 1 => false
// [1,2]=> false
// {} => true
// {a:'1'} => false
export const isEmpty = (value: any) => {
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

export const isNotEmpty = (value: any) => {
  return !isEmpty(value);
};

export const toBoolean = (value: any) => {
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

export function parseToObject(json: any) {
  if (_.isObject(json)) {
    return json;
  }
  if (_.isString(json)) {
    try {
      return JSON.parse(json);
    } catch (e) {
      return {};
    }
  }
  console.warn('shouldBeObject is not controlled value', json);
  return json;
}

export function parseToString(obj: any) {
  if (_.isObject(obj)) {
    return JSON.stringify(obj);
  }
  return obj;
}
