import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'

const WelcomScreen = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/mailicon.png')} style={{width:150,height:150,alignSelf:'center',marginTop:70,marginBottom:70}} />
      <View style={{width:'100%',height:100,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:30,color:'grey'}}>New in Gmail</Text>
        <Text style={{fontSize:16,width:270,textAlign:'center',marginTop:10,color:'grey'}}>All the features you love with fresh new look</Text>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('AddEmailScreen')} style={styles.button}>
          <Text>GOT IT</Text>
      </TouchableOpacity>
    </View>
  )
}

export default WelcomScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    button:{
        width:'100%',
        height:60,
        borderTopColor:'grey',
        borderTopWidth:.5,
        borderBottomWidth:.5,
        borderBottomColor:'grey',
        justifyContent:'center',
        alignItems:'center',
        marginTop:100
    }
})