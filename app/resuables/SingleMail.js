import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const SingleMail = ({subject,sender,description,image,timeStamp,receiver,images}) => {
    const[isStarred,setisStarred] = React.useState(false)
    const navigation = useNavigation()

  return (
      <View style={styles.container}>
          <View>
            <TouchableOpacity style={{width:50,height:50,backgroundColor:'#407bef',borderRadius:50,justifyContent:'center',alignItems:'center',marginLeft:10}}>
                {image?
                    <Image source={{uri:image}} style={{width:'100%',height:'100%',borderRadius:50}}/>
                :
                <Text style={{color:'white',fontWeight:'bold',fontSize:30}}>{sender.slice(0,1).toUpperCase()}</Text>
                }
            </TouchableOpacity>

          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('READMAILSCREEN',{subject,receiver,sender,description,image,timeStamp,images})} style={{width:225,justifyContent:'center'}}>
            <Text style={{marginLeft:20,fontSize:17,fontWeight:'bold'}}>{sender}</Text>
            <Text style={{marginLeft:20,fontSize:15}}>{subject.slice(0,30) +"..."}</Text>
            <Text style={{marginLeft:20,fontSize:13,color:'grey'}}>{description.slice(0,36) + '...'}</Text>
          </TouchableOpacity>
          <View style={{height:'100%',alignItems:'center',marginRight:10}}>
            <Text style={{marginTop:15}}>{timeStamp}</Text> 
            <TouchableOpacity style={{marginTop:10}} onPress={()=>setisStarred(!isStarred)}>
                {isStarred?
                    <Entypo name="star" size={24} color="gold" />
                    :
                    <Entypo name="star-outlined" size={24} color="grey" />
                }
                
            </TouchableOpacity>
          </View>
      </View>
      
  )
}

export default SingleMail

const styles = StyleSheet.create({
    container:{
        width:'95%',
        height:80,
        alignSelf:'center',
        backgroundColor:'white',
        alignItems:'center',
        flexDirection:'row',
        marginTop:6,
        marginBottom:6,
    },
})