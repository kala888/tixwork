import React, {useEffect} from 'react'
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native'
import {useSelector} from 'react-redux'
import GenericForm from '@/genericform/generic-form'
import {useNavigation} from '@react-navigation/native'

import {getCommonContentHeight} from '@/utils'

const contentHeight = getCommonContentHeight() - 10

const FormLayout = (props) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          {props.children}
          <View style={{height: 90}}/>
        </ScrollView>
        {
          !!props.footer && (
            <View style={styles.footer}>
              {props.footer}
            </View>
          )
        }

      </View>
    </SafeAreaView>
  )

}

function GenericformPage() {

  // @ts-ignore
  const root = useSelector((state) => state.genericform || {})

  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      title: root.pageTitle || '-',
    })
  }, [navigation, root])

  return (
    <GenericForm {...root} layout={FormLayout}/>
  )
}

export default GenericformPage

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: contentHeight,
    position: 'relative',
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 4,
  },
  footer: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
})
