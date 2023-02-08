import { getProfile } from '@/http';
import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import { history } from '@@/core/history';
import { useModel } from '@@/plugin-model';

type useProfileType = {
  profile: API.ProfileInfo;
  syncProfile: () => Promise<API.ProfileInfo>;
  logout: () => Promise<void>;
};

const defaultProfile = {} as API.ProfileInfo;

export default function useProfile(): useProfileType {
  const { initialState, setInitialState } = useModel('@@initialState');
  const syncProfile = async () => {
    const resp = await getProfile();
    const profile = resp.data || {};
    if (resp.code === 200) {
      await setInitialState((pre) => ({ ...pre, profile }));
    }
    return profile;
  };

  const logout = async () => {
    await setInitialState((s) => ({
      ...s,
      profile: undefined,
    }));
    await Q.send(ApiConfig.logout, { method: 'DELETE' });
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
