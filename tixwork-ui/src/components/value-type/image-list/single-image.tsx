import { ensureArray } from '@/utils';
import EleImageList from './ele-image-list';
import ImagePicker from './image-picker';

const SingleImage = {
  render: (item, props) => {
    const { fieldProps } = props;
    const items = ensureArray(item);
    return <EleImageList {...fieldProps} items={items} />;
  },
  renderFormItem: (__, props) => {
    const { fieldProps, ...rest } = props;
    return <ImagePicker {...rest} {...fieldProps} single={true} />;
  },
};
export default SingleImage;
