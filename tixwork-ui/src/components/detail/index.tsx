import type { ResourceNameType } from '@/biz-model/biz-schema';
import BizSchema from '@/biz-model/biz-schema';
import type { ListItemsInfoType } from '@/components/detail/list-items-info';
import ListItemsInfo from '@/components/detail/list-items-info';
import ObjectEntityInfo from '@/components/detail/object-entity-info';
import EleProProvider from '@/components/value-type/ele-pro-provider';
import useResource from '@/http/use-resource';
import { useLoading } from '@/services/use-service';
import { isEmpty, isNotEmpty } from '@/utils/object-utils';
import { ProCard } from '@ant-design/pro-components';
import { Empty } from 'antd';
import classNames from 'classnames';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import styles from './styles.less';

type EleDetailType = {
  id: React.Key;
  objectType: ResourceNameType;
  className?: any;
};

const getFieldProps = (defs, parent) => {
  const { dataIndex = 'id', title, fieldProps } = defs;
  const obj = _.get(parent, dataIndex);
  const objectType = fieldProps?.objectType;
  const columns = BizSchema.get(objectType)?.columns;
  const result: ListItemsInfoType = {
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
  const { loading, showLoading, hideLoading } = useLoading();
  const { id, objectType, className } = props;
  const [dataSource, setDataSource] = useState<any>({});
  const schema = BizSchema.get(objectType);
  const { uri, columns = [] } = schema;
  const api = useResource(uri);

  const objectColumns = columns.filter((it) => it.valueType === 'Object');
  const listColumns = schema.listProps || [];
  const [activeTab, setActiveTab] = useState(listColumns?.[0]?.dataIndex as string);

  const handleRefresh = () => {
    if (isNotEmpty(id)) {
      showLoading();
      api
        .get(id)
        .then((resp) => {
          setDataSource(resp);
        })
        .finally(() => hideLoading());
    }
  };

  useEffect(() => {
    handleRefresh();
  }, [id]);

  const handleTabChange = (tab) => {
    console.log('set tab', tab);
    setActiveTab(tab);
  };

  const pageTitle = `${schema.label}详情`;

  if (isEmpty(dataSource)) {
    return (
      <ProCard style={{ marginTop: 200 }}>
        <Empty description="未找到相关的可以展示的数据" />
      </ProCard>
    );
  }

  const rootCls = classNames('ele-detail', styles.detail, className);

  return (
    <EleProProvider>
      <ProCard gutter={[8, 8]} direction="column" ghost className={rootCls} loading={loading}>
        <ObjectEntityInfo title={<h2>{pageTitle}</h2>} columns={columns} dataSource={dataSource} />

        {objectColumns.length > 0 && (
          <ProCard ghost={true} style={{ marginBlockStart: 8 }} gutter={[16, 16]} wrap>
            {objectColumns.map((it) => {
              const params: ListItemsInfoType = getFieldProps(it, dataSource);
              return (
                <ObjectEntityInfo
                  {...params}
                  key={params.key}
                  colSpan={objectColumns.length === 1 ? 24 : 12}
                />
              );
            })}
          </ProCard>
        )}

        {listColumns?.length > 0 && (
          <ProCard
            tabs={{ activeKey: activeTab, onChange: handleTabChange }}
            ghost
            className={styles.listContent}
          >
            {listColumns?.map((it) => {
              const params: ListItemsInfoType = getFieldProps(it, dataSource);
              return (
                <ProCard.TabPane key={params.key} tab={params.title}>
                  <ListItemsInfo {...params} onRefresh={handleRefresh} />
                </ProCard.TabPane>
              );
            })}
          </ProCard>
        )}
      </ProCard>
    </EleProProvider>
  );
}
