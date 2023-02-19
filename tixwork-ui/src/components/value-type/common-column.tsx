import type { ProColumnType } from '@ant-design/pro-components';

type CommonRuleKey = 'text' | 'required' | 'mobile' | 'email';
export const CommonRule: Record<CommonRuleKey, any> = {
  text: {
    max: 100,
    message: '最多只能输入100个字符',
    type: 'string',
  },
  required: {
    required: true,
    message: '此项为必填项',
  },
  mobile: {
    pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
    message: '手机号格式错误！',
  },
  email: {
    type: 'email',
    message: 'Email号格式错误',
  },
};

const status: ProColumnType = {
  title: '状态',
  dataIndex: 'status',
  align: 'center',
  width: 'sm',
  valueType: 'radioButton',
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
  formItemProps: {
    rules: [CommonRule.required],
  },
};

const createTime: ProColumnType = {
  title: '创建时间',
  dataIndex: 'createTime',
  align: 'center',
  width: 'sm',
  hideInForm: true,
  hideInSearch: true,
};

const remark: ProColumnType = {
  title: '备注',
  dataIndex: 'remark',
  valueType: 'textarea',
  ellipsis: true,
  width: 'xl',
  hideInSearch: true,
};

const CommonColumn: Record<string, ProColumnType<any, any>> = {
  status,
  createTime,
  remark,
};

export default CommonColumn;
