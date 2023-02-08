//2. 定义context，共享dispatcher
import React from 'react';
import ModelExecutor from '@/model/model-excutor';
import { ModelDispatcher } from '@/model/model-dispatcher';
import _ from 'lodash';

export const ModelContext = React.createContext<{ dispatcher: ModelDispatcher }>(null as any);

const dispatcher = new ModelDispatcher();

export function getDispatcher(): ModelDispatcher {
  return dispatcher;
}

//一般用useModel, 纯方法里无法使用hooks，这里是是快捷方式，无奈
export function getModel<T>(namespace: string) {
  return _.get(dispatcher.data, namespace) as T;
}

//3. 初始化Provider，将models绑定dispatcher
// [name:hook]
type ModelProviderType = {
  models: Record<string, () => any>;
  children: React.ReactNode;
};

export function ModelProvider(props: ModelProviderType) {
  const { models = {} } = props;
  const nameList = Object.keys(models);
  return (
    <ModelContext.Provider value={{ dispatcher }}>
      {nameList.map((namespace) => {
        const hook = models[namespace];
        const handleUpdate = (val) => {
          dispatcher.data[namespace] = val;
          dispatcher.update(namespace);
        };
        return <ModelExecutor key={namespace} hook={hook} namespace={namespace} onUpdate={handleUpdate} />;
      })}
      {props.children}
    </ModelContext.Provider>
  );
}
