import Taro from '@tarojs/taro'
import { Swiper, SwiperItem, View } from '@tarojs/components'
import NavigationService from '@/nice-router/navigation.service'

import ServerImage from '../image/server-image'
import '../biz/styles.scss'

const MAX_COUNT = 5

/**
 * 首次访问欢迎用carousel
 * 数据处理参考home.model.js
 */
export default class WelcomeCarousel extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  state = {
    second: MAX_COUNT,
  }

  componentDidMount() {
    // 倒计时
    this.interval = setInterval(() => {
      if (this.state.second > 0) {
        console.log('set it to ', this.state.second - 1)
        this.setState({
          second: this.state.second - 1,
        })
        return
      }
      this.setState({ second: 0 })
      this.handleStop()
    }, 1000)
  }

  componentWillUnmount() {
    this.handleStop()
  }

  handleStop = () => {
    console.log('.....stop welcome count')
    if (this.interval) {
      clearInterval(this.interval)
    }
    NavigationService.dispatch('home/hideWelcome')
  }

  render() {
    const { items = [] } = this.props
    const { second } = this.state

    const skipBtnTxt = second > 0 ? `跳过  ${second}s...` : '跳过'
    return (
      <View className='welcome-carousel'>
        <Swiper circular={false} className='welcome-carousel-swiper' indicatorDots>
          {items.map((it) => {
            const { id } = it
            return (
              <SwiperItem key={id}>
                <View className='carousel-image'>
                  <ServerImage src={it.imageUrl} size='large' mode='widthFix' />
                </View>
              </SwiperItem>
            )
          })}
        </Swiper>
        <View className='skip-button' onClick={this.handleStop}>
          {skipBtnTxt}
        </View>
      </View>
    )
  }
}
