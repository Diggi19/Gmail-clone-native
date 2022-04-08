import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign, Entypo} from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const MailHeader = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{marginLeft:10}} onPress={()=>navigation.navigate('ALLINBOXScreen')}>
        <AntDesign name="arrowleft" size={26} color="black" />
      </TouchableOpacity>

      

      {/* sidebuttons */}
      <View style={{marginLeft:10,flexDirection:'row',width:100,justifyContent:'space-between',marginRight:10}}>
      <TouchableOpacity >
         <AntDesign name="delete" size={24} color="black" />
      </TouchableOpacity>
      
      <TouchableOpacity style={{marginLeft:15}}>
        <AntDesign name="mail" size={24} color="black" />
      </TouchableOpacity>
      
      <TouchableOpacity >
         <Entypo name="dots-three-vertical" size={24} color="black" />
      </TouchableOpacity>

      </View>
    </View>
  )
}

export default MailHeader

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:60,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white'
    },
})