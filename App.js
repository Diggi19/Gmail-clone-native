import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, StatusBar as expoStatucbar } from 'react-native';
import AppNavigation from './app/navigation/AppNavigation';
import AuthNavigation from './app/navigation/AuthNavigation';
import HomeScreen from './app/screens/HomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import NewEmail from './app/screens/NewEmail';
import ReadEmail from './app/screens/ReadEmail';
import SignupScreen from './app/screens/SignupScreen'
import WelcomScreen from './app/screens/WelcomeScreen';
import TestScreen from './app/screens/TestScreen'
import { auth } from './firebase';
import ReplyScreen from './app/screens/ReplyScreen';
export default function App() {
  const[isSignin,setisSignin] = React.useState(false)

const checkUser = async()=>{
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      setisSignin(true)
    } else {
      setisSignin(false)
    }
  })
}

  React.useEffect(()=>{
    checkUser()
  },[])

  return (
    <View style={styles.container}>
      {isSignin?<AppNavigation/>:<AuthNavigation/>}
      {/* <DrawNavigation/> */}
      {/* <TestScreen/> */}
      {/* <HomeScreen/> */}
      {/* <NewEmail/> */}
      {/* <ReadEmail/> */}
      {/* <AppNavigation/> */}
      {/* <SignupScreen/> */}
      {/* <LoginScreen/> */}
      {/* <WelcomScreen/> */}
      {/* <AuthNavigation/> */}
      {/* <ReplyScreen/> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:Platform.OS === 'android'? expoStatucbar.currentHeight:0
  },
});
