import _ from 'lodash';
import { isEmpty, log } from './nice-router-util';

const POINTER = {};
let ViewConfig = {};

const defaultViewConfig = {
  'com.terapico.appview.H5Page': {
    pageName: 'H5Page',
    stateAction: '/nice-router/h5-page',
  },
  'NetworkException.RetryPage': {
    pageName: '/nice-router/network-exception-page',
  },
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
    stateAction: 'objectPicker/saveInbound',
  },
};

const setViewConfig = (vcfg?: object) => {
  ViewConfig = {};
  const mergedViewConfig = _.merge(defaultViewConfig, vcfg);
  Object.keys(mergedViewConfig).map((key) => {
    ViewConfig[key.trim()] = mergedViewConfig[key];
  });
};

const getView: (
  backendKey: string,
  stageInPage: boolean
) => {
  pageName?: string;
  stateAction?: string | string[];
  effectAction?: string | string[];
} = (backendKey = '', stageInPage = false) => {
  const key = _.trim(backendKey);
  let view = _.get(ViewConfig, key, {});
  if (isEmpty(view)) {
    const shortKey = key.substr(key.lastIndexOf('.') + 1, key.length);
    log('the key for class', key, 'not found, try to map with shortKey', shortKey);
    view = ViewConfig[shortKey] || {};
  }
  if (Array.isArray(view)) {
    const pointer = _.get(POINTER, backendKey, -1);
    const nextPageIndex = stageInPage ? pointer : pointer + 1 >= view.length ? 0 : pointer + 1;
    const idx = _.max([nextPageIndex, 0]);
    POINTER[backendKey] = idx;
    return view[idx];
  }
  return view;
};

const ViewMappingService = {
  getView,
  setViewConfig,
};

export default ViewMappingService;
