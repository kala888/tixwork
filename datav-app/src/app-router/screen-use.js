import { TransitionPresets } from '@react-navigation/stack'

export const useScreenOptions = () => {
  return {
    headerStyle: {
      backgroundColor: '#ffffff',
    }, // 一个应用于 header 的最外层 View 的 样式对象
    headerTintColor: '#000000', // 返回按钮和标题都使用这个属性作为它们的颜色
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerBackTitleVisible: false,
    headerTitleAlign: 'center',
    cardStyle: {
      flex: 1,
      backgroundColor: '#f5f5f9',
    },
    ...TransitionPresets.SlideFromRightIOS,
  }
}
