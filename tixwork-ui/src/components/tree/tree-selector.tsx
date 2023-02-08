import ActionIcon from '@/components/elements/action-icon';
import { useVisible } from '@/services/use-service';
import { isNotEmpty } from '@/utils/object-utils';
import type { ProFormFieldProps } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import { List, Modal, Space, Tag } from 'antd';
import React, { useState } from 'react';

import ProFormItem from '@ant-design/pro-form/es/components/FormItem';
import deepdash from 'deepdash';
import lodash from 'lodash';

import ClickableItem from '@/components/form/fields/clickable-item';
import type { EleTreeNodeType } from '@/components/tree/ele-tree';
import EleTree from '@/components/tree/ele-tree';
import styles from './styles.less';

const _ = deepdash(lodash);

type TreePanelType = {
  title: string;
  icon: string;
  onChange: (selected: React.Key[]) => void;
  value: any;
  placeholder?: string;
  width: ProFormFieldProps['width'];
  disabled?: boolean;
  dataSource: EleTreeNodeType[];
};

const TreePanel = (props: TreePanelType) => {
  const { visible, show, close } = useVisible();
  const [selected, setSelected] = useState<any>();
  const {
    title = '选择',
    icon = 'tree',
    onChange,
    value,
    placeholder = '请选择',
    width,
    disabled,
    dataSource = [],
  } = props;

  const theItem = _.findDeep(
    dataSource,
    (it) => {
      if (Array.isArray(value)) {
        return _.includes(value, it.id);
      }
      return it?.id === value;
    },
    // @ts-ignore
    { childrenPath: 'children' },
  );

  const handleConfirm = () => {
    close();
    if (onChange) {
      onChange(selected.id);
    }
  };

  const handleSelected = (key, node) => {
    setSelected(isNotEmpty(key) ? node : {});
    show();
  };
  const handleClear = () => {
    if (onChange) {
      onChange({} as any);
    }
  };

  const list = isNotEmpty(selected) ? [selected] : [];

  let theValue = theItem?.value?.title || value;
  if (isNotEmpty(theValue) && !disabled) {
    theValue = (
      <Tag closable onClose={handleClear} color={'cyan'}>
        {theValue}
      </Tag>
    );
  }

  return (
    <>
      <ClickableItem
        width={width}
        disabled={disabled}
        placeholder={placeholder}
        className={styles.treeSelector}
        onClick={show}
        value={theValue}
        suffix={<ActionIcon icon={icon} />}
      />
      <Modal open={visible} onCancel={close} okText="确定" onOk={handleConfirm}>
        <ProCard title={title} split="vertical" bordered headerBordered style={{ marginTop: 20 }}>
          <ProCard colSpan="50%">
            <EleTree
              onSelect={handleSelected}
              dataSource={dataSource}
              searchPlaceholder="输入并回车搜索"
            />
          </ProCard>
          <ProCard>
            <List
              header={<div>已选择</div>}
              dataSource={list}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    <ActionIcon icon={item?.icon} />
                    <span> {item?.title}</span>
                  </Space>
                </List.Item>
              )}
            />
          </ProCard>
        </ProCard>
      </Modal>
    </>
  );
};

/**
 * 自定义ProComponent 例子, TreePanel展开了fieldProps，也可以不展开
 */
export default function TreeSelector(props) {
  const { dataSource, title, icon, width = 'sm', label, ...rest } = props;
  return (
    <ProFormItem label={label} {...rest}>
      <TreePanel
        dataSource={dataSource}
        title={title || icon}
        icon={icon}
        width={width}
        {...rest}
        {...rest.fieldProps}
      />
    </ProFormItem>
  );
}
