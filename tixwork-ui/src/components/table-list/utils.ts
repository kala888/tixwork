import type { EleValueType } from '@/components/value-type';
import type { ActionLike, ActionList } from '@/utils/nice-router-types';
import type { ProColumns } from '@ant-design/pro-components';
import _ from 'lodash';

export const mergeProps = (inbound, defaultValues) => {
  return _.isBoolean(inbound) ? inbound : { ...defaultValues, ...inbound };
};

const defaultLineActionList = [{ code: 'edit' }, { code: 'remove' }];

/**
 *  1. 如果是false，空，或者最后一个column是key=option，就直接返回空的，
 *  2. 处理数组填充code=edit，code=remove
 */
export const getLineActionListColumn = (params: {
  lineActionList?: ActionList | false;
  columns: ProColumns<any, EleValueType>[];
  onEdit: any;
  onRemove: any;
}): ProColumns<any, EleValueType> => {
  const { lineActionList = defaultLineActionList, columns, onEdit, onRemove } = params;
  // 1. 如果是false，空，或者最后一个column已经包含option，就直接返回
  if (!lineActionList || !Array.isArray(lineActionList) || _.last(columns)?.key === 'option') {
    return {};
  }

  // 2. 添加edit和remove
  const actionList = lineActionList.map((it) => {
    const { code } = it as ActionLike;
    if (code === 'edit') {
      return {
        title: '编辑',
        onClick: onEdit,
        ...it,
      };
    }
    if (code === 'remove') {
      return {
        title: '删除',
        level: 'danger',
        onClick: onRemove,
        ...it,
      };
    }
    return it;
  });

  return {
    title: '操作',
    key: 'option',
    // dataIndex: 'the-option', //有时候有问题！？
    valueType: 'OptionActions',
    align: 'center',
    hideInForm: true,
    hideInSearch: true,
    fieldProps: { actionList },
    width: 120,
    fixed: columns.length >= 8 ? 'right' : false,
  };
};
