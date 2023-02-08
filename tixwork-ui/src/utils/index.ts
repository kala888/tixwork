import { isEmpty, isNotEmpty } from '@/utils/object-utils';
import _ from 'lodash';

export const isDev = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

// @ts-ignore
export function enrichListOfEntity({ dataContainer, targetList = [], root = {} }, ...names) {
  let refsEntityContainer = dataContainer;
  if (!refsEntityContainer) {
    // @ts-ignore
    refsEntityContainer = root.dataContainer;
  }
  if (!refsEntityContainer || (isEmpty(refsEntityContainer) && isNotEmpty(targetList))) {
    console.log('data container is empty, and target is not empty, return itself');
    return targetList;
  }

  const doEnrichment = (list: any) =>
    list.map((ref: any) => {
      const theItem = _.get(refsEntityContainer, ref.id, {});
      return {
        ...ref,
        ...theItem,
      };
    });

  if (names.length === 0) {
    return targetList ? doEnrichment(targetList) : [];
  }
  const tempObj = {};
  _.forEach(names, (it) => {
    const list = root[it] || [];
    if (list.length > 0) {
      tempObj[it] = doEnrichment(list);
    }
  });
  return tempObj;
}

//坑！！ ios只能识别yyyy/MM/dd hh:mm:ss
export function transToDate(value: any): Date | null {
  if (_.isDate(value) || isEmpty(value)) {
    return value;
  }
  let temp = value;
  if (_.isString(value)) {
    temp = value.replace(/-/g, '/');
  }
  const dateValue = new Date(temp);

  console.log(
    'transToDate',
    value,
    '=>',
    dateValue,
    'dateValue instanceof Date?',
    dateValue instanceof Date,
    // 'NaN?', !_.isNaN(dateValue.getTime()),
  );

  const ifDateType = dateValue instanceof Date && !_.isNaN(dateValue.getTime());
  return ifDateType ? dateValue : null;
}

function dateFormat(dateTime: any, fmt: string) {
  let format = fmt;
  const time = transToDate(dateTime);
  if (!_.isDate(time)) {
    return dateTime;
  }
  const values = {
    'M+': time.getMonth() + 1, //月份
    'd+': time.getDate(), //日
    'D+': time.getDate(), //日
    'H+': time.getHours(), //小时
    'h+': time.getHours() % 12, //小时
    'm+': time.getMinutes(), //分
    's+': time.getSeconds(), //秒
    'q+': Math.floor((time.getMonth() + 3) / 3), //季度
    S: time.getMilliseconds(), //毫秒
  };
  if (/([y,Y]+)/.test(format)) {
    format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const key in values) {
    if (new RegExp(`(${key})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? values[key]
          : ('00' + values[key]).substr(('' + values[key]).length),
      );
    }
  }
  return fmt;
}

export function formatTime(time: any, fmt = 'yyyy-MM-dd') {
  if (time) {
    return dateFormat(new Date(time), fmt);
  }
  return '';
}

export function formatMoney(money: any) {
  if (isEmpty(money)) {
    return '';
  }
  if (_.isNumber(money)) {
    return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
  return money;
}

export function isDevEnv() {
  return process.env.NODE_ENV === 'development';
}

export function removeOrPush<T>(list: T[] = [], item: T, withClone = false) {
  if (!_.isArray(list)) {
    console.warn('the list shou be array');
    return [];
  }
  const result: T[] = withClone ? _.clone(list) : list;
  const target = _.remove(result, (it) => it === item);
  if (target.length === 0) {
    result.push(item);
  }
  return result;
}

export type Group<T> = {
  id: number;
  title: string;
  items: T[];
};

export function getGroupList<T>(items: T[]): Group<T>[] {
  const groupList: Group<T>[] = [];
  _.forEach(items, (it: any, idx) => {
    const { group = '' } = it;
    let theGroup: Group<T> | undefined = _.find(groupList, { title: group });
    if (isEmpty(theGroup)) {
      theGroup = {
        id: idx,
        title: group,
        items: [],
      };
      groupList.push(theGroup);
    }
    if (theGroup) {
      theGroup.items.push({ id: idx, ...it });
    }
  });
  return groupList;
}

export function getGroupListByColumn<T>(items: T[] = [], columnNum = 3) {
  const data = items.map((it, idx) => ({ id: idx, ...it }));
  const groupList = _.chunk(data, columnNum);
  return groupList.map((list, idx) => ({ id: idx, list }));
}

export function diffTime(end: number, start = Date.now()) {
  const dateDiff = end - start;
  if (_.isNaN(dateDiff)) {
    return '';
  }

  const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); // 计算出相差天数
  const leave1 = dateDiff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000)); // 计算出小时数
  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000)); // 计算相差分钟数
  // 计算相差秒数
  const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000);

  const result: string[] = [];
  if (dayDiff > 0) {
    result.push(`${dayDiff}天`);
  }
  if (hours > 0) {
    result.push(`${hours}时`);
  }
  if (minutes > 0) {
    result.push(`${minutes}分`);
  }
  if (seconds > 0) {
    result.push(`${seconds}秒`);
  }
  return result.join('');
}

export function getParametersFromUrl(url = '') {
  const query: any = {};
  const startIndex = url.indexOf('?');
  if (startIndex > -1) {
    const str = url.substr(startIndex + 1);
    const pairs = str.split('&');
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split('=');
      // eslint-disable-next-line prefer-destructuring
      query[pair[0]] = pair[1];
    }
  }
  return query; // 返回对象
}

export function guessTitle(obj) {
  if (_.isObject(obj)) {
    // @ts-ignore
    return obj?.displayName || obj?.title || obj?.displayName || obj?.name || obj?.id;
  }
  return obj;
}

export function ensureArray<T>(value: T | T[]): T[] {
  if (isEmpty(value)) {
    return [];
  }
  if (_.isArray(value)) {
    return value;
  }
  return [value];
}
