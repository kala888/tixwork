import { List } from 'antd';

type ActionType = {
  title: string;
  description: any;
  avatar?: any;
  actions: any[];
};
type AccountActionsType = {
  dataSource: ActionType[];
  itemLayout?: 'vertical' | 'horizontal';
};
export default function AccountActions(props: AccountActionsType) {
  const { dataSource } = props;

  const renderItem = (item) => (
    <List.Item actions={item.actions}>
      <List.Item.Meta title={item.title} description={item.description} avatar={item.avatar} />
    </List.Item>
  );

  return <List itemLayout="horizontal" dataSource={dataSource} renderItem={renderItem} />;
}
