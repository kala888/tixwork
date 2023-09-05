import type { EleValueType } from '@/components/value-type';
import CommonColumn, { CommonRule } from '@/components/value-type/common-column';
import type { API } from '@/http/api-types';
import type { ProColumnType } from '@ant-design/pro-components';

export const columns: ProColumnType<API.Config, EleValueType>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    hideInTable: true,
    hideInForm: true,
    hideInSearch: true,
  },
  {
    title: 'Key',
    dataIndex: 'key',
    formItemProps: {
      rules: [
        CommonRule.required,
        {
          pattern: /\./,
          message: '必须包含 ".", 以便区分系统枚举，例如：sys.status',
        },
      ],
    },
    fieldProps: {
      placeholder: '英文Key',
    },
  },
  {
    title: '名称',
    dataIndex: 'title',
    tooltip: '一般是中文名称',
    formItemProps: {
      rules: [CommonRule.required],
    },
    fieldProps: {
      placeholder: '中文名称',
    },
    align: 'center',
    hideInSearch: true,
  },

  {
    title: '数据级别',
    dataIndex: 'dataScope',
    valueType: 'RemoteRadio',
    align: 'center',
    hideInSearch: true,
    // initialValue: 'PUBLIC', // 自定义搜索的默认值
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
    valueType: 'RemoteRadio',
    align: 'center',
    hideInSearch: true,
    formItemProps: {
      rules: [CommonRule.required],
    },
    fieldProps: {
      types: 'sys.status',
    },
  },
  CommonColumn.remark,
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    hideInTable: true,
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: '更新时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    hideInSearch: true,
    hideInForm: true,
  },
];

export const columnsForSub: ProColumnType<API.Config, EleValueType>[] = [
  {
    title: '值名称',
    dataIndex: 'title',
    tooltip: '一般是中文名称',
    formItemProps: {
      rules: [CommonRule.required],
    },
  },
  {
    title: '参数值',
    dataIndex: 'value',
    tooltip: '一般是中文名称',
    formItemProps: {
      rules: [CommonRule.required],
    },
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
  CommonColumn.remark,
];
