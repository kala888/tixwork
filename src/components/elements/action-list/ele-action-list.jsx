import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { isH5 } from '@/utils/index'
import _ from 'lodash'
import { getExtMode, isEmpty, isNotEmpty } from '@/nice-router/nice-router-util'
import { AtButton, AtInput, AtModal, AtModalContent, AtModalHeader } from 'taro-ui'
import FormItem from '@/components/form/form-item'
import { useVisible } from '@/service/use-service'
import { useShareAppMessage } from '@tarojs/taro'
import Config from '@/utils/config'
import NavigationService from '@/nice-router/navigation-service'

import EleButton from '../ele-button'
import './styles.scss'

const MixClass = [
  ['mix0'],
  ['mix0', 'mix1'],
  ['mix0', 'mix05', 'mix1'],
  ['mix0', 'mix033', 'mix066', 'mix1'],
  ['mix0', 'mix025', 'mix05', 'mix075', 'mix1'],
]

function EleActionList(props) {
  const [value, setValue] = useState('')
  const [shareEnabled, setShareEnabled] = useState(false)
  const { visible, close, show } = useVisible(false)

  const { list, items, actionList, mode = ['full'], className } = props
  const theActionList = list || items || actionList
  if (isEmpty(theActionList)) {
    return null
  }

  const collectShareAction = _.find(theActionList, { type: 'collect-share' }, {})
  if (isNotEmpty(collectShareAction)) {
    collectShareAction.onClick = show
  }

  const field = _.get(collectShareAction, 'extraData.field', {})

  const handleChange = (v = '') => {
    setValue(v)
    if (field?.type === 'mobile') {
      const isValid = /^1\d{10}$/.test(v)
      console.log('isValid', isValid)
      setShareEnabled(isValid)
      return
    }
    if (isNotEmpty(v)) {
      setShareEnabled(true)
    }
  }

  useShareAppMessage((res) => {
    const DefaultPage = '/pages/social-share/social-share-page'

    if (res.from === 'button') {
      const extraData = _.get(res, 'target.dataset.extraData', {})
      const { title, linkToUrl, imageUrl, pagePath = DefaultPage } = extraData
      const encodePath = encodeURIComponent(linkToUrl)
      const path = `${pagePath}?q=${encodePath}`
      return {
        title: title,
        path: path,
        imageUrl,
      }
    }

    return {
      title: Config.name,
      path: DefaultPage,
    }
  })

  const handleSubmit = () => {
    NavigationService.ajax(
      field,
      { value },
      {
        onSuccess: () => {
          close()
        },
      }
    )
  }

  const rootClass = getExtMode(mode, { h5: isH5() }).classNames('ele-action-list', className)

  return (
    <View className={rootClass}>
      {isNotEmpty(collectShareAction) && (
        <AtModal isOpened={visible} className='collect-share-popup'>
          <AtModalHeader>{field?.tips}</AtModalHeader>
          <AtModalContent>
            <FormItem label={field?.label} rules={[{ required: true }]} inline={false} bordered>
              <AtInput name='mobile' placeholder={field?.placeholder} bordered value={value} onChange={handleChange} />
            </FormItem>
          </AtModalContent>

          <View className='flex-row'>
            <AtButton type='primary' full openType='share' onClick={handleSubmit} disabled={!shareEnabled}>
              {field?.actionTitle || '分享'}
            </AtButton>
          </View>
        </AtModal>
      )}

      {theActionList.map((action, idx) => {
        const key = `btn_${action.id}_${action.code}_${action.title}`
        const mixColorClass = _.get(MixClass, `${list.length - 1}.${idx}`)
        const itemClass = getExtMode(mixColorClass).classNames('ele-action-list-item')
        return (
          <View key={key} className={itemClass}>
            <EleButton {...action} />
          </View>
        )
      })}
    </View>
  )
}

EleActionList.defaultProps = {
  className: null,
  customStyle: {},
}

export default EleActionList
