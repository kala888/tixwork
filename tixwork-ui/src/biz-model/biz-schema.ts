import type { EleValueType } from '@/components/value-type';
import type { ProColumnType } from '@ant-design/pro-components';
import { CommonRule } from '@/components/value-type/common-column';
import _ from 'lodash';

// IMPORTANT: 这个是自动生成的，不要修改。。。。
// IMPORTANT: 这个是自动生成的，不要修改。。。。
// IMPORTANT: 这个是自动生成的，不要修改。。。。

type ResourceExtraDef = {
  group?: string;
};

type ActionType = {
  title: string;
  type: 'import' | 'view' | string;
  linkToUrl: string;
};

type ResourceDefine = {
  name: string;
  label: string;
  uri: string;
  linkToUrl: string;
  actionList?: ActionType[];
  columns: (ProColumnType<any, EleValueType> & ResourceExtraDef)[];
  listProps?: ProColumnType<any, EleValueType>[];
  tableConfig: {
    rowKey?: string;
    search?: false;
    options?: false;
    toolBarRender?: false;
    lineActionList?: false;
    [key: string]: any;
  };
};

const courseRecord: ResourceDefine = {
  name: 'courseRecord',
  label: '历程',
  uri: '/api/engineseals/course-record',
  linkToUrl: '/engineseals/course-record',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'courseRecord',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '历程信息',
      dataIndex: 'title',
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
    {
      title: '历程类型',
      dataIndex: 'courseType',
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
        types: 'CourseType',
      },
    },
    {
      title: '密封件',
      dataIndex: 'accessories',
      valueType: 'Object',
      hideInSearch: true,
      tooltip: '',
      group: '历程',
      fieldProps: {
        objectType: 'Accessories',
        searchUrl: '/api/engineseals/accessories/list',
        fields: [
          { fieldName: 'id', fieldLabel: 'ID' },
          { fieldName: 'title', fieldLabel: '名称' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const factoryInformation: ResourceDefine = {
  name: 'factoryInformation',
  label: '出厂信息',
  uri: '/api/engineseals/factory-information',
  linkToUrl: '/engineseals/factory-information',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'factoryInformation',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '出厂试验',
      dataIndex: 'title',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: false,
      hideInForm: false,
      group: '出厂试验',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '出厂试验图片',
      dataIndex: 'titleImage',
      valueType: 'ImageList',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '出厂试验',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        maxCount: 3,
      },
    },
    {
      title: '审理单',
      dataIndex: 'checkList',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '审理单',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '审理单图片',
      dataIndex: 'checkListImage',
      valueType: 'ImageList',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '审理单',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        maxCount: 3,
      },
    },
    {
      title: '合格证',
      dataIndex: 'certificate',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '合格证',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '合格证图片',
      dataIndex: 'certificateImage',
      valueType: 'ImageList',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '合格证',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        maxCount: 3,
      },
    },
    {
      title: '质量证明',
      dataIndex: 'qualityCertificate',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '质量证明',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '质量证明图片',
      dataIndex: 'qualityCertificateImage',
      valueType: 'ImageList',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '质量证明',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        maxCount: 3,
      },
    },
    {
      title: '加工过程及状态',
      dataIndex: 'processStatus',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '加工过程及状态',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '加工过程及状态图片',
      dataIndex: 'processStatusImage',
      valueType: 'ImageList',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '加工过程及状态',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
      fieldProps: {
        maxCount: 3,
      },
    },
    {
      title: '密封件',
      dataIndex: 'accessories',
      valueType: 'Object',
      hideInSearch: true,
      tooltip: '',
      group: '历程',
      fieldProps: {
        objectType: 'Accessories',
        searchUrl: '/api/engineseals/accessories/list',
        fields: [
          { fieldName: 'id', fieldLabel: 'ID' },
          { fieldName: 'title', fieldLabel: '名称' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const assembleInfo: ResourceDefine = {
  name: 'assembleInfo',
  label: '装配信息',
  uri: '/api/engineseals/assemble-info',
  linkToUrl: '/engineseals/assemble-info',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'assembleInfo',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '装配描述',
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
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '装配日期',
      dataIndex: 'experimentalTime',
      valueType: 'dateTime',
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
    },
    {
      title: '装配测量值',
      dataIndex: 'measurementValues',
      valueType: 'jsonCode',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 4000, message: '最多只能输入4000个字符', type: 'string' },
        ],
      },
    },
    {
      title: '装配情况',
      dataIndex: 'inventoryRecord',
      valueType: 'Object',
      hideInSearch: true,
      hideInTable: true,
      group: '',
      tooltip: '',
      fieldProps: {
        objectType: 'inventoryRecord',
        searchUrl: '/api/engineseals/inventory-record/list',
        fields: [{ fieldName: 'id', fieldLabel: 'ID' }],
      },
    },
    {
      title: '密封件',
      dataIndex: 'accessories',
      valueType: 'Object',
      hideInSearch: true,
      tooltip: '',
      group: '历程',
      fieldProps: {
        objectType: 'Accessories',
        searchUrl: '/api/engineseals/accessories/list',
        fields: [
          { fieldName: 'id', fieldLabel: 'ID' },
          { fieldName: 'title', fieldLabel: '名称' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const dismantlingInfo: ResourceDefine = {
  name: 'dismantlingInfo',
  label: '分解信息',
  uri: '/api/engineseals/dismantling-info',
  linkToUrl: '/engineseals/dismantling-info',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'dismantlingInfo',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '状态',
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
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '磨损',
      dataIndex: 'wear',
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
      title: '泄漏率',
      dataIndex: 'leakRate',
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
      title: '外观',
      dataIndex: 'exterior',
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
      title: '密封件',
      dataIndex: 'accessories',
      valueType: 'Object',
      hideInSearch: true,
      tooltip: '',
      group: '历程',
      fieldProps: {
        objectType: 'Accessories',
        searchUrl: '/api/engineseals/accessories/list',
        fields: [
          { fieldName: 'id', fieldLabel: 'ID' },
          { fieldName: 'title', fieldLabel: '名称' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const experimentalInfo: ResourceDefine = {
  name: 'experimentalInfo',
  label: '试验信息',
  uri: '/api/engineseals/experimental-info',
  linkToUrl: '/engineseals/experimental-info',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'experimentalInfo',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '试验内容',
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
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '时长',
      dataIndex: 'experimentalTime',
      valueType: 'dateTime',
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
    },
    {
      title: '关键参数1',
      dataIndex: 'data1',
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
      title: '关键参数2',
      dataIndex: 'data2',
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
      title: '关键参数3',
      dataIndex: 'data3',
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
      title: '密封件',
      dataIndex: 'accessories',
      valueType: 'Object',
      hideInSearch: true,
      tooltip: '',
      group: '历程',
      fieldProps: {
        objectType: 'Accessories',
        searchUrl: '/api/engineseals/accessories/list',
        fields: [
          { fieldName: 'id', fieldLabel: 'ID' },
          { fieldName: 'title', fieldLabel: '名称' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const troubleInfo: ResourceDefine = {
  name: 'troubleInfo',
  label: '故障信息',
  uri: '/api/engineseals/trouble-info',
  linkToUrl: '/engineseals/trouble-info',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'troubleInfo',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '故障描述',
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
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '故障类型',
      dataIndex: 'troubleType',
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
        types: 'TroubleType',
      },
    },
    {
      title: '密封件',
      dataIndex: 'accessories',
      valueType: 'Object',
      hideInSearch: true,
      tooltip: '',
      group: '历程',
      fieldProps: {
        objectType: 'Accessories',
        searchUrl: '/api/engineseals/accessories/list',
        fields: [
          { fieldName: 'id', fieldLabel: 'ID' },
          { fieldName: 'title', fieldLabel: '名称' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const inventoryRecord: ResourceDefine = {
  name: 'inventoryRecord',
  label: '出入库记录',
  uri: '/api/engineseals/inventory-record',
  linkToUrl: '/engineseals/inventory-record',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'inventoryRecord',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '库存信息',
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
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '方向',
      dataIndex: 'recordOption',
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
        types: 'RecordOption',
      },
    },
    {
      title: '变动时间',
      dataIndex: 'recordTime',
      valueType: 'dateTime',
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
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const repairRecord: ResourceDefine = {
  name: 'repairRecord',
  label: '配件维修记录',
  uri: '/api/engineseals/repair-record',
  linkToUrl: '/engineseals/repair-record',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'repairRecord',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      valueType: 'date',
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
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      valueType: 'date',
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
    },
    {
      title: '维修原因',
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
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '维修厂商',
      dataIndex: 'supplier',
      valueType: 'Object',
      hideInSearch: true,
      hideInTable: true,
      group: '',
      tooltip: '',
      fieldProps: {
        objectType: 'supplier',
        searchUrl: '/api/engineseals/supplier/list',
        fields: [{ fieldName: 'id', fieldLabel: 'ID' }],
      },
    },
    {
      title: '密封件',
      dataIndex: 'accessories',
      valueType: 'Object',
      hideInSearch: true,
      tooltip: '',
      group: '历程',
      fieldProps: {
        objectType: 'Accessories',
        searchUrl: '/api/engineseals/accessories/list',
        fields: [
          { fieldName: 'id', fieldLabel: 'ID' },
          { fieldName: 'title', fieldLabel: '名称' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const engineModel: ResourceDefine = {
  name: 'engineModel',
  label: '发动机型号',
  uri: '/api/engineseals/engine-model',
  linkToUrl: '/engineseals/engine-model',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'engineModel',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '名称',
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
      title: '代号',
      dataIndex: 'code',
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
      title: '描述',
      dataIndex: 'brief',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
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
    {
      title: '密封位置配置',
      dataIndex: 'sealTypeConfig',
      valueType: 'jsonCode',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 4000, message: '最多只能输入4000个字符', type: 'string' },
        ],
      },
    },
    {
      title: '示意图',
      dataIndex: 'modelImage',
      valueType: 'Image',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 400, message: '最多只能输入400个字符', type: 'string' },
        ],
      },
    },
    {
      title: '可视化配置',
      dataIndex: 'dataVision',
      valueType: 'jsonCode',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '发动机可视化配置',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 4000, message: '最多只能输入4000个字符', type: 'string' },
        ],
      },
    },
    {
      title: '总装单位',
      dataIndex: 'assembleFactory',
      valueType: 'Object',
      hideInSearch: true,
      hideInTable: false,
      group: '',
      tooltip: '',
      fieldProps: {
        objectType: 'supplier',
        searchUrl: '/api/engineseals/supplier/list',
        fields: [{ fieldName: 'id', fieldLabel: 'ID' }],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const engine: ResourceDefine = {
  name: 'engine',
  label: '发动机台份',
  uri: '/api/engineseals/engine',
  linkToUrl: '/engineseals/engine',
  actionList: [
    // entity级别的action
    {
      title: '变更状态',
      type: '',
      linkToUrl: '/api/engineseals/engine/变更状态',
    },
    {
      title: '变更位置',
      type: '',
      linkToUrl: '/api/engineseals/engine/变更位置',
    },
    {
      title: '替换零件',
      type: '',
      linkToUrl: '/api/engineseals/engine/替换零件',
    },
    {
      title: '装配',
      type: '',
      linkToUrl: '/api/engineseals/engine/装配',
    },
    {
      title: '分解',
      type: '',
      linkToUrl: '/api/engineseals/engine/分解',
    },
    {
      title: '维修',
      type: '',
      linkToUrl: '/api/engineseals/engine/维修',
    },
    {
      title: '试验',
      type: '',
      linkToUrl: '/api/engineseals/engine/试验',
    },
    {
      title: '故障',
      type: '',
      linkToUrl: '/api/engineseals/engine/故障',
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
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'engine',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '编号',
      dataIndex: 'code',
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
      title: '描述',
      dataIndex: 'brief',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
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
    {
      title: '批次号',
      dataIndex: 'batchNumber',
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
      title: '阶段',
      dataIndex: 'stage',
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
        types: 'Stage',
      },
    },
    {
      title: '状态',
      dataIndex: 'engineStatus',
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
        types: 'EngineStatus',
      },
    },
    {
      title: '当前状态开始时间',
      dataIndex: 'engineStatusStartTime',
      valueType: 'dateTime',
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
    },
    {
      title: '当前状态结束时间',
      dataIndex: 'engineStatusEndTime',
      valueType: 'dateTime',
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
    },
    {
      title: '存放时间',
      dataIndex: 'instockTime',
      valueType: 'dateTime',
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
    },
    {
      title: '示意图',
      dataIndex: 'modelImage',
      valueType: 'Image',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: '',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 400, message: '最多只能输入400个字符', type: 'string' },
        ],
      },
    },
    {
      title: '型号',
      dataIndex: 'engineModel',
      valueType: 'Object',
      hideInSearch: true,
      hideInTable: true,
      group: '',
      tooltip: '',
      fieldProps: {
        objectType: 'engineModel',
        searchUrl: '/api/engineseals/engine-model/list',
        fields: [{ fieldName: 'id', fieldLabel: 'ID' }],
      },
    },
    {
      title: '存放位置',
      dataIndex: 'instockLocation',
      valueType: 'Object',
      hideInSearch: true,
      hideInTable: true,
      group: '',
      tooltip: '',
      fieldProps: {
        objectType: 'location',
        searchUrl: '/api/engineseals/location/list',
        fields: [{ fieldName: 'id', fieldLabel: 'ID' }],
      },
    },
  ],
  listProps: [
    // protable 定义
    {
      title: '密封位置',
      dataIndex: 'accessoriesList',
      tooltip: '',
      fieldProps: {
        editable: false,
        searchKey: 'engine',
        objectType: 'Accessories',
        relationship: 'Accessories',
      },
    },
  ],
};

const experimentalDevice: ResourceDefine = {
  name: 'experimentalDevice',
  label: '试验器',
  uri: '/api/engineseals/experimental-device',
  linkToUrl: '/engineseals/experimental-device',
  actionList: [
    // entity级别的action
    {
      title: '修改状态',
      type: '',
      linkToUrl: '/api/engineseals/experimental-device/修改状态',
    },
    {
      title: '变更位置',
      type: '',
      linkToUrl: '/api/engineseals/experimental-device/变更位置',
    },
    {
      title: '替换零件',
      type: '',
      linkToUrl: '/api/engineseals/experimental-device/替换零件',
    },
    {
      title: '装配',
      type: '',
      linkToUrl: '/api/engineseals/experimental-device/装配',
    },
    {
      title: '分解',
      type: '',
      linkToUrl: '/api/engineseals/experimental-device/分解',
    },
    {
      title: '维修',
      type: '',
      linkToUrl: '/api/engineseals/experimental-device/维修',
    },
    {
      title: '试验',
      type: '',
      linkToUrl: '/api/engineseals/experimental-device/试验',
    },
    {
      title: '故障',
      type: '',
      linkToUrl: '/api/engineseals/experimental-device/故障',
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
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'experimentalDevice',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '名称',
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
      title: '代号',
      dataIndex: 'code',
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
      title: '状态',
      dataIndex: 'experimentalDeviceStatus',
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
        types: 'ExperimentalDeviceStatus',
      },
    },
    {
      title: '描述',
      dataIndex: 'brief',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
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
    {
      title: '归属',
      dataIndex: 'owner',
      valueType: 'Object',
      hideInSearch: true,
      hideInTable: true,
      group: '',
      tooltip: '',
      fieldProps: {
        objectType: 'supplier',
        searchUrl: '/api/engineseals/supplier/list',
        fields: [{ fieldName: 'id', fieldLabel: 'ID' }],
      },
    },
    {
      title: '存放位置',
      dataIndex: 'instockLocation',
      valueType: 'Object',
      hideInSearch: true,
      hideInTable: true,
      group: '',
      tooltip: '',
      fieldProps: {
        objectType: 'location',
        searchUrl: '/api/engineseals/location/list',
        fields: [{ fieldName: 'id', fieldLabel: 'ID' }],
      },
    },
  ],
  listProps: [
    // protable 定义
    {
      title: '密封装置',
      dataIndex: 'accessoriesList',
      tooltip: '装配的密封装置，试验件等',
      fieldProps: {
        editable: false,
        searchKey: 'experimentalDevice',
        objectType: 'Accessories',
        relationship: 'Accessories',
      },
    },
  ],
};

const location: ResourceDefine = {
  name: 'location',
  label: '位置库',
  uri: '/api/engineseals/location',
  linkToUrl: '/engineseals/location',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'location',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '位置名称',
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
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'brief',
      valueType: 'textarea',
      hideInTable: false,
      hideInSearch: true,
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

const extType1: ResourceDefine = {
  name: 'extType1',
  label: '润滑件',
  uri: '/api/engineseals/ext-type1',
  linkToUrl: '/engineseals/ext-type1',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'extType1',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '名称',
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
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const extType2: ResourceDefine = {
  name: 'extType2',
  label: '轴承件',
  uri: '/api/engineseals/ext-type2',
  linkToUrl: '/engineseals/ext-type2',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'extType2',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '名称',
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
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const extType3: ResourceDefine = {
  name: 'extType3',
  label: '传动件',
  uri: '/api/engineseals/ext-type3',
  linkToUrl: '/engineseals/ext-type3',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'extType3',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '名称',
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
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const accessories: ResourceDefine = {
  name: 'accessories',
  label: '密封件',
  uri: '/api/engineseals/accessories',
  linkToUrl: '/engineseals/accessories',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'accessories',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '类型',
      dataIndex: 'accessoryType',
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
        types: 'AccessoryType',
      },
    },
    {
      title: '名称',
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
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '图号',
      dataIndex: 'designCode',
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
      title: '版本',
      dataIndex: 'designVersion',
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
      title: '批次号',
      dataIndex: 'batchNumber',
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
      title: '状态',
      dataIndex: 'status',
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
        types: 'Status',
      },
    },
    {
      title: '卷宗名称',
      dataIndex: 'documentName',
      valueType: 'Image',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: false,
      group: '',
      tooltip: 'pdf文件',
      formItemProps: {
        rules: [
          // rules 定义
          { max: 400, message: '最多只能输入400个字符', type: 'string' },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'brief',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
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
    {
      title: '发动机台份',
      dataIndex: 'engine',
      valueType: 'Object',
      hideInSearch: true,
      tooltip: '',
      group: '密封位置',
      fieldProps: {
        objectType: 'Engine',
        searchUrl: '/api/engineseals/engine/list',
        fields: [
          { fieldName: 'id', fieldLabel: 'ID' },
          { fieldName: 'code', fieldLabel: '编号' },
        ],
      },
    },
    {
      title: '试验器',
      dataIndex: 'experimentalDevice',
      valueType: 'Object',
      hideInSearch: true,
      tooltip: '装配的密封装置，试验件等',
      group: '',
      fieldProps: {
        objectType: 'ExperimentalDevice',
        searchUrl: '/api/engineseals/experimental-device/list',
        fields: [
          { fieldName: 'id', fieldLabel: 'ID' },
          { fieldName: 'title', fieldLabel: '名称' },
        ],
      },
    },
    {
      title: '供应商',
      dataIndex: 'supplier',
      valueType: 'Object',
      hideInSearch: true,
      hideInTable: true,
      group: '',
      tooltip: '',
      fieldProps: {
        objectType: 'supplier',
        searchUrl: '/api/engineseals/supplier/list',
        fields: [{ fieldName: 'id', fieldLabel: 'ID' }],
      },
    },
    {
      title: '材料及标准',
      dataIndex: 'material',
      valueType: 'Object',
      hideInSearch: true,
      hideInTable: true,
      group: '',
      tooltip: '',
      fieldProps: {
        objectType: 'material',
        searchUrl: '/api/engineseals/material/list',
        fields: [{ fieldName: 'id', fieldLabel: 'ID' }],
      },
    },
    {
      title: '密封件',
      dataIndex: 'parentGroup',
      valueType: 'Object',
      hideInSearch: true,
      tooltip: '',
      group: '',
      fieldProps: {
        objectType: 'Accessories',
        searchUrl: '/api/engineseals/accessories/list',
        fields: [
          { fieldName: 'id', fieldLabel: 'ID' },
          { fieldName: 'title', fieldLabel: '名称' },
        ],
      },
    },
    {
      title: '密封类型',
      dataIndex: 'sealType',
      valueType: 'Object',
      hideInSearch: true,
      hideInTable: true,
      group: '',
      tooltip: '',
      fieldProps: {
        objectType: 'sealType',
        searchUrl: '/api/engineseals/seal-type/list',
        fields: [{ fieldName: 'id', fieldLabel: 'ID' }],
      },
    },
    {
      title: '密封部位',
      dataIndex: 'sealPart',
      valueType: 'Object',
      hideInSearch: true,
      hideInTable: true,
      group: '',
      tooltip: '',
      fieldProps: {
        objectType: 'sealPart',
        searchUrl: '/api/engineseals/seal-part/list',
        fields: [{ fieldName: 'id', fieldLabel: 'ID' }],
      },
    },
    {
      title: '摩擦副',
      dataIndex: 'frictionPair',
      valueType: 'Object',
      hideInSearch: true,
      hideInTable: true,
      group: '',
      tooltip: '',
      fieldProps: {
        objectType: 'frictionPair',
        searchUrl: '/api/engineseals/friction-pair/list',
        fields: [{ fieldName: 'id', fieldLabel: 'ID' }],
      },
    },
    {
      title: '密封件',
      dataIndex: 'parentKits',
      valueType: 'Object',
      hideInSearch: true,
      tooltip: '',
      group: '',
      fieldProps: {
        objectType: 'Accessories',
        searchUrl: '/api/engineseals/accessories/list',
        fields: [
          { fieldName: 'id', fieldLabel: 'ID' },
          { fieldName: 'title', fieldLabel: '名称' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
    {
      title: '子组件组成',
      dataIndex: 'subAccessoriesList',
      tooltip: '',
      fieldProps: {
        editable: false,
        searchKey: 'parentGroup',
        objectType: 'Accessories',
        relationship: 'Accessories',
      },
    },
    {
      title: '密封装置组成',
      dataIndex: 'accessoriesList',
      tooltip: '',
      fieldProps: {
        editable: false,
        searchKey: 'parentKits',
        objectType: 'Accessories',
        relationship: 'Accessories',
      },
    },
    {
      title: '历程',
      dataIndex: 'courseRecordList',
      tooltip: '',
      fieldProps: {
        editable: false,
        searchKey: 'accessories',
        objectType: 'CourseRecord',
        relationship: 'CourseRecord',
      },
    },
    {
      title: '出厂信息',
      dataIndex: 'factoryInformationList',
      tooltip: '',
      fieldProps: {
        editable: false,
        searchKey: 'accessories',
        objectType: 'FactoryInformation',
        relationship: 'FactoryInformation',
      },
    },
    {
      title: '装配信息',
      dataIndex: 'assembleInfoList',
      tooltip: '',
      fieldProps: {
        editable: false,
        searchKey: 'accessories',
        objectType: 'AssembleInfo',
        relationship: 'AssembleInfo',
      },
    },
    {
      title: '分解信息',
      dataIndex: 'dismantlingInfoList',
      tooltip: '',
      fieldProps: {
        editable: false,
        searchKey: 'accessories',
        objectType: 'DismantlingInfo',
        relationship: 'DismantlingInfo',
      },
    },
    {
      title: '试验信息',
      dataIndex: 'experimentalInfoList',
      tooltip: '',
      fieldProps: {
        editable: false,
        searchKey: 'accessories',
        objectType: 'ExperimentalInfo',
        relationship: 'ExperimentalInfo',
      },
    },
    {
      title: '故障信息',
      dataIndex: 'troubleInfoList',
      tooltip: '',
      fieldProps: {
        editable: false,
        searchKey: 'accessories',
        objectType: 'TroubleInfo',
        relationship: 'TroubleInfo',
      },
    },
    {
      title: '维修记录',
      dataIndex: 'repairRecordList',
      tooltip: '',
      fieldProps: {
        editable: false,
        searchKey: 'accessories',
        objectType: 'RepairRecord',
        relationship: 'RepairRecord',
      },
    },
  ],
};

const dynField: ResourceDefine = {
  name: 'dynField',
  label: '性能参数',
  uri: '/api/engineseals/dyn-field',
  linkToUrl: '/engineseals/dyn-field',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'dynField',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '名称',
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
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '类型',
      dataIndex: 'fieldType',
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
        types: 'FieldType',
      },
    },
    {
      title: '描述',
      dataIndex: 'brief',
      valueType: 'textarea',
      hideInTable: false,
      hideInSearch: true,
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
    {
      title: '密封类型',
      dataIndex: 'sealType',
      valueType: 'Object',
      hideInSearch: true,
      tooltip: '',
      group: '',
      fieldProps: {
        objectType: 'SealType',
        searchUrl: '/api/engineseals/seal-type/list',
        fields: [
          { fieldName: 'id', fieldLabel: 'ID' },
          { fieldName: 'title', fieldLabel: '密封类型名称' },
        ],
      },
    },
  ],
  listProps: [
    // protable 定义
  ],
};

const sealType: ResourceDefine = {
  name: 'sealType',
  label: '密封类型',
  uri: '/api/engineseals/seal-type',
  linkToUrl: '/engineseals/seal-type',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'sealType',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '密封类型名称',
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
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'brief',
      valueType: 'textarea',
      hideInTable: false,
      hideInSearch: true,
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
    {
      title: '动态参数',
      dataIndex: 'dynFieldList',
      tooltip: '',
      fieldProps: {
        editable: false,
        searchKey: 'sealType',
        objectType: 'DynField',
        relationship: 'DynField',
      },
    },
  ],
};

const sealPart: ResourceDefine = {
  name: 'sealPart',
  label: '密封部位',
  uri: '/api/engineseals/seal-part',
  linkToUrl: '/engineseals/seal-part',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'sealPart',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '密封部位名称',
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
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'brief',
      valueType: 'textarea',
      hideInTable: false,
      hideInSearch: true,
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

const frictionPair: ResourceDefine = {
  name: 'frictionPair',
  label: '摩擦副',
  uri: '/api/engineseals/friction-pair',
  linkToUrl: '/engineseals/friction-pair',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'frictionPair',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '摩擦副名称',
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
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'brief',
      valueType: 'textarea',
      hideInTable: false,
      hideInSearch: true,
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

const material: ResourceDefine = {
  name: 'material',
  label: '材料',
  uri: '/api/engineseals/material',
  linkToUrl: '/engineseals/material',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'material',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '材料名称',
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
          { max: 100, message: '最多只能输入100个字符', type: 'string' },
        ],
      },
    },
    {
      title: '材料牌号',
      dataIndex: 'code',
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
      title: '材料标准',
      dataIndex: 'standard',
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
  ],
  listProps: [
    // protable 定义
  ],
};

const supplier: ResourceDefine = {
  name: 'supplier',
  label: '供应商',
  uri: '/api/engineseals/supplier',
  linkToUrl: '/engineseals/supplier',
  actionList: [
    // entity级别的action
  ],
  tableConfig: {
    // table 定义
  },
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'IdRender',
      hideInTable: false,
      hideInSearch: true,
      hideInForm: true,
      group: '',
      tooltip: '',
      width: 50,
      fieldProps: {
        objectType: 'supplier',
      },
      formItemProps: {
        rules: [
          // rules 定义
        ],
      },
    },
    {
      title: '名称',
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
      title: '供应商所在地',
      dataIndex: 'location',
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
      title: '业务范围',
      dataIndex: 'brief',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
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
    {
      title: '供应商评价',
      dataIndex: 'supplierReview',
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
  ],
  listProps: [
    // protable 定义
  ],
};

export type ResourceNameType =
  | 'courseRecord'
  | 'factoryInformation'
  | 'assembleInfo'
  | 'dismantlingInfo'
  | 'experimentalInfo'
  | 'troubleInfo'
  | 'inventoryRecord'
  | 'repairRecord'
  | 'engineModel'
  | 'engine'
  | 'experimentalDevice'
  | 'location'
  | 'extType1'
  | 'extType2'
  | 'extType3'
  | 'accessories'
  | 'dynField'
  | 'sealType'
  | 'sealPart'
  | 'frictionPair'
  | 'material'
  | 'supplier'
  | any;

const data: Record<ResourceNameType, ResourceDefine> = {
  courseRecord,
  factoryInformation,
  assembleInfo,
  dismantlingInfo,
  experimentalInfo,
  troubleInfo,
  inventoryRecord,
  repairRecord,
  engineModel,
  engine,
  experimentalDevice,
  location,
  extType1,
  extType2,
  extType3,
  accessories,
  dynField,
  sealType,
  sealPart,
  frictionPair,
  material,
  supplier,
};

const get: (name: ResourceNameType) => ResourceDefine = (name: ResourceNameType) => {
  const key = _.camelCase(name);
  return data[key] || {};
};

const BizSchema = {
  project: {
    title: '密封大数据',
    logo: '/logo.svg',
    name: 'engineseals',
    brief: '发动机密封大数据管理系统',
  },
  data,
  get,
};

export default BizSchema;
