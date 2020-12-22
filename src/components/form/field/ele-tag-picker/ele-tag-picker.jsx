import React from 'react'
import { useVisible } from '@/service/use-service'
import { noop } from '@/nice-router/nice-router-util'
import TagList from '@/components/tag-list/tag-list'
import ActionField from '@/components/form/field/action-field'
import { AtFloatLayout } from 'taro-ui'
import { View } from '@tarojs/components'
import './ele-tag-picker.scss'

export default function EleTagPicker(props) {
  const { visible, toggle, close } = useVisible(false)

  const { title, value, candidateValues, onChange = noop, disabled, placeholder = '请选择...', ...others } = props

  const handleClick = () => !disabled && toggle()

  const handleCommit = (item) => {
    onChange(item)
    close()
  }

  const theValue = value?.title || value

  return (
    <ActionField
      className='ele-tag-pricker'
      onClick={handleClick}
      disabled={disabled}
      value={theValue}
      placeholder={placeholder}
      toggleStatus={visible}
    >
      <AtFloatLayout className='large-float-layout' isOpened={visible} onClose={close} title={title}>
        <View className='ele-tag-pricker-body'>
          <TagList {...others} items={candidateValues} onItemClick={handleCommit} />
        </View>
      </AtFloatLayout>
    </ActionField>
  )
}
