import { CommonRule } from '@/components/value-type/common-column';
import type { BizResourceType } from '@/http/use-resource';
import { getResource } from '@/http/use-resource';
import _ from 'lodash';
import type { BizSchemaTypes } from './biz-schema-types';

// IMPORTANT: 这个是自动生成的，不要修改。。。。
// IMPORTANT: 这个是自动生成的，不要修改。。。。
// IMPORTANT: 这个是自动生成的，不要修改。。。。

const projectInfo: BizSchemaTypes.ResourceDefine = {
  name: 'projectInfo',
  label: '项目信息',
  linkToUrl: '/api/cdsz/project-info',
  actionList: [
    // entity级别的action
    {
      title: 'Excel导入',
      type: 'import',
      linkToUrl: '/api/cdsz/project-info/import',
    },
    {
      title: 'Excel导出',
      type: 'export',
      linkToUrl: '/api/cdsz/project-info/export',
    },
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'projectInfo',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '项目名称',
      key: 'projectName',
      dataIndex: 'projectName',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '投资主体+项目名称',
      formItemProps: {
        rules: [
          // rules 定义
          CommonRule.required,
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '项目简介',
      key: 'projectDescription',
      dataIndex: 'projectDescription',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '投资内容：     项目选址：    用地规模：',
      width: 160,
      ellipsis: true,
      copyable: true,
      formItemProps: {
        // @ts-ignore
        width: 1024,
        rules: [
          // rules 定义
          { max: 500, message: '最多只能输入500个字符', type: 'string' },
        ],
      },
    },
    {
      title: '企业简介',
      key: 'companyDescription',
      dataIndex: 'companyDescription',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '不超过500字',
      width: 160,
      ellipsis: true,
      copyable: true,
      formItemProps: {
        // @ts-ignore
        width: 1024,
        rules: [
          // rules 定义
          { max: 500, message: '最多只能输入500个字符', type: 'string' },
        ],
      },
    },
    {
      // special for range search
      title: '投资额（亿元）',
      dataIndex: ['params', 'totalInvestment'],
      valueType: 'digitRange',
      hideInForm: true,
      hideInTable: true,
      hideInDescriptions: true,
      group: '',
      tooltip: '',
    },
    {
      title: '投资额（亿元）',
      key: 'totalInvestment',
      dataIndex: 'totalInvestment',
      valueType: 'digit',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          CommonRule.required,
        ],
      },
    },
    {
      title: '产业链领域',
      key: 'industryChain',
      dataIndex: 'industryChain',
      valueType: 'RemoteEnum',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        types: 'IndustryChain',
      },
    },
    {
      title: '产业链地位',
      key: 'industryChainLevel',
      dataIndex: 'industryChainLevel',
      valueType: 'RemoteEnum',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        types: 'IndustryChainLevel',
      },
    },
    {
      title: '进展状态',
      key: 'processStatus',
      dataIndex: 'processStatus',
      valueType: 'RemoteEnum',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        types: 'ProcessStatus',
      },
    },
    {
      title: '进展情况',
      key: 'processBrief',
      dataIndex: 'processBrief',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '最近对接情况及促进建议',
      width: 160,
      ellipsis: true,
      copyable: true,
      formItemProps: {
        // @ts-ignore
        width: 1024,
        rules: [
          // rules 定义
          { max: 500, message: '最多只能输入500个字符', type: 'string' },
        ],
      },
    },
    {
      title: '企业所在地（城市）',
      key: 'city',
      dataIndex: 'city',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '责任区（市）县',
      key: 'ownerRegion',
      dataIndex: 'ownerRegion',
      valueType: 'RemoteEnum',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          CommonRule.required,
        ],
      },
      fieldProps: {
        types: 'OwnerRegion',
      },
    },
    {
      title: '项目经理',
      key: 'projectManager',
      dataIndex: 'projectManager',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '初审评级',
      key: 'reviewrRate',
      dataIndex: 'reviewrRate',
      valueType: 'RemoteEnum',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        types: 'ReviewrRate',
      },
    },
    {
      title: '项目等级',
      key: 'projectLevel',
      dataIndex: 'projectLevel',
      valueType: 'RemoteEnum',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        types: 'ProjectLevel',
      },
    },
    {
      title: '进展更新',
      key: 'processUpdate',
      dataIndex: 'processUpdate',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '不超过500字',
      width: 160,
      ellipsis: true,
      copyable: true,
      formItemProps: {
        // @ts-ignore
        width: 1024,
        rules: [
          // rules 定义
          { max: 500, message: '最多只能输入500个字符', type: 'string' },
        ],
      },
    },
    {
      title: '备注',
      key: 'brief',
      dataIndex: 'brief',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '不超过500字',
      width: 160,
      ellipsis: true,
      copyable: true,
      formItemProps: {
        // @ts-ignore
        width: 1024,
        rules: [
          // rules 定义
          { max: 500, message: '最多只能输入500个字符', type: 'string' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const visitRecord: BizSchemaTypes.ResourceDefine = {
  name: 'visitRecord',
  label: '招商拜访情况',
  linkToUrl: '/api/cdsz/visit-record',
  actionList: [
    // entity级别的action
    {
      title: 'Excel导入',
      type: 'import',
      linkToUrl: '/api/cdsz/visit-record/import',
    },
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'visitRecord',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      // special for range search
      title: '时间',
      dataIndex: ['params', 'visitDate'],
      valueType: 'dateRange',
      hideInForm: true,
      hideInTable: true,
      hideInDescriptions: true,
      group: '',
      tooltip: '访问时间',
    },
    {
      title: '时间',
      key: 'visitDate',
      dataIndex: 'visitDate',
      valueType: 'date',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '访问时间',
      formItemProps: {
        rules: [
          // rules 定义
          CommonRule.required,
        ],
      },
    },
    {
      title: '企业名称',
      key: 'companyName',
      dataIndex: 'companyName',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          CommonRule.required,
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '拜访高层职务姓名',
      key: 'visitUser',
      dataIndex: 'visitUser',
      valueType: 'text',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '例如：副总裁 张三丰',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '拜访城市',
      key: 'visitCity',
      dataIndex: 'visitCity',
      valueType: 'text',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '例如：深圳',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '企业类别',
      key: 'companyType',
      dataIndex: 'companyType',
      valueType: 'RemoteEnum',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        types: 'CompanyType',
      },
    },
    {
      title: '产业领域',
      key: 'industryChain',
      dataIndex: 'industryChain',
      valueType: 'RemoteEnum',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        types: 'IndustryChain',
      },
    },
    {
      title: '产业链地位',
      key: 'industryChainLevel',
      dataIndex: 'industryChainLevel',
      valueType: 'RemoteEnum',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        types: 'IndustryChainLevel',
      },
    },
    {
      title: '促进情况',
      key: 'processState',
      dataIndex: 'processState',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '洽淡主要内容',
      width: 160,
      ellipsis: true,
      copyable: true,
      formItemProps: {
        // @ts-ignore
        width: 1024,
        rules: [
          // rules 定义
          { max: 500, message: '最多只能输入500个字符', type: 'string' },
        ],
      },
    },
    {
      title: '对接方式',
      key: 'contactType',
      dataIndex: 'contactType',
      valueType: 'RemoteEnum',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        types: 'ContactType',
      },
    },
    {
      title: '对接成效',
      key: 'contactResult',
      dataIndex: 'contactResult',
      valueType: 'RemoteEnum',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        types: 'ContactResult',
      },
    },
    {
      title: '获取项目信息',
      key: 'projectInfo',
      dataIndex: 'projectInfo',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '项目名称',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '是否重大及高能级项目',
      key: 'bigProject',
      dataIndex: 'bigProject',
      valueType: 'switch',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      align: 'center',
      fieldProps: {
        checkedChildren: '是',
        unCheckedChildren: '否',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '带队领导级别',
      key: 'leaderType',
      dataIndex: 'leaderType',
      valueType: 'RemoteEnum',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        types: 'LeaderType',
      },
    },
    {
      title: '人员职务姓名',
      key: 'leaderName',
      dataIndex: 'leaderName',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '责任区（市）县',
      key: 'ownerRegion',
      dataIndex: 'ownerRegion',
      valueType: 'RemoteEnum',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          CommonRule.required,
        ],
      },
      fieldProps: {
        types: 'OwnerRegion',
      },
    },
    {
      title: '共同促进情况',
      key: 'pushStatus',
      dataIndex: 'pushStatus',
      valueType: 'RemoteEnum',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        types: 'PushStatus',
      },
    },
    {
      title: '备注',
      key: 'brief',
      dataIndex: 'brief',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '不超过500字',
      width: 160,
      ellipsis: true,
      copyable: true,
      formItemProps: {
        // @ts-ignore
        width: 1024,
        rules: [
          // rules 定义
          { max: 500, message: '最多只能输入500个字符', type: 'string' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const companyContact: BizSchemaTypes.ResourceDefine = {
  name: 'companyContact',
  label: '企业联络信息',
  linkToUrl: '/api/cdsz/company-contact',
  actionList: [
    // entity级别的action
    {
      title: 'Excel导入',
      type: 'import',
      linkToUrl: '/api/cdsz/company-contact/import',
    },
    {
      title: 'Excel导出',
      type: 'export',
      linkToUrl: '/api/cdsz/company-contact/export',
    },
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'companyContact',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '姓名',
      key: 'title',
      dataIndex: 'title',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          CommonRule.required,
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '企业名称',
      key: 'companyName',
      dataIndex: 'companyName',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '职务',
      key: 'job',
      dataIndex: 'job',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '高管',
      key: 'seniorManager',
      dataIndex: 'seniorManager',
      valueType: 'switch',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      align: 'center',
      fieldProps: {
        checkedChildren: '是',
        unCheckedChildren: '否',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '手机号',
      key: 'mobile',
      dataIndex: 'mobile',
      valueType: 'text',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '电子邮件',
      key: 'email',
      dataIndex: 'email',
      valueType: 'text',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '所在省份',
      key: 'addressProvince',
      dataIndex: 'addressProvince',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '地址',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '所在城市',
      key: 'addressCity',
      dataIndex: 'addressCity',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '地址',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '详细地址',
      key: 'address',
      dataIndex: 'address',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '地址',
      tooltip: '',
      width: 160,
      ellipsis: true,
      copyable: true,
      formItemProps: {
        // @ts-ignore
        width: 1024,
        rules: [
          // rules 定义
          { max: 200, message: '最多只能输入200个字符', type: 'string' },
        ],
      },
    },
    {
      title: '产业类别',
      key: 'industryType',
      dataIndex: 'industryType',
      valueType: 'RemoteEnum',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        types: 'IndustryType',
      },
    },
    {
      title: '来源',
      key: 'source',
      dataIndex: 'source',
      valueType: 'text',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '备注',
      key: 'brief',
      dataIndex: 'brief',
      valueType: 'textarea',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '不超过500字',
      width: 160,
      ellipsis: true,
      copyable: true,
      formItemProps: {
        // @ts-ignore
        width: 1024,
        rules: [
          // rules 定义
          { max: 500, message: '最多只能输入500个字符', type: 'string' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const governmentAffairsLocation: BizSchemaTypes.ResourceDefine = {
  name: 'governmentAffairsLocation',
  label: '政务点位',
  linkToUrl: '/api/cdsz/government-affairs-location',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'governmentAffairsLocation',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '类别',
      key: 'affairsType',
      dataIndex: 'affairsType',
      valueType: 'RemoteEnum',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        types: 'GovernmentAffairsType',
      },
    },
    {
      title: '点位名称',
      key: 'title',
      dataIndex: 'title',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          CommonRule.required,
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '点位简介',
      key: 'description',
      dataIndex: 'description',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '不超过2000字',
      width: 160,
      ellipsis: true,
      copyable: true,
      formItemProps: {
        // @ts-ignore
        width: 1024,
        rules: [
          // rules 定义
          { max: 2000, message: '最多只能输入2000个字符', type: 'string' },
        ],
      },
    },
    {
      title: '城市',
      key: 'city',
      dataIndex: 'city',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          CommonRule.required,
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '地址',
      key: 'address',
      dataIndex: 'address',
      valueType: 'textarea',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      width: 160,
      ellipsis: true,
      copyable: true,
      formItemProps: {
        // @ts-ignore
        width: 1024,
        rules: [
          // rules 定义
          { max: 300, message: '最多只能输入300个字符', type: 'string' },
        ],
      },
    },
    {
      title: '联系人',
      key: 'contact',
      dataIndex: 'contact',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 200, message: '最多只能输入200个字符', type: 'string' },
        ],
      },
    },
    {
      title: '备注',
      key: 'brief',
      dataIndex: 'brief',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '不超过500字',
      width: 160,
      ellipsis: true,
      copyable: true,
      formItemProps: {
        // @ts-ignore
        width: 1024,
        rules: [
          // rules 定义
          { max: 500, message: '最多只能输入500个字符', type: 'string' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const hotel: BizSchemaTypes.ResourceDefine = {
  name: 'hotel',
  label: '接待酒店',
  linkToUrl: '/api/cdsz/hotel',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'hotel',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '城市',
      key: 'city',
      dataIndex: 'city',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          CommonRule.required,
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '区域',
      key: 'region',
      dataIndex: 'region',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          CommonRule.required,
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '酒店名称',
      key: 'title',
      dataIndex: 'title',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          CommonRule.required,
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '订房电话',
      key: 'phone',
      dataIndex: 'phone',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '联系人',
      key: 'contact',
      dataIndex: 'contact',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '联系电话',
      key: 'contactMobile',
      dataIndex: 'contactMobile',
      valueType: 'Mobile',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 16, message: '最多只能输入16个字符', type: 'string' },
          CommonRule.mobile,
        ],
      },
    },
    {
      title: '营业地址',
      key: 'address',
      dataIndex: 'address',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 300, message: '最多只能输入300个字符', type: 'string' },
        ],
      },
    },
    {
      title: '等级评价',
      key: 'hotelRate',
      dataIndex: 'hotelRate',
      valueType: 'RemoteEnum',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        types: 'HotelRate',
      },
    },
    {
      title: '备注',
      key: 'brief',
      dataIndex: 'brief',
      valueType: 'textarea',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '不超过500字',
      width: 160,
      ellipsis: true,
      copyable: true,
      formItemProps: {
        // @ts-ignore
        width: 1024,
        rules: [
          // rules 定义
          { max: 500, message: '最多只能输入500个字符', type: 'string' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const restaurant: BizSchemaTypes.ResourceDefine = {
  name: 'restaurant',
  label: '接待餐厅',
  linkToUrl: '/api/cdsz/restaurant',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'restaurant',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '城市',
      key: 'city',
      dataIndex: 'city',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          CommonRule.required,
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '区域',
      key: 'region',
      dataIndex: 'region',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          CommonRule.required,
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '餐厅',
      key: 'title',
      dataIndex: 'title',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          CommonRule.required,
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '菜系',
      key: 'menuType',
      dataIndex: 'menuType',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          CommonRule.required,
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '特色',
      key: 'restaurantSpecial',
      dataIndex: 'restaurantSpecial',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          CommonRule.required,
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '接待分类',
      key: 'restaurantType',
      dataIndex: 'restaurantType',
      valueType: 'RemoteEnum',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        types: 'RestaurantType',
      },
    },
    {
      title: '订餐电话',
      key: 'phone',
      dataIndex: 'phone',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 200, message: '最多只能输入200个字符', type: 'string' },
        ],
      },
    },
    {
      title: '营业地址',
      key: 'address',
      dataIndex: 'address',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 300, message: '最多只能输入300个字符', type: 'string' },
        ],
      },
    },
    {
      title: '备注',
      key: 'brief',
      dataIndex: 'brief',
      valueType: 'textarea',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '',
      tooltip: '',
      width: 160,
      ellipsis: true,
      copyable: true,
      formItemProps: {
        // @ts-ignore
        width: 1024,
        rules: [
          // rules 定义
          { max: 500, message: '最多只能输入500个字符', type: 'string' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

export type ResourceNameType =
  | 'projectInfo'
  | 'visitRecord'
  | 'companyContact'
  | 'governmentAffairsLocation'
  | 'hotel'
  | 'restaurant'
  | any;

function mergeListByDataIndex(parent, sub) {
  const sorted = _.unionBy(parent, sub, 'dataIndex') as any[];
  const list = _.unionBy(sub, parent, 'dataIndex') as any[];
  return sorted.map((it) => _.find(list, (v) => v.dataIndex === it.dataIndex)) as any;
}

function enhanceSchema<T>(
  sub: any,
  parent?: any,
): {
  getResource: () => BizResourceType<T>;
} & BizSchemaTypes.ResourceDefine {
  const result = {
    ...(parent || {}),
    ...(sub || {}),
    resource: getResource<T>(sub?.linkToUrl || parent?.linkToUrl),
  };
  if (parent && sub) {
    return {
      ...result,
      columns: mergeListByDataIndex(parent.columns, sub.columns),
      listProps: mergeListByDataIndex(parent.listProps, sub.listProps),
    };
  }
  return result;
}

const schemas = {
  projectInfo: enhanceSchema(projectInfo),
  visitRecord: enhanceSchema(visitRecord),
  companyContact: enhanceSchema(companyContact),
  governmentAffairsLocation: enhanceSchema(governmentAffairsLocation),
  hotel: enhanceSchema(hotel),
  restaurant: enhanceSchema(restaurant),
};

const BizSchema = {
  Root: {
    //当前项目信息
    title: '线上办公系统',
    logo: 'https://tiandtech.oss-cn-chengdu.aliyuncs.com/cdsz/logo.png',
    name: 'cdsz',
    brief: '成都驻深办',
    owner: '钛安科技',
  },
  ...schemas,
  get: (name) => schemas[_.camelCase(name)] || {},
};

export default BizSchema;
