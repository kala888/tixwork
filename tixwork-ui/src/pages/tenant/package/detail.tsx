import type { API } from '@/http/api-types';
import ObjectUtils from '@/utils/object-utils';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Empty } from 'antd';
import { columns } from './columns';
import PackageMenu from './package-menu';

export default (props: { row: API.TenantPackage }) => {
  const { row } = props;

  if (ObjectUtils.isEmpty(row)) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }
  return (
    <ProCard>
      <ProDescriptions title={`基本信息：${row?.displayName}`} dataSource={row} column={4} columns={columns as any} />
      <PackageMenu {...row} />
    </ProCard>
  );
};
