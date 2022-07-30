import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserNameContact,
  PostTime,
  MessageText,
  TextSectionContact,
} from '../styles/MessageStyles';
import { useNavigation } from '@react-navigation/native';

export default function Listcontact({contact, room}) {
  let photo;
  if(contact.userDoc?.photoURL) {
    photo= {uri: contact.userDoc.photoURL}
  } else {
    photo = require("../assets/users/empty-profile.jpg")
  }
 
  navigation = useNavigation()
  return (
    <Container>
      <Card onPress={() => navigation.navigate('Chat', {contact, photo, room})}>
        <UserInfo>
          <UserImgWrapper>
            <UserImg source={ photo} />
          </UserImgWrapper>
          <TextSectionContact>
            <UserInfoText>
              <UserNameContact>{contact.contactName}</UserNameContact>
            </UserInfoText>
          </TextSectionContact>
        </UserInfo>
      </Card>
    </Container>
  );
}

const styles = StyleSheet.create({});
