import { useEffect, useMemo, useRef } from 'react';

interface ExecutorProps {
  hook: () => any;
  onUpdate: (val: any) => void;
  namespace: string;
}

export default function ModelExecutor(props: ExecutorProps) {
  const { hook, onUpdate, namespace } = props;

  const updateRef = useRef(onUpdate);
  const initialLoad = useRef(false);

  let data: any;
  try {
    data = hook();
  } catch (e) {
    console.error(`Invoking '${namespace || 'unknown'}' model failed:`, e);
  }

  // 首次执行时立刻返回初始值
  useMemo(() => {
    updateRef.current(data);
  }, []);

  // React 16.13 后 update 函数用 useEffect 包裹
  useEffect(() => {
    if (initialLoad.current) {
      updateRef.current(data);
    } else {
      initialLoad.current = true;
    }
  });

  return null;
}
