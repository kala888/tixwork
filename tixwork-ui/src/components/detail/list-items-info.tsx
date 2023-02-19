import type { ResourceNameType } from '@/biz-model/biz-schema';
import BizSchema from '@/biz-model/biz-schema';
import EleTableList from '@/components/ele-table-list/ele-table-list';
import BaseForm from '@/components/form/base-form';
import useResource from '@/http/use-resource';
import _ from 'lodash';

export type ListItemsInfoType = {
  key: string;
  parent: any;
  editable: false | 'entity' | 'relationship';
  searchKey: any;
  title?: any;
  columns: any[];
  dataSource: any;
  objectType?: ResourceNameType;
  onRefresh?: () => void;
  relationship?: string;
};

const defaultMaxPageSize = 500; //和后台配置的limit子查询数量保持一致

export default function ListItemsInfo(props: ListItemsInfoType) {
  const {
    dataSource = [],
    objectType,
    relationship,
    columns,
    parent,
    searchKey,
    onRefresh,
    editable,
  } = props;
  console.log('objectType', objectType);

  const relationshipSchema = BizSchema.get(relationship as any);
  const relationshipApi = useResource<any>(relationshipSchema.linkToUrl);

  const tableProps: any = {
    dataSource,
    // @ts-ignore
    resource: BizSchema.get(objectType)?.linkToUrl,
    params: {
      [searchKey]: {
        id: parent?.id,
      },
    },
  };
  if (editable === false) {
    tableProps.toolBarRender = false;
  }

  if (dataSource.length >= defaultMaxPageSize) {
    tableProps.dataSource = null;
  }

  if (relationship) {
    tableProps.onUpdate = relationshipApi.update;
    tableProps.onAdd = relationshipApi.add;
  }

  const editForm = (plist) => {
    const theColumn: any = relationshipSchema?.columns || columns;
    const parentColumn = theColumn.find((it) => it.dataIndex === searchKey);
    _.set(parentColumn, 'fieldProps.disabled', true);
    return (
      <BaseForm
        {...plist}
        columns={theColumn}
        values={{
          [searchKey]: {
            id: parent?.id,
          },
        }}
      />
    );
  };
  return (
    <EleTableList
      rowKey="id"
      defaultSize={'small'}
      search={false}
      columns={columns}
      lineActionList={false}
      editForm={editForm}
      onRefresh={onRefresh}
      {...tableProps}
    />
  );
}
