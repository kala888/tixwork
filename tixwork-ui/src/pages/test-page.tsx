import EleProProvider from '@/components/value-type/ele-pro-provider';
import { getDisplayName } from '@/utils';
import ObjectUtils from '@/utils/object-utils';
import { BetaSchemaForm, ProForm, ProTable } from '@ant-design/pro-components';
import { useState } from 'react';

const transform = (items) => {
  if (ObjectUtils.isEmpty(items)) {
    return [];
  }
  return items.map((it) => {
    const result: any = {
      ...it,
      label: getDisplayName(it),
      value: it.id,
    };
    if (ObjectUtils.isNotEmpty(it.children)) {
      result.children = transform(it.children);
    }
    return result;
  });
};

const columns = [
  {
    title: '状态',
    dataIndex: 'list',
    valueType: 'TextList',
    hideInSearch: true,
  },
];
export default () => {
  const [state, setState] = useState<any>({ list: ['111', '222'] });
  return (
    <EleProProvider>
      <ProTable columns={columns} dataSource={[state]} />
      <ProForm
        onFinish={async (values) => {
          console.log('....valeus', values);
          setState(values);
        }}
        initialValues={state}
        labelWrap={true}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
      >
        <BetaSchemaForm layoutType="Embed" columns={columns} />
      </ProForm>
    </EleProProvider>
  );
};
