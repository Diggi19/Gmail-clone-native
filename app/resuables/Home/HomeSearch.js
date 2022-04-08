import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'; 
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';


const HomeSearch = ({searchText,setsearchText,settoggleMenu}) => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
        <View style={{elevation:1.5,width:'92%',height:50,borderWidth:1,borderColor:'#dbd9d9',alignSelf:'center',borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
            <TouchableOpacity onPress={()=>settoggleMenu(true)}>
                <Feather name="menu" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
                placeholder='Search in mail'
                style={{width:230,backgroundColor:'white'}}
                value={searchText}
                onChangeText={setsearchText}
            />
            <TouchableOpacity onPress={()=>navigation.navigate('SETTINGSSCREEN')} style={{width:35,height:35,backgroundColor:'#407bef',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'white',fontWeight:'bold'}}>D</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default HomeSearch

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:70,
        backgroundColor:'white',
        justifyContent:'center',        
    },
})