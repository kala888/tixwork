import type { ResourceNameType } from '@/biz-models/biz-schema';
import BizSchema from '@/biz-models/biz-schema';
import BasePage from '@/components/layout/base-page';
import TableList from '@/components/table-list';
import ObjectUtils from '@/utils/object-utils';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Empty } from 'antd';
import _ from 'lodash';
import { useLocation, useModel, useParams } from 'umi';
import EditForm from './edit-form';

export default () => {
  const params = useParams<{ objectType; id }>();
  let { objectType } = params;
  const { initialState } = useModel('@@initialState');
  const isTopMenu = initialState?.settings?.layout === 'top' || initialState?.settings?.layout === 'mix';

  const location = useLocation();
  if (ObjectUtils.isEmpty(objectType)) {
    const paths = _.split(_.trim(location.pathname, '/'), '/');
    objectType = _.last(paths) as ResourceNameType;
  }
  const schema = BizSchema.get(objectType);

  if (ObjectUtils.isEmpty(schema)) {
    return <Empty description="没有找到对应的页面" />;
  }
  const css = useEmotionCss((token) => ({
    '.ant-table-wrapper': {
      minHeight: '70vh',
    },
  }));
  const actionList = ObjectUtils.isEmpty(schema.actionList) ? false : schema.actionList;
  const lineActionList = ObjectUtils.isEmpty(schema.lineActionList) ? false : schema.lineActionList;

  return (
    <BasePage className="main-page" title={schema.label} brief={schema.brief} header={!isTopMenu}>
      <TableList
        className={css}
        resource={schema.linkToUrl}
        title={schema.label}
        columns={schema.columns}
        formProps={{ columns: schema.columns }}
        actionList={actionList}
        lineActionList={lineActionList}
        editForm={(plist) => <EditForm {...plist} schema={schema} />}
        {...schema.tableConfig}
      />
    </BasePage>
  );
};
