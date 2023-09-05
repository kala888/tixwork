import { BaseFormType } from '@/components/form/popup-form-wrapper';
import ProEditForm from '@/components/form/pro-edit-form';
import RemoteRadio from '@/components/form/remote/remote-radio';
import RemoteSelect from '@/components/form/remote/remote-select';
import { CommonRule } from '@/components/value-type/common-column';
import { ShakeOutlined } from '@ant-design/icons';
import { ProFormDigit, ProFormGroup, ProFormText } from '@ant-design/pro-components';

import ApiConfig from '@/http/api-config';
import useResource from '@/http/use-resource';
import { App } from 'antd';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import { v4 as uuidv4 } from 'uuid';

const EditForm = (props: BaseFormType) => {
  const { message } = App.useApp();
  const resource = useResource(ApiConfig.client);

  const [clientSecret, setClientSecret] = useMergedState<string>('', {
    value: props.values?.clientSecret,
  });

  const { values } = props;
  const editing = !!values?.id;
  const handleRefreshKey = () => {
    if (editing) {
      return;
    }
    const secretKey = uuidv4().replaceAll('-', '').substring(0, 12).toUpperCase();
    setClientSecret(secretKey);
  };

  const handleFinish = async (theValues) => {
    try {
      if (values?.id) {
        await resource.update({ id: values?.id, ...theValues });
      } else {
        await resource.save(theValues);
      }
      message.success('保存成功');
      return true;
    } catch (e) {
      message.error('更新失败');
      return false;
    }
  };
  return (
    <ProEditForm
      title={editing ? '编辑客户端' : '添加客户端'}
      modalProps={{ width: 550 }}
      layout={'vertical'}
      size="large"
      {...props}
      values={{
        activeTimeout: 1800,
        timeout: 604800,
        status: '0',
        ...(values || {}),
        clientSecret,
      }}
      onFinish={handleFinish}
    >
      <ProFormGroup>
        <ProFormText
          name="clientKey"
          label="客户端Key"
          rules={[CommonRule.required, CommonRule.text]}
          width="xs"
          disabled={editing}
        />
        <ProFormText
          name="clientSecret"
          label="私钥"
          rules={[CommonRule.required, CommonRule.text]}
          width={160}
          fieldProps={{
            addonAfter: <ShakeOutlined onClick={handleRefreshKey} />,
          }}
          disabled={editing}
        />
        <RemoteRadio label="状态" name="status" allowClear={false} types="sys.status" rules={[CommonRule.required]} />
      </ProFormGroup>

      <RemoteSelect
        name="grantTypeList"
        label="认证登录授权类型"
        types={'sys.grant_type'}
        rules={[CommonRule.required]}
        mode="multiple"
        width="lg"
      />
      <ProFormGroup>
        <RemoteSelect
          name="deviceType"
          label="设备类型"
          types={'sys.device_type'}
          rules={[CommonRule.required]}
          width="xs"
        />

        <ProFormDigit
          name="activeTimeout"
          label="活跃有效期"
          tooltip={'活跃Token超时时间: 指定时间时间无操作则过期。默认1800秒（30分钟）'}
          fieldProps={{
            addonAfter: '秒',
          }}
          width="xs"
        />
        <ProFormDigit
          name="timeout"
          label="最大有效期"
          tooltip={'Token固定超时时间: Token固定超时时间，最大生命时间。默认604800秒（7天）'}
          rules={[CommonRule.required]}
          fieldProps={{
            addonAfter: '秒',
          }}
          width="xs"
        />
      </ProFormGroup>
    </ProEditForm>
  );
};
export default EditForm;
