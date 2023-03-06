import React from 'react'
import { StyleSheet, View } from 'react-native'
import RecordButton from './record-button'
import EleActionList from '@/components/elements/ele-action-list'
import NavigationService from '@/nice-router/navigation-service'

const CenterButtonSize = 60

export default function FormFooter(props) {
  const { items = [], onScan, showScanner } = props
  if (items.length === 0 && !showScanner) {
    return null
  }

  const goCameraScanner = async () => {
    const handleScan = (code) => {
      console.log('onScan value', code)
      onScan(code)
    }
    await NavigationService.navigate('CameraScanner', { onScan: handleScan })
  }

  return (
    <View style={styles.container}>
      {showScanner && <RecordButton onPress={goCameraScanner} />}
      {items.length > 0 && <EleActionList items={items} />}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderTopWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  wrapper: {
    position: 'absolute',
    top: -CenterButtonSize + 10,
    left: 0, right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999999,
  },
  center: {
    borderColor: '#aaa',
    borderWidth: 1,
    backgroundColor: '#ddd',
    borderRadius: CenterButtonSize,
    width: CenterButtonSize,
    height: CenterButtonSize,
    justifyContent: 'center',
    alignItems: 'center',
  },

})
