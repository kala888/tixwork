import type { ResourceNameType } from '@/biz-model/biz-schema';
import { guessTitle } from '@/utils';
import { isEmpty } from '@/utils/object-utils';
import { Space } from 'antd';
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
  const { id, linkToUrl, objectType, ...rest } = props;
  const displayName = guessTitle(props);
  let to = linkToUrl;
  if (isEmpty(to)) {
    to = `/detail/${objectType}/${id}`;
  }
  // const handleClick = () => history.push(to);
  return (
    <a href={to}>
      <Space {...rest} className={styles.objectLink}>
        {displayName}
        {props.children}
      </Space>
    </a>
  );
};

export default ObjectLink;
