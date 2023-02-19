import EleImageList from './ele-image-list';
import ImagePicker from './image-picker';

const ImageListValueType = {
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
    return <ImagePicker {...rest} {...fieldProps} />;
  },
};
export default ImageListValueType;
