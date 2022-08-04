import { StyleSheet, Text, View } from 'react-native'
import React, {useCallback, useState} from 'react'
import { takeImage } from '../Helpers/Helper'
import { useFocusEffect } from '@react-navigation/native'
const Photo = ({navigation}) => {
    useFocusEffect(
      useCallback(() => {
       const newImage = async () => {
          const imagePath = await takeImage()
        if(!imagePath.didCancel) {
          navigation.navigate("Contacts", {imageToSend : imagePath.assets[0]})
          
          
        } else {
          navigation.navigate("Home")
        }

       }
       newImage()
      }, [navigation])
    )
  
  return (
    <></>
  )
}

export default Photo

const styles = StyleSheet.create({})