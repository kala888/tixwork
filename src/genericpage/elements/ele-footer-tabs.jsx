import React from 'react'
import NavigationService from '@/nice-router/navigation.service'
import { useAsyncState } from '@/service/use.service'
import { AtTabBar } from 'taro-ui'

function EleFooterTabs({ tabs, onClick }) {
  const [selectedIndex, setSelected] = useAsyncState(null)

  const selectTab = (value) => {
    setSelected(value)
    const selected = tabs[value]
    if (onClick) {
      onClick(selected)
      return
    }
    NavigationService.view(selected)
  }

  const current = selectedIndex !== null ? selectedIndex : tabs.findIndex((it) => it.selected)
  const tabList = tabs.map((it) => ({
    ...it,
    image: it.imageUrl,
  }))

  return <AtTabBar fixed tabList={tabList} onClick={selectTab} current={current} />
}

EleFooterTabs.defaultProps = {
  tabs: [],
}
export default EleFooterTabs
