import { getProfile } from '@/http';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import Q from '@/http/http-request/q';
import { history } from '@@/core/history';
import { useModel } from '@@/plugin-model';
import { flushSync } from 'react-dom';

type useProfileType = {
  profile: API.ProfileInfo;
  syncProfile: () => Promise<API.ProfileInfo>;
  logout: () => Promise<void>;
};

const defaultProfile = {} as API.ProfileInfo;

export default function useProfile(): useProfileType {
  const { initialState, refresh, setInitialState } = useModel('@@initialState');

  const syncProfile = async () => {
    const resp = await getProfile();
    const profile = resp.data || {};

    if (resp.code === 200) {
      // 登录后，刷新profile信息，导致onPageChange中没有更新，两种方案flushSync或者refresh。https://github.com/ant-design/ant-design-pro/issues/10222
      // 不能使用refresh，否则getInitialState会有逻辑问题
      flushSync(() => {
        setInitialState((pre) => ({ ...pre, profile }));
      });
      // setInitialState((pre) => ({ ...pre, profile }));
      // await refresh();
    }
    return profile;
  };

  const logout = async () => {
    await setInitialState((pre) => ({ ...pre, profile: undefined }));
    await refresh();
    await Q.post(ApiConfig.logout);
    localStorage.removeItem('token');
    history.replace({ pathname: '/login' });
    // 保留退出参数
    // if (window.location.pathname !== '/login' && !redirect) {
    //   history.replace({
    //     pathname: '/login',
    //     search: stringify({
    //       redirect: pathname,
    //     }),
    //   });
    // }
  };
  return {
    profile: initialState?.profile || defaultProfile,
    syncProfile,
    logout,
  };
}
