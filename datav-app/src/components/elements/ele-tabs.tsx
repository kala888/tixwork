import React, { useState } from 'react'
import NavigationService from '@/nice-router/navigation-service'
import { LoadingType } from '@/nice-router/nice-router-util'
import { ActionLike } from '@/nice-router/nice-router-types'
import { Tabs } from '@ant-design/react-native'
import { StyleSheet } from 'react-native'
import { TabData } from '@ant-design/react-native/lib/tabs/PropsType'
import _ from 'lodash'

type EleTabItemProps = {
  selected?: boolean;
} & ActionLike;

export type EleTabsProps = {
  tabs?: EleTabItemProps[] & Partial<TabData>
  type?: 'scroll' | null;
};

function EleTabs(props: EleTabsProps) {
  // const { tabs = [], type } = props // TODO
  const { tabs = [] } = props
  const [current, setCurrent] = useState(() => {
    const selectedIdx = tabs.findIndex((it) => it.selected)
    return selectedIdx > -1 ? selectedIdx : 0
  })

  const handleTabSwitch = (tab) => {
    const index = _.findIndex(tabs, it => it.title === tab.title)
    console.log('current index', index)
    setCurrent(index)
    NavigationService.routeTo(
      tab,
      {},
      {
        loading: LoadingType.Modal,
        dataRefresh: true,
      },
    )
  }

  // const scroll = type === 'scroll' && tabs.length > 4 //TODO

  return (
    <Tabs
      style={styles.container}
      page={current}
      // @ts-ignore
      tabs={tabs}
      onTabClick={handleTabSwitch}
    />
  )
}

EleTabs.defaultProps = {
  tabs: [],
}
export default EleTabs


const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    height: 45,
  },
})
