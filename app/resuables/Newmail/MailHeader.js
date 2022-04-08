import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign, Entypo, Ionicons   } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';

const MailHeader = ({handleSubmit, toggleMedia, settoggleMedia}) => {
  const navigation = useNavigation()
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{marginLeft:10}} onPress={()=>navigation.navigate('ALLINBOXScreen')}>
        <AntDesign name="arrowleft" size={26} color="black" />
      </TouchableOpacity>

      <Text style={{fontSize:23 ,fontWeight:'bold', marginLeft:10 ,marginRight:20}}>Compose</Text>

      {/* sidebuttons */}
      <View style={{marginLeft:10,flexDirection:'row',width:100,justifyContent:'space-between',marginRight:10}}>
      <TouchableOpacity onPress={()=>settoggleMedia(!toggleMedia)}>
        <Entypo name="attachment" size={24} color="black"  />
      </TouchableOpacity>
      
      <TouchableOpacity  style={{marginLeft:15}} onPress={handleSubmit}>
        <Ionicons name="send-sharp" size={24} color="black" />
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
    },
})