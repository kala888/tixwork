const AuthHeaderInterceptor = (config) => {
  const { headers = {} } = config;
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      ...headers,
    },
  };
};

export default AuthHeaderInterceptor;
