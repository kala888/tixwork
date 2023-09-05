import type { ResourceNameType } from '@/biz-models/biz-schema';
import BizSchema from '@/biz-models/biz-schema';
import ObjectEntityInfo from '@/components/detail/object-entity-info';
import { getDisplayName } from '@/utils';
import ObjectUtils from '@/utils/object-utils';
import { Popover, Space, Typography } from 'antd';
import _ from 'lodash';
import React from 'react';

import ObjectPicker from '@/components/value-type/object/object-picker';
import { LinkOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import classNames from 'classnames';
import styles from './styles.less';

type ObjectLinkType = {
  id?: React.Key;
  objectType?: ResourceNameType;
  displayName?: string | React.ReactElement;
  linkToUrl?: string;
  record?: any;
  className?: any;
  children?: any;
};

// lodash的kebabCase和后台的kebabCase不一致。以后台为准
// console.log(kebabCase("userName"));    // 输出 "user-name"
// console.log(kebabCase("extType1"));    // 输出 "ext-type1"
// console.log(kebabCase("user1Name"));   // 输出 "user1-name"
// console.log(kebabCase("userImage1"));  // 输出 "user-image1"
// console.log(kebabCase("data1"));       // 输出 "data1"
function kebabCase(str = '') {
  // 将大写字母和数字前面添加一个连接符，并将字符串转换为小写
  const kebabCaseStr = str
    .replace(/([A-Z])/g, '-$1')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
  // 如果开头和结尾是连接符，则去除它们
  return kebabCaseStr.replace(/^-+|-+$/g, '');
}

const getLinkToUrl = (props) => {
  const { id, linkToUrl, objectType } = props;
  if (ObjectUtils.isEmpty(id) && ObjectUtils.isEmpty(linkToUrl)) {
    return null;
  }
  // 1.返回linkToUrl
  const key = kebabCase(objectType);
  if (ObjectUtils.isNotEmpty(linkToUrl)) {
    const to = _.replace(linkToUrl, ':id', id as any);
    return _.replace(to, ':objectType', key);
  }
  // to = `/detail/${objectType}/${id}`;
  return `/${BizSchema.Root.name}/${key}/${id}`;
};

const InnerLink = (props) => {
  const linkToUrl = getLinkToUrl(props) as string;
  const { displayName, record = {}, className } = props;
  const title = displayName || getDisplayName(record);
  const rootCls = classNames(className, {
    [styles.objectLink]: ObjectUtils.isNotEmpty(linkToUrl),
  });
  return (
    <Typography.Link href={linkToUrl} ellipsis className={rootCls}>
      {title}
    </Typography.Link>
  );
};

const PopupContent = (props) => {
  const { displayName, objectType, record = {} } = props;
  const title = displayName || getDisplayName(record);
  const schema = BizSchema.get(objectType);
  const columns = (schema?.columns || []).filter((it) => it.valueType !== 'Object');
  const linkToUrl = getLinkToUrl(props) as string;
  let column = columns.length > 6 ? 3 : 2;
  if (columns.length > 12) {
    column = 4;
  }
  const width = column * 15 + 'vw';

  return (
    <ProCard
      title={schema.label}
      subTitle={title}
      extra={
        <Typography.Link href={linkToUrl} type="danger" disabled={!linkToUrl}>
          <Space>
            <div>查看详情</div>
            <LinkOutlined />
          </Space>
        </Typography.Link>
      }
      headerBordered
      headStyle={{
        padding: 0,
        paddingBottom: 10,
      }}
      className={styles.objectLinkPopupContent}
    >
      <ObjectEntityInfo columns={columns} dataSource={record} bodyStyle={{ padding: 0, width }} column={column} />
    </ProCard>
  );
};

const ObjectLink = (props: ObjectLinkType) => {
  const { objectType, record = {} } = props;
  const schema = BizSchema.get(objectType);
  const columns = (schema?.columns || []).filter((it) => it.valueType !== 'Object');

  const obj = {
    ...(record || {}),
    ...props,
  };
  // 仅仅显示link
  if (ObjectUtils.isEmpty(record) || ObjectUtils.isEmpty(columns)) {
    return <InnerLink {...obj} />;
  }
  return (
    <Popover content={<PopupContent {...obj} />}>
      <>
        <InnerLink {...obj} />
      </>
    </Popover>
  );
};
export function renderObject(item, props) {
  const { fieldProps } = props;
  const obj = _.isObject(item) ? item : ({ displayName: item } as any);

  return <ObjectLink id={obj.id} title={obj.displayName} {...fieldProps} record={obj} />;
}

const ObjectPickerFormItem = (props) => {
  const css = useEmotionCss(({ token }) => ({
    color: 'red',
    '.ant-form-item, .pro-field': {
      marginBottom: 0,
    },
  }));
  const rootCls = classNames(css, props.className);
  return <ObjectPicker {...props} className={rootCls} />;
};

export const ObjectValueType = {
  render: renderObject,
  renderFormItem: (__, props) => {
    const { fieldProps } = props;
    return <ObjectPickerFormItem {...props} {...fieldProps} />;
  },
};

export default ObjectLink;
