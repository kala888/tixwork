import type { ProFormFieldProps } from '@ant-design/pro-components';
import { theme } from 'antd';
import _ from 'lodash';
const { defaultAlgorithm, defaultSeed } = theme;
const mapToken = defaultAlgorithm(defaultSeed);
export type EleSizeType = ProFormFieldProps['width'];

const Size: Record<any, any> = {
  xs: 104, // 适用于短数字、短文本或选项。
  sm: 216, // 适用于较短字段录入、如姓名、电话、ID 等。
  md: 328, //标准宽度，适用于大部分字段长度。
  lg: 440, //适用于较长字段录入，如长网址、标签组、文件路径等。
  xl: 552, //适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
};

const colorValues = {
  primaryColor: mapToken.colorPrimary,
  red: '#f23030',
  orange: '#F38709',
  golden: '#ab956d',
  green: '#07c160',
  iceBlue: '#53c7ca', //冰蓝
  secondColor: '#5ebfff',
  purple: '#813AFD',

  silverGrey: '#ccc',
  lightGrey: '#ededed',
  textColor: '#333',
  textColorLight: '#56585c',
  textColorLighter: '#999',

  // borderColor: '#999',
  borderColor: '#dee0e3',
  placeholder: '#ccc',
  price: '#f2270c',

  colorList: [],
};

const colorList = [
  colorValues.orange,
  colorValues.iceBlue,
  colorValues.golden,
  colorValues.green,
  colorValues.primaryColor,
  colorValues.purple,
  '#4B7AEE',
];

export const colors = {
  ...colorValues,
  colorList,
};

/**
 *  xs,sm,md,lg, xl 和数字
 *  如果数字大于20，直接返回数字，如果小于50，是倍数，则返回(xs+ 112 * n)
 */
const getSize = (size: EleSizeType = 2): number => {
  if (_.isNumber(size) && size < 50) {
    // 216是默认的form item宽度，32是默认的gap = 216 * n + 32 * n
    // return (_.get(Size, 'sm') + 32) * size;
    return (_.get(Size, 'sm') + 40) * size;
  }
  return _.get(Size, size, size) as number;
};
const proFieldClass = (width, disabled) => {
  return {
    'ant-input-affix-wrapper': true,
    'ant-input-affix-wrapper-disabled': disabled,
    'pro-field': true,
    ['pro-field-' + width]: width,
  };
};

/**
 * 自定义ValueType和ProComponent的时候会用到的
 */
const StyleUtils = {
  getSize,
  proFieldClass,
};
export default StyleUtils;
