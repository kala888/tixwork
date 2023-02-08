import type { CheckedKeysType } from '@/components/pro-tree/utils';
import { toCheckedKeys } from '@/components/pro-tree/utils';
import { Tree } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

type TreeNode = {
  id: React.Key;
  title: string;
  children?: TreeNode[];
};
type ProTreeType = {
  root: TreeNode;
  checkedList: React.Key[];
  onChange: (id: React.Key, checkedList: React.Key[]) => void;
};

/**
 * 简单封装，传入root，checkedList, 主要解决自动计算halfChecked问题
 * 例如Menu要将halfChecked的id当做checked处理
 */
const ProTree = (props: ProTreeType) => {
  const { root, onChange, checkedList } = props;
  const [checkedKeys, setCheckedKeys] = useState<CheckedKeysType>({} as any);

  useEffect(() => {
    const keys = toCheckedKeys(root, checkedList);
    setCheckedKeys(keys);
  }, [root, checkedList]);

  const handleCheck = (checked, e) => {
    console.log('checked', checked, e);
    const keys = _.concat(checked, e.halfCheckedKeys);
    if (onChange) {
      onChange(root.id, keys);
    }
  };

  return (
    <Tree
      blockNode
      checkable
      autoExpandParent
      defaultExpandParent
      defaultExpandedKeys={[root.id]}
      checkedKeys={checkedKeys}
      // @ts-ignore
      treeData={[root]}
      onCheck={handleCheck}
      fieldNames={{
        title: 'title',
        key: 'id',
      }}
    />
  );
};

export default React.memo(ProTree);
