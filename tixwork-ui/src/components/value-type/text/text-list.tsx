import { Space, Tag } from 'antd';

type TextListType = {
  items: any[];
  tag?: boolean;
  separator?: string;
};
export const TextList = (props: TextListType) => {
  const { items, tag = true, separator = ', ' } = props;
  if (tag)
    return (
      <Space>
        {items.map((it, idx) => (
          <Tag key={idx + '_' + it}>{it}</Tag>
        ))}
      </Space>
    );
  return <span>{items.join(separator)}</span>;
};
