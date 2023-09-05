import { ProFormFile, ProFormImage } from '@/components/file-upload';
import { FileList } from '@/components/file-upload/file-list';
import { ensureArray } from '@/utils';

export const ImageListValueType = {
  render: (item, props) => {
    const { fieldProps } = props;
    let items = item;
    if (typeof item === 'string') {
      items = [item];
    }
    return <FileList {...fieldProps} items={items} />;
  },
  renderFormItem: (__, props) => <ProFormImage {...props} />,
};

export const SingleImageValueType = {
  render: (item, props) => {
    const { fieldProps } = props;
    const items = ensureArray(item);
    return <FileList {...fieldProps} items={items} />;
  },
  renderFormItem: (__, props) => <ProFormImage {...props} single={true} />,
};

export const FileValueType = {
  render: (item, props) => {
    const { fieldProps } = props;
    const items = ensureArray(item);
    return <FileList {...fieldProps} items={items} />;
  },
  renderFormItem: (__, props) => <ProFormFile {...props} single={true} />,
};
export const FileListValueType = {
  render: (item, props) => {
    const { fieldProps } = props;
    const items = ensureArray(item);
    return <FileList {...fieldProps} items={items} />;
  },
  renderFormItem: (__, props) => <ProFormFile {...props} />,
};
