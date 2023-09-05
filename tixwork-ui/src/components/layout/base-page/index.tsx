import EleProProvider from '@/components/value-type/ele-pro-provider';
import { usePageTitle } from '@/services/use-service';
import ObjectUtils from '@/utils/object-utils';
import { ProCard } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { PageContainerProps } from '@ant-design/pro-layout/es/components/PageContainer';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useModel } from '@umijs/max';
import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';

type BasePageType = {
  title?: false | React.ReactNode;
  brief?: React.ReactNode;
  className?: any;
  header?: boolean;
} & Partial<PageContainerProps>;

export default function BasePage(props: BasePageType) {
  const { title, brief, className, style, header = true, ...rest } = props;
  const { initialState } = useModel('@@initialState');

  usePageTitle(title, brief);

  const isTopMenu = initialState?.settings?.layout === 'top' || initialState?.settings?.layout === 'mix';

  const showHeader = _.isNil(header) ? !isTopMenu : !!header;
  const css = useEmotionCss(({ token }) => ({
    minHeight: `80vh`,
    '.ant-page-header': {
      padding: '0 20px',
      marginLeft: 2,
      marginRight: 2,
      backgroundColor: showHeader ? '#fff' : 'transparent',
    },
    '.ant-page-header-heading-extra': {
      display: 'flex',
      justifyContent: 'center',
    },
    '.ant-pro-page-container-children-container': {
      marginTop: 4,
      padding: 0,
    },
    '.page-header': {
      '&-text': {
        fontWeight: 500,
        fontSize: 16,
        color: token.colorTextLabel,
      },
      '&-brief': {
        color: token.colorTextSecondary,
      },
    },
  }));
  const rootClass = classNames('base-page', css, className);

  const theTitle = ObjectUtils.isNotEmpty(title) && (
    <ProCard
      ghost
      className="page-header"
      title={<span className={'page-header-text'}>{title}</span>}
      subTitle={ObjectUtils.isNotEmpty(brief) && <div className={'page-header-brief'}>{brief}</div>}
    />
  );
  return (
    <PageContainer {...rest} title={showHeader && theTitle} className={rootClass} style={style}>
      <EleProProvider>{props.children}</EleProProvider>
    </PageContainer>
  );
}
