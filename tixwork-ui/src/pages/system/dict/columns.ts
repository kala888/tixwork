import type { EleValueType } from '@/components/value-type';
import CommonColumn, { CommonRule } from '@/components/value-type/common-column';
import type { ProColumnType } from '@ant-design/pro-components';

export const columns: ProColumnType<API.Dict, EleValueType>[] = [
  {
    title: '类型',
    dataIndex: 'type',
    valueType: 'RemoteEnum',
    align: 'center',
    // initialValue: 'VALUE',
    formItemProps: {
      rules: [CommonRule.required],
    },
    fieldProps: {
      allowClear: false,
      types: 'ConfigType',
    },
  },
  {
    title: 'ID',
    dataIndex: 'id',
    hideInTable: true,
    hideInForm: true,
    hideInSearch: true,
  },
  {
    title: '名称',
    dataIndex: 'label',
    tooltip: '一般是中文名称',
    formItemProps: {
      rules: [CommonRule.required],
    },
  },
  {
    title: '编码',
    dataIndex: 'code',
    formItemProps: {
      rules: [CommonRule.required],
    },
  },
  {
    // @ts-ignore
    valueType: 'dependency',
    fieldProps: {
      name: ['type'],
    },
    hideInTable: true, // 非常重要
    hideInSearch: true,
    hideInDescriptions: true,
    // @ts-ignore
    columns: (values) => {
      console.log('values', values);
      const disabled = values.type !== 'VALUE';
      if (disabled) {
        return [];
      }
      return [
        {
          width: 'xl',
          title: '参数值',
          dataIndex: 'value',
          tooltip: '值对象，如果类型是Group或者Group的子对象，value可以为空，默认去code的值',
          fieldProps: {
            disabled,
            placeholder: disabled ? '无需填写，编码即值' : '请输入值',
          },
          formItemProps: {
            rules: disabled ? [] : [CommonRule.required],
          },
        },
      ];
    },
  },

  {
    title: '数据级别',
    dataIndex: 'dataScope',
    valueType: 'RemoteEnum',
    initialValue: 'PUBLIC', // 自定义搜索的默认值
    formItemProps: {
      rules: [CommonRule.required],
    },
    fieldProps: {
      rules: [CommonRule.required],
      types: 'ConfigDataScope',
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'RemoteEnum',
    align: 'center',
    hideInSearch: true,
    initialValue: 'ENABLED',
    formItemProps: {
      rules: [CommonRule.required],
    },
    fieldProps: {
      types: 'status',
    },
  },
  CommonColumn.remark,
];

export const columnsForSub: ProColumnType<API.Dict, EleValueType>[] = [
  {
    title: '编码',
    dataIndex: 'code',
    formItemProps: {
      rules: [CommonRule.required],
    },
  },
  {
    title: '名称',
    dataIndex: 'label',
    tooltip: '一般是中文名称',
  },
  {
    title: '参数值',
    dataIndex: 'value',
    tooltip: '一般是中文名称',
  },
  {
    title: '排序',
    dataIndex: 'sortOrder',
    valueType: 'digit',
  },
  {
    title: '默认值?',
    dataIndex: 'isDefault',
    valueType: 'radioButton',
    initialValue: 'N',
    fieldProps: {
      buttonStyle: 'solid',
    },
    valueEnum: {
      N: '否',
      Y: '是',
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'RemoteEnum',
    align: 'center',
    hideInSearch: true,
    fieldProps: {
      types: 'status',
    },
  },
  {
    title: '展示Level',
    dataIndex: 'configLevel',
    valueType: 'RemoteEnum',
    align: 'center',
    hideInSearch: true,
    fieldProps: {
      types: 'ConfigLevel',
    },
  },
  CommonColumn.remark,
];
