import type { RemoteOptionType } from '@/services/use-remote-option';
import useRemoteOption from '@/services/use-remote-option';
import ObjectUtils from '@/utils/object-utils';
import type { ProFormSelectProps } from '@ant-design/pro-components';
import { ProFormItem, ProFormSelect } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import className from 'classnames';

type RemoteSelectType = {
  prefix?: any;
  prefixClassName?: string;
  hideWhenEmpty?: boolean;
  optionConvert?: (item: any[]) => any[];
} & RemoteOptionType &
  ProFormSelectProps;

/**
 * 根据types，或者linkToUrl来获取candidate values
 */
export const _RemoteSelect = (props: RemoteSelectType) => {
  const { data } = useRemoteOption(props);

  const { optionConvert, fieldProps, hideWhenEmpty = false, prefix, prefixClassName, ...rest } = props;
  const css = useEmotionCss(({ token }) => ({
    position: 'relative',
    '.prefix-icon-wrapper': {
      position: 'absolute',
      zIndex: 1,
      width: '2.3rem',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
    },
    '.ant-select-selector': {
      paddingLeft: prefix ? 'calc(2.3rem - 2px) !important' : '0.5rem',
    },
  }));

  if (ObjectUtils.isEmpty(data)) {
    return hideWhenEmpty ? null : <ProFormSelect {...rest} disabled placeholder={'未找到合适的选项'} />;
  }

  const theOptions = optionConvert?.(data) || data;

  const rootCls = className('remote-select', css);
  // @ts-ignore
  const value = props?.value?.id || props?.value;
  return (
    <div className={rootCls}>
      {prefix && <div className={className('prefix-icon-wrapper', prefixClassName)}>{prefix}</div>}
      <ProFormSelect
        formItemProps={{
          className: 'customized-form-item',
        }}
        options={theOptions}
        {...rest}
        fieldProps={{
          ...fieldProps,
          value,
        }}
      />
    </div>
  );
};

const RemoteSelect = (props) => {
  const { label, name, rules, labelCol, ...rest } = props;
  return (
    <ProFormItem label={label} name={name} rules={rules} labelCol={labelCol} className="customized-form-item">
      <_RemoteSelect {...rest} />
    </ProFormItem>
  );
};

export const RemoteEnum = RemoteSelect;
export default RemoteSelect;
