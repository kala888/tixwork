import NoticeList from '@/components/layout/user-notice/notice-list';
import { useOpen } from '@/services/use-service';
import { BellOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Badge, Drawer } from 'antd';

export default (props) => {
  const { open, show, close } = useOpen();

  const rootCls = useEmotionCss(({ token }) => ({
    display: ' inline-block',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '.anticon': {
      padding: 4,
      color: token.colorTextLabel,
      fontSize: 16,
      verticalAlign: 'middle',
    },
  }));

  return (
    <>
      <div onClick={show} className={rootCls}>
        <Badge count="0" style={{ boxShadow: 'none', color: '#dfdfdf' }}>
          <BellOutlined />
        </Badge>
      </div>
      <Drawer title="通知与消息" width={400} onClose={close} open={open}>
        <NoticeList />
      </Drawer>
    </>
  );
};
