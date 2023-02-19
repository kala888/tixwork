import DeptSelector from '@/components/tree/dept-selector';

const DepartmentValueType = {
  render: (text) => <a>{text}</a>,
  renderFormItem: (__, props) => <DeptSelector {...props} />,
};
export default DepartmentValueType;
