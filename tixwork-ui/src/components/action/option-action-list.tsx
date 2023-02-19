import type { ActionLike, ActionList } from '@/utils/nice-router-types';
import { isNotEmpty } from '@/utils/object-utils';
import { Divider, Space } from 'antd';
import _ from 'lodash';
import React from 'react';
import { MoreOptionAction, OptionAction } from './more-option-action';

type OptionActionListType = {
  items: ActionList;
  maxShow?: number;
  record: any;
};

const listTheActions = (items = [], record) => {
  const list = items.map((it, idx) => {
    // merge action
    const theAction = it as ActionLike;
    const recordAction = _.find(record?.actionList, (ac) => ac.code == theAction?.code);
    const action = { ...theAction, ...(recordAction || {}) };

    const key = action.id + '_' + idx + '_' + action.code;

    //如果action包含render方法, 执行render
    if (_.isFunction(action.render)) {
      const dom = action.render(record, action);
      if (dom) {
        return React.cloneElement(dom, { key });
      }
      return dom;
    }

    const handleClick = (e) => {
      if (action.disabled) {
        return;
      }
      e.stopPropagation();
      if (action.onClick) {
        action.onClick(record, action);
      }
    };

    return <OptionAction key={key} {...action} onClick={handleClick} />;
  });
  return list.filter((it) => isNotEmpty(it));
};

/**
 * 只显示maxShow个操作选项，多的部分折叠起来
 */
export default function OptionActionList(props: OptionActionListType) {
  const { maxShow = 2, items = [], record } = props;

  const actions = listTheActions(items as any, record);

  //少于maxShow全部展示
  if (actions.length <= maxShow) {
    return (
      <Space size={0} split={<Divider type="vertical" />}>
        {actions}
      </Space>
    );
  }

  // 多余maxShow的部分，折叠起来
  const itemForShow = _.slice(actions, 0, maxShow);
  const menus = _.slice(actions, maxShow);
  return (
    <Space size={0} split={<Divider type="vertical" />}>
      {itemForShow}
      <MoreOptionAction menus={menus} />
    </Space>
  );
}
