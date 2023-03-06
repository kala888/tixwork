const ViewMappingConfig = {
  'com.terapico.appview.MePage': {
    pageName: 'MePage',
    stateAction: 'me/save',
  },
  LoginForm: {
    pageName: 'LoginPage',
    stateAction: 'app/logout',
  },
  'com.terapico.appview.HomePage': {
    pageName: 'HomePage',
    stateAction: 'home/save',
  },

  'com.terapico.appview.ServiceCenter': {
    pageName: 'ServiceCenterPage',
    stateAction: 'serviceCenter/save',
  },
  'com.terapico.appview.ResultPage': {
    pageName: 'ResultPage',
    stateAction: 'resultPage/save',
  },

  'com.terapico.appview.OrderDetail': {
    pageName: 'OrderDetailPage',
    stateAction: 'deliveryOrder/save',
  },
  'com.terapico.appview.OrderConfirm': {
    pageName: 'OrderConfirmPage',
    stateAction: 'deliveryOrder/save',
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
}

export default ViewMappingConfig
