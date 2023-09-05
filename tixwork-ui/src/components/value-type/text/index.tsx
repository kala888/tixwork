import { IconText } from '@/components/value-type/text/icon-text';
import ProTextList from '@/components/value-type/text/pro-text-list';
import { TextList } from '@/components/value-type/text/text-list';

export const ProMultipleTextLineValueType = {
  render: (text) => <TextList items={text} />,
  renderFormItem: (__, props) => <ProTextList {...props} />,
};

export const IconTextValueType = {
  render: (dom, props) => <IconText {...props.record}> {dom}</IconText>,
};
