import FileExport from '@/components/import-export/file-export';
import FileImport from '@/components/import-export/file-import';
import type { ActionList as Actions } from '@/utils/nice-router-types';
import ObjectUtils from '@/utils/object-utils';
import { history } from '@umijs/max';
import { Button, Space } from 'antd';
import _ from 'lodash';
import React from 'react';

// 1. React.isValidElement(element)
// // DOM 类型 React 元素
// function isDOMTypeElement(element) {
//   return React.isValidElement(element) && typeof element.type === 'string';
// }
//
// // 自定义合成类型的 React 元素
// function isCompositeTypeElement(element) {
//   return React.isValidElement(element) && typeof element.type === 'function';
// }

//1.  React.isValidElement=true可以用React.cloneElement
//1.1 只有isCompositeTypeElement=true : <Test />,<Test2 />,<Test3 />,可以在React.cloneElement时候赋值onSuccess等自定义的东西
//1.2 isCompositeTypeElement=false: <Button />,不能再clone的时候传递额外的不存在属性。

//2. isValidElement=true,isDOMTypeElement=true,isCompositeTypeElement=false:<div/>
//3.false,false,false: () => <div>111</div>,Test,Test2,Test3,Button,

function DefaultButton(props) {
  const { title, linkToUrl, onClick, onSuccess, ...rest } = props;
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (ObjectUtils.isNotEmpty(linkToUrl)) {
      history.push(linkToUrl);
    }
  };
  return (
    <Button onClick={handleClick} type="dashed" {...rest}>
      {title}
    </Button>
  );
}

type ActionListType = {
  items: Actions;
};

const ActionsMapping: Record<string, any> = {
  export: FileExport,
  import: FileImport,
};

export default function ActionList(props: ActionListType) {
  const { items = [] } = props;
  return (
    <Space>
      {items.map((it) => {
        if (React.isValidElement(it)) {
          return it;
        }
        const Component = _.get(ActionsMapping, it?.code as any) || DefaultButton;
        return <Component key={it?.code + '_' + it.title} {...it} />;
      })}
    </Space>
  );
}
