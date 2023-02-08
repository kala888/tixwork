import TreeSelector from '@/components/tree/tree-selector';
import { getDepartmentTree } from '@/http';
import { useEffect, useState } from 'react';

export default function DeptSelector(props) {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    getDepartmentTree().then((resp) => {
      const { data } = resp;
      setDataSource(data as any);
    });
    // treeselect().then(res => setDataSource(TreeUtils.toTree(res.data)))
  }, []);
  return (
    <TreeSelector
      dataSource={dataSource}
      title={'部门选择'}
      icon={'department'}
      width={'sm'}
      {...props}
    />
  );
}
