import StorageTools from '@/nice-router/storage-tools'
import { OFFLINE_PLAN_LIST } from './offline-service'

const getPlanList = () => StorageTools.get(OFFLINE_PLAN_LIST, [])

const PlanService = {
  getPlanList,
}
export default PlanService
