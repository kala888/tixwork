import type { ChartSlotType } from '@/pages/dashboard/components/remote-chart';
import { ProTable } from '@ant-design/pro-components';

export default function SlotTable(props: ChartSlotType) {
  const { title, value } = props;
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'displayName',
    },
  ];
  return (
    <ProTable
      headerTitle={title}
      columns={columns}
      dataSource={value}
      search={false}
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
      }}
      options={false}
    />
  );
}
