import React from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { updateCheck } from '@/service/codepush/update-checker'

export default function useCodePushCheck() {

  const checkCodePush = React.useCallback(() => {
    // @ts-ignore
    if (!__DEV__) {
      updateCheck().then()
    }
  }, [])

  React.useEffect(() => {
    const handleAppStateChange = (state: AppStateStatus) => {
      if (state === 'active') {
        checkCodePush()
      }
    }

    const subscription = AppState.addEventListener('change', handleAppStateChange)
    return () => subscription?.remove()
  }, [checkCodePush])

  return [checkCodePush]
}
