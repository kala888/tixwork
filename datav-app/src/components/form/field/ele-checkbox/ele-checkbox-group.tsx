import React, { useEffect, useState } from 'react'
import { isNotEmpty, noop } from '@/nice-router/nice-router-util'
import { CandidateValue } from '@/nice-router/nice-router-types'
import { StyleSheet, View } from 'react-native'
import colors from '@/utils/colors'
import EleCheckbox from '@/components/form/field/ele-checkbox/ele-checkbox'
import _ from 'lodash'

export type EleCheckboxType = {
  value: any;
  candidateValues: CandidateValue[];
  onChange?: Function;
  mode?: 'vertical' | 'horizontal';
};

function EleCheckboxGroup(props: EleCheckboxType) {

  const [checkedList, setCheckedList] = useState<CandidateValue[]>([] as CandidateValue[])

  const { candidateValues = [], mode, onChange, value } = props

  useEffect(() => {
    if (isNotEmpty(value)) {
      setCheckedList(value)
      return
    }
    const valueList = _.filter(candidateValues, { selected: true }).map(it => it.id)
    setCheckedList(valueList)
  }, [candidateValues, value])

  const handleItemPress = (item) => {
    const result: CandidateValue[] = _.clone(checkedList)
    const target = _.remove(result, it => it === item.id)
    if (target.length === 0) {
      result.push(item.id)
    }
    setCheckedList(result)
    onChange && onChange(result)
  }
  const rootClass = [styles.container, styles[mode]]

  return (
    <View style={rootClass}>
      {
        candidateValues.map(it => {
          const checked = _.includes(checkedList, it.id)
          return (
            <View key={it.id} style={styles[mode]}>
              {/*// @ts-ignore*/}
              <EleCheckbox {...it} onPress={handleItemPress} radio={false} checked={checked} />
            </View>
          )
        })
      }
    </View>
  )
}

EleCheckboxGroup.defaultProps = {
  candidateValues: [],
  onChange: noop,
}

export default EleCheckboxGroup


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  vertical: {
    paddingTop: 4,
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    paddingRight: 10,
    paddingBottom: 10,
  },
  label: {
    paddingHorizontal: 4,
    fontSize: 16,
    color: colors.textColor,
  },
})
