import RemoteCascade from '@/components/form/remote/remote-cascade';
import EleProProvider from '@/components/value-type/ele-pro-provider';
import { BetaSchemaForm, ProForm } from '@ant-design/pro-components';
import { message } from 'antd';

export default () => {
  return (
    <EleProProvider>
      <ProForm
        onFinish={async (values) => {
          message.success('提交成功' + JSON.stringify(values));
        }}
      >
        <BetaSchemaForm
          layoutType="Embed"
          columns={[
            {
              title: '所在城市',
              valueType: 'RemoteCascade',
              dataIndex: 'addressProvinceCity',
              fieldProps: {
                width: 'md',
                names: ['addressProvince', 'addressCity'],
                linkToUrl: '/api/data/cities',
                placeholder: '请选择所22在城市',
              },
            },
          ]}
        />

        <RemoteCascade
          linkToUrl={'/api/data/cities'}
          width="md"
          name="data2"
          label="合同生效时间"
          names={['addressProvince2', 'addressCity2']}
          placeholder="请选择所2在城市"
        />
      </ProForm>
    </EleProProvider>
  );
};
