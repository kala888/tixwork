import type { BaseFormType } from '@/components/form/base-form';
import type { EleValueType } from '@/components/value-type';
import type { ActionLike, ActionList, ResourceLike } from '@/utils/nice-router-types';
import type { ActionType, ParamsType, ProColumns, RequestData } from '@ant-design/pro-components';
import type { SizeType } from '@ant-design/pro-form/es/BaseForm';
import type { SortOrder } from 'antd/es/table/interface';
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
export type EleTableListRef<T> = {
  onEdit: (record: T) => void;
  onRemove: (record: T) => void;
  onRow: (record: T) => void;
  showForm: (record: T) => void;
  refresh: () => void;
  action?: ActionType;
} & Partial<React.ReactHTMLElement> &
  Partial<>;

//自定义部分
export type EleTableListProps<T, U extends ParamsType> = {
  ref?: React.MutableRefObject<EleTableListRef<T> | undefined>;
  resource: string | ActionLike | ResourceLike;
  title?: React.ReactNode;
  rowKey?: string;
  columns: ProColumns<T, EleValueType>[];
  editForm?: (props: BaseFormType) => React.ReactElement;
  formProps?: Partial<BaseFormType>;
  lineActionList?: ActionList | false;
  actionList?: ActionList | false;
  onRefresh?: () => void;
  onRowSelect?: (record: any) => void;
  className?: any;
  onUpdate?: (record: any) => void;
  onAdd?: (record: any) => void;
  request?: (
    params: U & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[] | null>,
  ) => Promise<Partial<RequestData<T>>>;
  rowSelection?: any;
  tableAlertRender?: any;
  tableAlertOptionRender?: any;
} & Partial<TablePropsBridge>;
