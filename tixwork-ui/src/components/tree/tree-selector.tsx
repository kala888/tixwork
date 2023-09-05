import ActionIcon from '@/components/elements/action-icon';
import { useOpen } from '@/services/use-service';
import type { ProFormFieldProps } from '@ant-design/pro-components';
import { ProCard, ProFormItem } from '@ant-design/pro-components';
import { List, Modal, Space, Tag } from 'antd';
import React, { useState } from 'react';

import deepdash from 'deepdash';
import lodash from 'lodash';

import ClickableItem from '@/components/form/fields/clickable-item';
import type { EleTreeNodeType } from '@/components/tree/ele-tree';
import EleTree from '@/components/tree/ele-tree';
import { useGet } from '@/http/use-http';
import ObjectUtils from '@/utils/object-utils';
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

function getValue(dataSource: any[], value) {
  if (ObjectUtils.isEmpty(value)) {
    return null;
  }
  const item = _.findDeep(
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
  return item?.value;
}

const TreePanel = (props: TreePanelType) => {
  const { open, show, close } = useOpen();
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
  const theValue = getValue(dataSource, value);

  const handleConfirm = () => {
    close();
    if (onChange) {
      onChange(selected.id);
    }
  };

  const handleSelected = (key, node) => {
    setSelected(ObjectUtils.isNotEmpty(key) ? node : {});
    show();
  };
  const handleClear = () => {
    if (onChange) {
      onChange('' as any);
    }
  };

  const list = ObjectUtils.isNotEmpty(selected) ? [selected] : [];

  return (
    <>
      <ClickableItem
        onClear={handleClear}
        width={width}
        disabled={disabled}
        placeholder={placeholder}
        className={styles.treeSelector}
        onClick={show}
        value={theValue}
        itemRender={(displayName, item) => (
          <Tag key={displayName + '_' + item?.id} closable onClose={handleClear} color={'cyan'}>
            {displayName}
          </Tag>
        )}
        suffix={<ActionIcon icon={icon} />}
      />
      <Modal open={open} onCancel={close} okText="确定" onOk={handleConfirm}>
        <ProCard title={title} split="vertical" bordered headerBordered style={{ marginTop: 20 }}>
          <ProCard colSpan="50%">
            <EleTree onSelect={handleSelected} dataSource={dataSource} searchPlaceholder="输入并回车搜索" />
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
  const { rules, linkToUrl, name, title, icon, label, fieldProps, ...rest } = props;
  const { data } = useGet(linkToUrl);

  return (
    <ProFormItem label={label} name={name} rules={rules}>
      <TreePanel dataSource={data} title={title || icon} icon={icon} {...rest} {...fieldProps} />
    </ProFormItem>
  );
}
