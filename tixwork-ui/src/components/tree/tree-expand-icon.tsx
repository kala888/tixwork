import ObjectUtils from '@/utils/object-utils';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Space } from 'antd';

const TreeExpandIcon = (props) => {
  const { expanded, onExpand, record } = props;
  if (ObjectUtils.isEmpty(record.children)) {
    return null;
  }
  return (
    <Space style={{ width: 24, cursor: 'pointer' }} onClick={(e) => onExpand(record, e)}>
      {expanded ? <CaretDownOutlined className="expandIcon" /> : <CaretRightOutlined className="expandIcon" />}
    </Space>
  );
};
export default TreeExpandIcon;
