import OptionActionList from '@/components/action/option-action-list';

const OptionActionsValueType = {
  render: (__, props) => {
    const { fieldProps, record } = props;
    const actionList = fieldProps?.actionList || [];
    return <OptionActionList items={actionList} maxShow={fieldProps?.maxLength} record={record} />;
  },
};
export default OptionActionsValueType;
