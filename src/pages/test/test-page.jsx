import { Component } from '@tarojs/taro'
import TreePickerPage from '@/genericform/tree-picker-page'

export default class TestPage extends Component {
  static defaultProps = {
    data: {},
  }

  state = {
    selectedValue: '',
  }

  onChange = (selectedValue) => {
    this.setState({
      selectedValue,
    })
  }

  render() {
    const { selectedValue, data } = this.state
    return <TreePickerPage onChange={this.onChange} value={selectedValue} root={data} />
  }
}
