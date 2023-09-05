import { colors } from '@/components/value-type/style-utils';
import { ProFormText } from '@ant-design/pro-components';
import { Avatar, Space } from 'antd';
import _ from 'lodash';

const render = _.memoize((text = '', props) => {
  const userName = _.get(props, 'record.userName');
  const avatar = _.get(props, 'record.avatar', '');
  const txtColorIdx = userName ? userName.length : text.length;
  const bgColor = colors.colorList[txtColorIdx];
  const style = { borderRadius: 4, color: '#fff', backgroundColor: bgColor };
  return (
    <Space>
      <Avatar src={avatar} shape="square" style={style}>
        {text.substring(0, 1)}
      </Avatar>
      {text}
    </Space>
  );
});

const NickNameValueType = {
  render,
  renderFormItem: (__, props) => (
    <ProFormText
      formItemProps={{ className: 'customized-form-item' }}
      {...props}
      fieldProps={{ maxLength: 11, ...props.fieldProps }}
    />
  ),
};
export default NickNameValueType;
