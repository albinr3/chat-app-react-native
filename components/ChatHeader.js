import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { UserImgContactChat, UserImgWrapper, UserInfo,TextSectionContact, UserInfoText, UserNameContactChat } from '../styles/MessageStyles'

const ChatHeader = () => {
    const route = useRoute()
    
  return (
    <UserInfo>
        <UserImgWrapper>
            <UserImgContactChat source={route.params.photo}/>
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