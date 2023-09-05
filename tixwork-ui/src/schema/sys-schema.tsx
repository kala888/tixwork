import { CommonRule } from '@/components/value-type/common-column';
import { ResourceDefine } from '@/schema/schema-types';

export const sysUser: ResourceDefine = {
  name: 'sysUser',
  label: '用户',
  brief: '系统用户定义',
  linkToUrl: '/api/system/user',
  actionList: [
    // entity级别的action
    {
      code: 'create',
    },
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
      hideInForm: true,
    },
    {
      title: '显示名称',
      tooltip: '仅显示，不用于登录',
      dataIndex: 'nickName',
      valueType: 'NickName',
      width: 200,
    },
    {
      title: '登录账号',
      dataIndex: 'userName',
      copyable: true,
    },
    {
      title: '部门',
      hideInSearch: true,
      dataIndex: ['dept', 'displayName'],
      align: 'center',
      search: false,
    },
    {
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
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: true,
      hideInDescriptions: false,
    },
  ],
  listProps: [
    // protable 定义
  ],
};

export const sysTenant: ResourceDefine = {
  name: 'sysTenant',
  label: '租户',
  brief: '系统租户定义',
  linkToUrl: '/api/system/tenant',
  actionList: [
    // entity级别的action
    {
      code: 'create',
    },
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      width: 60,
      hideInForm: true,
      hideInSearch: true,
      fieldProps: {
        objectType: 'sysTenant',
      },
    },
    {
      title: '租户编号',
      dataIndex: 'tenantId',
    },
    {
      title: '企业名称',
      dataIndex: 'companyName',
      group: '企业信息',
    },
    {
      title: '企业信用代码',
      dataIndex: 'creditCode',
      hideInSearch: true,
      group: '企业信息',
    },
    {
      title: '联系人',
      dataIndex: 'contactUserName',
      hideInSearch: true,
      group: '联系方式',
    },
    {
      title: '联系电话',
      dataIndex: 'contactMobile',
      valueType: 'Mobile',
      hideInSearch: true,
      group: '联系方式',
    },
    {
      title: '地址',
      dataIndex: 'address',
      hideInTable: true,
      hideInSearch: true,
      group: '联系方式',
    },
    {
      title: '企业简介',
      dataIndex: 'intro',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
      group: '企业信息',
    },
    {
      title: '绑定域名',
      dataIndex: 'domain',
      hideInSearch: true,
      group: '企业配置',
    },
    {
      title: '套餐',
      dataIndex: 'packageId',
      hideInSearch: true,
      group: '企业配置',
      valueType: 'Object',
      fieldProps: {
        objectType: 'tenantPackage',
      },
    },
    {
      title: '用户数量',
      dataIndex: 'accountCount',
      hideInSearch: true,
      group: '企业配置',
    },
    {
      title: '过期时间',
      dataIndex: 'expireTime',
      hideInSearch: true,
      group: '企业配置',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 'sm',
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
      group: '企业配置',
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: true,
      hideInDescriptions: false,
    },
  ],
  listProps: [
    // protable 定义
  ],
};
