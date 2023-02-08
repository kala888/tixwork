import type { ImagUploadType } from '@/components/value-type/image-list/ele-image-list';
import ImagePicker from '@/components/value-type/image-list/image-picker';
import { ProForm } from '@ant-design/pro-components';

type ImagePickerType = Record<string, any> & Partial<ImagUploadType>;

export default function ProImagePicker(props: ImagePickerType) {
  const { label, width, ...rest } = props;
  console.log('...rest', rest);
  return (
    <ProForm.Item label={label} {...rest}>
      <ImagePicker {...props} {...props.fieldProps} width={width} />
    </ProForm.Item>
  );
}
