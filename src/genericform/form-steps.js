import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import NavigationService from '@/nice-router/navigation.service'
import { AtSteps } from 'taro-ui'

import './styles.scss'

export default class FormSteps extends Taro.PureComponent {
  static defaultProps = {
    steps: [],
  }
  handleChange = (current) => {
    const { steps } = this.props
    NavigationService.view(
      steps[current],
      {},
      {
        navigationOptions: { method: 'redirectTo' },
      }
    )
  }

  // steps=[{title,icon:{value},status,linkToUrl}]
  render() {
    const { steps } = this.props
    let selectedIdx = steps.findIndex((it) => it.selected)
    return (
      <View className='form-steps'>
        <AtSteps items={steps} current={selectedIdx} onChange={this.handleChange} />
      </View>
    )
  }
}
