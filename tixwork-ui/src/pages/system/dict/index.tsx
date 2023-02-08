import EleTableList from '@/components/ele-table-list/ele-table-list';
import BasePage from '@/components/layout/base-page';
import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import DictDetail from '@/pages/system/dict/dict-detail';
import type { ActionList } from '@/utils/nice-router-types';
import { Button, message, Modal } from 'antd';
import { columns } from './columns';

/**
 * 在REDIS中设置参数
 */
export default () => {
  const handleRefresh = async () => {
    const resp = await Q.send(ApiConfig.refreshCache, { loading: true, method: 'DELETE' });
    if (resp.code === 200) {
      message.success('刷新成功');
    }
  };

  const actionList = [
    <Button key="refresh-cache" type={'primary'} danger onClick={handleRefresh}>
      缓存刷新
    </Button>,
  ];

  const handleViewDetail = (record) => {
    Modal.success({
      width: '80%',
      title: '查看配置详情',
      content: <DictDetail item={record} />,
    });
  };
  const lineActions: ActionList = [
    {
      code: 'edit'
    },
    {
      code: 'detail',
      title: '查看详情',
      onClick: handleViewDetail,
    },
  ];

  return (
    <BasePage>
      <EleTableList<API.Dict>
        resource={ApiConfig.dict}
        rowKey="id"
        title="系统参数设置"
        columns={columns}
        options={false}
        pagination={false}
        actionList={actionList}
        formProps={{ columns }}
        lineActionList={lineActions}
      />
    </BasePage>
  );
};
