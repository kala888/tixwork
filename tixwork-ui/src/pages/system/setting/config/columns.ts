import { EleValueType } from '@/components/value-type';
import { CommonRule } from '@/components/value-type/common-column';
import { API } from '@/http/api-types';
import { ProColumnType } from '@ant-design/pro-components';

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
    formItemProps: {
      rules: [CommonRule.required],
    },
    fieldProps: {
      placeholder: '中文展示',
    },
  },
  {
    title: '配置值',
    dataIndex: 'value',
    formItemProps: {
      rules: [CommonRule.required],
    },
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
  {
    title: '备注',
    dataIndex: 'remark',
    valueType: 'textarea',
    hideInTable: true,
    ellipsis: true,
    width: 'xl',
    hideInSearch: true,
  },
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
    width: 140,
  },
];
