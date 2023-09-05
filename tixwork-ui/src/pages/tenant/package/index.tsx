import BasePage from '@/components/layout/base-page';
import SplitCard from '@/components/split-card';
import TableList from '@/components/table-list';
import { TableListApi } from '@/components/table-list/table-list-types';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import Q from '@/http/http-request/q';
import { useRef, useState } from 'react';
import { columns } from './columns';
import Detail from './detail';

export default () => {
  const [row, setRow] = useState<API.Tenant>({} as any);
  const ref = useRef<TableListApi<API.Config>>();
  const refresh = () => {
    ref.current?.refresh();
    if (row.id) {
      Q.get(ApiConfig.tenantPackage + '/' + row.id).then((res) => {
        setRow(res.data);
      });
    }
  };
  return (
    <BasePage>
      <SplitCard sliderWidth={400} style={{ minHeight: '50vh' }}>
        <TableList<API.TenantPackage>
          ref={ref}
          ghost
          options={false}
          search={false}
          resource={ApiConfig.tenantPackage}
          columns={columns}
          formProps={{
            columns,
            onSuccess: refresh,
          }}
          pagination={false}
          onRowSelect={setRow}
        />
        <Detail row={row} />
      </SplitCard>
    </BasePage>
  );
};
