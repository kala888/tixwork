import type { RemoteOptionType } from '@/services/use-remote-option';
import useRemoteOption from '@/services/use-remote-option';
import type { ProFormFieldProps } from '@ant-design/pro-components';
import { ProFormCascader } from '@ant-design/pro-components';
import type { CascaderProps } from 'antd';
import _ from 'lodash';
import React from 'react';

type RemoteCascadeType = {
  name: React.Key;
  names: string[];
  joinBy?: string;
  fieldProps?: CascaderProps<any>;
} & RemoteOptionType &
  ProFormFieldProps<any>;

const RemoteCascade = (props: RemoteCascadeType) => {
  const { names = [], joinBy = '-', linkToUrl, fieldProps, ...rest } = props;
  const { data } = useRemoteOption({ linkToUrl });
  const name = (props?.name || props?.id) as any;

  // schema 定义使用时，未触发https://github.com/ant-design/pro-components/issues/6291
  // 解决方案就是要传递name=props?.name || props?.id到ProComponent
  const handleTransform = (values) => {
    const result = { [name]: values };
    names.forEach((subName, idx) => {
      result[subName] = values![idx];
    });
    return result;
  };
  const fieldParams = _.omit(fieldProps, 'linkToUrl');
  return (
    <ProFormCascader
      formItemProps={{ className: 'customized-form-item' }}
      {...rest}
      fieldProps={{
        displayRender: (label) => label.join(joinBy),
        options: data,
        ...fieldParams,
      }}
      transform={handleTransform}
      name={name}
    />
  );
};

export default RemoteCascade;
