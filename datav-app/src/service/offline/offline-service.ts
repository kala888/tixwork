import StorageTools from '@/nice-router/storage-tools'
import GlobalToast from '@/nice-router/global-toast'
import NavigationService from '@/nice-router/navigation-service'
import _ from 'lodash'
import CryptoES from 'crypto-es'
import { Factory, User } from '@/global-types'
import { ApiConfig } from '@/utils/config'
import BackendService from '@/nice-router/request/backend-service'
import AuthTools from '@/nice-router/auth-tools'
import { isEmpty } from '@/nice-router/nice-router-util'
import PlanService from '@/service/offline/plan-service'
import OrderService from '@/service/offline/order-service'

export const OFFLINE_USER_LIST = 'offline-user-list'
export const OFFLINE_FACTORY = 'offline-factory'
export const LOGIN_INFO = 'login-info'

export const OFFLINE_PLAN_LIST = 'offline-plan-list'
export const OFFLINE_ORDERS = 'offline-orders'
export const OFFLINE_CYLINDERS = 'offline-cylinders'
export const OFFLINE_SYNC_RECORD = 'offline-sync-record'


const FAKE_TOKEN = 'eyJraWQiOiJTVTAwMDAwMiIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJ0b2tlbktleSI6ImFiY2tKRnVzVjlNek1mMzBRRDFZeCIsImVudlR5cGUiOiJkZXZfZGVmYXVsdCIsImlzcyI6Im9mZmxpbmUtdG9rZW4iLCJleHAiOjIwMDAwMDAwMDAsInNlY3VyaXR5U3RhdHVzIjoiQ0VSVElGSUNBVEUiLCJpYXQiOjE2MzUxMzIwMjYsInVzZXJVcGxvYWRIb21lIjoidXBsb2FkL2NtZXMvU2VjVXNlci9vZmZsaW5lLXVzZXIiLCJ1c2VySWQiOiJPZmZsaW5lVXNlciIsInRhZ3MiOlsiT2ZmbGluZVVzZXIiXX0.OtGw-MqZvCMU8JpgpreAWM8s6neq_YaPuOmYOANlJlw'

const encryptPassword = (password, salt) => {
  const hash = CryptoES.SHA256(password + ':' + salt)
  return hash.toString(CryptoES.enc.Hex).toUpperCase()
}


const _findUser = async (login, password): Promise<User | null> => {
  const list = await StorageTools.get(OFFLINE_USER_LIST, [])
  if (isEmpty(list)) {
    GlobalToast.show({ text: '离线使用前，请先同步离线信息' })
    return null
  }

  const account = _.find(list, it => it.login === login)
  let passed = false
  if (account) {
    const thePassword = encryptPassword(password, account.id)
    passed = account.pwd === thePassword
  }
  return passed ? account : null
}

const login = async (login, password) => {
  const factory = await getOfflineFactory()
  if (isEmpty(factory.id)) {
    GlobalToast.show({ text: '离线使用前，请先同步工厂离线信息' })
    return
  }

  const user = await _findUser(login, password)
  if (!user) {
    GlobalToast.show({ text: '离线登录失败，账号不存在或者密码错误。' })
    return
  }

  // @ts-ignore
  await setLoginInfo({
    name: user.name,
    employeeId: user.employeeId,
    roleList: _.map(user.roleList, it => it.title),
    mobile: user.mobile,
    currentCarNumber: user.currentCarNumber,
    currentFactory: factory.title,
    currentFactoryId: factory.id,
  } as User)

  await AuthTools.saveTokenAsync(FAKE_TOKEN)
  await NavigationService.navigate('HomePage')
}

const getLoginInfo = (defaultInfo = {}) => StorageTools.get(LOGIN_INFO, defaultInfo)
const setLoginInfo = (user: User) => StorageTools.set(LOGIN_INFO, user)

const getOfflineFactory = async (): Promise<Factory> => {
  return StorageTools.get(OFFLINE_FACTORY, { title: '未同步' })
}
const setOfflineFactory = async (factory: Factory) => {
  return StorageTools.set(OFFLINE_FACTORY, factory)
}

const getSyncRecord = () => {
  return StorageTools.get(OFFLINE_SYNC_RECORD, {})
}

const setSyncRecord = () => {
  return StorageTools.set(OFFLINE_SYNC_RECORD, { createTime: Date.now().valueOf() })
}


