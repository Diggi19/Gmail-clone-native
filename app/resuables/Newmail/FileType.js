import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'; 


const FileType = ({name,icon,onPressed}) => {
  return (
    <>
    <TouchableOpacity style={styles.container} onPress={onPressed}>
      <Entypo name={icon} size={24} color="grey" style={{marginLeft:20,marginRight:10}}/>
      <Text style={{fontSize:17,fontWeight:'bold'}}>{name}</Text>
    </TouchableOpacity>
    <View style={{width:'100%',height:.4,backgroundColor:'#ccc9c9'}}></View>
    </>
  )
}

export default FileType

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:40,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:5,
        marginTop:5        
    },
})