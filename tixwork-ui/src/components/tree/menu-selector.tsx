import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import { ProFormField } from '@ant-design/pro-components';
import { useAsyncEffect } from 'ahooks';
import { TreeSelect } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import styles from './styles.less';

function TreePicker(props) {
  const [treeData, setTreeData] = useState([]);

  useAsyncEffect(async function* () {
    const resp = await Q.Get(ApiConfig.getMenuTree);
    yield;
    setTreeData(resp.data);
  }, []);

  const { width, disabled } = props;
  const rootClass = classNames(styles.container, {
    'ant-input-affix-wrapper-disabled': disabled,
    'pro-field': true,
    ['pro-field-' + width]: width,
  });

  return (
    <TreeSelect
      className={rootClass}
      dropdownStyle={{ height: 200, overflow: 'auto' }}
      fieldNames={{
        label: 'title',
        value: 'id',
      }}
      placeholder="请选择"
      treeData={treeData}
      {...props}
    />
  );
}

export default function MenuSelector(props) {
  return (
    <ProFormField {...props}>
      <TreePicker {...props} {...props.fieldProps} />
    </ProFormField>
  );
}
