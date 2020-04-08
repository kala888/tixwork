import Taro from '@tarojs/taro'

export default class GenericTestPage extends Taro.PureComponent {
  componentDidMount() {
    // NavigationService.view('mock-generic-page/')
    // NavigationService.view('mock-generic-form/')
  }

  render() {
    const userList = [
      {
        id: 1,
        title: '小陈不哭',
        brief: '欢迎打赏人气主播',
        imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/avatar-3.jpg',
      },
      {
        id: 2,
        title: '柠檬',
        brief: '少女风，直播中。。。。',
        imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/avatar-4.jpg',
      },
      {
        id: 3,
        title: '嗯嗯嗯',
        brief: '关注我，嗯嗯嗯',
        imageUrl: 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/nice-router/avatar-5.jpg',
      },
    ]

    return <View />
  }
}
