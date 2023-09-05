import type { ResourceNameType } from '@/biz-models/biz-schema';
import BizSchema from '@/biz-models/biz-schema';
import BoxWrapper from '@/components/box-wrapper/box-wrapper';
import type { ListItemsInfoType } from '@/components/detail/relative-entity-items';
import ObjectLink from '@/components/value-type/object/object-link';
import { colors } from '@/components/value-type/style-utils';
import ObjectUtils from '@/utils/object-utils';
import { RightOutlined } from '@ant-design/icons';
import type { CardProps } from '@ant-design/pro-card/es/typing';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Empty, Space } from 'antd';
import classNames from 'classnames';
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
  <ProCard colSpan={1} title={title} subTitle={'暂无'} headerBordered={true} className={styles.card}>
    <Empty imageStyle={{ height: 40 }} description={false} />
  </ProCard>
);

const SubTitle = ({ objectType, data }) => (
  <Space style={{ paddingLeft: 30 }}>
    {ObjectUtils.isNotEmpty(objectType) && (
      <ObjectLink record={data} {...data} objectType={objectType} style={{ fontSize: 12 }} />
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
  let theColumn = columns.filter((it) => !it.hideInDescriptions).map((it) => ({ ...it, tooltip: '' }));
  //1. 处理Id字段，在detail作为text
  if (theColumn[0].dataIndex === 'id') {
    theColumn = [{ ...theColumn[0], valueType: 'text' }].concat(theColumn.slice(1, theColumn.length));
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
        // result.copyable = true;
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
  const result: ListItemsInfoType & { dataSource: any } = {
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
  const infoCss = useEmotionCss(({ token }) => ({
    height: '100%',
    '.ant-descriptions-item-label': {
      color: colors.primaryColor,
    },
  }));

  const { title, columns, dataSource, objectType, collapsible = false, column = 3, ...rest } = props;
  if (ObjectUtils.isEmpty(dataSource)) {
    return <EmptyInfo title={title} />;
  }
  const data = typeof dataSource === 'object' ? dataSource : { id: dataSource };

  const params: any = {};
  if (collapsible) {
    params.collapsibleIconRender = collapsibleIconRender;
    params.collapsible = true;
  }

  const theColumns = columns.filter((it) => !it.hideInDescriptions);
  const grouped = _.groupBy(theColumns, (it) => {
    if (ObjectUtils.isNotEmpty(it.group)) {
      return it.group;
    }
    if (it.valueType === 'Object') {
      return '关联信息';
    }
    return 'default';
  });
  // const grouped = _.groupBy(columns.filter((it) => it.valueType !== 'Object'), (it) => it.group  );

  const groupNames = Object.keys(grouped);
  return (
    <ProCard
      title={title}
      bordered={false}
      subTitle={<SubTitle objectType={objectType} data={data} />}
      className={classNames('object-entity-info', infoCss)}
      direction="column"
      {...params}
      {...rest}
    >
      {groupNames.map((groupName, idx) => {
        const theColumn = buildColumns(grouped[groupName]);
        const key = groupName + '_' + idx;
        const showColumnLength = _.min([theColumn.length, column]);
        return (
          <BoxWrapper key={key} title={groupName !== 'default' ? groupName : ''}>
            <ProDescriptions dataSource={dataSource} columns={theColumn} column={showColumnLength} />
          </BoxWrapper>
        );
      })}
      {props.children}
    </ProCard>
  );
};
ObjectEntityInfo.isProCard = true;
export default ObjectEntityInfo;
