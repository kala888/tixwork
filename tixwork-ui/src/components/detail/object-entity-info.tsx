import type { ResourceNameType } from '@/biz-models/biz-schema';
import ObjectLink from '@/components/value-type/object/object-link';
import { colors } from '@/components/value-type/style-utils';
import ObjectUtils from '@/utils/object-utils';
import { RightOutlined } from '@ant-design/icons';
import type { CardProps } from '@ant-design/pro-card/es/typing';
import { ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Empty, Space } from 'antd';
import classNames from 'classnames';
import _ from 'lodash';
import GroupBox from './group-box';
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
    const isDefault = it.group === 'default';
    if (it.valueType === 'ObjectList' || it.valueType === 'RichText') {
      return isDefault ? it.title : it.group;
    }
    if (it.valueType === 'Object') {
      return isDefault ? '关联信息' : it.group;
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
      className={classNames('object-entity-info', infoCss)}
      direction="column"
      {...params}
      {...rest}
    >
      {groupNames.map((groupName, idx) => (
        <GroupBox
          key={groupName + '_' + idx}
          name={groupName}
          column={column}
          columns={grouped[groupName]}
          dataSource={data}
        />
      ))}
      {props.children}
    </ProCard>
  );
};
ObjectEntityInfo.isProCard = true;
export default ObjectEntityInfo;
