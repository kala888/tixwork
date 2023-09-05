import RemoteSelect from '@/components/form/remote/remote-select';
import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import ObjectUtils from '@/utils/object-utils';
import { HomeOutlined } from '@ant-design/icons';
import { App, Modal, Spin } from 'antd';
import { useEffect, useState } from 'react';

export default function TenantSwitch() {
  const [tenant, setTenant] = useState();
  const { message, modal } = App.useApp();

  useEffect(() => {
    Q.get(ApiConfig.dynamicTenant).then((resp) => {
      setTenant(resp.data);
    });
  }, []);
  const loading = () => {
    modal.info({
      modalRender: () => (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Spin size="large" tip="处理中" />
        </div>
      ),
      mask: true,
      maskClosable: false,
      closable: false,
    });
  };

  const handleTenantChange = (value) => {
    modal.confirm({
      title: '切换租户',
      content: '切换租户后，当前页面将会刷新，是否继续？',
      okText: '立即切换',
      onCancel: () => {
        const preValue = ObjectUtils.isEmpty(tenant) ? null : tenant;
        setTenant(preValue as any);
      },
      onOk: async () => {
        loading();
        try {
          setTenant(value);
          if (ObjectUtils.isEmpty(value)) {
            await Q.get(ApiConfig.clearTenant);
            message.success('清理成功');
            return;
          }
          await Q.get(ApiConfig.switchTenant, { id: value });
          message.success('切换成功');
        } finally {
          Modal.destroyAll();
        }
        location.reload();
      },
    });
  };

  return (
    <RemoteSelect
      name={'tenantId'}
      hideWhenEmpty={true}
      placeholder={'切换租户'}
      linkToUrl={ApiConfig.getTenantOptions}
      fieldProps={{
        onChange: handleTenantChange,
        value: tenant,
      }}
      formItemProps={{
        style: {
          marginBottom: 0,
        },
      }}
      prefix={<HomeOutlined />}
    />
  );
}
