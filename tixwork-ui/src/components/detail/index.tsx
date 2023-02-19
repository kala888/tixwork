import type { ResourceNameType } from '@/biz-model/biz-schema';
import BizSchema from '@/biz-model/biz-schema';
import type { ListItemsInfoType } from '@/components/detail/list-items-info';
import ListItemsInfo from '@/components/detail/list-items-info';
import ObjectEntityInfo, { getObjectFieldProps } from '@/components/detail/object-entity-info';
import EleProProvider from '@/components/value-type/ele-pro-provider';
import useResource from '@/http/use-resource';
import { useLoading } from '@/services/use-service';
import { isEmpty, isNotEmpty } from '@/utils/object-utils';
import { ProCard } from '@ant-design/pro-components';
import { Empty } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from './styles.less';

type EleDetailType = {
  id?: React.Key;
  objectType: ResourceNameType;
  linkToUrl?: string;
  className?: any;
  expandObject?: boolean;
};

export default function EleDetail(props: EleDetailType) {
  const { loading, showLoading, hideLoading } = useLoading();
  const { id = '', linkToUrl, objectType, className, expandObject = true } = props;
  const [dataSource, setDataSource] = useState<any>({});
  const schema = BizSchema.get(objectType);
  const { columns = [] } = schema;
  const api = useResource(linkToUrl || schema.linkToUrl);

  let commonColumns: any[] = columns;
  let objectColumns: any[] = [];
  if (expandObject) {
    commonColumns = columns.filter((it) => it.valueType !== 'Object');
    objectColumns = columns.filter((it) => it.valueType === 'Object');
  }

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

  if (isEmpty(dataSource)) {
    return (
      <ProCard style={{ marginTop: 200 }}>
        <Empty description="未找到相关的可以展示的数据" />
      </ProCard>
    );
  }

  const rootCls = classNames('ele-detail', styles.detail, className);

  const tabItems = listColumns?.map((it) => {
    const params: ListItemsInfoType = getObjectFieldProps(it, dataSource);
    return {
      label: params.title,
      key: params.key,
      children: <ListItemsInfo {...params} onRefresh={handleRefresh} />,
    };
  });
  return (
    <EleProProvider>
      <ProCard gutter={[8, 8]} direction="column" className={rootCls} loading={loading}>
        {/* 基本信息 */}
        <ObjectEntityInfo columns={commonColumns} dataSource={dataSource} />

        {/* 关联对象 */}
        {objectColumns.length > 0 && (
          <ProCard ghost={true} style={{ marginBlockStart: 8 }} gutter={[16, 16]} wrap>
            {objectColumns.map((it) => {
              const params: ListItemsInfoType = getObjectFieldProps(it, dataSource);
              const colSpan = objectColumns.length === 1 ? 24 : 12;
              return <ObjectEntityInfo {...params} colSpan={colSpan} key={params.key} />;
            })}
          </ProCard>
        )}

        {/* 列表信息 */}
        {listColumns?.length > 0 && (
          <ProCard
            ghost
            className={styles.listContent}
            tabs={{ activeKey: activeTab, onChange: handleTabChange, items: tabItems }}
          />
        )}
      </ProCard>
    </EleProProvider>
  );
}
