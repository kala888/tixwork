import { API } from '@/http/api-types';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Typography } from 'antd';

export default function NoticeDetail(props: API.Notice) {
  const { noticeTitle, noticeContent, createTime } = props;
  const type = props.noticeType === '1' ? '通知' : '公告';

  const css = useEmotionCss(({ token }) => ({
    display: 'flex',
    flexDirection: 'column',
    color: token.colorTextLabel,

    '.notice-title': {
      fontWeight: 'bold',
      paddingBottom: 10,
    },
    '.notice-content': {
      marginTop: 10,
      minHeight: 200,
    },
    '.notice-create-time': {
      display: 'flex',
      alignSelf: 'flex-end',
      color: token.colorTextLabel,
    },
  }));
  return (
    <div className={css}>
      <Typography.Text copyable className="notice-title flex-center">
        【{type}】{noticeTitle}
      </Typography.Text>
      <div className="notice-create-time">{createTime}</div>
      <div className="notice-content">{noticeContent}</div>
    </div>
  );
}
