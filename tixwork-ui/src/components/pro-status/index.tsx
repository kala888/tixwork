import { ProField } from '@ant-design/pro-components';
import classNames from 'classnames';
import _ from 'lodash';
import styles from './styles.less';
// @formatter:off
const DefaultLike = [
  '常规',
  '合适',
  '符合',
  '一般',
  '合理',
  '得当',
  '正当',
  '运行',
  '打开',
  'normal',
  'open',
  'enable',
  '0',
  0,
  'start',
];
const SuccessLike = [
  '成功',
  '正确',
  '对',
  '完成',
  '取胜',
  '达成',
  '成交',
  '已解决',
  '已上线',
  'closed',
  'complete',
  'completed',
  'success',
  '正常',
  '合格',
  '开启',
  '启用',
  '开通',
];
const WarningLike = ['警告', '告警', '提醒', '预警', '警报', '公告', '告知', 'warring'];
const ProcessingLike = ['处理中', '运行中', '发布中', 'processing'];
const ErrorLike = [
  '停用',
  '停止',
  '暂停',
  '关闭',
  '封闭',
  '取消',
  '作废',
  '停业',
  '禁止',
  '截止',
  '废止',
  '撤销',
  '中止',
  '注销',
  '停工',
  '失败',
  '未解决',
  '异常',
  '1',
  1,
  'error',
];

// @formatter:on
const mapping = {
  Default: DefaultLike, //灰点
  Warning: WarningLike, //黄点
  Success: SuccessLike, //绿点
  Processing: ProcessingLike, // 蓝色+闪烁
  Error: ErrorLike, //红点
};

const guessStatus = (props) => {
  const label = _.toLower(props.label || '');
  const value = _.toLower(props.value || '');
  const keys = Object.keys(mapping);
  for (let i = 0; i < keys.length; i++) {
    const type = keys[i];
    const likeWords = mapping[type];
    if (likeWords.includes(label) || likeWords.includes(value)) {
      return type;
    }
  }
  if (label.startsWith('待')) {
    return 'Warring';
  }
  if (label.endsWith('中')) {
    return 'Processing';
  }
  if (label.endsWith('异常')) {
    return 'Error';
  }
  return 'Normal';
};
const getSmartValueEnum = (options: any[] = []) => {
  const valueEnum = {};
  options.forEach((it) => {
    const status = guessStatus(it);
    const { label, value } = it;
    valueEnum[value] = {
      text: label,
      status,
    };
  });
  return valueEnum;
};

export default function Index(props) {
  const valueEnum = getSmartValueEnum(props.options);
  const rootCls = classNames(styles.proStatus, 'pro-status');
  return (
    <span className={rootCls}>
      <ProField text={props.value} mode={'read'} valueEnum={valueEnum} />
    </span>
  );
}
