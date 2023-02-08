import { colors } from '@/components/value-type/style-utils';
import { Tag as AntdTag } from 'antd';
import _ from 'lodash';

const render = (text, props) => {
  const { valueEnum } = props;
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

const Tag = { render };
export default Tag;
