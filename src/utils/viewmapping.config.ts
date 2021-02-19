const ViewMappingConfig = {
  'com.terapico.appview.MePage': {
    pageName: '/pages/me/me-page',
    stateAction: 'me/save',
  },
  LoginForm: {
    pageName: '/pages/login/login-page',
  },
  'com.terapico.appview.HomePage': {
    pageName: '/pages/home/home-page',
    stateAction: 'home/save',
  },

  'com.mock': [
    {
      pageName: '/pages/listof-page',
      stateAction: 'listofpage/save',
    },
    {
      pageName: '/pages/listof-page2',
      stateAction: 'listofpage2/save',
    },
  ],
};

export default ViewMappingConfig;
