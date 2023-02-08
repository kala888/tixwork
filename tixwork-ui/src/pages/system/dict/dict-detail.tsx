import EleTableList from '@/components/ele-table-list/ele-table-list';
import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import { isNotEmpty } from '@/utils/object-utils';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Empty } from 'antd';
import { useEffect, useState } from 'react';
import { columns, columnsForSub } from './columns';
import SubItemEditForm from './sub-item-edit-form';

type DictDetailType = {
  item: API.Dict;
};

export default function DictDetail(props: DictDetailType) {
  const { item = {} as any } = props;
  const [state, setState] = useState(item);
  useEffect(() => {
    if (isNotEmpty(item?.id)) {
      Q.get(ApiConfig.dict + '/:id', { id: item.id }).then((res) => {
        setState(res.data);
      });
    }
  }, [item]);

  if (!state.id) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <ProCard>
      <ProDescriptions
        title={`基本信息：${state.displayName}`}
        dataSource={state}
        column={4}
        columns={columns as any}
      />
      {state.type !== 'VALUE' && (
        <EleTableList<API.Dict>
          resource={ApiConfig.dict}
          title="配置项"
          dataSource={state?.valueList}
          rowKey="id"
          search={false}
          columns={columnsForSub}
          editForm={(plist) => <SubItemEditForm {...plist} parent={state} />}
        />
      )}
    </ProCard>
  );
}
