import React, {useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {StatusBar, StyleSheet} from 'react-native'

import {currentScreenRef, navigationRef} from '@/nice-router/navigation-service'
import {useScreenOptions} from './screen-use'
import H5Page from '@/nice-router/h5.page'
import NetworkErrorPage from '@/nice-router/network-error.page'
import GenericFormPage from '../genericform/genericform-page'
import ObjectPickerPage from '../genericform/object-picker-page'
import ListofPage from '../listof/listof-page'
import ListofPage2 from '../listof/listof-page2'
import ListofPage3 from '../listof/listof-page3'
import ListofPage4 from '../listof/listof-page4'

import device from '@/nice-router/device'
import {appInitial} from '@/service/app-initial'
import ActionIcon from '../components/action-icon'
import GlobalHeader from '@/components/global-header'
import Index from '@/pages/home/index'

const Stack = createStackNavigator()

function getActiveRouteName(state) {
  const route = state.routes[state.index]

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state)
  }

  return route.name
}

const Router = () => {
  const screenOptions = useScreenOptions()

  useEffect(() => {
    appInitial()
  }, [])

  // TODO
  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       alert('物理返回键被拦截了！')
  //       return true
  //     }
  //     BackHandler.addEventListener('hardwareBackPress', onBackPress)
  //     return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
  //   }, [])
  // )
  const commonOption = {
    headerTitleStyle: styles.headerTitle,
  }

  const customizedHeader = {
    headerLeft: null,
    ...commonOption,
    header: ({scene}) => {
      const {options} = scene.descriptor
      const title = options.headerTitle || options.title || scene.route.name
      return <GlobalHeader title={title}/>
    },
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      headerTitleStyle={styles.headerTitle}
      onStateChange={(state) => {
        const previousRouteName = currentScreenRef.current
        const currentRouteName = getActiveRouteName(state)

        if (previousRouteName !== currentRouteName) {
          console.log('[onStateChange]', currentRouteName)
          if (currentRouteName === 'HomeScreen') {
            StatusBar.setBarStyle('dark-content') // 修改 StatusBar
          } else {
            StatusBar.setBarStyle('dark-content') // 修改 StatusBar
          }
        }
        // Save the current route name for later comparision
        currentScreenRef.current = currentRouteName
      }}
    >
      <Stack.Navigator initialRouteName='HomePage' screenOptions={screenOptions}>
        <Stack.Screen
          name='HomePage'
          options={{headerShown: false}}
          component={Index}
        />

        <Stack.Screen
          name='H5Page'
          options={{
            ...commonOption,
            headerTitle: '实验大屏',
            headerStyle: {
              height: device.isBigger ? 90 : 70,
              elevation: 1,
            },
            headerTitleStyle: styles.headerTitle,
            headerBackImage: () => (
              <ActionIcon
                icon='antd-close'
                size={22}
                style={{paddingLeft: device.isBigger ? 10 : 0}}
              />
            ),
          }}
          component={H5Page}
        />
        <Stack.Screen
          name='NetworkErrorPage'
          component={NetworkErrorPage}
          options={{
            ...commonOption,
            headerTitle: '网络异常',
          }}
        />

        <Stack.Screen
          name='GenericFormPage'
          component={GenericFormPage}
          options={customizedHeader}
        />
        <Stack.Screen
          name='ObjectPickerPage'
          component={ObjectPickerPage}
          options={commonOption}
        />
        <Stack.Screen
          name='ListofPage'
          component={ListofPage}
          options={commonOption}
        />
        <Stack.Screen
          name='ListofPage2'
          component={ListofPage2}
          options={commonOption}
        />
        <Stack.Screen
          name='ListofPage3'
          component={ListofPage3}
          options={commonOption}
        />
        <Stack.Screen
          name='ListofPage4'
          component={ListofPage4}
          options={commonOption}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#333',
  },
})
export default Router
