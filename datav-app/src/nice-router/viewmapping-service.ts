import _ from 'lodash'
import { isEmpty } from './nice-router-util'

export type ViewConfigStateActionType = string | string[];

export type ViewConfigItemType = {
  pageName?: string;
  stateAction?: ViewConfigStateActionType;
};
type ViewConfigType = Record<string, ViewConfigItemType | ViewConfigItemType[]>;

const defaultViewConfig: ViewConfigType = {
  'com.terapico.appview.H5Page': {
    pageName: 'H5Page',
    stateAction: 'H5page/save',
  },
  'NetworkException.RetryPage': {
    pageName: 'NetworkErrorPage',
  },
  // global pages
  'com.terapico.caf.viewcomponent.GenericPage': [
    {
      pageName: 'GenericPage',
      stateAction: 'genericpage/save',
    },
    {
      pageName: 'GenericPage2',
      stateAction: 'genericpage2/save',
    },
  ],
  'com.terapico.caf.viewcomponent.GenericFormPage': {
    pageName: 'GenericFormPage',
    stateAction: 'genericform/save',
  },
  'com.terapico.appview.ListOfPage': [
    {
      pageName: 'ListofPage',
      stateAction: ['listofpage/save', 'listofpage2/clear'],
    },
    {
      pageName: 'ListofPage2',
      stateAction: ['listofpage2/save', 'listofpage3/clear'],
    },
    {
      pageName: 'ListofPage3',
      stateAction: ['listofpage3/save', 'listofpage4/clear'],
    },
    {
      pageName: 'ListofPage4',
      stateAction: ['listofpage4/save', 'listofpage/clear'],
    },
  ],

  'com.terapico.appview.ObjectPickerPage': {
    pageName: 'ObjectPickerPage',
    stateAction: 'objectPicker/saveInbound',
  },
}

class ViewMappingServiceClass {
  private pointerCache: Record<string, number> = {}
  private _viewConfig: ViewConfigType = {}

  public set viewConfig(vcfg: ViewConfigType) {
    this._viewConfig = {}
    const mergedViewConfig = _.merge(defaultViewConfig, vcfg)
    Object.keys(mergedViewConfig).map((key) => {
      this._viewConfig[key.trim()] = mergedViewConfig[key]
    })
  }

  /**
   *
   * @param backendKey xClass key
   * @param ajax 对于多instance页面，如果是Ajax，就不跳pointer
   */
  getView(backendKey = '', ajax = false): ViewConfigItemType {
    const key = _.trim(backendKey)
    let view = _.get(this._viewConfig, key, {})
    if (isEmpty(view)) {
      const shortKey = key.substr(key.lastIndexOf('.') + 1, key.length)
      console.log('the key for class', key, 'not found, try to map with shortKey', shortKey)
      view = this._viewConfig[shortKey] || {}
    }
    if (Array.isArray(view)) {
      const pointer: number = _.get(this.pointerCache, backendKey, -1)
      const nextPageIndex = ajax ? pointer : pointer + 1 >= view.length ? 0 : pointer + 1
      const idx = _.max([nextPageIndex, 0]) as number
      this.pointerCache[backendKey] = idx
      return view[idx]
    }
    return view
  }
}

const ViewmappingService = new ViewMappingServiceClass()
export default ViewmappingService
