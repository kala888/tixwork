/**
 * full 出厂转态
 * delivered 离线，加入订单后的转态，表明已经送到客户手里
 * returning 客户要退
 * returned  离线，加入订单后的转态，表明客户已经退到司机手里
 */
import { CandidateValue } from '@/nice-router/nice-router-types'

export type CylinderStatus = 'full' | 'delivered' | 'empty' | 'returned'

export type DeliveryOrderStatus = 'LOADED' | 'DELIVERED' | 'PLANNED'
export type PlanStatus = 'LOADED' | 'DELIVERED' | 'PLANNED'

type Plan = {
  id: string
  vehicle: string
  trip: string
  planStatus: PlanStatus
  planStatusName: string
}

export type Factory = {
  id: string
  title: string
}

export type User = {
  id: string
  pwd: string
  name: string
  employeeId: string
  roleList: CandidateValue[]
  mobile: string
  currentCarNumber: string
  currentFactory: string
  currentFactoryId: string
}
export type Cylinder = {
  id: string
  barcode: string
  productId: string
  title: string
  // full出厂转态，delivered
  status: CylinderStatus
  orderId?: string
}

export type OrderItem = {
  id: string

  title: string //产品名称
  productId: string  //产品代码

  orderedTotal: number // 定了多少
  acceptTotal: number  // 卸货了多少
  acceptList: string[] // 卸货列表

  planReturnTotal: number //要回收多少
  returnTotal: number     //回收了多少
  returnList: string[]    //回收列表

  status?: 'match' | 'not-match' | 'overflow' | 'not-enough'
}

export type DeliveryOrder = {
  id: string //系统id
  orderId: string //Order的业务ID
  customer: string
  customerNo: string
  vehicle: string
  trip: string
  address: string
  comments: string
  orderStatus: DeliveryOrderStatus
  planStatus?: string
  orderItems: OrderItem[],
  deliveryComments?: string,
  deliveryUser?: string,
  deliveryNotMatchReason?: string,
  completedTime?: any,
  courierList?: string[],
  notMatchReasonList?: string[],
}
