import Taro from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import classNames from 'classnames'
import NavigationService from '@/nice-router/navigation.service'

import './styles.scss'
import stageIcon from '../../assets/icon/icon_yuanquanquan@2x.png'
import StageTask from './stage-task'

class StageCard extends Taro.Component {
  handleViewAll = () => {
    const { action } = this.props
    NavigationService.view(action)
  }

  render() {
    const { startTime, endTime, title, taskList = [], isLast, active, action = {} } = this.props
    const statusIconClassName = classNames('stage-card-flag', {
      completed: !active,
    })

    const stageCardClass = classNames('stage-card', { 'last-item': isLast })

    const lastTaskIndex = taskList.length - 1

    const showMore = NavigationService.isActionLike(action)

    return (
      <View className={stageCardClass}>
        <View className={statusIconClassName}>{active && <Image src={stageIcon} />}</View>
        <View className='stage-card-content'>
          <View className='stage-card-content-header'>
            <View className='stage-card-content-header-time'>
              {startTime}-{endTime}
            </View>
            <View className='stage-card-content-header-title'>{title}</View>
          </View>

          <View className='stage-card-content-tasks'>
            {taskList.map((it, index) => {
              const { status, displayTime } = it
              return (
                <StageTask
                  key={it.id}
                  displayTime={displayTime}
                  title={it.title}
                  status={status}
                  isLast={lastTaskIndex === index}
                />
              )
            })}
          </View>
          {showMore && (
            <View className='stage-card-content-footer' onClick={this.handleViewAll}>
              {action.title}
            </View>
          )}
        </View>
      </View>
    )
  }
}

export default StageCard
