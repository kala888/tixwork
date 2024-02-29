import ProEditForm from '@/components/form/pro-edit-form';
import EleProProvider from '@/components/value-type/ele-pro-provider';
import useResource from '@/http/use-resource';
import { useOpen } from '@/services/use-service';
import ObjectUtils from '@/utils/object-utils';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import classNames from 'classnames';
import _ from 'lodash';
import React, { useRef, useState } from 'react';
import type { TableListApi, TableListType } from './table-list-types';
import TheTableList from './the-table';

function _TableList<T extends Record<string, any>>(
  props: TableListType<T, any>,
  ref: React.ForwardedRef<TableListApi<T>>,
) {
  //1. 定义各种头部变量
  const { open, show, close } = useOpen();
  const [row, setRow] = useState<T>();
  const tableRef = useRef<any>();

  const {
    rowKey = 'id',
    ghost = false,
    resource,
    title,
    editForm,
    formProps = {},
    className,
    onSave,
    onUpdate,
  } = props;

  const api = useResource<T>(resource);

  const refresh = () => tableRef.current?.refresh();
  const remove = (record) => tableRef.current?.remove(record);

  const ghostClass = useEmotionCss(() => ({
    backgroundColor: 'transparent',
    '.ant-pro-card .ant-pro-card-body': {
      paddingInline: 0,
    },
  }));
  const rootClass = useEmotionCss(() => ({
    height: 'auto',
    paddingBottom: 0,

    '.ant-pro-table-list-toolbar': {
      marginTop: 8,
      paddingRight: 20,
    },
    '.table-search-bar': {
      marginBottom: 0,
      // marginBottom: 10,

      '.ant-col': {
        paddingLeft: '0 !important',
      },
    },

    '.ant-table-thead > tr > th': {
      textAlign: 'center',
    },

    '.ant-pro-table-list-toolbar-container': {
      paddingTop: 0,
    },

    '.ant-pro-table .ant-card-body': {
      padding: 0,
    },
  }));

  const edit = async (item?: any) => {
    // 先展示，增加用户体验
    show();
    setRow(item);

    // 在更新数据
    const id = _.get(item, rowKey);
    if (ObjectUtils.isNotEmpty(id)) {
      const data = await api.get(id);
      console.log('handleShow.getResponse', data);
      setRow(data);
    }
  };
  const add = () => {
    setRow(undefined);
    show();
  };

  // 关闭，清理数据
  const handleOpenChange = (v) => {
    if (v === false) {
      setRow({} as any);
      close();
    }
  };

  // // 通过ref导出可调用方法
  React.useImperativeHandle(ref, () => ({
    onRow: tableRef.current?.onRow,
    action: tableRef.current?.action,
    edit,
    remove,
    refresh: refresh,
    showForm: edit,
  }));

  // 处理css
  const rootCls = classNames(
    rootClass,
    'table-list',
    {
      [ghostClass]: ghost,
    },
    className,
  );
  const EditForm = editForm || ProEditForm;

  return (
    <div className={rootCls}>
      <EleProProvider>
        <TheTableList ref={tableRef} {...props} row={row} setRow={setRow} onAdd={add} onEdit={edit} />
        <EditForm
          values={row}
          onSuccess={refresh}
          title={title}
          open={open}
          setOpen={handleOpenChange}
          onSave={onSave || api.save}
          onUpdate={onUpdate || api.update}
          {...formProps}
        />
      </EleProProvider>
    </div>
  );
}

// 多种泛型的ref方案：https://fettblog.eu/typescript-react-generic-forward-refs/
const TableList = React.forwardRef(_TableList) as <T>(
  props: TableListType<T, any> & {
    ref?: React.ForwardedRef<TableListApi<any> | undefined>;
  },
) => ReturnType<typeof _TableList>;

export default TableList;
