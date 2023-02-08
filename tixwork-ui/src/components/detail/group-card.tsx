import { isNotEmpty } from '@/utils/object-utils';
import styles from './styles.less';

export default function GroupCard(props) {
  const { title } = props;
  return (
    <div className={styles.groupCard}>
      {isNotEmpty(title) && <div className={styles.groupCardTitle}>{title}</div>}
      {props.children}
    </div>
  );
}
