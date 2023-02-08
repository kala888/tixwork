import type { ResourceNameType } from '@/biz-model/biz-schema';
import BizSchema from '@/biz-model/biz-schema';
import EleDetail from '@/components/detail';
import BasePage from '@/components/layout/base-page';
import { isEmpty } from '@/utils/object-utils';
import { useLocation, useParams } from '@@/exports';
import { Empty } from 'antd';
import _ from 'lodash';
import { useEffect } from 'react';

/**
 * 路由匹配：/lawcase/custom-user/:id 和 /detail/:objectType/:id
 */
export default function DetailPage() {
  const params = useParams<{ objectType; id }>();
  let { objectType } = params;
  const location = useLocation();

  if (isEmpty(objectType)) {
    const paths = _.split(_.trim(location.pathname, '/'), '/');
    objectType = _.get(paths, paths.length - 2) as ResourceNameType;
  }

  const { id } = params;
  const schema = BizSchema.get(objectType);
  useEffect(() => {
    const pageTitle = `${schema.label}-${id} ${BizSchema.project?.title}`;
    setTimeout(() => (document.title = pageTitle), 200);
  }, [schema]);

  if (isEmpty(id) || isEmpty(schema)) {
    return <Empty description="没有找到对应的页面" />;
  }

  return (
    <BasePage>
      <EleDetail id={id} objectType={objectType} />
    </BasePage>
  );
}
