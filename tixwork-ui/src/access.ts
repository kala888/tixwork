import _ from 'lodash';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: any) {
  const roleList = _.get(initialState, 'profile.roles', []); //TODO没测试
  const isAdmin = _.find(roleList, { isAdmin: true });
  return {
    canAdmin: !!isAdmin,
  };
}
