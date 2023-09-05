import { colors } from '@/components/value-type/style-utils';
import { Tag as AntdTag } from 'antd';
import _ from 'lodash';

type ProTagType = {
  text: string;
  valueEnum?: Record<string, any>;
};
export const ProTag = (props: ProTagType) => {
  const { text, valueEnum } = props;

  if (valueEnum) {
    const theText = _.get(valueEnum, text);
    const valueIdx = _.keys(valueEnum).indexOf(text) || 0;
    const color = colors.colorList[valueIdx];
    return (
      <AntdTag style={{ paddingLeft: 12, paddingRight: 12 }} color={color}>
        {theText}
      </AntdTag>
    );
  }
  return <AntdTag style={{ paddingLeft: 12, paddingRight: 12 }}>{text}</AntdTag>;
};

const TagValueType = {
  render: (text, props) => <ProTag {...props} text={text} />,
};
export default TagValueType;
