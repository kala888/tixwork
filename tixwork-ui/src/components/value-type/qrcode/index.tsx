import { Tag as AntdTag } from 'antd';

const render = (text) => {
  return <AntdTag style={{ paddingLeft: 12, paddingRight: 12 }}>{text}</AntdTag>;
};

const QRCode = { render };
export default QRCode;
