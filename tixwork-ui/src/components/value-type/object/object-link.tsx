import type { ResourceNameType } from '@/biz-model/biz-schema';
import BizSchema from '@/biz-model/biz-schema';
import { guessTitle } from '@/utils';
import { isNotEmpty } from '@/utils/object-utils';
import { Space } from 'antd';
import _ from 'lodash';
import React from 'react';
import styles from './styles.less';

type ObjectLinkType = {
  id: React.Key;
  linkToUrl: string;
  displayName?: string;
  objectType: ResourceNameType;
  [key: string]: any;
};
const ObjectLink = (props: ObjectLinkType) => {
  const { id, linkToUrl, objectType } = props;
  const title = guessTitle(props);
  let to = linkToUrl;
  const key = _.kebabCase(objectType);
  if (isNotEmpty(to)) {
    to = _.replace(to, ':id', id as any);
    to = _.replace(to, ':objectType', key);
  } else {
    // to = `/detail/${objectType}/${id}`;
    to = `/${BizSchema.Root.name}/${key}/${id}`;
  }
  // const handleClick = () => history.push(to);
  return (
    <a href={to}>
      <Space className={styles.objectLink}>
        {title}
        {props.children}
      </Space>
    </a>
  );
};

export default ObjectLink;
