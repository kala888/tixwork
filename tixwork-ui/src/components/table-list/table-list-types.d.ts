import type { BaseFormType } from '@/components/form/popup-form-wrapper';
import type { EleValueType } from '@/components/value-type';
import type { ActionLike, ActionList, ResourceLike } from '@/utils/nice-router-types';
import type { ActionType, ParamsType, ProColumns } from '@ant-design/pro-components';
import type { SizeType } from '@ant-design/pro-form/es/BaseForm';
import { ProTableProps } from '@ant-design/pro-table/es/typing';
import type React from 'react';

// ProTable的OOTB透传部分
export type TablePropsBridge = {
  params?: any;
  dataSource?: any;
  search?: any;
  pagination?: any;
  expandable?: any;
  options?: any;
  tableExtraRender?: any;
  defaultSize?: SizeType;
  toolBarRender: any;
  extraToolBarAction: any[];
  scroll: any;
  className?: any;
};

// export type RenderLineActionListFunction = (params: {
//   record?: Record<string, any> // 当前行对象
//   actionList?: ActionList | false;  //默认actionList
//   columns: ProColumns<any, EleValueType>[];  //当前table中的columns定义
// }) => ProColumn<any, EleValueType>;

/**
 * EleTable导出的方法
 */
export type TableListApi<T> = {
  edit: (record: T) => void;
  remove: (record: T) => void;
  onRow: (record: T) => void;
  showForm: (record: T) => void;
  refresh: () => void;
  action?: ActionType;
};

type TableResourceType = string | ActionLike | ResourceLike | ({ linkToUrl?: string } & ResourceLike);
//自定义部分
export type TableListType<T, U extends ParamsType> = {
  ref?: React.MutableRefObject<TableListApi<T> | undefined>;
  resource: TableResourceType;
  title?: React.ReactNode;
  brief?: React.ReactNode;
  columns: ProColumns<T, EleValueType>[];
  editForm?: (props: BaseFormType) => React.ReactElement;
  formProps?: Partial<BaseFormType>;
  lineActionList?: ActionList | false;
  actionList?: ActionList | false;
  onRefresh?: () => void;
  onRowSelect?: (record: any) => void;
  onSave?: (record: any) => void;
  onUpdate?: (record: any) => void;
  ghost?: boolean;
} & Partial<ProTableProps>;
