import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import './styles.scss'

class StageTask extends Taro.Component {
  render() {
    const { displayTime, title, status = {}, isLast } = this.props
    const completed = status.code === 'completed' || status.code === 'FINISHED'

    const statusIconClassName = classNames('stage-task-flag', {
      completed,
    })
    const statusClassName = classNames('stage-task-content-title-status', {
      completed,
    })

    const taskClass = classNames('stage-task', { 'last-item': isLast })

    return (
      <View className={taskClass}>
        <View className={statusIconClassName} />
        <View className='stage-task-content'>
          <View className='stage-task-content-time'>{displayTime}</View>
          <View className='stage-task-content-title'>
            <View>{title}</View>
            <View className={statusClassName}>{status.name}</View>
          </View>
        </View>
      </View>
    )
  }
}

export default StageTask
