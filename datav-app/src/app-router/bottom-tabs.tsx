import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Index from '../pages/home/home-page'
// import HomePage from '../pages/app-config-page'
// import LoginPage from '../pages/login/login-page'
import colors from '@/utils/colors'
import ActionIcon from '@/components/action-icon'

const Icons = {}

const Tab = createBottomTabNavigator()
export default function BottomTabs() {
  const screenOptions = ({route}) => ({
    tabBarIcon: ({color}) => {
      const iconName = Icons[route.name]
      return <ActionIcon icon={iconName} size={26} color={color}/>
    },
  })
  return (
    <Tab.Navigator
      sceneContainerStyle={{height: 100}}
      screenOptions={screenOptions}
      tabBarOptions={{
        activeTintColor: colors.primaryColor,
        inactiveTintColor: 'gray',
        iconStyle: {
          marginTop: 6,
        },
        labelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name='HomePage'
        options={{tabBarLabel: '主页'}}
        component={Index}
      />
    </Tab.Navigator>
  )
}
