import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'; 
import { View } from 'react-native';

const MenuItem = ({icon,item,activeTab,setactiveTab}) => {

  return (
    <TouchableOpacity onPress={()=>setactiveTab(item)} style={[styles.container,{backgroundColor:activeTab === item?'#bed6f4':'white'}]}>
        <FontAwesome name={icon} size={26} color="black" style={{marginLeft:20,marginRight:5}}/>
        <View style={{width:140,alignItems:'center'}}>
            <Text style={{fontSize:17,marginLeft:20,alignSelf:'flex-start'}}>{item}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default MenuItem

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:50,
        flexDirection:'row',
        alignItems:'center',
        marginTop:2,
        marginBottom:2,
    },
})