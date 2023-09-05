import Q from '@/http/http-request/q';

const AuthHeaderInterceptor = (config) => {
  const { headers = {} } = config;
  return {
    ...config,
    headers: {
      ...Q.authHeader(),
      ...headers,
      // Authorization: `Bearer ${localStorage.getItem('token')}`,
      // clientid: Config.clientid,
    },
  };
};

export default AuthHeaderInterceptor;
