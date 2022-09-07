import _ from 'lodash';
import { transToDate } from '@/utils';

export const getDayListOfMonth = (year, month) => {
  const daysOfMonth = new Date(year, month, 0).getDate();
  return _.range(1, daysOfMonth + 1);
};

//根据时间2022-11-02 02:32  得到 {year: 2022, month: 11, day: 2, hour: 2, minute: 32}
export const getArrWithTime: (str: string) => {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
} = (str) => {
  let arr1 = str.split(' ');
  let arr2 = arr1[0].split('-');
  let arr3 = arr1[1].split(':');
  let arr = arr2.concat(arr3);
  return {
    year: _.toNumber(arr[0]),
    month: _.toNumber(arr[1]),
    day: _.toNumber(arr[2]),
    hour: _.toNumber(arr[3]),
    minute: _.toNumber(arr[4]),
  };
};

// 获取最近的年、月、日、时、分的集合
export const getPickerViewList = _.memoize((date) => {
  const theDate = transToDate(date);
  const year = theDate.getFullYear();
  const month = theDate.getMonth() + 1;
  return {
    yearList: _.range(1922, 2031),
    monthList: _.range(1, 13),
    dayList: getDayListOfMonth(year, month),
    hourList: _.range(1, 24),
    minuteList: _.range(1, 60),
  };
});
