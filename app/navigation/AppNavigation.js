import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'
import ReadEmail from '../screens/ReadEmail'
import NewEmail from '../screens/NewEmail'
import ReplyScreen from '../screens/ReplyScreen'
import ForwardScreen from '../screens/ForwardScreen'
import SettingScreen from '../screens/SettingScreen'
const Stack = createNativeStackNavigator()

const AppNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='ALLINBOXScreen' component={HomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name='READMAILSCREEN' component={ReadEmail} options={{headerShown:false}}/>
            <Stack.Screen name='NEWMAILSCREEN' component={NewEmail} options={{headerShown:false}}/>
            <Stack.Screen name='REPLYSCREEN' component={ReplyScreen} options={{headerShown:false}}/>
            <Stack.Screen name='FORWARDSCREEN' component={ForwardScreen} options={{headerShown:false}}/>
            <Stack.Screen name='SETTINGSSCREEN' component={SettingScreen} options={{headerShown:false}}/>

        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation