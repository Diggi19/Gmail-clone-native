import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import WelcomScreen from '../screens/WelcomeScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'


const Stack = createNativeStackNavigator()

const AuthNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='WelcomeScreen' component={WelcomScreen} options={{headerShown:false}}/>
            <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name='AddEmailScreen' component={SignupScreen} options={{headerShown:false}}/>

        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthNavigation