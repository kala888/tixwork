import type { ResourceNameType } from '@/biz-model/biz-schema';
import BizSchema from '@/biz-model/biz-schema';
import GroupCard from '@/components/detail/group-card';
import type { ListItemsInfoType } from '@/components/detail/list-items-info';
import ObjectLink from '@/components/value-type/object/object-link';
import { isEmpty, isNotEmpty } from '@/utils/object-utils';
import { RightOutlined } from '@ant-design/icons';
import type { CardProps } from '@ant-design/pro-card/es/typing';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Empty, Space } from 'antd';
import _ from 'lodash';
import styles from './styles.less';

type ObjectEntityInfoType = {
  title?: any;
  columns: any[];
  dataSource: any;
  objectType?: ResourceNameType;
  collapsible?: boolean;
  column?: number;
} & CardProps;

const EmptyInfo = ({ title }) => (
  <ProCard
    colSpan={1}
    title={title}
    subTitle={'暂无'}
    headerBordered={true}
    className={styles.card}
  >
    <Empty imageStyle={{ height: 40 }} description={false} />
  </ProCard>
);

const SubTitle = ({ objectType, data }) => (
  <Space style={{ paddingLeft: 30 }}>
    {isNotEmpty(objectType) && (
      <ObjectLink {...data} objectType={objectType} style={{ fontSize: 12 }} />
    )}
  </Space>
);

const collapsibleIconRender = ({ collapsed }) => (
  <span style={{ paddingRight: 10 }}>
    <RightOutlined rotate={!collapsed ? 90 : undefined} />
  </span>
);

const isSingleLine = (type) => _.includes(['textarea', 'ObjectList'], type);
/**
 * 把textarea弄成单独的一行
 */
const buildColumns = (columns) => {
  let theColumn = columns
    .filter((it) => !it.hideInDescriptions)
    .map((it) => ({ ...it, tooltip: '' }));
  //1. 处理Id字段，在detail作为text
  if (theColumn[0].dataIndex === 'id') {
    theColumn = [{ ...theColumn[0], valueType: 'text' }].concat(
      theColumn.slice(1, theColumn.length),
    );
  }
  //2.
  let globalPointer = 0;
  return theColumn.map((it, idx) => {
    // 2.1 本身是textarea
    if (isSingleLine(it.valueType)) {
      const result = { ...it, span: 3 };
      globalPointer = 0;
      if (it.valueType === 'textarea') {
        // ellipsis导致description ui有问题，临时在desc中干掉
        result.ellipsis = false;
        result.copyable = true;
      }
      return result;
    }

    const next = theColumn[idx + 1];
    let span = 1;
    if (next && isSingleLine(next.valueType)) {
      span = 3 - globalPointer;
    }
    globalPointer = (globalPointer + 1) % 3;
    return { ...it, span };
  });
};

export const getObjectFieldProps = (props, parent) => {
  const { dataIndex = 'id', title, fieldProps } = props;
  const obj = _.get(parent, dataIndex);
  const objectType = fieldProps?.objectType;
  const columns = BizSchema.get(objectType)?.columns;
  const result: ListItemsInfoType = {
    ...fieldProps,
    parent,
    editable: fieldProps.editable,
    key: dataIndex,
    dataSource: obj,
    searchKey: fieldProps?.searchKey,
    objectType,
    columns,
    title,
  };
  return result;
};

const ObjectEntityInfo = (props: ObjectEntityInfoType) => {
  const { title, columns, dataSource, objectType, collapsible = false, column, ...rest } = props;
  if (isEmpty(dataSource)) {
    return <EmptyInfo title={title} />;
  }
  const data = typeof dataSource === 'object' ? dataSource : { id: dataSource };

  const params: any = {};
  if (collapsible) {
    params.collapsibleIconRender = collapsibleIconRender;
    params.collapsible = true;
  }

  const grouped = _.groupBy(columns, (it) => {
    if (it.valueType === 'Object') {
      return '关联信息';
    }
    return it.group;
  });
  // const grouped = _.groupBy(columns.filter((it) => it.valueType !== 'Object'), (it) => it.group  );

  const groupNames = Object.keys(grouped);
  return (
    <ProCard
      title={title}
      bordered={false}
      subTitle={<SubTitle objectType={objectType} data={data} />}
      className={styles.card}
      {...params}
      {...rest}
    >
      {groupNames.map((it, idx) => {
        const theColumn = buildColumns(grouped[it]);
        const theDesc = (
          <ProDescriptions dataSource={dataSource} columns={theColumn} column={column} />
        );
        if (groupNames.length === 1) {
          return theDesc;
        }
        return (
          <GroupCard key={it + idx} title={it}>
            {theDesc}
          </GroupCard>
        );
      })}
    </ProCard>
  );
};
ObjectEntityInfo.isProCard = true;
export default ObjectEntityInfo;
