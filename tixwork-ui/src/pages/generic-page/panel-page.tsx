import type { ResourceNameType } from '@/biz-models/biz-schema';
import BizSchema from '@/biz-models/biz-schema';
import EleDetail from '@/components/detail';
import BasePage from '@/components/layout/base-page';
import SplitCard from '@/components/split-card';
import TableList from '@/components/table-list';
import useResource from '@/http/use-resource';
import ObjectUtils from '@/utils/object-utils';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useLocation, useParams } from '@umijs/max';
import { useTitle } from 'ahooks';
import { Empty } from 'antd';
import classNames from 'classnames';
import _ from 'lodash';
import { useState } from 'react';

/**
 * 左右结构，左边是列表（短），右边是详情，详情包含了关联对象的管理。
 *
 * 特别适合类似tag和tag-group的对象管理。
 * 例如 tag-group是父对象，属性少，需要通过tag-group来管理tag
 */
export default () => {
  const [row, setRow] = useState<any>({} as any);
  const location = useLocation();
  let { objectType } = useParams<{ objectType: string }>();
  if (ObjectUtils.isEmpty(objectType)) {
    const paths = _.split(_.trim(location.pathname, '/'), '/');
    objectType = _.last(paths) as ResourceNameType;
  }

  const schema = BizSchema.get(objectType);
  const pageTitle = `${schema.label}列表`;
  useTitle(pageTitle);

  const resource = useResource(schema.linkToUrl);

  if (ObjectUtils.isEmpty(schema)) {
    return <Empty description="没有找到对应的页面" />;
  }
  const css = useEmotionCss((token) => ({
    '.ant-pro-card': {
      boxShadow: 'none',
    },
  }));
  const rootCls = classNames(css, 'main-page');

  const handleRow = (record: any) => {
    if (ObjectUtils.isNotEmpty(record?.id)) {
      resource.get(record.id).then((res) => {
        setRow(res);
      });
    }
  };

  const actionList = [{ code: 'create', title: '创建' + schema.label, type: 'primary' }];
  const theColumn = schema.columns?.length > 3 ? schema.columns.slice(0, 3) : schema.columns;

  return (
    <BasePage title={`${schema.label}`} brief={schema.brief} className={rootCls}>
      <SplitCard sliderWidth={380}>
        <TableList
          actionList={actionList}
          resource={schema.linkToUrl}
          columns={theColumn}
          formProps={{ title: schema.label, columns: schema.columns }}
          search={false}
          options={false}
          pagination={false}
          onRowSelect={handleRow}
          {...schema.tableConfig}
        />
        <EleDetail objectType={objectType} dataSource={row} onRefresh={handleRow} />
      </SplitCard>
    </BasePage>
  );
};
