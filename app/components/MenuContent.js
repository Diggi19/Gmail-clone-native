import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MenuItem from '../resuables/menu/MenuItem'

// tabs data
import mainTabData from '../data/mainTabs.json'
import googleTabData from '../data/googleTabs.json'
import labelTabData from '../data/labelTabs.json'
import optionTabData from '../data/optionTabs.json'

const MenuContent = ({activeTab,setactiveTab}) => {
  return (
    <View style={styles.container}> 
    <View style={{width:'100%',height:615,backgroundColor:'white'}}>
    <ScrollView>
      <View style={{flexDirection:'row',alignItems:'center',width:'100%',height:60,marginTop:20}}>
          <Image source={{uri:'https://1000logos.net/wp-content/uploads/2018/05/Gmail-logo.jpg'}} style={{width:60,height:60,marginLeft:10}}/>
          <Text style={{fontSize:25,color:'grey'}}><Text style={{fontSize:40,color:'grey'}}>G</Text>mail</Text>
      </View>
      <View style={{width:'100%',height:.5,backgroundColor:'#c9c7c7'}}></View>
      
      {/* main tabs */}
      {
          mainTabData.map((tab)=><MenuItem icon={tab.icon} item={tab.item} key={tab.id} activeTab={activeTab} setactiveTab={setactiveTab}/>)
      }
      <View style={{width:'100%',height:.5,backgroundColor:'#c9c7c7'}}></View>

      {/* label tabs */}
      <Text style={{marginLeft:20,marginTop:10,marginBottom:10}}>ALL LABELS</Text>
      {
          labelTabData.map((tab)=><MenuItem icon={tab.icon} item={tab.item} key={tab.id} activeTab={activeTab} setactiveTab={setactiveTab}/>)
      }
      <View style={{width:'100%',height:.5,backgroundColor:'#c9c7c7'}}></View>

      {/* google tabs */}
      <Text style={{marginLeft:20,marginTop:10,marginBottom:10}}>GOOGLE APPS</Text>
      {
          googleTabData.map((tab)=><MenuItem icon={tab.icon} item={tab.item} key={tab.id} activeTab={activeTab} setactiveTab={setactiveTab}/>)
      }
      <View style={{width:'100%',height:.5,backgroundColor:'#c9c7c7'}}></View>

      {/* option tab */}
      {
          optionTabData.map((tab)=><MenuItem icon={tab.icon} item={tab.item} key={tab.id} activeTab={activeTab} setactiveTab={setactiveTab}/>)
      }
      <View style={{width:'100%',height:.5,backgroundColor:'#c9c7c7'}}></View>


    </ScrollView>

    </View>

          
      
    </View>
  )
}

export default MenuContent

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%'
    },
})