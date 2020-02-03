import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import NavigationService from '@/nice-router/navigation.service'

export default class UserPickerPage extends Taro.PureComponent {
  handleClick = (item) => {
    // Taro.eventCenter.trigger('user-picked-callback', item)
    NavigationService.back({ data: item }, this)
  }

  render() {
    const { projectId = 'projectId' } = this.$router.params || {}
    const userList = [
      { id: '111', name: 'kala111' },
      { id: '222', name: 'kala222' },
      { id: '333', name: 'kala333' },
      { id: '444', name: 'kala444' },
    ]
    return (
      <View>
        <View>{projectId}</View>
        {userList.map((it) => {
          const { id } = it
          return (
            <View key={id} onClick={this.handleClick.bind(this, it)}>
              {it.name}
            </View>
          )
        })}
      </View>
    )
  }
}
