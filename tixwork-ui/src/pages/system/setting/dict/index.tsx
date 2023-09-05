import SplitCard from '@/components/split-card';
import TableList from '@/components/table-list';
import { TableListApi } from '@/components/table-list/table-list-types';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import Q from '@/http/http-request/q';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import _ from 'lodash';
import { useRef, useState } from 'react';
import { RefreshCacheButton } from '../utils';
import { columns } from './columns';
import Detail from './detail';
import EditForm from './edit-form';

const displayColumn = columns.filter((it) => _.indexOf(['key', 'title'], it.dataIndex) > -1);

/**
 * 在REDIS中设置参数
 */
export default () => {
  const ref = useRef<TableListApi<API.Config>>();
  const [row, setRow] = useState<API.Config>({} as any);
  const actionList = [{ code: 'create', title: '创建字典组' }, <RefreshCacheButton key="refresh-cache" />];
  const css = useEmotionCss((f) => ({
    '.table-search-bar': {
      paddingBottom: 0,
    },
  }));

  const refresh = () => {
    ref.current?.refresh();
    if (row.id) {
      Q.get(ApiConfig.config + '/' + row.id).then((res) => {
        setRow(res.data);
      });
    }
  };

  return (
    <SplitCard sliderWidth={'35%'}>
      <TableList<API.Config>
        ref={ref}
        ghost
        className={css}
        title={`字典配置`}
        search={{
          span: 12,
        }}
        resource={ApiConfig.config}
        rowKey="id"
        params={{
          type: 'DICT',
        }}
        columns={displayColumn}
        options={false}
        pagination={false}
        actionList={actionList}
        formProps={{
          columns,
          onSuccess: refresh,
        }}
        editForm={EditForm}
        onRowSelect={setRow}
      />
      <Detail row={row} />
    </SplitCard>
  );
};
