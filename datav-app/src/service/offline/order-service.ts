import { Cylinder, DeliveryOrder, OrderItem } from '@/global-types'
import StorageTools from '@/nice-router/storage-tools'
import { OFFLINE_CYLINDERS, OFFLINE_ORDERS } from './offline-service'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import GlobalToast from '@/nice-router/global-toast'
import { Modal, Portal } from '@ant-design/react-native'
import NavigationService from '@/nice-router/navigation-service'

let modal: any = null

const getOrderListByPlan = async (planId) => {
  const orders = await StorageTools.get(OFFLINE_ORDERS, {})
  const orderList = _.values(orders)
  return orderList.filter(it => it.planId === planId)
}

const getOrderById = async (orderId) => {
  const orders = await StorageTools.get(OFFLINE_ORDERS, {})
  console.log('..getOrderById', orderId, orders[orderId])
  return orders[orderId]
}

const scanCode = async (orderId: string, barcode: string) => {
  console.log('xxxxx，关闭 modal', modal)
  if (modal) {
    Portal.remove(modal)
    modal = null
  }

  const orders = await StorageTools.get(OFFLINE_ORDERS, {})
  const order: DeliveryOrder = orders[orderId]
  const cylinder: Cylinder = await _getCylinderByCode(barcode)
  const { status, productId } = cylinder || {}
  const { orderItems } = order
  let orderItem: OrderItem = _.find(orderItems, { productId }, {})
  if (_.isNil(orderItem)) {
    //资产没在订单里
    orderItem = {
      id: 'offline-' + uuidv4(),
      productId: cylinder.productId,
      title: cylinder.title,
      orderedTotal: 0,
      acceptTotal: 0,
      planReturnTotal: 0,
      returnTotal: 0,
      acceptList: [],
      returnList: [],
    }
    orderItems.push(orderItem)
  }

  const { acceptList = [], returnList = [] } = orderItem

  console.log('current cylinder status', status)

  if (status === 'full') {
    console.log('current action add to deliveredList')
    const list = [barcode].concat(acceptList)
    orderItem.acceptList = list
    orderItem.acceptTotal = list.length
    cylinder.status = 'delivered'
    cylinder.orderId = orderId
    await _saveCylinder(cylinder)
    await _saveOrder(order)
    return order
  }

  // 从客户那收瓶子
  if (status === 'empty') {
    console.log('current action add to returnList')
    const list = [barcode].concat(returnList)
    orderItem.returnList = list
    orderItem.returnTotal = list.length
    cylinder.status = 'returned'
    cylinder.orderId = orderId
    await _saveCylinder(cylinder)
    await _saveOrder(order)
    return order
  }


  // 刚刚投放给客户，又扫，回滚状态
  if (status === 'delivered') {
    if (cylinder.orderId !== orderId) {
      GlobalToast.show({ text: '离线订单，该资产已经配送。' })
      return null
    }

    modal = Modal.alert('重复扫码', `是否将气瓶${barcode}从订单中移除？`, [
      { text: '保留', style: 'cancel' },
      {
        text: '移除', onPress: () => {
          console.log('current action remove from deliveredList')
          const list = acceptList.filter(it => it !== barcode)
          orderItem.acceptList = list
          orderItem.acceptTotal = list.length
          cylinder.status = 'full'
          cylinder.orderId = ''
          _saveCylinder(cylinder).then()
          _saveOrder(order).then()
          NavigationService.dispatch('deliveryOrder/save', order)
        },
      },
    ])
    return
  }


  // 不收了，回滚状态
  if (status === 'returned') {
    if (cylinder.orderId !== orderId) {
      GlobalToast.show({ text: '离线订单，该资产已回收。' })
      return null
    }

    modal = Modal.alert('重复扫码', `是否将气瓶${barcode}从订单中移除？`, [
      { text: '保留', style: 'cancel' },
      {
        text: '移除', onPress: () => {
          console.log('current action remove from returnList')
          const list = returnList.filter(it => it !== barcode)
          orderItem.returnList = list
          orderItem.returnTotal = list.length
          cylinder.status = 'empty'
          cylinder.orderId = ''
          _saveCylinder(cylinder).then()
          _saveOrder(order).then()
          NavigationService.dispatch('deliveryOrder/save', order)
        },
      },
    ])
  }

  return null
}

const confirmOrder = async (params) => {
  const { orderId, deliveryUser, deliveryComments, deliveryNotMatchReason } = params
  const orders = await StorageTools.get(OFFLINE_ORDERS, {})
  const order: DeliveryOrder = orders[orderId]
  order.deliveryUser = deliveryUser
  order.deliveryComments = deliveryComments
  order.deliveryNotMatchReason = deliveryNotMatchReason
  order.completedTime = Date.now().valueOf()
  order.orderStatus = 'DELIVERED'
  await StorageTools.set(OFFLINE_ORDERS, orders)
  return order
}


const _getCylinderByCode = async (barcode): Promise<Cylinder> => {
  const cylinders = await StorageTools.get(OFFLINE_CYLINDERS, {})
  return cylinders[barcode]
}

const _saveCylinder = async (cylinder: Cylinder) => {
  console.log('save cylinder', cylinder)
  const cylinders = await StorageTools.get(OFFLINE_CYLINDERS, {})
  cylinders[cylinder.barcode] = cylinder
  await StorageTools.set(OFFLINE_CYLINDERS, cylinders)
}

const _saveOrder = async (order: DeliveryOrder) => {
  console.log('save order', order)
  const orders = await StorageTools.get(OFFLINE_ORDERS, {})
  orders[order.id] = order
  await StorageTools.set(OFFLINE_ORDERS, orders)
}


const OrderService = {
  getOrderListByPlan,
  getOrderById,
  scanCode,
  confirmOrder,
}
export default OrderService
