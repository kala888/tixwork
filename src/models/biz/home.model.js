import { createAction } from '@/nice-router/nice-router-util'
import StorageTools from '@/nice-router/storage-tools'

export default {
  namespace: 'home',
  state: {},
  reducers: {
    hideWelcome(state) {
      console.log('hidden.....')
      return { ...state, welcomeSlides: {} }
    },
  },
  effects: {
    *saveHomeData({ payload = {} }, { put }) {
      //1.刷新home数据前，先比较本地的ViewedWelcomeVersion，否则存的时候干掉
      const viewedWelcomeVersion = StorageTools.get('ViewedWelcomeVersion', -1)
      const { welcomeSlides: { version } = {} } = payload

      console.log('ViewedWelcomeVersion', viewedWelcomeVersion, 'current version', version)

      if (version) {
        if (viewedWelcomeVersion >= version) {
          payload.welcomeSlides.slideList = [] // 丢弃不显示
        } else {
          StorageTools.set('ViewedWelcomeVersion', version)
        }
      }
      yield put(createAction('save')(payload))
    },
  },
  subscriptions: {},
}
