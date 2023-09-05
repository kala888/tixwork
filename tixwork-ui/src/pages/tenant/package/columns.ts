import { EleValueType } from '@/components/value-type';
import { CommonRule } from '@/components/value-type/common-column';
import { API } from '@/http/api-types';
import { ProColumnType } from '@ant-design/pro-components';

export const columns: ProColumnType<API.Notice, EleValueType>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50,
    hideInForm: true,
    hideInTable: true,
  },
  {
    title: '套餐名称',
    dataIndex: 'packageName',
    formItemProps: {
      rules: [CommonRule.required, { max: 200, message: '最大长度不能超过200' }],
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    valueType: 'radioButton',
    hideInSearch: true,
    valueEnum: {
      '1': {
        text: '停用',
        status: 'Error',
      },
      '0': {
        text: '正常',
        status: 'Processing',
      },
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    valueType: 'textarea',
    ellipsis: true,
    width: 'xl',
    hideInTable: true,
    formItemProps: {
      rules: [{ max: 20, message: '最大长度不能超过20' }],
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    hideInForm: true,
    hideInTable: true,
  },
];
