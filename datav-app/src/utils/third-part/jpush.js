import _ from 'lodash'
import JPush from 'jpush-react-native'
import AuthTools from '../../nice-router/auth-tools'
import NavigationService from '../../nice-router/navigation-service'
import { isEmpty } from '@/nice-router/nice-router-util'
import ActionUtil from '@/nice-router/action-util'

const notificationListener = (messageObj) => {
  const {
    // messageID, title, content, badge, ring,
    extras,
    notificationEventType,
  } = messageObj
  console.log('messageObj', messageObj)
  let action = extras || {}
  if (notificationEventType === 'notificationOpened') {
    console.log('Opening notification,map.extra', extras)
    if (_.isString(extras)) {
      action = JSON.parse(extras)
    }
    JPush.deleteTags({ sequence: 1111 })
    if (ActionUtil.isActionLike(action)) {
      NavigationService.view(action)
      return
    }
    NavigationService.navigate('HomePage')
  }
}

async function initJPush() {
  JPush.init()
  JPush.initCrashHandler()
  JPush.setBadge({ badge: 0, appBadge: 0 })
  JPush.setLoggerEnable(true)
  await refreshTags()
  JPush.addNotificationListener(notificationListener)
}

function uninstallJPush() {
  JPush.removeListener(notificationListener)
  console.log('Will clear all notifications')
  JPush.deleteTags({ sequence: 2222 })
}

async function resetToAnonymous() {
  await refreshTags({})
}

async function refreshTags(pTags = []) {
  let tags = pTags
  if (isEmpty(tags)) {
    const authInfo = await AuthTools.getAuthInfoAsync()
    tags = _.get(authInfo, 'tags')
  }
  console.log('Tag operate set jpush tags', tags || ['anonymous'])

  JPush.updateTags({ sequence: 3333, tags: tags || ['anonymous'] })
}

const JPushTools = { refreshTags, resetToAnonymous, initJPush, uninstallJPush }
export default JPushTools
