import OptionActionList from '@/components/value-type/action-list/option-action-list';

const render = (__, props) => {
  const { fieldProps, record } = props;
  const actionList = fieldProps?.actionList || [];
  return <OptionActionList items={actionList} maxShow={fieldProps?.maxLength} record={record} />;
};

const ActionList = {
  render,
};
export default ActionList;
