import ApiConfig from '@/http/api-config';
import { useVisible } from '@/services/use-service';
import { ensureArray } from '@/utils';
import { isEmpty, isNotEmpty } from '@/utils/object-utils';
import { PlusOutlined } from '@ant-design/icons';
import { message, Modal, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function ImagePicker(props) {
  const { visible, close, show } = useVisible();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<any>();

  const { value = [], single = false, onChange } = props;
  const maxCount = single ? 1 : props.maxCount || 3;
  useEffect(() => {
    if (isNotEmpty(previewImage)) {
      show();
    } else {
      close();
    }
  }, [previewImage]);

  useEffect(() => {
    console.log('items', value);
    // TODO 这里有个坑，猜测是在schamaform里，自动注入onChange的调用。选在文件后的文件后触发onChange，且value是临时文件，例如"C:\fakepath\Jietu20220406-140435.png"
    // 注意观察看看，后面实在不行就重写Upload组件吧
    if (isEmpty(value) || (typeof value === 'string' && value.indexOf('fakepath') > -1)) {
      return;
    }
    const list = ensureArray(value);
    const theList: any[] = list.map((it) => ({
      uid: it,
      name: it,
      status: 'done',
      url: it,
    }));
    setFileList(theList);
  }, [value]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
  };

  const handleCancel = () => setPreviewImage(null);

  const handleChange = ({ file, fileList: list }) => {
    if (file.status === 'done') {
      if (isNotEmpty(file.response.data.url)) {
        const result = list
          .map((it) => it.url || it.response.data.url)
          .filter((it) => isNotEmpty(it));
        if (onChange) {
          onChange(single ? result[0] : result);
        }
        message.success('图片上传成功');
      } else {
        message.error('图片上传失败');
      }
    }
    setFileList(list);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        action={ApiConfig.upload}
        maxCount={maxCount}
        headers={{
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      <Modal open={visible} footer={null} onCancel={handleCancel}>
        <img alt="图片" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
}
