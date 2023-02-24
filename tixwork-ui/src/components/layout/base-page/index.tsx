import EleProProvider from '@/components/value-type/ele-pro-provider';
import ObjectUtils, { isNotEmpty } from '@/utils/object-utils';
import { ProCard } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { PageContainerProps } from '@ant-design/pro-layout/es/components/PageContainer';
import classNames from 'classnames';
import React from 'react';
import styles from './styles.less';

type BasePageType = {
  title?: false | React.ReactNode;
  brief?: React.ReactNode;
  className?: any;
} & Partial<PageContainerProps>;

export default function BasePage(props: BasePageType) {
  const { title, brief, className, style, ...rest } = props;
  const rootClass = classNames('base-page', styles.basePage, className);
  const theTitle = ObjectUtils.isNotEmpty(title) && (
    <ProCard
      ghost
      className={styles.pageTitle}
      title={<span className={styles.pageTitleText}>{title}</span>}
      subTitle={isNotEmpty(brief) && <div className={styles.pageTitleBrief}>{brief}</div>}
    />
  );
  return (
    <PageContainer {...rest} title={theTitle} className={rootClass} style={style}>
      <EleProProvider>{props.children}</EleProProvider>
    </PageContainer>
  );
}
