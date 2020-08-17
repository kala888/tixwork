import React from 'react'
import NavigationService from '@/nice-router/navigation.service'
import { LoadingType } from '@/nice-router/nice-router-util'
import { useAsyncEffect, useAsyncState } from '@/service/use.service'
import { AtTabs } from 'taro-ui'

function EleTabs(props) {
  const { tabs } = props
  const [current, setCurrent] = useAsyncState(0)

  useAsyncEffect(() => {
    const selectedIdx = tabs.findIndex((it) => it.selected)
    setCurrent(selectedIdx > -1 ? selectedIdx : 0)
  }, [tabs])

  const handleTabSwitch = (index) => {
    setCurrent(index)
    const tab = tabs[index]
    NavigationService.ajax(
      tab,
      {},
      {
        loading: LoadingType.barLoading,
      }
    )
  }

  const scroll = tabs.length > 4
  // key={Date.now().valueOf()} 坑，这里有个bug，把Key换一下就行了
  return (
    <AtTabs
      key={Date.now().valueOf()}
      height='50px'
      current={current}
      scroll={scroll}
      tabList={tabs}
      onClick={handleTabSwitch}
    />
  )
}

EleTabs.defaultProps = {
  tabs: [],
}
export default EleTabs
