import DeptSelector from '@/components/tree/dept-selector';

const Department = {
  render: (text) => <a>{text}</a>,
  renderFormItem: (__, props) => <DeptSelector {...props} />,
};
export default Department;
