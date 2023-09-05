import { colors } from '@/components/value-type/style-utils';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import { useGet } from '@/http/use-http';
import ObjectUtils from '@/utils/object-utils';
import { AuditOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { App, Avatar } from 'antd';
import logo from '../../../assets/logo.svg';
import NoticeDetail from './notice-detail';

export default () => {
  const { modal } = App.useApp();
  const { data } = useGet<API.Notice[]>(ApiConfig.getUnreadNotice);

  const read = (row: API.Notice) => {
    modal.info({
      closable: true,
      title: '消息详情',
      width: 700,
      content: <NoticeDetail {...row} />,
      okText: '已阅',
    });
  };

  const notEmptyCss = useEmotionCss(({ token }) => ({
    padding: '73px 0 88px',
    color: token.colorTextLabel,
    textAlign: 'center',
    img: {
      display: 'inline-block',
      height: 76,
      marginBottom: 16,
    },
  }));

  if (ObjectUtils.isEmpty(data)) {
    return (
      <div className={notEmptyCss}>
        <img src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg" alt="not found" />
        <div>没消息就是最好的消息</div>
      </div>
    );
  }

  return (
    <ProList<API.Notice>
      ghost
      rowKey="id"
      dataSource={data}
      // onRow={(record) => read(record)}
      metas={{
        type: {
          dataIndex: 'noticeType',
          render: (text, item) => (item.noticeType === '1' ? 'top' : 'new'),
        },
        title: {
          dataIndex: 'displayName',
          render: (text, item) => <div onClick={() => read(item)}>{text}</div>,
        },
        avatar: {
          dataIndex: 'noticeType',
          render: (text, item) => {
            if (item.noticeType === '1') {
              return <Avatar icon={<AuditOutlined />} style={{ backgroundColor: colors.golden }} />;
            }
            return <Avatar src={logo} />;
          },
        },
        description: {
          dataIndex: 'createTime',
        },
        actions: {
          render: (text, row, index, action) => [
            <a onClick={() => read(row)} key="link">
              查看
            </a>,
          ],
        },
      }}
    />
  );
};
