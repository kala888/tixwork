import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import m_ from '@/utils/mini-lodash'
import classNames from 'classnames'
import './styles.scss'

function transToDoubleItemList(list = []) {
  const newList = []
  const sourceLength = list.length
  const twoColumnLength = parseInt(sourceLength / 2) + (sourceLength % 2)

  for (let i = 0; i < twoColumnLength; i += 1) {
    const leftIdx = i * 2
    const rightIdx = i * 2 + 1
    const left = list[leftIdx]
    const right = rightIdx >= sourceLength ? null : list[rightIdx]
    newList.push({
      id: leftIdx,
      left,
      right,
    })
  }
  return newList
}

export default class TxtTable extends Taro.PureComponent {
  render() {
    const { list = [], maxLine } = this.props
    const doubleItemList = transToDoubleItemList(list)
    const valueCls = classNames('info-row-cell-value', {
      'info-row-cell-2lines': maxLine === 2,
      'info-row-cell-3lines': maxLine === 3,
      'info-row-cell-4lines': maxLine === 4,
    })
    return (
      <View className='txt-table'>
        {doubleItemList.map((it) => {
          const { id, left, right } = it

          return (
            <View key={id} className='info-row'>
              <View className='info-row-cell'>
                <View className='info-row-cell-title'>{left.title}</View>
                <View className={valueCls}>{left.value}</View>
              </View>
              {!m_.isEmpty(right) && (
                <View className='info-row-cell'>
                  <View className='info-row-cell-title'>{right.title}</View>
                  <View className={valueCls}>{right.value}</View>
                </View>
              )}
            </View>
          )
        })}
      </View>
    )
  }
}
