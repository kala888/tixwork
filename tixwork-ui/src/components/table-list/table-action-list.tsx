import ActionList from '@/components/action/action-list';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

type TableActionListType = {
  items: any[] | false;
  onAdd: any;
  onRefresh: any;
  params?: (() => Record<string, any>) | Record<string, any>;
};
const defaultTitle = (
  <Space>
    <PlusOutlined />
    创建
  </Space>
);
export default function TableActionList(props: TableActionListType) {
  const { items = [], onAdd, onRefresh, params } = props;
  if (items === false) {
    return null;
  }
  let actionList: any[] = [...items];
  if (actionList.length === 0) {
    actionList.push({ code: 'create' });
  }
  actionList = actionList.map((it) => {
    if (it.code === 'create' && onAdd) {
      return (
        <Button key="add-button" id="add-button" type="primary" onClick={onAdd} {...it}>
          {it.title || defaultTitle}
        </Button>
      );
    }
    if (it.code === 'import') {
      return { ...it, onSuccess: onRefresh };
    }
    return it;
  });

  return <ActionList {...props} params={params} items={actionList} />;
}
