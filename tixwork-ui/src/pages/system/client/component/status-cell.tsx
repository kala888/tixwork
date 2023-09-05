import { colors } from '@/components/value-type/style-utils';
import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import { useLoading } from '@/services/use-service';
import { App, Switch } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

export default function (props: { value: any; id: React.Key }) {
  const { message } = App.useApp();
  const [value, setValue] = useState(false);
  const { loading, showLoading, hideLoading } = useLoading();
  useEffect(() => {
    console.log('initial value', props.value);
    setValue(_.toNumber(props.value) === 0);
  }, [props.value]);

  const handleSwitch = async (checked) => {
    setValue(checked);
    try {
      showLoading();
      const resp = await Q.put(ApiConfig.client + '/changeStatus', {
        id: props.id,
        status: checked ? 0 : 1,
      });
      console.log(resp);
      message.success(checked ? '启用成功' : '禁用成功');
    } catch (e) {
      message.error('操作失败');
      setValue(!checked);
    } finally {
      hideLoading();
    }
  };

  return (
    <Switch
      style={{ background: value ? colors.green : undefined }}
      checkedChildren="已启用"
      unCheckedChildren="已禁用"
      checked={value}
      loading={loading}
      onChange={handleSwitch}
    />
  );
}
