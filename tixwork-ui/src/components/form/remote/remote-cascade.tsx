import type { RemoteOptionType } from '@/services/use-remote-option';
import useRemoteOption from '@/services/use-remote-option';
import type { ProFormFieldProps } from '@ant-design/pro-components';
import type { CascaderProps } from 'antd';
import React from 'react';
// ProFormCascader 这里有bug,不要导入ProForm https://github.com/ant-design/pro-components/issues/6290
import { ProFormCascader } from '@ant-design/pro-components';
import _ from 'lodash';

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

  //有bug。 schema 定义使用时，未触发https://github.com/ant-design/pro-components/issues/6291
  const handleTransform = (values) => {
    // @ts-ignore
    const name: any = props?.name || props?.dataIndex || props?.key;
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
    />
  );
};

export default RemoteCascade;
