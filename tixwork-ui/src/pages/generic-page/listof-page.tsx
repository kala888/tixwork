import type { ResourceNameType } from '@/biz-model/biz-schema';
import BizSchema from '@/biz-model/biz-schema';
import EleTableList from '@/components/ele-table-list/ele-table-list';
import BasePage from '@/components/layout/base-page';
import { isEmpty } from '@/utils/object-utils';
import { Empty } from 'antd';
import _ from 'lodash';
import { useLocation, useParams } from 'umi';

export default () => {
  const params = useParams<{ objectType; id }>();
  let { objectType } = params;

  const location = useLocation();
  if (isEmpty(objectType)) {
    const paths = _.split(_.trim(location.pathname, '/'), '/');
    objectType = _.last(paths) as ResourceNameType;
  }
  const schema = BizSchema.get(objectType);

  if (isEmpty(schema)) {
    return <Empty description="没有找到对应的页面" />;
  }

  return (
    <BasePage>
      <EleTableList
        resource={schema.uri}
        rowKey="id"
        title={schema.label}
        columns={schema.columns}
        formProps={{ columns: schema.columns }}
        actionList={schema.actionList as any}
        {...schema.tableConfig}
      />
    </BasePage>
  );
};
