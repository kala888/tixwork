import React, { useEffect, useState } from 'react'
import Listof from '@/listof/listof'
import NavigationService from '@/nice-router/navigation-service'
import { Text, View } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { AtSearchBar } from 'taro-ui'
import { Current } from '@tarojs/taro'
import _ from 'lodash'
import GlobalToast from '@/nice-router/global-toast'
import { LoadingType, noop } from '@/nice-router/nice-router-util'
import './object-picker-page.scss'

function ObjectPickerPage() {
  const root = useSelector((state) => state.objectPicker)
  const [keyword, setKeyword] = useState('')
  const [selectedItems, setSelectedItems] = useState([])

  const [maxSelectCount, setMaxSelectCount] = useState(1)

  const { list, listMeta, emptyMessage = '没有更多数据了', dataContainer, articleList, articleListMeta } = root
  const { searchAction } = root

  useEffect(() => {
    const msc = _.get(root, 'maxSelectCount', 1)
    setMaxSelectCount(msc)
  }, [root])

  // q如果变化了，就发送一个后台请求
  const { linkToUrl } = Current.router.params
  useEffect(() => {
    if (linkToUrl) {
      NavigationService.ajax(
        linkToUrl,
        {},
        {
          loading: LoadingType.modal,
        }
      )
    }
  }, [linkToUrl])

  const handleCommit = async () => {
    await NavigationService.back(selectedItems)
  }

  const handleItemPress = (item, setChecked = noop) => {
    setSelectedItems((pre) => {
      const result = _.clone(pre)
      const target = _.remove(result, item)
      console.log('th...target', target)
      // 删除
      if (target.length > 0) {
        setChecked(false)
        return result
      }

      // 添加 动作 超过最大数
      if (result.length + 1 > maxSelectCount) {
        GlobalToast.show({ text: `最多只能选择${maxSelectCount}` })
        // setChecked(false)
        return result
      }

      // 添加
      result.push(item)
      setChecked(true)
      return result
    })
  }

  const onSearchActionClick = () => {
    NavigationService.ajax(
      searchAction,
      { keyword },
      {
        loading: LoadingType.modal,
      }
    )
  }

  return (
    <View className='object-picker'>
      <View className='object-picker-header'>
        <AtSearchBar actionName='搜一下' value={keyword} onChange={setKeyword} onActionClick={onSearchActionClick} />
      </View>

      <View className='object-picker-body'>
        <Listof
          dataContainer={dataContainer}
          list={list || articleList}
          listMeta={listMeta || articleListMeta}
          displayMode='object-picker'
          emptyMessage={emptyMessage}
          isBigList
          height='90vh'
          onItemPress={handleItemPress} //透传给item，自己处理
        />
      </View>

      <View className='object-picker-footer'>
        <View className='object-picker-footer-tips'>
          <Text>
            已选 <Text className='object-picker-footer-tips-txt'>{selectedItems.length}</Text> 人
          </Text>
          <Text className='object-picker-footer-tips-brief'>最多可以选择：{maxSelectCount}</Text>
        </View>
        <View className='object-picker-footer-btn' onClick={handleCommit}>
          确定
        </View>
      </View>
    </View>
  )
}

export default ObjectPickerPage
