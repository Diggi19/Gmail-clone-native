import { Button, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MailHeader from '../resuables/Newmail/MailHeader'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { auth, db, storage } from '../../firebase';
import { Formik } from 'formik';
import { addDoc, collection, serverTimestamp, setDoc } from 'firebase/firestore';
import LottieView from 'lottie-react-native';
import FileType from '../resuables/Newmail/FileType';
import SingleImage from '../resuables/Newmail/SingleImage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker';


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


const NewEmail = () => {
    const[toggleFields,settoggleFields] = React.useState(false)
    const[toggleMedia,settoggleMedia] = React.useState(false)
    const[loading,setloading] = React.useState(false)

    //image picker
    const[Images,setImages] = React.useState([])

    // document 
    const[Document,setDocument] = React.useState('')

    // const[sendTo,setsendTo] = React.useState('')
    const navigation = useNavigation()
    const currentUser = auth.currentUser
    // console.log(currentUser)


    // sending email
    const sendEmail = async(from,to,cc,bcc,subject,description)=>{
        const subCollectionRef = collection(db,'users',to.toLowerCase(),'inbox')
        setloading(true)
        const send = await addDoc(subCollectionRef,{
            sender:from,
            to:to.toLowerCase(),
            cc:cc,
            bcc:bcc,
            subject:subject,
            description:description,
            attachedImg:Images, 
            timeStamp:`${new Date().getUTCDate()}/${new Date().getUTCMonth()}/${new Date().getFullYear()}`
        })
        setloading(false)
        navigation.navigate('ALLINBOXScreen')
    }

    // open imagepicker

    const accessMedia = async()=>{
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            quality:.5,
            aspect:[4,3],
            allowsEditing:true,
            allowsMultipleSelection:true,
        })
        if(result.cancelled) return console.log('selection canceled')
        console.log(result.uri)

        // storing in firebase storage 
        const imageUri = result.uri
        const storageRef = ref(storage,'image.jpg')

        // image to bytes
        const image = await fetch(imageUri)
        const bytes = await image.blob()

        // uploading image 
        const uploadTask = await uploadBytesResumable(storageRef,bytes).on(
            'state_changed',
                (snapshot)=>console.log('uploaded images'),
                (err)=>console.log(err),
                async()=>{
                    const downloadedUrl = await getDownloadURL(storageRef)
                    setImages([...Images,downloadedUrl])
                }
        )

    }
    
    // accessing camera
    const accessCamera = async()=>{
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            quality:.5,
            aspect:[4,3],
            allowsEditing:true,
            allowsMultipleSelection:true,
        })
        if(result.cancelled) return console.log('selection canceled')
        console.log(result.uri)

        // storing in firebase storage 
        const imageUri = result.uri
        const storageRef = ref(storage,'image.jpg')

        // image to bytes
        const image = await fetch(imageUri)
        const bytes = await image.blob()

        // uploading image 
        const uploadTask = await uploadBytesResumable(storageRef,bytes).on(
            'state_changed',
                (snapshot)=>console.log('uploaded images'),
                (err)=>console.log(err),
                async()=>{
                    const downloadedUrl = await getDownloadURL(storageRef)
                    setImages([...Images,downloadedUrl])
                }
        )

    }


    // pick docs 
    const accessDocs = async()=>{
        const result = await DocumentPicker.getDocumentAsync({
            type:'application/pdf',
            copyToCacheDirectory:false,
            multiple:false
        })
        console.log(result.uri)
        setDocument(result.uri)
    }


  return (
    <View style={styles.container}>
        <View style={{width:'100%',height:.5,backgroundColor:'#d8d8d8'}}></View>

        <Formik
            initialValues={{from:currentUser.email,to:'',cc:'',bcc:'',subject:'',description:''}}
            onSubmit={(values)=>sendEmail(values.from,values.to,values.cc,values.bcc,values.subject,values.description)}
            >
            {({handleBlur,handleChange,handleSubmit,values,errors})=>(
                <>
                <MailHeader handleSubmit={handleSubmit} toggleMedia={toggleMedia} settoggleMedia={settoggleMedia} />
                <View style={{flexDirection:'row',width:'100%',height:40,alignItems:'center',marginTop:10}}>
                    <Text style={{marginLeft:20,fontSize:17,marginRight:15,color:'#383737'}}>From :</Text>
                    <TextInput
                        style={{width:220,height:30,backgroundColor:'white',fontSize:17,fontWeight:'bold',color:'black'}}
                        value={values.from}
                    />
                </View>
                <View style={{width:'100%',height:.5,backgroundColor:'#d8d8d8' ,marginTop:10}}></View>
        
                <View style={{flexDirection:'row',width:'100%',height:40,alignItems:'center',marginTop:10}}>
                    <Text style={{marginLeft:20,fontSize:17,marginRight:15,color:'#383737'}}>To :</Text>
                    <TextInput
                        style={{width:220,height:30,backgroundColor:'white',marginLeft:20,fontSize:17,fontWeight:'bold',color:'black'}}
                        value={values.to}
                        onChangeText={handleChange('to')}
                        // onChange={(e)=>setsendTo(e.nativeEvent.text)}
                        onBlur={handleBlur('to')}
                    />
                    {
                        toggleFields?
                        <TouchableOpacity onPress={()=>settoggleFields(!toggleFields)}>
                            <MaterialIcons name="keyboard-arrow-up" size={24} color="black" style={{marginLeft:20}} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={()=>settoggleFields(!toggleFields)}>
                            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" style={{marginLeft:20}} />
                        </TouchableOpacity>
        
                    }
                </View>
                <View style={{width:'100%',height:.5,backgroundColor:'#d8d8d8' ,marginTop:10}}></View>
        
        
                {/*  additional fields */}
                {
                    toggleFields?
                    <View>
                    <View style={{flexDirection:'row',width:'100%',height:40,alignItems:'center',marginTop:10}}>
                        <Text style={{marginLeft:20,fontSize:17,marginRight:15,color:'#383737'}}>Cc :</Text>
                        <TextInput
                            style={{width:220,height:30,backgroundColor:'white',fontSize:17,color:'black'}}
                            value={values.cc}
                            onChangeText={handleChange('cc')}
                            onBlur={handleBlur('cc')}
    
                        />
                    </View>
                    <View style={{width:'100%',height:.5,backgroundColor:'#d8d8d8' ,marginTop:10}}></View>
        
                    <View style={{flexDirection:'row',width:'100%',height:40,alignItems:'center',marginTop:10}}>
                        <Text style={{marginLeft:20,fontSize:17,marginRight:15,color:'#383737'}}>Bcc :</Text>
                        <TextInput
                            style={{width:220,height:30,backgroundColor:'white',fontSize:17,color:'black'}}
                            value={values.bcc}
                            onChangeText={handleChange('bcc')}
                            onBlur={handleBlur('bcc')}

                        />
                    </View>
                    <View style={{width:'100%',height:.5,backgroundColor:'#d8d8d8' ,marginTop:10}}></View>
                    </View> 
                    :
                    <Text></Text>
        
                }
        
        
        
        
                {/* mail content */}
                <View style={{flexDirection:'row',width:'100%',height:40,alignItems:'center',marginTop:10}}>
                    <TextInput
                        style={{width:300,height:30,backgroundColor:'white',marginLeft:17,fontSize:17,color:'black'}}
                        placeholder="Subject"
                        value={values.subject}
                        onChangeText={handleChange('subject')}
                        onBlur={handleBlur('subject')}

                    />
                </View>
                <View style={{width:'100%',height:.5,backgroundColor:'#d8d8d8' ,marginTop:10}}></View>
        
                <View style={{flexDirection:'row',width:'100%',height:40,alignItems:'center',marginTop:10}}>
                    <TextInput
                        style={{width:300,height:30,backgroundColor:'white',marginLeft:16,fontSize:17,color:'black'}}
                        placeholder="Compose email"
                        value={values.description}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}

                    />
                </View>
                <View style={{width:'100%',height:.5,backgroundColor:'#d8d8d8' ,marginTop:10}}></View>
                
                {/* image viewer */}
                {
                    Images.length >=1 && 
                    <View style={{width:'100%',height:150}}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {Images.map((image,index)=><SingleImage setImages={setImages} Images={Images} image={image} key={index}/>)}
                        </ScrollView>
                    </View>

                }

                </>
            )}            
        </Formik>

         {/* loading modal */}
                <Modal
                    visible={loading}
                    transparent
                >
                    <View style={{flex:1,backgroundColor:'black',opacity:.8,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontSize:30,fontFamily:'monospace',marginTop:80}}>Sending</Text>
                        <LottieView source={require('../../assets/85646-loading-dots-blue.json')} style={{width:200,height:200,marginTop:-40}} autoPlay loop/>
                    </View>
                </Modal>
        
        {/* file select modal */}
        <Modal
            visible={toggleMedia}
            transparent
        >
                <View style={{width:'100%',height:440,backgroundColor:'black',opacity:.6}}></View>
                <View style={{width:'100%',height:230,backgroundColor:'white',borderRadius:15,marginTop:-40}}>
                    {/* <View style={{width:100,height:5,backgroundColor:'grey',borderRadius:20,alignSelf:'center',marginTop:10,marginBottom:20}}></View> */}
                    <TouchableOpacity onPress={()=>settoggleMedia(false)} style={{position:'absolute',right:15,top:10}}>
                        <AntDesign name="close" size={24} color="black"/>
                    </TouchableOpacity>
                    <View style={{marginTop:40}}>
                        <FileType name="Images" icon="images" onPressed={accessMedia}/>
                        <FileType name="Camera" icon="camera" onPressed={accessCamera}/>
                        <FileType name="Files" icon="folder" onPressed={accessDocs}/>
                    </View>

                </View>   
        </Modal>

    </View>
  )
}

export default NewEmail

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
})