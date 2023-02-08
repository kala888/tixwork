// @ts-ignore
import React, { useContext, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { ModelDispatcher } from '@/model/model-dispatcher';
import { ModelContext } from '@/model/model-provider';

//4. 运行时初始化，
export default function useModel<T>(namespace: string): T {
  const isMount = useRef(false);
  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    };
  }, []);

  const { dispatcher } = useContext<{ dispatcher: ModelDispatcher }>(ModelContext);
  const [state, setState] = useState<T>(() => (dispatcher.data[namespace] as any) || {});
  const stateRef = useRef<any>(state);
  stateRef.current = state;

  useEffect(() => {
    const handler = (data: any) => {
      // 为初始化
      if (!isMount.current) {
        // 如果 handler 执行过程中，组件被卸载了，则强制更新全局 data
        setTimeout(() => {
          dispatcher.data[namespace] = data;
          dispatcher.update(namespace);
        });
      } else {
        const currentState = data;
        const previousState = stateRef.current;
        if (!_.isEqual(currentState, previousState)) {
          setState(currentState || {});
        }
      }
    };

    dispatcher.callbacks[namespace] ||= new Set() as any;
    dispatcher.callbacks[namespace].add(handler);
    dispatcher.update(namespace);

    return () => {
      dispatcher.callbacks[namespace].delete(handler);
    };
  }, [namespace]);
  if (_.isNil(state)) {
    console.warn(`model "${namespace}" is unregistered, please config it in models.ts`);
  }
  return state || ({} as T);
}
