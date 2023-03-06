import React, { useEffect, useState } from 'react'
import { isNotEmpty, noop } from '@/nice-router/nice-router-util'
import { CandidateValue } from '@/nice-router/nice-router-types'
import { StyleSheet, View } from 'react-native'
import colors from '@/utils/colors'
import EleCheckbox from '@/components/form/field/ele-checkbox/ele-checkbox'
import _ from 'lodash'

export type EleRadioGroupType = {
  value: any;
  candidateValues: CandidateValue[];
  onChange?: Function;
  mode?: 'vertical' | 'horizontal';
};

function EleRadioGroup(props: EleRadioGroupType) {

  const [selected, setSelected] = useState<string>('')

  const { candidateValues = [], mode, onChange, value } = props

  useEffect(() => {
    let selectItem = isNotEmpty(value) ? { id: value } : _.find(candidateValues, { selected: true })
    setSelected(_.get(selectItem, 'id'))
  }, [value, candidateValues])

  const handleItemPress = (item) => {
    setSelected(item.id)
    onChange && onChange(item.id)
  }
  const rootClass = [styles.container, styles[mode]]

  return (
    <View style={rootClass}>
      {
        candidateValues.map(it => {
          return (
            <View key={it.id} style={styles[mode]}>
              {/*// @ts-ignore*/}
              <EleCheckbox {...it} onPress={handleItemPress} radio checked={it.id === selected} />
            </View>
          )
        })
      }
    </View>
  )
}

EleRadioGroup.defaultProps = {
  candidateValues: [],
  onChange: noop,
}

export default EleRadioGroup


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