export type SyncDataResultType = {
  uploadResult: '成功' | '失败'
  uploadTotal: number
  downloadResult: '成功' | '失败'
  downloadTotal: number
}
const syncData = async (): Promise<SyncDataResultType> => {

  return new Promise(async (resolve, reject) => {

    const { currentFactoryId } = await getLoginInfo()
    if (isEmpty(currentFactoryId)) {
      GlobalToast.show({ text: '离线使用前，请先登录，以便获取工厂信息' })
      return
    }

    // const result: SyncDataResultType = {
    //   uploadResult: '成功',
    //   uploadTotal: '**',
    //   downloadResult: '成功',
    //   downloadTotal: '**',
    // }
    const result: SyncDataResultType = {
      uploadResult: '失败',
      uploadTotal: 0,
      downloadResult: '失败',
      downloadTotal: 0,
    }

    //1.判断是否需要上传
    const orders = await StorageTools.get(OFFLINE_ORDERS, {})
    const changedOrderList = _.values(orders).filter(it => it.changed)
    const uploadTotal = changedOrderList.length
    console.log('开始上传', uploadTotal, ':', changedOrderList)
    const resp = await BackendService.send({
      method: 'put',
      uri: ApiConfig.UploadOrder,
      params: {
        orderList: changedOrderList,
      },
    })
    console.log('上传结果', resp.success)

    if (!resp.success) {
      reject(result)
      return
    }

    console.log('清空本地orders', resp)
    await StorageTools.set(OFFLINE_ORDERS, {})
    result.uploadResult = '成功'
    result.uploadTotal = uploadTotal

    console.log('下载最新数据', resp)

    await NavigationService.ajax(ApiConfig.DownloadData,
      { time: Date.now().valueOf() }, {
        onSuccess: async (resp) => {
          const { userList = [], planList = [], factory = {}, orders = {}, cylinders = {} } = resp
          await StorageTools.set(OFFLINE_USER_LIST, userList)
          await StorageTools.set(OFFLINE_FACTORY, factory)
          await StorageTools.set(OFFLINE_PLAN_LIST, planList)
          await StorageTools.set(OFFLINE_ORDERS, orders)
          await StorageTools.set(OFFLINE_CYLINDERS, cylinders)
          console.log('sync data successful. download:', resp)
          await setSyncRecord()
          result.downloadResult = '成功'
          result.downloadTotal = _.keys(orders).length
          resolve(result)
        },
      })
  })
}

const getUserList = () => StorageTools.get(OFFLINE_USER_LIST, [])

const OFFLINE_URLS = [
  ApiConfig.GetOrderListByPlan,
  ApiConfig.GetDeliveryPlanList,
  ApiConfig.GetOrderById,
  ApiConfig.ScanCodeOnOrder,
  ApiConfig.SubmitOrder,
  ApiConfig.ConfirmOrder,

]

const useOffline = false
const isOfflineRequest = (uri) => {
  if (!useOffline) {
    return false
  }
  const isOffline = OFFLINE_URLS.includes(uri)
  console.log('is offline request ', isOffline, uri)
  return isOffline
}

const request = async (uri, params) => {

  console.log('offline request', uri, params)
  const result = {
    xClass: 'com.hashmap',
    success: true,
    data: {},
  }
  if (uri === ApiConfig.GetDeliveryPlanList) {
    result.data = await PlanService.getPlanList()
  }

  if (uri === ApiConfig.GetOrderListByPlan) {
    result.data = await OrderService.getOrderListByPlan(params.planId)
  }
  if (uri === ApiConfig.GetOrderById) {
    result.data = await OrderService.getOrderById(params.orderId)
    result.xClass = 'com.terapico.appview.OrderDetail'
  }

  if (uri === ApiConfig.ScanCodeOnOrder) {
    const resp = await OrderService.scanCode(params.orderId, params.barcode)
    if (resp) {
      result.data = resp
      result.xClass = 'com.terapico.appview.OrderDetail'
    }
  }

  if (uri === ApiConfig.GetOrderById) {
    result.data = await OrderService.getOrderById(params.orderId)
    result.xClass = 'com.terapico.appview.OrderConfirm'
  }

  if (uri === ApiConfig.ConfirmOrder) {
    result.data = await OrderService.confirmOrder(params)
  }

  return result
}

const OfflineService = {
  login,
  getOfflineFactory,
  setOfflineFactory,
  getLoginInfo,
  setLoginInfo,
  syncData,
  getSyncRecord,
  setSyncRecord,
  getUserList,
  setOnlineLoginInfo: setLoginInfo,
  request,
  isOfflineRequest,
}

export default OfflineService
