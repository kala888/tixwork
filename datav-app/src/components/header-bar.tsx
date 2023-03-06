import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ActionIcon from '@/components/action-icon'

type HeaderBarType = {
  type: string
  title: string
  leftExt: any
  rightExt: any
  onSearchClick: () => void
  onRightClick: () => void
}

const HeaderBar = React.forwardRef((props: HeaderBarType) => {
  const { type = '', title = '', leftExt, rightExt, onSearchClick, onRightClick } = props

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick()
    }
  }

  const handleRightClick = () => {
    if (onRightClick) {
      onRightClick()
    }
  }

  const renderSearch = () => {
    return (
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => {
            handleSearchClick()
          }}
          style={styles.headerBarBody}
        >
          <TextInput
            editable={false}
            style={{
              borderRadius: 15,
              backgroundColor: '#f0f0f0',
              height: 30,
              paddingTop: 1,
              paddingBottom: 1,
              paddingLeft: 30,
              paddingRight: 20,
            }}
            placeholder='请输入要采购的商品'
          />

          <ActionIcon
            icon='iconfont-sousuo'
            size={14}
            color={'#666'}
            style={{
              position: 'absolute',
              left: 10,
              top: 8,
              zIndex: 100,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleRightClick()
          }}
          style={styles.headerBarRight}
        >
          <ActionIcon icon='iconfont-xiaoxi1' size={20} color={'#333'} />
        </TouchableOpacity>
      </View>
    )
  }

  const renderTxt = () => {
    return (
      <View style={styles.headerBar}>
        {leftExt}
        <View style={styles.headerBarBody}>
          <Text style={{ fontSize: 18, color: '#333', textAlign: 'center' }}>
            {title}
          </Text>
        </View>
        {rightExt}
      </View>
    )
  }

  return <View>{type === 'search' ? renderSearch() : renderTxt()}</View>
})

const styles = StyleSheet.create({
  headerBar: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerBarBody: {
    flex: 1,
  },
  headerBarRight: {
    width: 36,
    display: 'flex',
    alignItems: 'flex-end',
  },
  headerBarRightDotted: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#ff0000',
    position: 'absolute',
    top: -2,
    left: '75%',
  },
})

export default HeaderBar
