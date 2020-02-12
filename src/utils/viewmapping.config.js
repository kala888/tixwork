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

  'com.terapico.appview.MePage': {
    pageName: '/pages/me/me-page',
    stateAction: 'me/save',
    effectAction: 'me/switchToTeacher',
  },
  'com.terapico.appview.LoginForm': {
    pageName: '/pages/login/login-page',
    stateAction: 'app/logout',
  },
  'com.terapico.appview.HomePage': {
    pageName: '/pages/home/home-page',
    stateAction: 'home/saveHomeData',
  },

  // end global pages

  'com.doublechaintech.health.wechatapppageview.AddSurveyPage': {
    pageName: '/pages/biz/survey/survey-page',
    stateAction: 'survey/save',
  },
  'com.doublechaintech.health.wechatapppageview.StudentSurveyFormPage': {
    pageName: '/pages/biz/survey/survey-page',
    stateAction: 'survey/save',
  },
  'com.doublechaintech.health.wechatapppageview.SurveyDetailPage': {
    pageName: '/pages/biz/survey/survey-detail-page',
    stateAction: 'surveyDetail/save',
  },

  'com.doublechaintech.health.wechatapppageview.StudentSurveyListPage': {
    pageName: '/pages/me/me-page',
    stateAction: 'me/save',
    effectAction: 'me/switchToGuardian',
  },
  // 'com.doublechaintech.health.wechatapppageview.SurveyListPage': {
  //   pageName: '/pages/me/me-page',
  //   stateAction: 'me/save',
  //   effectAction: 'me/switchToTeacher',
  // },

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
