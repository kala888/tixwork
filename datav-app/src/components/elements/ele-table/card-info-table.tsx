import React from 'react'
import _ from 'lodash'
import EleTable from './ele-table'
import EleTableRow from './ele-table-row'
import EleTableCell from './ele-table-cell'
import { TitleValue } from '@/nice-router/nice-router-types'

import { isEmpty, isNotEmpty } from '@/nice-router/nice-router-util'
import { StyleSheet, View } from 'react-native'

const getMaxLabelLength = (list, idx = 0) => {
  const result = _.max(
    list.map((it) => {
      const titleLength = _.get(it, idx + '.title', '').length
      return titleLength > 2 ? titleLength : 2
    }),
  )
  // @ts-ignore
  return result > 5 ? 5 : result
}

type CardInfoTableProps = {
  data: (TitleValue | null)[];
  style?: any;
};

export default function CardInfoTable(props: CardInfoTableProps) {
  const { data = [], style } = props
  const rowList = _.chunk(data, 2)
  const maxLabelLengthLeft = getMaxLabelLength(rowList, 0)
  const maxLabelLengthRight = getMaxLabelLength(rowList, 1)
  const leftItemLabelClass = [styles.label, styles[`width${maxLabelLengthLeft}`]]
  const rightItemLabelClass = [styles.label, styles[`width${maxLabelLengthRight}`]]

  return (
    <View style={[styles.container, style]}>
      <EleTable bordered={false}>
        {rowList.map((row, idx) => {
          const leftItem = row[0] || {}
          const rightItem = row[1] || {}
          const showRight = isNotEmpty(rightItem)

          let colspan = 1
          if (!showRight) {
            colspan = isEmpty(leftItem.title) ? 4 : 1.5
          }

          return (
            <EleTableRow key={idx}>
              {isNotEmpty(leftItem.title) && (
                <EleTableCell title={leftItem.title} style={leftItemLabelClass} mode='left' />
              )}
              <EleTableCell title={leftItem.value} colspan={colspan} mode='left' />
              {showRight && <EleTableCell title={rightItem.title} style={rightItemLabelClass} mode='left' />}
              {showRight && <EleTableCell title={rightItem.value} mode='left' />}
            </EleTableRow>
          )
        })}
      </EleTable>
    </View>
  )
}

const baseSize = 18
const styles = StyleSheet.create({
  container: {},
  label: { width: 5 * baseSize },
  width2: { width: 3 * baseSize },
  width3: { width: 4 * baseSize },
  width4: { width: 5 * baseSize },
  width5: { width: 6 * baseSize },
})

