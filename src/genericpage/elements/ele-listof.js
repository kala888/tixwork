import Taro from '@tarojs/taro'
import Listof from '../../listof/listof'

export default class EleListof extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }
  render() {
    const { dataContainer, list, listMeta, displayMode, customStyle = {}, horizontal, numColumns } = this.props

    return (
      <Listof
        horizontal={horizontal}
        dataContainer={dataContainer}
        list={list}
        listMeta={listMeta}
        displayMode={displayMode}
        numColumns={numColumns}
        style={customStyle}
      />
    )
  }
}
