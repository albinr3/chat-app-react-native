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

export default function Listcontact({contact}) {
  let photo;
  if(contact.userDoc?.photoURL) {
    photo= {uri: contact.userDoc.photoURL}
  } else {
    photo = require("../assets/users/empty-profile.jpg")
  }
  console.log(contact)
  return (
    <Container>
      <Card onPress={() => navigation.navigate('Chat', {contact, photo})}>
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
