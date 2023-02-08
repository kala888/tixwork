import { ProProvider } from '@ant-design/pro-components';
import { useContext } from 'react';
import valueTypeMap from './index';

export default function EleProProvider(props) {
  const context = useContext(ProProvider);
  const { value = {}, children, ...rest } = props;

  return (
    <ProProvider.Provider
      value={{
        ...context,
        valueTypeMap,
        ...{ value },
      }}
      {...rest}
    >
      {children}
    </ProProvider.Provider>
  );
}
