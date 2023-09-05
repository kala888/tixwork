import TreeSelector from '@/components/tree/tree-selector';
import ApiConfig from '@/http/api-config';

const DeptSelector = (props) => (
  <TreeSelector title={'部门选择'} linkToUrl={ApiConfig.deptTree} icon={'department'} {...props} />
);
export default DeptSelector;
