import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ReadHeader from '../resuables/ReadMail/ReadHeader'
import { FontAwesome, MaterialIcons  } from '@expo/vector-icons'; 
import {useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'; 


const imageData = [
    {
        id:1,
        imageUrl:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*'
    },
    {
        id:2,
        imageUrl:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*'
    },
    {
        id:3,
        imageUrl:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*'
    },
    {
        id:4,
        imageUrl:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*'
    },

]

const ReadEmail = () => {
    const[infoToggle,setinfoToggle] = React.useState(false)
    const routes = useRoute().params
    const navigation = useNavigation()
    console.log(routes,'😀')
    
  return (
    <View style={styles.container}>
        <ReadHeader/>
        <View style={{width:'100%',height:560,backgroundColor:'white'}}>
        <ScrollView>

        <View style={{width:'100%',height:60,backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{marginLeft:20,fontSize:20,fontWeight:'bold',width:300}}>{routes.subject}</Text>
            <FontAwesome name="star-o" size={22} color="black" style={{marginRight:20}} />
        </View>
        <View style={{width:'100%',height:65,backgroundColor:'white',flexDirection:'row',alignItems:'center'}}>
            <View style={{width:50,height:50,borderRadius:50,backgroundColor:'#407bef',marginLeft:20,justifyContent:'center',alignItems:'center'}}>
                {routes.image?<Image
                    source={{uri:routes.image}}
                    style={{width:'100%',height:'100%'}}
                />:<Text style={{fontSize:30,color:'white',fontWeight:'bold'}}>{routes.sender.slice(0,1).toUpperCase()}</Text>}
            </View>
            <View style={{width:220,height:'90%',backgroundColor:'white',marginLeft:10,justifyContent:'center'}}>
                <Text style={{fontSize:17,fontWeight:'bold'}}>{routes.sender} <Text style={{fontSize:12,color:'grey'}}>  2 days ago</Text></Text>
                <Text style={{fontSize:15,color:'#444444'}}>to: {routes.receiver}</Text>
            </View>
            <TouchableOpacity style={{marginLeft:10}} onPress={()=>setinfoToggle(!infoToggle)}>
                <MaterialIcons name={infoToggle?"keyboard-arrow-up":"keyboard-arrow-down"} size={24} color="black" />
            </TouchableOpacity>

        </View>
            {/* toggle box */}
            {
                infoToggle?
                <View style={{width:320,backgroundColor:'white',alignSelf:'center',marginTop:10,borderWidth:.5,borderColor:'grey',borderRadius:5}}>
                    <Text style={{marginLeft:20,marginTop:10,fontSize:16,color:'grey'}}>From:<Text style={{color:'black'}}>   {routes.sender}</Text></Text>
                    <Text style={{marginLeft:20,marginTop:5,marginBottom:10,fontSize:16,color:'grey'}}>To:<Text style={{color:'black'}}>        {routes.receiver}</Text></Text>
                </View>
                :
                <Text></Text>
            }
            

            {/* mail body */}
            <View style={{width:'100%',backgroundColor:'white',marginTop:10}}>
                <View style={{width:'95%',backgroundColor:'white',alignSelf:'center'}}>
                    {routes.images.length>=1
                        && 
                        routes.images.map((image,index)=><Image key={index} source={{uri:image}} style={{width:260,height:220,alignSelf:'center',marginTop:10,marginBottom:10,borderRadius:5}}/>)
                    }
                    
                    <Text style={{marginLeft:10,width:300,marginBottom:10}}>{routes.description.replace(".",'\n\n')+''}</Text>
                </View>
            </View>

            </ScrollView>
            {/* footer options */}
            <View style={{width:'100%',height:40,alignItems:'center',flexDirection:'row',justifyContent:'space-around',marginBottom:10}}>
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('REPLYSCREEN',{
                        replyTo:routes.sender,
                        replySub:`Reply: ${routes.subject}`
                    })}

                    style={styles.footerbtn}
                >
                    <Entypo name="reply" size={24} color="black" style={{marginRight:5}} />
                    <Text>Reply</Text>
                </TouchableOpacity >
                <TouchableOpacity style={[styles.footerbtn,{marginLeft:0,marginRight:0}]}>
                    <Entypo name="reply-all" size={24} color="black" style={{marginRight:5}} />
                    <Text>Reply all</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('FORWARDSCREEN',{
                        subjectFor:`forwarded from ${routes.sender}`,
                        imageFor:'',
                        imagesFor:routes.images,
                        descriptionFor:routes.description

                    })}
                    style={[styles.footerbtn,{marginLeft:0,marginRight:10}]}>
                    <Entypo name="forward" size={24} color="black" style={{marginRight:5}}/>
                    <Text>Forward</Text>
                </TouchableOpacity>
            </View>

        </View>

    </View>
  )
}

export default ReadEmail

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    footerbtn:{width:105,marginLeft:10,marginTop:5,padding:5,height:40,borderWidth:1,borderColor:'#c6c4c4',justifyContent:'center',alignItems:'center',flexDirection:'row'},
})