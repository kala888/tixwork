import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '@/utils/colors'
import device from '@/nice-router/device'

type TabBarType = {
  tabs: any[]
  onItemClick: (item: any) => void
}

const TabBar = React.forwardRef((props: TabBarType) => {
  const { tabs = [], onItemClick } = props

  const handleClick = (item) => {
    if (onItemClick) {
      onItemClick(item)
    }
  }

  return (
    <ScrollView
      style={styles.tabBarWrap}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <View
        style={[styles.tabBarBox, { width: tabs.length < 5 ? device.width : '' }]}
      >
        {tabs.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleClick(item)
              }}
              style={[
                item.selected
                  ? styles.tabBarBoxItemActive
                  : styles.tabBarBoxItem,
                { flex: tabs.length < 5 ? 1 : 0 },
              ]}
            >
              <Text
                style={
                  item.selected
                    ? styles.tabBarBoxItemTxtActive
                    : styles.tabBarBoxItemTxt
                }
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  tabBarWrap: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopColor: '#f0f0f0',
    borderTopWidth: 0.5,
  },
  tabBarBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    width: device.width,
  },
  tabBarBoxItem: {
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
  },
  tabBarBoxItemTxt: {
    fontSize: 16,
    color: '#333',
  },
  tabBarBoxItemActive: {
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomColor: colors.primaryColor,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
  },
  tabBarBoxItemTxtActive: {
    fontSize: 16,
    color: colors.primaryColor,
  },
})

export default TabBar
