const ViewmappingConfig = {
  // global pages
  'com.terapico.caf.viewcomponent.GenericPage': [
    {
      pageName: '/genericpage/generic-page',
      stateAction: 'genericpage/save',
    },
    {
      pageName: '/genericpage/generic-page2',
      stateAction: 'genericpage2/save',
    },
  ],
  'com.terapico.caf.viewcomponent.GenericFormPage': {
    pageName: '/genericform/genericform-page',
    stateAction: 'genericform/save',
  },
  'com.terapico.appview.ListOfPage': [
    {
      pageName: '/listof/listof-page',
      stateAction: ['listofpage/save', 'listofpage2/clear'],
    },
    {
      pageName: '/listof/listof-page2',
      stateAction: ['listofpage2/save', 'listofpage3/clear'],
    },
    {
      pageName: '/listof/listof-page3',
      stateAction: ['listofpage3/save', 'listofpage4/clear'],
    },
    {
      pageName: '/listof/listof-page4',
      stateAction: ['listofpage4/save', 'listofpage/clear'],
    },
  ],

  'com.terapico.appview.ObjectPickerPage': {
    pageName: '/genericform/object-picker-page',
    stateAction: 'objectPicker/save',
  },

  'com.terapico.appview.MePage': {
    pageName: '/pages/me/me-page',
    stateAction: 'me/save',
  },
  LoginForm: {
    pageName: '/pages/login/login-page',
    stateAction: 'app/logout',
  },
  'com.terapico.appview.HomePage': {
    pageName: '/pages/home/home-page',
    stateAction: 'home/save',
  },

  // end global pages

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
}

export default ViewmappingConfig
