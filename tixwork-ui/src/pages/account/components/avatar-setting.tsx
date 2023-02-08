import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import { isNotEmpty } from '@/utils/object-utils';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { useEffect, useState } from 'react';
import styles from './styles.less';

const defaultIcon = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';

type AvatarSettingType = {
  imageUrl: string;
  onChange: (avatar: string) => void;
};
const AvatarSetting = (props: AvatarSettingType) => {
  const { imageUrl, onChange } = props;
  const [avatar, setAvatar] = useState(imageUrl || defaultIcon);
  useEffect(() => {
    if (isNotEmpty(imageUrl)) {
      setAvatar(imageUrl);
    }
  }, [imageUrl]);

  const handleChange = ({ file }) => {
    if (file.status === 'done') {
      const url = file.response?.data?.url;
      if (isNotEmpty(url)) {
        Q.post(ApiConfig.updateAvatar, { avatar: url }, { asParams: true }).then(() => {
          setAvatar(url);
          if (onChange) {
            onChange(url);
          }
        });
      }
    }
  };

  return (
    <div className={styles.avatarSetting}>
      <div className={styles.avatarSettingTitle}>头像</div>
      <div className={styles.avatarSettingImage}>
        <img src={avatar} alt="avatar" />
      </div>

      <Upload
        showUploadList={false}
        onChange={handleChange}
        action={ApiConfig.upload}
        maxCount={1}
        headers={{
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }}
      >
        <div className={styles.uploadButton}>
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </div>
  );
};

export default AvatarSetting;
