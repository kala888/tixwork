import { disableClickEventBubbling } from '@/utils';
import type { ActionLike } from '@/utils/nice-router-types';
import ObjectUtils from '@/utils/object-utils';
import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Popconfirm, Typography } from 'antd';

export const MoreOptionAction = ({ menus }) => {
  if (ObjectUtils.isEmpty(menus)) {
    return null;
  }
  const items = menus.map((it, idx) => ({ label: it, key: 'item' + idx + '_' + it }));

  return (
    <Dropdown menu={{ items }} overlayStyle={{ width: 100 }}>
      <Typography.Link>
        <EllipsisOutlined />
      </Typography.Link>
    </Dropdown>
  );
};

export const OptionAction = (props: ActionLike) => {
  const { title, level, onClick, extraData, hidden, disabled } = props;
  if (hidden) {
    return null;
  }

  if (level === 'danger') {
    return (
      <Popconfirm
        title={extraData?.confirmText || '点击有风险，操作需谨慎'}
        okText="继续"
        cancelText="放弃"
        overlayStyle={{ minWidth: 200 }}
        onConfirm={onClick}
        onCancel={disableClickEventBubbling}
        disabled={disabled}
      >
        <Typography.Link type="danger" disabled={disabled} onClick={disableClickEventBubbling}>
          {title}
        </Typography.Link>
      </Popconfirm>
    );
  }
  return (
    <Typography.Link type={level} onClick={onClick} disabled={disabled}>
      {title}
    </Typography.Link>
  );
};
