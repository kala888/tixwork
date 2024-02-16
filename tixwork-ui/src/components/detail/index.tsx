import type { ResourceNameType } from '@/biz-models/biz-schema';
import BizSchema from '@/biz-models/biz-schema';
import ObjectEntityInfo from '@/components/detail/object-entity-info';
import type { ListItemsInfoType } from '@/components/detail/relative-entity-items';
import RelativeEntityItems from '@/components/detail/relative-entity-items';
import EleProProvider from '@/components/value-type/ele-pro-provider';
import ObjectUtils from '@/utils/object-utils';
import { ProCard } from '@ant-design/pro-components';
import { Empty } from 'antd';
import classNames from 'classnames';
import _ from 'lodash';
import { useState } from 'react';
import styles from './styles.less';

type EleDetailType = {
  title?: any;
  objectType: ResourceNameType;
  dataSource?: Record<string, any>;
  onRefresh?: (row: any) => void;
  className?: any;
  children?: any;
  [key: string]: any;
};

const isExpandObject = (obj) => obj?.valueType === 'Object' && obj?.fieldProps?.expand;
const defaultEmpty = (
  <ProCard style={{ marginTop: 200 }}>
    <Empty description="未找到相关的可以展示的数据" />
  </ProCard>
);

const getObjectFieldProps = (props, parent) => {
  const { dataIndex = 'id', title, fieldProps } = props;
  const obj = _.get(parent, dataIndex);
  const objectType = fieldProps?.objectType;
  const columns = BizSchema.get(objectType)?.columns;
  const result: ListItemsInfoType & { dataSource: any } = {
    ...fieldProps,
    parent,
    editable: fieldProps.editable,
    key: dataIndex,
    dataSource: obj,
    searchKey: fieldProps?.searchKey,
    objectType,
    columns,
    title,
  };
  return result;
};

export default function EleDetail(props: EleDetailType) {
  const { objectType, className, dataSource, onRefresh, ...rest } = props;
  const schema = BizSchema.get(objectType);
  const listColumns = schema.listProps || [];
  const [activeTab, setActiveTab] = useState(listColumns?.[0]?.dataIndex as string);

  if (ObjectUtils.isEmpty(dataSource)) {
    return defaultEmpty;
  }

  const { columns = [] } = schema;
  const expandedObjectColumns = _.filter(columns, isExpandObject);
  const baseInfoColumns = _.filter(columns, (it) => !isExpandObject(it));

  const handleTabChange = (tab) => {
    console.log('set tab', tab);
    setActiveTab(tab);
  };

  const rootCls = classNames('ele-detail', styles.detail, className);
  const handleRefresh = () => {
    if (typeof onRefresh === 'function') {
      onRefresh(dataSource);
    }
  };

  const tabItems = listColumns?.map((it) => {
    const params: ListItemsInfoType = getObjectFieldProps(it, dataSource);
    return {
      label: params.title,
      key: params.key,
      children: <RelativeEntityItems {...params} dataSource={null} onRefresh={handleRefresh} />,
    };
  });

  return (
    <EleProProvider>
      <ProCard gutter={[8, 8]} ghost direction="column" className={rootCls} {...rest}>
        {/* 基本信息 */}
        <ObjectEntityInfo columns={baseInfoColumns} dataSource={dataSource} />

        {/* 关联对象 */}
        {expandedObjectColumns.length > 0 && (
          <ProCard ghost={true} wrap>
            {expandedObjectColumns.map((it) => {
              const params = getObjectFieldProps(it, dataSource);
              const colSpan = expandedObjectColumns.length === 1 ? 24 : 12;
              return <ObjectEntityInfo {...params} colSpan={colSpan} key={params.key} />;
            })}
          </ProCard>
        )}

        {/* 关联列表信息 */}
        {tabItems?.length === 1 ? (
          tabItems[0].children
        ) : (
          <ProCard
            ghost
            className={styles.listContent}
            tabs={{ activeKey: activeTab, onChange: handleTabChange, items: tabItems }}
          />
        )}
        <div style={{ padding: '0 3px' }}>{props.children}</div>
      </ProCard>
    </EleProProvider>
  );
}
