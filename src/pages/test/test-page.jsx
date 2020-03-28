import { Component } from '@tarojs/taro'
import EleTree from '@/genericform/field/ele-tree/ele-tree'

export default class TestPage extends Component {
  static defaultProps = {
    data: {},
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: mockData,
      })
    }, 2000)
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
    const { selectedValue } = this.state
    return <EleTree onChange={this.onChange} selectedValue={selectedValue} {...this.state.data} />
  }
}

const mockData = {
  name: '娱乐项目',
  value: '1',
  nodes: [
    {
      name: '麻将',
      value: '1-1',
    },
    {
      name: '火锅串串',
      value: '1-2',
      nodes: [
        {
          name: '魏蜀吴火锅',
          value: '1-2-1',
          nodes: [
            {
              name: '鸭血',
              value: '1-2-1-1',
              brief: '缺货',
              disabled: true,
            },
            {
              name: '猪脑',
              value: '1-2-1-2',
            },
          ],
        },
        {
          name: '马路边边',
          value: '1-2-2',
          brief: '暂停营业',
          disabled: true,
        },
      ],
    },
  ],
}
