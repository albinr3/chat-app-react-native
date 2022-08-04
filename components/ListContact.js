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

export default function Listcontact({contact, room, type, imageToSend}) {
  let photo;
  // if (contact.userDoc?.photoURL) {
  //   photo = {uri: contact.userDoc.photoURL};
  // } else {
    photo = require('../assets/users/empty-profile.jpg');
  //}
  console.log(imageToSend, "desde liscontact")
  const navigation = useNavigation();
  return (
    <>
    {type==="chat" ? (
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
        </UserInfo>
      </Card>
    </Container>):
    (<Container>
      <Card
        onPress={() =>
          navigation.navigate('Chat', {
            room: room,
            contact: contact,
            photo,
            imageToSend: imageToSend,
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
            <TextSectionContact>
            <UserInfoText>
              <UserNameContact>{contact.contactName}</UserNameContact>
            </UserInfoText>
          </TextSectionContact>
        </UserInfo>
      </Card>
    </Container>
    
    )}
    </>
    )
  }

const styles = StyleSheet.create({});
