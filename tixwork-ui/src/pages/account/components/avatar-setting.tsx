import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import ObjectUtils from '@/utils/object-utils';
import { UploadOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Button, Upload } from 'antd';
import { useEffect, useState } from 'react';
import logo from '../../../assets/logo.svg';

type AvatarSettingType = {
  imageUrl: string;
  onChange: (avatar: string) => void;
};
const AvatarSetting = (props: AvatarSettingType) => {
  const css = useEmotionCss(({ token }) => ({
    '.title': {
      color: token.colorTextHeading,
    },
    '.image': {
      width: 144,
      height: 144,
      marginBottom: 12,
      overflow: 'hidden',
      img: {
        width: '100%',
      },
    },
    '.upload-button': {
      width: 144,
      textAlign: 'center',
    },
  }));

  const { imageUrl, onChange } = props;
  const [avatar, setAvatar] = useState(imageUrl || logo);
  useEffect(() => {
    if (ObjectUtils.isNotEmpty(imageUrl)) {
      setAvatar(imageUrl);
    }
  }, [imageUrl]);

  const handleChange = ({ file }) => {
    if (file.status === 'done') {
      const url = file.response?.data?.url;
      if (ObjectUtils.isNotEmpty(url)) {
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
    <div className={css}>
      <div className="title">头像</div>
      <div className="image">
        <img src={avatar} alt="avatar" />
      </div>

      <Upload
        showUploadList={false}
        onChange={handleChange}
        action={ApiConfig.upload}
        maxCount={1}
        headers={Q.authHeader()}
      >
        <div className="upload-button">
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
