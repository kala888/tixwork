import EleProProvider from '@/components/value-type/ele-pro-provider';
import { ProCard, ProTable } from '@ant-design/pro-components';

export default () => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'title',
    },
    {
      title: '电话',
      dataIndex: 'mobile',
      valueType: 'Mobile',
    },
  ];
  const data = [{ id: 111, title: '111', mobile: '13333333333' }];
  return (
    <ProCard title={'测试页面'}>
      <EleProProvider>
        <ProTable columns={columns} dataSource={data} />
      </EleProProvider>
    </ProCard>
  );
};
