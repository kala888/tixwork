import ObjectUtils from '@/utils/object-utils';
import deepdash from 'deepdash';
import lodash from 'lodash';
import type React from 'react';

const _ = deepdash(lodash);

export type CheckedKeysType = {
  checked: React.Key[];
  halfChecked: React.Key[];
};
type CheckType = 'checked' | 'unchecked' | 'halfChecked' | undefined;

export const getCheckType = (root, keys: any[] = []): CheckType => {
  const { children = [], id = '' } = root;
  // 没有儿子，就返回自身状态
  if (ObjectUtils.isEmpty(children)) {
    return keys.indexOf(id) > -1 ? 'checked' : 'unchecked';
  }

  let type: CheckType;
  if (ObjectUtils.isNotEmpty(children)) {
    for (let i = 0; i < children.length; i++) {
      const childCheckedType = getCheckType(children[i], keys);
      if (_.isNil(type)) {
        type = childCheckedType;
        continue;
      }
      // 1.如果儿子有一个状态不一致
      if (childCheckedType !== type) {
        return 'halfChecked';
      }
    }
  }
  return type;
};

// 算法不好，有机会在重构吧
export const toCheckedKeys = (root, keys) => {
  const checked: React.Key[] = [];
  const halfChecked: React.Key[] = [];
  _.eachDeep(
    [root],
    (sub) => {
      const checkType = getCheckType(sub, keys);
      if (checkType === 'checked') {
        checked.push(sub.id);
      } else if (checkType === 'halfChecked') {
        halfChecked.push(sub.id);
      }
    },
    {
      // @ts-ignore
      childrenPath: 'children',
    },
  );

  return {
    checked,
    halfChecked,
  };
};
