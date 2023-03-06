import _ from 'lodash'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '@/utils/colors'

type FooterTipsProps = {
  hasNextPage?: boolean;
  loading?: boolean;
  onLoadMore?: Function;
};

function FooterTips(props: FooterTipsProps) {
  const { hasNextPage = false, loading, onLoadMore } = props

  let tips = loading ? '正在加载中...' : '我们是有底线的'

  if (!loading && hasNextPage) {
    tips = '加载更多'
  }

  const handleLoadMore = () => {
    if (!loading && hasNextPage && onLoadMore && _.isFunction(onLoadMore)) {
      onLoadMore()
    }
  }


  return (
    <TouchableOpacity style={styles.container} onPress={handleLoadMore}>
      <View style={styles.line} />
      <View style={styles.content}>
        {
          loading && (
            <View style={styles.loading}>
              <ActivityIndicator size={28} color={colors.primaryColor} />
            </View>
          )
        }
        <Text style={styles.tips}>{tips}</Text>
      </View>
      <View style={styles.line} />
    </TouchableOpacity>
  )
}

export default FooterTips

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 50,
    color: colors.textColorLighter,
    zIndex: 9999,
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tips: {
    color: colors.textColorLight,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.textColorLighter,
  },

})
