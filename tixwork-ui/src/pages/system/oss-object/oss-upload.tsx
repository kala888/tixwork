import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import { useLoading } from '@/services/use-service';
import { UploadOutlined } from '@ant-design/icons';
import { App, Button, Upload } from 'antd';

type OSSUploadType = {
  title: string;
  name?: string;
  onSuccess: (info: any) => void;
  onFailed?: (info: any) => void;
};

export default (props: OSSUploadType) => {
  const { message, notification } = App.useApp();
  const { loading, showLoading, hideLoading } = useLoading();

  const { onSuccess, onFailed, title, name = 'file' } = props;

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      showLoading();
      return;
    }
    if (info.file.status === 'done') {
      hideLoading();
      message.success('文件上传成功');
      if (onSuccess) {
        onSuccess(info);
      }
      return;
    }

    if (info.file.status === 'error') {
      hideLoading();
      notification.error({
        message: '上传失败',
        description: info.file.response?.msg,
      });
      if (onFailed) {
        onFailed(info);
      }
    }
  };

  return (
    <Upload
      name={name}
      showUploadList={false}
      action={ApiConfig.upload}
      headers={Q.authHeader()}
      onChange={handleChange}
    >
      <Button loading={loading}>
        <UploadOutlined />
        {title}
      </Button>
    </Upload>
  );
};
