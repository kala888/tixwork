import { useEffect, useState } from 'react';
import { noop } from '@/utils';
import { isEmpty } from '@/utils/object-utils';
import { Text, View } from '@tarojs/components';
import { ImageLike } from '@/nice-router/nice-router-types';
import ImageItem, { TaroImageFile } from '@/components/image-picker/image-item';
import uploadFile from '@/service/file-upload/upload-file';

import './styles.less';
import Progress from '@/components/progress';

type EleImage = {
  imageUrl?: string;
};

type EleImagePickerType = {
  value: EleImage[] | string;
  onChange?: (imageList: ImageLike[]) => void;
  maxLength?: number;
  disabled?: boolean;
  brief?: string;
};

function EleImagePicker(props: EleImagePickerType) {
  const { value = [], onChange = noop, maxLength = 4, disabled, brief } = props;
  const [files, setFiles] = useState<EleImage[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let sourceFile: EleImage[] = [];
    if (!isEmpty(value)) {
      sourceFile = Array.isArray(value) ? value : [{ imageUrl: value }];
    }
    setFiles(sourceFile);
  }, [value]);

  const handleChange = (items) => {
    const result = [].concat(items);
    setFiles(result);
    onChange(result);
  };

  const handleRemove = (index) => {
    files.splice(index, 1);
    console.log('remove....', index);
    handleChange(files);
  };

  const handleAdd = async (file: TaroImageFile) => {
    const resetProgress = () => setProgress(0);

    const onProgress = ({ progress: progressValue }) => setProgress(progressValue);

    const onSuccess = (remoteFile) => {
      files.push({ imageUrl: remoteFile });
      handleChange(files);
    };

    await uploadFile({
      file,
      onProgress,
      onStart: resetProgress,
      onComplete: resetProgress,
      onSuccess,
    });
  };

  const multiple = maxLength > 1;
  const briefText = brief || (multiple ? `最多可以上传 ${maxLength} 个文件` : '');
  const showAddBtn = files.length < maxLength;

  return (
    <View>
      <View className='image-picker'>
        {files.map((it, idx) => (
          <ImageItem key={idx} imageUrl={it.imageUrl} onRemove={handleRemove.bind(null, idx)} disabled={disabled} />
        ))}
        {showAddBtn && <ImageItem onAdd={handleAdd} disabled={disabled} />}
      </View>
      <Text className='note'>{briefText}</Text>
      {progress > 0 && <Progress percent={progress} />}
    </View>
  );
}

EleImagePicker.defaultProps = {
  brief: '',
  maxLength: 4,
  value: [],
  onChange: noop,
};

export default EleImagePicker;
