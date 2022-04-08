import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import SettingHeader from '../resuables/settings/SettingHeader'

const SettingScreen = () => {
    const currentUser = auth.currentUser.email
  return (
    <View style={{flex:1,alignItems:'center'}}>
        <SettingHeader/>
        <View style={{width:100,height:100,backgroundColor:'#407bef',marginTop:60,marginBottom:20,borderRadius:50,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:40,fontWeight:'bold',color:'white'}}>{currentUser.slice(0,1).toUpperCase()}</Text>
        </View>
        <Text style={{fontSize:20,fontWeight:'bold',marginBottom:20}}>{currentUser}</Text>
        <TouchableOpacity onPress={()=>signOut(auth)} style={{width:140,height:40,backgroundColor:'#f25959',borderRadius:40,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:15,fontWeight:'bold',color:'white'}}>Logout</Text>
        </TouchableOpacity>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({})