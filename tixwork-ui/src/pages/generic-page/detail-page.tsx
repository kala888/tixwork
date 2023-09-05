import type { ResourceNameType } from '@/biz-models/biz-schema';
import BizSchema from '@/biz-models/biz-schema';
import EleDetail from '@/components/detail';
import BasePage from '@/components/layout/base-page';
import useResource from '@/http/use-resource';
import { useLoading } from '@/services/use-service';
import ObjectUtils from '@/utils/object-utils';
import { useLocation, useParams } from '@umijs/max';
import { Button, Empty } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import EditForm from './edit-form';

/**
 * 路由匹配：/lawcase/custom-user/:id 和 /detail/:objectType/:id
 */
export default function DetailPage() {
  const { loading, showLoading, hideLoading } = useLoading(false);
  const [dataSource, setDataSource] = useState({});

  const location = useLocation();
  const params = useParams<{ objectType; id }>();

  let { objectType, id } = params;
  if (ObjectUtils.isEmpty(objectType)) {
    const paths = _.split(_.trim(location.pathname, '/'), '/');
    objectType = _.get(paths, paths.length - 2) as ResourceNameType;
  }
  const schema = BizSchema.get(objectType);
  const resource = useResource(schema.linkToUrl);

  const refresh = () => {
    if (ObjectUtils.isNotEmpty(id) && ObjectUtils.isNotEmpty(schema)) {
      showLoading();
      resource.get(id).then(setDataSource).finally(hideLoading);
    }
  };
  useEffect(refresh, [schema, id]);

  if (ObjectUtils.isEmpty(id) || ObjectUtils.isEmpty(schema)) {
    return <Empty description="没有找到对应的页面" />;
  }

  const extra = (
    <EditForm
      schema={schema}
      values={dataSource}
      onSuccess={refresh}
      trigger={
        <Button type="dashed" danger size="small">
          编辑
        </Button>
      }
    />
  );
  return (
    <BasePage title={schema.label + '详情'} brief={id} className="detail-page" extra={extra} loading={loading}>
      <EleDetail objectType={objectType} dataSource={dataSource} onRefresh={refresh} />
    </BasePage>
  );
}
