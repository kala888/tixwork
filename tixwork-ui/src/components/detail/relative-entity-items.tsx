import type { ResourceNameType } from '@/biz-models/biz-schema';
import BizSchema from '@/biz-models/biz-schema';
import ProEditForm from '@/components/form/pro-edit-form';
import TableList from '@/components/table-list';
import _ from 'lodash';

export type ListItemsInfoType = {
  key: string;
  parent: any;
  editable: false | 'entity' | 'relationship';
  searchKey: any;
  title?: any;
  columns: any[];
  objectType?: ResourceNameType;
  onRefresh?: () => void;
  [key: string]: any;
};

export default function RelativeEntityItems(props: ListItemsInfoType) {
  const { columns, title, objectType, parent, searchKey, onRefresh, editable, dataSource, ...rest } = props;

  const editForm = (plist) => {
    const parentColumn = columns.find((it) => it.dataIndex === searchKey);
    _.set(parentColumn, 'fieldProps.disabled', true);
    return <ProEditForm {...plist} columns={columns} initialValues={{ [searchKey]: parent }} />;
  };

  const actionList = [{ code: 'create', title: '添加' + title, type: 'dashed', danger: true, size: 'small' }];

  if (editable === false) {
    rest.toolBarRender = false;
  }

  return (
    <TableList
      title={'关联' + title}
      actionList={actionList}
      rowKey="id"
      defaultSize={'small'}
      search={false}
      columns={columns}
      editForm={editForm}
      onRefresh={onRefresh}
      resource={BizSchema.get(objectType)?.linkToUrl}
      params={{
        [searchKey]: {
          id: parent?.id,
        },
      }}
      {...rest}
    />
  );
}
