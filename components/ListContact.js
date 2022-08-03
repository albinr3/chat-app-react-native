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
  UserName,
  TextSection,
} from '../styles/MessageStyles';
import {useNavigation} from '@react-navigation/native';

export default function Listcontact({contact, room, type}) {
  let photo;
  // if (contact.userDoc?.photoURL) {
  //   photo = {uri: contact.userDoc.photoURL};
  // } else {
    photo = require('../assets/users/empty-profile.jpg');
  //}
  
  const navigation = useNavigation();
  return (
    <Container>
      <Card
        onPress={() =>
          navigation.navigate('Chat', {
            room: room,
            contact: contact,
            photo,
          })
        }>
        <UserInfo>
          <UserImgWrapper>
            <UserImg
              source={
                photo ||
                require('../assets/users/empty-profile.jpg')
              }
            />
          </UserImgWrapper>
          {type==="chat" ? (
          <TextSection>
            <UserInfoText>
              <UserName>{contact.contactName}</UserName>
              <PostTime>
                {room.lastMessage.createdAt
                  .toDate()
                  .toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
              </PostTime>
              
            </UserInfoText>
            
            <MessageText>{room.lastMessage.text}</MessageText>
          
          </TextSection>
          ) : (
            <TextSectionContact>
            <UserInfoText>
              <UserNameContact>{contact.contactName}</UserNameContact>
            </UserInfoText>
          
          </TextSectionContact>
          )}
          
        </UserInfo>
      </Card>
    </Container>
  );
}

const styles = StyleSheet.create({});
