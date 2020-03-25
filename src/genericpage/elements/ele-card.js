import Taro from '@tarojs/taro'
import { Block, View } from '@tarojs/components'
import { formatTime } from '@/utils/index'
import { AtIcon } from 'taro-ui'

import ServerImage from '@/server-image/server-image'
import NavigationService from '@/nice-router/navigation.service'
import { isEmpty, isNotEmpty } from '@/nice-router/nice-router-util'
import classNames from 'classnames'

import './ele.scss'
import EleActionList from './ele-action-list'

class EleCard extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
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

  handleView = () => {
    NavigationService.view(this.props.linkToUrl)
  }

  render() {
    const { imageUrl, title, brief, createTime, status, customStyle, className, actionList } = this.props

    const rootClass = classNames('ele-card', className)

    return (
      <View className={rootClass} style={customStyle}>
        {status && (
          <Block>
            <View className='ele-card-status-flag' />
            <View className='ele-card-status-txt'>{status.name}</View>
          </Block>
        )}

        <View className='ele-card-header' onClick={this.handleView}>
          {isEmpty(imageUrl) && (
            <View className='ele-card-header-icon'>
              <AtIcon value='download-cloud' size={50} />
            </View>
          )}

          {isNotEmpty(imageUrl) && (
            <View className='ele-card-header-image'>
              <ServerImage src={imageUrl} />
            </View>
          )}
          <View className='ele-card-header_content'>
            <View className='ele-card-header_content-title'>{title}</View>
            <View className='ele-card-header_content-brief'>{brief}</View>
            <View className='ele-card-header_content-time'>{formatTime(createTime)}</View>
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
}

export default EleCard
