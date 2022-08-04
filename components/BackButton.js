import { StyleSheet, Text, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react'


const BackButton = ({navigation}) => {
  return (
    <Pressable style={{marginLeft: 6, marginRight: 10}} onPress={() => navigation.navigate("Home")}>
        <Icon name='arrow-left' color={"white"} size={24}/>
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({})