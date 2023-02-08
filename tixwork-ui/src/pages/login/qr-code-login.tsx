import { QrcodeOutlined } from '@ant-design/icons';
import styles from './styles.less';

const QrCodeLogin = () => {
  return (
    <div className={styles.qrCodeContent}>
      <div className={styles.qrCodeContentHeader}>微信扫一扫，登录更安全</div>
      <div className={styles.qrCodeContentBody}>
        <QrcodeOutlined />
      </div>
    </div>
  );
};

export default QrCodeLogin;
