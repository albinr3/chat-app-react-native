import { StyleSheet, Text, View } from 'react-native'
import React, {useCallback, useState} from 'react'
import { takeImage } from '../Helpers/Helper'
import { useFocusEffect } from '@react-navigation/native'
const Photo = ({navigation}) => {
    useFocusEffect(
      useCallback(async () => {
        const imagePath = await takeImage()
        if(!imagePath.didCancel) {
          navigation.navigate("Contacts")
        } else {
          navigation.navigate("Home")
        }

        return () => imagePath()
      }, [navigation])
    )
  
  return (
    <></>
  )
}

export default Photo

const styles = StyleSheet.create({})