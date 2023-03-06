import FlexInfoItem, { FlexInfoItemProps } from '@/components/info-list/flex-info-item'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { ActionListLike } from '@/nice-router/nice-router-types'
import colors from '@/utils/colors'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import device from '@/nice-router/device'
import _ from 'lodash'

type FlexInfoListProps = {
  items: FlexInfoItemProps[],
  title?: string
  brief?: string
  backgroundColor?: string
  height?: number
} & Partial<ActionListLike>;

const Container = (props) => {
  const height = _.get(props, 'height', 0.6)

  const scrollable = typeof height === 'number'
  console.log('hhhhh', height, scrollable)
  if (scrollable) {
    return (
      <ScrollView style={[styles.container, { height: device.height * height }]} nestedScrollEnabled>
        {props.children}
      </ScrollView>
    )
  }
  return (
    <View style={styles.container}>
      {props.children}
    </View>
  )
}

export default function FlexInfoList(props: FlexInfoListProps) {
  const { items = [], title, brief, backgroundColor = '#fff', height } = props
  const showHeader = isNotEmpty(title || brief)

  return (
    <Container height={height}>
      {
        showHeader && (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerBrief}>{brief}</Text>
          </View>
        )
      }

      <View style={[styles.body, { backgroundColor }]}>
        {
          items.map((it, idx) => <FlexInfoItem key={it.title + '_' + idx} {...it} borderTop={idx !== 0} />)
        }
      </View>
    </Container>
  )

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    color: colors.textColor,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 6,
  },
  headerTitle: {
    flex: 1,
  },
  headerBrief: {
    justifyContent: 'flex-end',
  },
  body: {
    flexDirection: 'column',
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    minHeight: 40,
  },
})
