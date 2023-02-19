import ActionList from '@/components/action/action-list';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function TableActionList(props) {
  const { items = [], onAdd } = props;
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
        <Button key="add-button" type="primary" onClick={onAdd} {...it}>
          {it.title || (
            <>
              <PlusOutlined />
              新建
            </>
          )}
        </Button>
      );
    }
    return it;
  });

  return <ActionList {...props} items={actionList} />;
}
