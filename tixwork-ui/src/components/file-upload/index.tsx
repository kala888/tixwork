import { useOpen } from '@/services/use-service';
import ObjectUtils from '@/utils/object-utils';
import { ProFormItem } from '@ant-design/pro-components';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import MemoFileUpload from './upload';

export const ProFormFile = (props) => {
  //这里指定name和label，为了使在_FileUpload获取onchange，且不讲onchange和Value传递给ProFormUploadButton
  const { label, name, rules, fieldProps, proFieldKey, ...rest } = props;
  return (
    <ProFormItem label={label} name={name} rules={rules} className="customized-form-item">
      <MemoFileUpload {...rest} {...fieldProps} />
    </ProFormItem>
  );
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export const ProFormImage = (props) => {
  //这里指定name和label，为了使在_FileUpload获取onchange，且不讲onchange和Value传递给ProFormUploadButton
  const { label, name, fieldProps, proFieldKey, ...rest } = props;

  const { open, close, show } = useOpen();
  const [previewImage, setPreviewImage] = useState<any>();

  useEffect(() => {
    if (ObjectUtils.isNotEmpty(previewImage)) {
      show();
    } else {
      close();
    }
  }, [previewImage]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
  };
  const handleCancel = () => setPreviewImage(null);

  return (
    <>
      <ProFormItem label={label} name={name} className="customized-form-item">
        <MemoFileUpload listType="picture-card" onPreview={handlePreview} {...rest} {...fieldProps} accept="image" />
      </ProFormItem>
      <Modal title={'图片'} open={open} footer={null} onCancel={handleCancel}>
        <img alt="图片" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};
