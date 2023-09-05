import TableActionList from '@/components/table-list/table-action-list';
import { getLineActionListColumn, mergeProps } from '@/components/table-list/utils';
import TreeUtils from '@/components/tree/tree-uitls';
import { EleValueType } from '@/components/value-type';
import useResource from '@/http/use-resource';
import { ActionLike } from '@/utils/nice-router-types';
import ObjectUtils from '@/utils/object-utils';
import { ActionType, BaseQueryFilterProps, ProColumns, ProTable } from '@ant-design/pro-components';
import { SearchConfig } from '@ant-design/pro-table/es/components/Form/FormRender';
import { OptionConfig } from '@ant-design/pro-table/es/components/ToolBar';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import _ from 'lodash';
import React, { useRef } from 'react';
import { TableListApi, TableListType } from './table-list-types';

function getColumns<T>(
  columns: any[],
  lineActionList: ActionLike[] | false | undefined,
  edit: (item: any) => void,
  remove: (item: any) => Promise<void>,
) {
  // 处理option column
  let theColumns: ProColumns<T, EleValueType>[] = ObjectUtils.parseToArray(columns);
  const columnOption: ProColumns<T, EleValueType> = getLineActionListColumn({
    lineActionList,
    columns,
    onEdit: edit,
    onRemove: remove,
  });
  if (ObjectUtils.isNotEmpty(columnOption)) {
    theColumns = _.concat(columns, columnOption);
  }
  //@ts-ignore
  return theColumns.map((it) => ({ ...it, width: it.width || it.fieldProps?.width }));
}

type ProListType<T> = {
  row?: Record<string, any>;
  onEdit: () => void;
  setRow: (item: T) => void;
  onAdd: () => void;
} & TableListType<T, any>;

type ProListRef<T> = Omit<TableListApi<T>, 'edit' | 'showForm'>;

function _ProList<T extends Record<string, any>>(props: ProListType<T>, ref: React.ForwardedRef<ProListRef<T>>) {
  const actionRef = useRef<ActionType>();
  const searchRef = useRef<BaseQueryFilterProps>();
  const api = useResource<T>(props.resource);

  const {
    title,
    brief,
    rowKey = 'id',
    columns = [],
    dataSource,
    lineActionList,
    actionList = [],
    onRefresh,
    expandable,
    onRowSelect,
    request,
    search = {},
    options = {},
    row,
    onEdit,
    setRow,
    onAdd,
    ...rest
  } = props;

  const id = _.get(row, rowKey) as any;

  const rowSelectedCss = useEmotionCss(() => ({
    backgroundColor: '#e6f7ff',
  }));

  /**
   * 默认的request
   */
  const defaultRequest = async (params, sorter, filter) => {
    console.log('params,sorter,filter', params, sorter, filter);
    try {
      const resp = await api.list({ ...params, ...sorter, ...filter });
      if (expandable) {
        let tree = TreeUtils.toTree(resp.data, rowKey);
        // 自定义的一个属性rootPath=[0].children，只展示第一个元素的子元素
        // 有点特殊，就是应对树结构，不能展开的问题
        //@ts-ignore TODO
        if (expandable?.rootPath) {
          //@ts-ignore
          tree = _.get(tree, expandable?.rootPath, []);
        }
        return {
          ...resp,
          data: tree,
        };
      }
      return resp;
    } catch (e) {
      console.error('cant get data', e);
      return {
        data: [],
        success: false,
      };
    }
  };

  /**
   * 刷新table
   */
  const refresh = () => {
    if (onRefresh) {
      onRefresh();
    }
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };

  const onRemove = async (item) => {
    const theId = _.get(item, rowKey);
    console.log('the item will removed', item);
    await api.remove(theId);
    if (actionRef.current) {
      actionRef.current.reload();
    }
    if (onRowSelect) {
      onRowSelect({});
    }
  };

  const theRequest = _.isNil(dataSource) ? request || defaultRequest : undefined;

  const theColumns = getColumns<T>(columns, lineActionList, onEdit, onRemove);
  const showSearch = _.some(theColumns, (it) => it.hideInSearch !== true);
  // merge各种config
  const searchConfig: SearchConfig = showSearch
    ? mergeProps(search, {
        span: 6,
        labelWidth: 'auto',
        className: 'table-search-bar',
        optionRender: (searchDef, __, dom) => {
          // @ts-ignore
          searchRef.current = searchDef;
          return dom;
        },
      })
    : false;

  const selectRow = (record) => {
    setRow(record);
    if (onRowSelect) {
      onRowSelect(record);
    }
  };

  const onRow = (record) => {
    return {
      onClick: () => selectRow(record),
    };
  };

  /**
   * 处理toolBarRender
   */
  const toolBarRender = () => [<TableActionList key="toolBar" items={actionList} onAdd={onAdd} onRefresh={refresh} />];

  // // 通过ref导出可调用方法
  React.useImperativeHandle(ref, () => ({
    remove: onRemove,
    refresh,
    onRow,
    action: actionRef.current,
  }));

  const optionConfig: OptionConfig = mergeProps(options, { density: false, fullScreen: true });
  const rowClassName = (record) => (record[rowKey] === id ? rowSelectedCss : '');
  return (
    <ProTable<T>
      headerTitle={title}
      tooltip={brief}
      actionRef={actionRef}
      rowKey={rowKey}
      columns={theColumns as any}
      dataSource={dataSource}
      request={theRequest}
      expandable={expandable}
      rowClassName={rowClassName}
      search={searchConfig}
      onRow={onRow}
      defaultSize={'small'}
      options={optionConfig}
      toolBarRender={toolBarRender}
      pagination={{
        pageSize: 10,
      }}
      {...rest}
    />
  );
}

export default React.forwardRef(_ProList) as <T>(
  props: ProListType<T> & {
    ref?: React.ForwardedRef<TableListApi<any> | undefined>;
  },
) => ReturnType<typeof _ProList>;
