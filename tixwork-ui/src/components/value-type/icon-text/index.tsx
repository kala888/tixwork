import IconFont from '@/components/icon-font';
import styles from '@/components/value-type/styles.less';
import { Space } from 'antd';
import _ from 'lodash';

export const render = (dom, props) => {
  const { icon, deptType } = props.record;
  const theIcon = icon || _.toLower(deptType);
  console.log('vvvvvvv', props, theIcon);
  return (
    <Space className={styles.iconText}>
      <IconFont icon={theIcon} className={styles.iconTextIcon} />
      {dom}
    </Space>
  );
};
const IconText = { render };
export default IconText;
