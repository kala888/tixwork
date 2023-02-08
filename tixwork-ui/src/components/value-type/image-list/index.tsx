import EleImageList from '@/components/value-type/image-list/ele-image-list';
import ProImagePicker from '@/components/value-type/image-list/image-picker';

const ImageList = {
  render: (item, props) => {
    const { fieldProps } = props;
    let items = item;
    if (typeof item === 'string') {
      items = [item];
    }
    return <EleImageList {...fieldProps} items={items} />;
  },
  renderFormItem: (__, props) => {
    const { fieldProps, ...rest } = props;
    return <ProImagePicker {...rest} {...fieldProps} />;
  },
};
export default ImageList;
