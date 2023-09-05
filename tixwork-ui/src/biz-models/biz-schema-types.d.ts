import type { BizColumnType } from '@/components/value-type';
import type React from 'react';

declare namespace BizSchemaTypes {
  export type ResourceDefine = {
    name: string;
    label: string;
    brief?: string;
    linkToUrl: string;
    actionList?: ActionType[];
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

  type BaseEntity = {
    id?: React.Key; //'ID'
    displayName?: string; // readOnly，用于显示的
    createBy?: string; //'创建者'
    tenantId?: string; //'租户Id'
    createDept?: string; //'创建部门'
    updateBy?: string; //'更新者'
    createTime?: string; //'创建时间'
    updateTime?: string; //'更新时间'
  };
}
