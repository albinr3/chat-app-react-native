import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { UserImgContactChat, UserImgWrapper, UserInfo,TextSectionContact, UserInfoText, UserNameContactChat } from '../styles/MessageStyles'

const ChatHeader = () => {
    const route = useRoute()
    let contact = route.params.contact
    let photo;
    
  if (contact.userDoc?.photoURL) {
    photo = {uri: contact.userDoc.photoURL};
   } else {
    photo = require('../assets/users/empty-profile.jpg');
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