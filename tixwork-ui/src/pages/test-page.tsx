import EleProProvider from '@/components/value-type/ele-pro-provider';
import { BetaSchemaForm, ProDescriptions, ProForm } from '@ant-design/pro-components';

export default function App() {
  const data = {
    content: '<p>123</p>',
  };
  return (
    <div>
      <EleProProvider>
        <ProDescriptions columns={[{ dataIndex: 'content', title: '内容', valueType: 'RichEdit' }]} dataSource={data} />
        <ProForm initialValues={data} onFinish={async (values) => console.log('sss', values)}>
          <BetaSchemaForm
            layoutType="Embed"
            columns={[{ dataIndex: 'content', title: '内容', valueType: 'RichEdit' }]}
          />
        </ProForm>
      </EleProProvider>
    </div>
  );
}
