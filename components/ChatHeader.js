import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { UserImgContactChat, UserImgWrapper, UserInfo,TextSectionContact, UserInfoText, UserNameContactChat } from '../styles/MessageStyles'

const ChatHeader = () => {
    const route = useRoute()
    let photo;
    if(!route.params.photo) {
      photo = require("../assets/users/empty-profile.jpg")
    } else {
      photo = route.params.photo
    }
    
  return (
    <UserInfo>
        <UserImgWrapper>
            <UserImgContactChat source={photo}/>
        </UserImgWrapper>

        <TextSectionContact>
            <UserInfoText>
              <UserNameContactChat>{route.params.contact.contactName}</UserNameContactChat>
            </UserInfoText>
        </TextSectionContact>

    </UserInfo>
  )
}

export default ChatHeader

const styles = StyleSheet.create({})