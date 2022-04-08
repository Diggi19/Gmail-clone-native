import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HomeSearch from '../resuables/Home/HomeSearch'
import SingleMail from '../resuables/SingleMail'
import { Feather } from '@expo/vector-icons'; 

import * as ImagePicker from 'expo-image-picker'

// data
import inboxData from '../data/EmailSets.json'
import ReactNativeModal from 'react-native-modal';
import MenuContent from '../components/MenuContent';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebase';
import { collection, getDoc, getDocs, onSnapshot } from 'firebase/firestore';

const HomeScreen = () => {
    // mails
    const [mailData,setmailData]= React.useState([])
    const[realTimeData,setrealTimeData] = React.useState([])
    const[searchText,setsearchText] = React.useState('')
    const [tractScroll,settractScroll]= React.useState(false)
    const [toggleMenu,settoggleMenu]= React.useState(false)
    const [activeTab,setactiveTab]= React.useState('All inboxes')
    const navigation = useNavigation()
    const currentUser = auth.currentUser


    // getting data from firebase
    const getData = async()=>{
        const collectionRef = collection(db,'users',currentUser.email.toLowerCase(),'inbox')
        const result = await onSnapshot(collectionRef,(snapshot)=>setmailData(snapshot.docs.map((mail)=>mail.data())))
        // const mailData = await getDocs(collectionRef)
        // const finalData = mailData.docs.map((mail)=>mail.data())
        // console.log(finalData)
        // setmailData(finalData)
        
    }

    // scrolling treck
    const handleScroll =(event)=>{
        console.log(event)
        const {contentOffset} =event
        if (contentOffset.y > 4) {
            settractScroll(true)
        }if (contentOffset.y <4) {
            settractScroll(false)
        }
      }
    
    // search functionality
    const handleSearch = (searched)=>{
        if (searchText.length > 0) {
            const newData = inboxData.filter((mail)=>mail.sender.toLowerCase().includes(searched.toLowerCase()))
            setmailData(newData)
        }else{
            setmailData(realTimeData)
        }
    }

    // getting permission
    const getPermission = async()=>{
        const mediaResult = await ImagePicker.getMediaLibraryPermissionsAsync()
        const cameraResult = await ImagePicker.getCameraPermissionsAsync()
        if (mediaResult.granted && cameraResult.granted) {
            console.log('granted')
        }else{
            console.log('not granted')
        }
    }


    React.useEffect(()=>{
        getPermission()
        getData()
        handleSearch(searchText)
    },[searchText,realTimeData])
  return (
    <View style={styles.container} >
        <ScrollView
            onScroll={({nativeEvent})=>handleScroll(nativeEvent)}
        >
            <HomeSearch settoggleMenu={settoggleMenu} searchText={searchText} setsearchText={setsearchText} />
            <Text style={styles.category}>ALL INDOXES</Text>
            <View style={styles.divider}></View>
            {mailData.length >0 && mailData.map((mail,index)=><SingleMail key={index} subject={mail.subject} sender={mail.sender} image={mail.image} description={mail.description} timeStamp={mail.timeStamp} images={mail.attachedImg} receiver={mail.to}/>)}
        </ScrollView>

        <TouchableOpacity onPress={()=>navigation.navigate('NEWMAILSCREEN')} style={[styles.compose,{width:tractScroll?60:150,}]}>
            <Feather name="edit-2" size={24} color="#e54040" />
            {tractScroll?<Text></Text>:<Text style={{fontWeight:'bold',marginLeft:10,color:'#e54040'}}>Compose</Text>}
            
        </TouchableOpacity>
        
        <ReactNativeModal
            isVisible={toggleMenu}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            animationInTiming={400}
            animationOutTiming={400}
            onBackdropPress={()=>settoggleMenu(false)}
        >
            <View style={{width:250,height:650,backgroundColor:'white',marginLeft:-20,marginTop:-37}}>
                <View style={{width:'100%',height:36}}></View>
                <MenuContent activeTab={activeTab} setactiveTab={setactiveTab}/>
            </View>

        </ReactNativeModal>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    category:{
        marginLeft:15,
        marginTop:10,
        color:'#afaeae',
        fontWeight:'bold'
    },
    divider:
    {
        width:'95%',
        height:1,
        backgroundColor:'#dbd9d9',
        alignSelf:'center',
        marginTop:5
    },
    compose:{
        height:50,
        borderRadius:50,
        backgroundColor:'white',
        elevation:5,
        position:'absolute',
        bottom:15,
        right:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    }

})