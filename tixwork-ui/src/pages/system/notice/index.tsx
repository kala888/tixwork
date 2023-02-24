import EleTableList from '@/components/ele-table-list/ele-table-list';
import BasePage from '@/components/layout/base-page';
import type { EleValueType } from '@/components/value-type';
import CommonColumn from '@/components/value-type/common-column';
import ApiConfig from '@/http/api-config';
import type { ProColumnType } from '@ant-design/pro-components';

const columns: ProColumnType<API.Notice, EleValueType>[] = [
  {
    title: '公告类型',
    dataIndex: 'noticeType',
    align: 'center',
    valueEnum: {
      '1': '通知',
      '2': '公告',
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
    <BasePage title="通知公告">
      <EleTableList<API.Notice>
        title="通知公告"
        resource={ApiConfig.notice}
        columns={columns}
        formProps={{ columns }}
      />
    </BasePage>
  );
};
