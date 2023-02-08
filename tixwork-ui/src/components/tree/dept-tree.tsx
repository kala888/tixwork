import type { EleTreeNodeType, EleTreeType } from '@/components/tree/ele-tree';
import EleTree from '@/components/tree/ele-tree';
import { getDepartmentTree } from '@/http';
import { useAsyncEffect } from 'ahooks';
import { useState } from 'react';

export default function DeptTree(props: EleTreeType) {
  const [dataSource, setDataSource] = useState<EleTreeNodeType[]>([]);

  // Tips 异步，远程调用，回调容易出现内存泄露问题
  // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application
  // 这里是安全的调用方法2个示例：

  // 1. 使用a-hooks, 推荐
  const fetchData = async function* () {
    const resp = await getDepartmentTree();
    yield;
    setDataSource(resp.data as any);
  };
  useAsyncEffect(fetchData, []);

  // 2. 使用AbortController的ac.signal.aborted判断
  // useEffect(() => {
  //   const ac = new AbortController()
  //   treeselect().then(resp => {
  //     if (!ac.signal.aborted) {
  //       setDataSource(resp.data as any)
  //     }
  //   })
  //   return () => ac.abort()
  // }, [])

  return <EleTree {...props} dataSource={dataSource} searchPlaceholder="输入并回车搜索" />;
}
