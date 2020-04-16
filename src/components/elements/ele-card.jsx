import { Block, Text, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import classNames from 'classnames'

import ServerImage from '@/server-image/server-image'
import NavigationService from '@/nice-router/navigation.service'
import { isEmpty, isNotEmpty } from '@/nice-router/nice-router-util'
import { formatTime } from '@/utils/index'

import './styles.scss'
import EleActionList from './ele-action-list'

function EleCard(props) {
  const { imageUrl, title, brief, createTime, status, customStyle, className, actionList } = props

  const onClick = () => {
    NavigationService.view(this.props.linkToUrl)
  }
  const rootClass = classNames('ele-card', className)

  return (
    <View className={rootClass} style={customStyle}>
      {status && (
        <Block>
          <View className='ele-card-status-flag' />
          <Text className='ele-card-status-txt'>{status}</Text>
        </Block>
      )}

      <View className='ele-card-body' onClick={onClick}>
        {isEmpty(imageUrl) && (
          <View className='ele-card-body-icon'>
            <AtIcon value='download-cloud' size={50} />
          </View>
        )}

        {isNotEmpty(imageUrl) && (
          <View className='ele-card-body-image'>
            <ServerImage src={imageUrl} />
          </View>
        )}
        <View className='ele-card-body_content'>
          <Text className='ele-card-body_content-title'>{title}</Text>
          <View className='ele-card-body_content-brief'>
            <Text className='ele-card-body_content-brief-txt'>{brief}</Text>
          </View>
          <Text className='ele-card-body_content-time'>{formatTime(createTime)}</Text>
        </View>
      </View>
      {actionList.length > 0 && (
        <View className='ele-card-footer'>
          <EleActionList list={actionList} />
        </View>
      )}
    </View>
  )
}

EleCard.options = {
  addGlobalClass: true,
}

EleCard.defaultProps = {
  imageUrl: null,
  linkToUrl: null,
  title: '',
  brief: '',
  createTime: null,
  actionList: [],
  status: null,
  className: null,
  customStyle: {},
}
export default EleCard
