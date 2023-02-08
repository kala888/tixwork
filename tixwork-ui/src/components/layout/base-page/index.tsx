import EleProProvider from '@/components/value-type/ele-pro-provider';
import classNames from 'classnames';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './styles.less';

export default function BasePage(props) {
  const rootClass = classNames('base-page', styles.basePage, props.className);
  return (
    <PageContainer {...props} className={rootClass}>
      <EleProProvider>{props.children}</EleProProvider>
    </PageContainer>
  );
}
