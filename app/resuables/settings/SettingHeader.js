import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign, Entypo, Ionicons   } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';

const SettingHeader = ({handleSubmit, toggleMedia, settoggleMedia}) => {
  const navigation = useNavigation()
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{marginLeft:10}} onPress={()=>navigation.navigate('ALLINBOXScreen')}>
        <AntDesign name="arrowleft" size={26} color="black" />
      </TouchableOpacity>

      <Text style={{fontSize:23 ,fontWeight:'bold',marginLeft:100}}>Account</Text>
    </View>
  )
}

export default SettingHeader

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:60,
        flexDirection:'row',
        alignItems:'center',
    },
})