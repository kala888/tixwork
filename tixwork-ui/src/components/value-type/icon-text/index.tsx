import IconFont from '@/components/icon-font';
import { Space } from 'antd';
import _ from 'lodash';
import styles from './styles.less';

type IconTextType = {
  icon?: string;
  deptType?: string;
  children: any;
};
const IconText = (props: IconTextType) => {
  const { icon, deptType } = props;
  const theIcon = icon || _.toLower(deptType);
  return (
    <Space className={styles.iconText}>
      <IconFont icon={theIcon} className={styles.iconTextIcon} />
      {props.children}
    </Space>
  );
};

const IconTextValueType = {
  render: (dom, props) => <IconText {...props.record}> {dom}</IconText>,
};
export default IconTextValueType;
