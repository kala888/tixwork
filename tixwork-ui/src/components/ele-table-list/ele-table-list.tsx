import React, { useRef, useState } from 'react';
import type { ActionType, BaseQueryFilterProps, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import type { SearchConfig } from '@ant-design/pro-table/es/components/Form/FormRender';
import type { OptionConfig } from '@ant-design/pro-table/es/components/ToolBar';
import { message } from 'antd';
import classNames from 'classnames';
import _ from 'lodash';
import { getLineActionListColumn, mergeProps } from '@/components/ele-table-list/utils';
import BaseForm from '@/components/form/base-form';
import TreeUtils from '@/components/tree/tree-uitls';
import EleProProvider from '@/components/value-type/ele-pro-provider';
import useResource from '@/http/use-resource';
import { useLoading } from '@/services/use-service';
import type { EleValueType } from '@/components/value-type';
import { isNotEmpty } from '@/utils/object-utils';
import TableActionList from './table-action-list';
import type { EleTableListProps, EleTableListRef } from './ele-table-list-types';
import styles from './styles.less';

function EleTableListInner<T extends Record<string, any>>(
  props: EleTableListProps<T, any>,
  ref: React.ForwardedRef<EleTableListRef<T>>,
) {
  //1. 定义各种头部变量
  const { loading, showLoading, hideLoading } = useLoading();
  const [visible, setVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<T>();
  const actionRef = useRef<ActionType>();
  const searchRef = useRef<BaseQueryFilterProps>();
  const selfRef = ref as React.MutableRefObject<EleTableListRef<T>>;

  const {
    resource,
    title,
    rowKey = 'id',
    columns = [],
    dataSource,
    editForm,
    lineActionList,
    actionList = [],
    formProps = {},
    onRefresh,
    expandable,
    onRowSelect,
    request,
    search = {},
    options = {},
    className,
    onUpdate,
    onAdd,
    ...rest
  } = props;

  const api = useResource<T>(resource);
  const id = _.get(currentRow, rowKey) as any;

  /**
   * 展示form
   * @param item
   */
  const showForm = (item?: any) => {
    console.log('show form', item);
    setCurrentRow(item);
    setVisible(true);
  };

  /**
   * 隐藏form
   * @param item
   */
  const hideForm = (item?: any) => {
    setCurrentRow(item);
    setVisible(false);
  };

  /**
   * 刷新table
   */
  const refresh = () => {
    console.log('refresh....');
    if (onRefresh) {
      onRefresh();
    }
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };

  /**
   * 默认的request
   * @param params
   * @param plist
   */
  const defaultRequest = async (params, plist) => {
    console.log('params,props', params, plist);
    showLoading();
    try {
      const resp = await api.list(params);
      hideLoading();
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
      hideLoading();
      return {
        data: [],
        success: false,
      };
    }
  };
  const theRequest = _.isNil(dataSource) ? request || defaultRequest : undefined;

  /**
   * form完成的回调
   */
  const onFinish = async (values) => {
    const hide = message.loading('数据更新处理中...');
    console.log('onFinish....', id, values);

    const update = onUpdate || api.update;
    const add = onAdd || api.add;
    try {
      if (!!id) {
        await update({ [rowKey]: id, ...values });
        message.success('更新完成');
      } else {
        await add(values);
        message.success('添加成功');
      }
      hideForm();
      refresh();
    } catch (error) {
      console.error('get error when update', error);
    }
    hide();
  };

  /**
   *展示和隐藏
   * @param v
   */
  const handleVisibleChange = async (v) => {
    console.log('handleVisibleChange, set to', v);
    //设置popup状态
    setVisible(v);
    // 如果是关闭，清理数据
    if (!v) {
      setCurrentRow(undefined);
      return;
    }
    // 如果是打开且是"更新"，获取最新Entity数据
    if (isNotEmpty(id)) {
      const data = await api.get(id);
      console.log('handleShow.getResponse', data);
      setCurrentRow(data);
    }
  };

  const theFormProps = {
    title,
    visible,
    onFinish,
    onVisibleChange: handleVisibleChange,
    values: currentRow,
    ...formProps,
  };

  const handleRowSelect = (record) => {
    setCurrentRow(record);
    if (onRowSelect) {
      onRowSelect(record);
    }
  };

  const handleEdit = (item) => showForm(item);

  const handleRemove = async (item) => {
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

  const onRow = (record) => {
    return {
      onClick: () => handleRowSelect(record),
    };
  };

  // 处理option column
  let theColumns: ProColumns<T, EleValueType>[] = columns;
  const columnOption: ProColumns<T, EleValueType> = getLineActionListColumn({
    lineActionList,
    columns,
    onEdit: handleEdit,
    onRemove: handleRemove,
  });
  if (isNotEmpty(columnOption)) {
    theColumns = _.concat(columns, columnOption);
  }
  //@ts-ignore
  theColumns = theColumns.map((it) => ({ ...it, width: it.width || it.fieldProps?.width }));

  // 通过ref导出可调用方法
  if (selfRef?.current) {
    selfRef.current.onEdit = handleEdit;
    selfRef.current.onRemove = handleRemove;
    selfRef.current.refresh = refresh;
    selfRef.current.action = actionRef.current;
  }

  // merge各种config
  const searchConfig: SearchConfig = mergeProps(search, {
    span: 6,
    labelWidth: 'auto',
    className: 'ele-table-search-bar',
    optionRender: (searchDef, __, dom) => {
      // @ts-ignore
      searchRef.current = searchDef;
      return dom;
    },
  });

  /**
   * 处理toolBarRender
   */
  const toolBarRender = () => [
    <TableActionList
      key="toolBar"
      items={actionList}
      searchValues={searchRef?.current?.form?.getFieldsValue()}
      onRefresh={refresh}
      onAdd={showForm}
    />,
  ];

  const optionConfig: OptionConfig = mergeProps(options, { density: false, fullScreen: true });

  // 处理css
  const rootCls = classNames('ele-table-list', styles.eleTableList, className);
  const rowClassName = (record) => (record[rowKey] === id ? styles.rowSelected : '');

  return (
    <div className={rootCls} ref={ref as any}>
      <EleProProvider>
        <ProTable<T>
          loading={loading}
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
          {...rest}
        />
        {editForm ? editForm(theFormProps) : <BaseForm {...theFormProps} />}
      </EleProProvider>
    </div>
  );
}

// 多种泛型的ref方案：https://fettblog.eu/typescript-react-generic-forward-refs/
const EleTableList = React.forwardRef(EleTableListInner) as <T>(
  props: EleTableListProps<T, any> & { ref?: React.ForwardedRef<EleTableListRef<any> | undefined> },
) => ReturnType<typeof EleTableListInner>;

export default EleTableList;
