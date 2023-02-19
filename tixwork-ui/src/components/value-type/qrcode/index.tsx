import { Tag as AntdTag } from 'antd';

const QRCodeValueType = {
  render: (text) => {
    return <AntdTag style={{ paddingLeft: 12, paddingRight: 12 }}>{text}</AntdTag>;
  },
};
export default QRCodeValueType;
