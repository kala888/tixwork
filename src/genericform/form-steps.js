import Taro from '@tarojs/taro'
import NavigationService from '@/nice-router/navigation.service'
import { AtSteps } from 'taro-ui'
import { View } from '@tarojs/components'

import './styles.scss'

export default class FormSteps extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }
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
    const stepList = steps.map((it) => ({ ...it, desc: it.desc || it.brief || '' }))
    let selectedIdx = steps.findIndex((it) => it.selected)
    return (
      <View className='form-steps'>
        <AtSteps items={stepList} current={selectedIdx} onChange={this.handleChange} />
      </View>
    )
  }
}
