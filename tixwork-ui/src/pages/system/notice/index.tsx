import BasePage from '@/components/layout/base-page';
import TableList from '@/components/table-list';
import type { EleValueType } from '@/components/value-type';
import CommonColumn from '@/components/value-type/common-column';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import type { ProColumnType } from '@ant-design/pro-components';

const columns: ProColumnType<API.Notice, EleValueType>[] = [
  {
    title: '公告类型',
    dataIndex: 'noticeType',
    valueType: 'RemoteRadio',
    width: 100,
    fieldProps: {
      types: 'NoticeType',
    },
  },
  {
    title: '公告标题',
    dataIndex: 'noticeTitle',
    ellipsis: true,
    width: 'lg',
  },
  {
    title: '内容',
    dataIndex: 'noticeContent',
    ellipsis: true,
    valueType: 'textarea',
    width: 'lg',
    hideInSearch: true,
  },
  CommonColumn.createTime,
];

export default () => {
  return (
    <BasePage>
      <TableList<API.Notice> title="通知公告" resource={ApiConfig.notice} columns={columns} formProps={{ columns }} />
    </BasePage>
  );
};
