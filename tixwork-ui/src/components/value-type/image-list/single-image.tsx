import EleImageList from '@/components/value-type/image-list/ele-image-list';
import ProImagePicker from '@/components/value-type/image-list/image-picker';
import { ensureArray } from '@/utils';

const SingleImage = {
  render: (item, props) => {
    const { fieldProps } = props;
    const items = ensureArray(item);
    return <EleImageList {...fieldProps} items={items} />;
  },
  renderFormItem: (__, props) => {
    const { fieldProps, ...rest } = props;
    return <ProImagePicker {...rest} {...fieldProps} single={true} />;
  },
};
export default SingleImage;
