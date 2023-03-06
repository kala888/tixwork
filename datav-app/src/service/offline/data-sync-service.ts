import BackgroundFetch from 'react-native-background-fetch'


const onEvent = async (taskId) => {
  console.log('[BackgroundFetch] start: ', taskId)
  console.log('[BackgroundFetch HeadlessTask] start: ', taskId)
  //TODO await OfflineUtils.syncData()
  BackgroundFetch.finish(taskId)
}
const onTimeout = async (taskId) => {
  console.warn('[BackgroundFetch] TIMEOUT task: ', taskId)
  BackgroundFetch.finish(taskId)
}

const onMount = async () => {

  let status = await BackgroundFetch.configure({
    minimumFetchInterval: 15,
    forceAlarmManager: true,
    enableHeadless: true,
  }, onEvent, onTimeout)

  console.log('[BackgroundFetch] configure: ', status)

  await BackgroundFetch.scheduleTask({
    taskId: 'backend-fetch-data',
    delay: 300 * 1000, // 5分钟调用一次
    forceAlarmManager: true,
    periodic: true,
  })
}

const DataSyncService = {
  onMount,
}
export default DataSyncService
