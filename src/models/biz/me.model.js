import StorageTools from '@/nice-router/storage-tools'
import NavigationService from '@/nice-router/navigation.service'
import Config from '@/utils/config'
import { createAction, LoadingType } from '@/nice-router/nice-router-util'

export default {
  namespace: 'me',
  state: {},
  reducers: {
    saveUserType(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *switchUserType({ payload = {} }) {
      const { userType, onSuccess } = payload
      if (!userType) {
        NavigationService.navigate('/pages/login/login-page')
        return
      }
      console.log('start to switch to userType', userType)
      let url = Config.api.GuardianHome
      if (userType === 'teacher') {
        url = Config.api.TeacherHome
      }
      // NavigationService.view('customerStudentViewSurvey/CDHS000017/')
      NavigationService.view(url, {}, { onSuccess, loading: LoadingType.modal })
    },
    *switchToGuardian({ payload = {} }, { put }) {
      console.log(payload)
      StorageTools.set('user-type', 'guardian')
      yield put(createAction('saveUserType')({ userType: 'guardian' }))
    },
    *switchToTeacher({ payload = {} }, { put }) {
      console.log('switch to teacher', payload)
      StorageTools.set('user-type', 'teacher')
      yield put(createAction('saveUserType')({ userType: 'teacher' }))
    },
  },
  subscriptions: {},
}
