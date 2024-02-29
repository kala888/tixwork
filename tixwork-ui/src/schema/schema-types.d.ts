import { BizColumnType } from '@/components/value-type';

export type ActionType = {
  title?: string;
  code: 'import' | 'export' | 'create' | string;
  linkToUrl?: string;
};

export type ResourceDefine = {
  name: string;
  label: string;
  brief?: string;
  linkToUrl: string;
  actionList?: ActionType[];
  lineActionList?: ActionType[];
  columns: BizColumnType[];
  listProps?: BizColumnType[];
  tableConfig: {
    rowKey?: string;
    search?: false;
    options?: false;
    toolBarRender?: false;
    lineActionList?: false;
    [key: string]: any;
  };
};

export type BaseEntity = {
  id?: number;
  displayName?: string; // readOnly，用于显示的
  tenantId?: string; //'租户Id'
  createDept?: number; //'创建部门'
  createBy?: number; //'创建者'
  createTime?: string; //'创建时间'
  updateBy?: number; //'更新者'
  updateTime?: string; //'更新时间'
  extraData?: Record<string, any>;
};
