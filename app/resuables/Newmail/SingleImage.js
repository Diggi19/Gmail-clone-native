import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'

const SingleImage = ({image,setImages,Images}) => {

  const deleteImage = (imageUrl)=>{
    const filterImages = Images.filter((inImage)=>inImage !==imageUrl)
    setImages(filterImages)
  }
  return (
    <TouchableWithoutFeedback style={styles.container} onPress={()=>deleteImage(image)}>
        {image && <Image source={{uri:image}} style={{width:140,height:140,marginLeft:5}}/>}
        
    </TouchableWithoutFeedback>
  )
}

export default SingleImage

const styles = StyleSheet.create({
    container:{
        width:150,
        height:150,
        marginLeft:10,
        marginRight:10,
        justifyContent:'center',
        alignItems:'center'
    },
})