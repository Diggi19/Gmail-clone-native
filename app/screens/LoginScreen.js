import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Entypo } from '@expo/vector-icons'; 
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import LottieView from 'lottie-react-native'
const validationScrema = Yup.object().shape({
    email:Yup.string().email('end with @gmail.com').required(),
    password:Yup.string().min(8,'password should be a minimum of 8 characters')
})


const LoginScreen = () => {
    const[showPassword,setshowPassword]=React.useState(true)
    const[activeModal,setactiveModal]=React.useState(false)

    const navigation = useNavigation()

    const handleLogin = async(email,password)=>{
        try {
            if (email && password) {
                setactiveModal(true)
                const user = await signInWithEmailAndPassword(auth,email.toLowerCase(),password)
                console.log(user)
                setactiveModal(false)
            }
        } catch (err) {
            console.log(err)
        }
    }
  return (
    
    <View style={styles.container}>
      <Image source={require('../../assets/mailicon.png')} style={{width:150,height:150,alignSelf:'center',marginTop:40,marginBottom:40}} />
      <Formik
        initialValues={{email:'',password:''}}
        onSubmit={(values)=>handleLogin(values.email,values.password)}
        validateOnMount
        validationSchema={validationScrema}
      >
          {({handleBlur,handleChange,handleSubmit,values,errors})=>(
              <View>
                  {values.email.length >=1 && values.email.length <=5 && <Text style={{color:'grey',position:'absolute',top:-27,left:45,fontSize:12,width:250}}><Text style={{fontSize:14,color:'#605e5e'}}>Note:-</Text> End email with @gmail.com & password of min 8 characters</Text>}
                  <View style={{width:270,height:50,marginTop:10,marginBottom:10,justifyContent:'center',alignItems:'center',alignSelf:'center',borderWidth:1,borderColor:errors.email && values.email.length >= 1?'red':'#79c1fc',borderRadius:10}}>
                    <TextInput
                        style={{width:250,height:40,backgroundColor:'white',alignSelf:'center',borderRadius:20,}}
                        placeholder='Email'
                        onBlur={handleBlur('email')}
                        value={values.email}
                        onChangeText={handleChange('email')}
                    />
                  </View>
                  <View style={{width:270,height:50,marginTop:10,marginBottom:10,flexDirection:'row',justifyContent:'center',alignItems:'center',alignSelf:'center',borderWidth:1,borderColor:errors.password && values.password.length>=1?"red":'#79c1fc',borderRadius:10}}>
                    <TextInput
                        style={{width:220,height:40,backgroundColor:'white',alignSelf:'center',borderRadius:20,}}
                        placeholder='Password'
                        value={values.password}
                        onBlur={handleBlur('password')}
                        onChangeText={handleChange('password')}
                        secureTextEntry={showPassword}
                    />
                    <TouchableOpacity onPress={()=>setshowPassword(!showPassword)}>
                        {showPassword?<Entypo name="eye" size={20} color="grey" />:<Entypo name="eye-with-line" size={20} color="black" />}
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Login</Text>
                  </TouchableOpacity>
                  <Text style={{fontSize:15,color:'grey',marginTop:20,alignSelf:'center'}}>Add a new Email.  <Text onPress={()=>navigation.navigate('AddEmailScreen')} style={{color:'#4fbff7'}}>Click Here</Text></Text>
              </View>
          )}
      </Formik>

      {/* loading modal */}
      <Modal
        visible={activeModal}
        transparent
      >
        <View style={{flex:1,backgroundColor:'black',opacity:.7,justifyContent:'center',alignItems:'center'}}>
            <LottieView source={require('../../assets/4432-face-scanning.json')} autoPlay loop style={{width:150,height:150}}/>
            <Text style={{fontSize:25,fontWeight:'bold',color:'white',marginTop:10,fontFamily:'monospace'}}>Authenticating...</Text>
        </View>
      </Modal>

   
    
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    button:{
        width:200,
        height:40,
        backgroundColor:'#f74f4f',
        alignSelf:'center',
        marginTop:40,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
    },
})