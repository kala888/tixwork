import type { ResourceNameType } from '@/biz-model/biz-schema';
import BizSchema from '@/biz-model/biz-schema';
import EleDetail from '@/components/detail';
import EleTableList from '@/components/ele-table-list/ele-table-list';
import BaseForm from '@/components/form/base-form';
import BasePage from '@/components/layout/base-page';
import SplitCard from '@/components/split-card';
import { isEmpty } from '@/utils/object-utils';
import { useLocation, useParams } from '@@/exports';
import { useTitle } from 'ahooks';
import { Empty } from 'antd';
import _ from 'lodash';
import { useState } from 'react';
import styles from './styles.less';

export default () => {
  const [currentRow, setCurrentRow] = useState<any>({} as any);
  const location = useLocation();
  let { objectType } = useParams<{ objectType; id }>();
  if (isEmpty(objectType)) {
    const paths = _.split(_.trim(location.pathname, '/'), '/');
    objectType = _.last(paths) as ResourceNameType;
  }

  const schema = BizSchema.get(objectType);
  const pageTitle = `${schema.label}列表`;
  useTitle(pageTitle);

  if (isEmpty(schema)) {
    return <Empty description="没有找到对应的页面" />;
  }

  return (
    <BasePage title={`${schema.label}`} brief={schema.brief} className={styles.splitPanelPage}>
      <SplitCard leftWidth={380}>
        <EleTableList
          resource={schema.linkToUrl}
          title={schema.label}
          columns={schema.columns}
          formProps={{ columns: schema.columns }}
          search={false}
          options={false}
          pagination={false}
          onRowSelect={setCurrentRow}
          editForm={BaseForm}
          {...schema.tableConfig}
        />
        <EleDetail id={currentRow?.id} objectType={objectType} />
      </SplitCard>
    </BasePage>
  );
};
