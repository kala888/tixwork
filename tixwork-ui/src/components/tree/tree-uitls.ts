import ObjectUtils from '@/utils/object-utils';
import _ from 'lodash';

const toTree = (list, idKey = 'id', parentKey = 'parentId') => {
  if (ObjectUtils.isEmpty(list) || !Array.isArray(list)) {
    return [];
  }

  // parent key和 child list,  { parentId : [...] }
  const parents = _.groupBy(list, parentKey);

  // key和 item,  { key : {...} }
  const items = _.keyBy(list, idKey);
  const root: any = {
    children: [],
  };

  _.each(parents, (children, parentId) => {
    if (ObjectUtils.isNotEmpty(children)) {
      const item: any = _.get(items, parentId);
      if (!item) {
        root.children = _.concat(root.children, children);
      } else {
        item.children = children;
      }
    }
  });
  return root.children;
};

const TreeUtils = {
  toTree,
};
export default TreeUtils;
