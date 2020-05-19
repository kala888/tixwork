import { isEmpty } from '@/nice-router/nice-router-util'
import { useEffect, useState } from 'react'
import _ from 'lodash'

export const useFacet = (tabs = [], title, code, facetList = []) => {
  const [facetGroup, setFaceGroup] = useState(facetList)
  const [selectedFacet, setSelectedFacet] = useState([])

  useEffect(() => {
    const group = isEmpty(tabs) ? [] : [{ id: 0, code, title, list: tabs }]
    setFaceGroup(group.concat(facetList))
  }, [tabs, title, code, facetList])

  const onFacetChange = (item) => {
    setSelectedFacet((pre) => {
      const list = _.clone(pre)
      const isUncheckAction = list.findIndex((it) => it.id === item.id) > -1
      _.remove(list, (it) => it.facet === item.facet || it.id === item.id)
      const result = isUncheckAction ? [] : [item]
      return result.concat(list)
    })
  }

  return {
    facetGroup,
    setFaceGroup,
    selectedFacet,
    setSelectedFacet,
    onFacetChange,
  }
}
export const useFilterTabs = (items = [], max, pinFirst) => {
  const [tabs, setTabs] = useState(items)
  const [selected, setSelected] = useState({})
  const [activeTabs, setActiveTabs] = useState([])

  useEffect(() => {
    setTabs(items)
    const current = items.find((it) => it.selected) || items[0] || {}
    setSelected(current)
  }, [items])

  useEffect(() => {
    const tabsInViewport = findActiveTabs(tabs, selected, max, pinFirst)
    // 这里重新算一下key，不然偶尔会触发，两次渲染后，button的key重复的bug
    const result = tabsInViewport.map((it, idx) => ({
      key: it.id + '_' + idx + '_' + it.code,
      ...it,
    }))
    setActiveTabs(result)
  }, [selected, tabs, max, pinFirst])

  return { tabs, setTabs, activeTabs, setSelected, selected }
}

// 居中算法
export const findActiveTabs = (items = [], selected, max, pinFirst) => {
  if (isEmpty(items) || items.length <= max) {
    return items
  }
  const tempInx = items.findIndex((it) => it.id === selected.id)
  const selectedIndex = tempInx > -1 ? tempInx : 0
  // 下边界超了，就取max个
  if (selectedIndex < max - 2) {
    return items.slice(0, max)
  }

  const maxItemLength = pinFirst ? max - 1 : max
  const startIndex = selectedIndex - parseInt(maxItemLength / 2)
  const endIndex = startIndex + maxItemLength
  let result = pinFirst ? items.slice(0, 1) : []
  if (endIndex > items.length - 1) {
    // 上边界超了，就取，倒数max个
    return result.concat(items.slice(-maxItemLength))
  }
  return result.concat(items.slice(startIndex, startIndex + maxItemLength))
}
