import { where,collection, query, onSnapshot } from "firebase/firestore";
import {database} from '../config/firebase';
import React, { useCallback, useLayoutEffect, useState } from "react";
import { View, Pressable, FlatList, Image, StyleSheet } from "react-native";
import colors from '../colors';
import useUserAuth from "../hooks/useUserAuth";
import ContactsIcon from "../components/ContactsIcon";

import {
    Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    MessageText,
    TextSection,
} from '../styles/MessageStyles';


const Home = ({navigation}) => {
    const {user, rooms, setRooms} = useUserAuth()

    useLayoutEffect(() => {
        //here we get the chat colletion or we create it ffrom firebase
        const collectionRef = collection(database, 'rooms'); 
    
        //here we do a query selecting all the messages from chats from the user email
        const newQuery = query(collectionRef, where("participantsArray", "array-contains", user.email));
    
        //here we have an observer called onSnapshot, this keep listening from firebase,
        //waiting from any changes to executes the callback inside.
        const querySnapshot = onSnapshot(newQuery, snapshot => {
          console.log('Chats updated');
          
          
          //here we iterate over the list of rooms obtained from the query.
          //and we filter to not show the empty rooms, and then we create
          // a new list and inside it we create a new object with the info of each room.
          const parsedRooms = snapshot.docs.filter(doc => doc.data().lastMessage).map(doc => ({
          ...doc.data(),
          id: doc.id,
          userExternal: doc.data().participants.find(p => p.email !== user.email)
          }));
          //now we will set the rooms in the state from the database
          setRooms(parsedRooms)
        });
    
        return querySnapshot;
      }, []);


    const Messages = [
        {
          id: '1',
          userName: 'Jenny Doe',//room.contactName
          userImg: "https://firebasestorage.googleapis.com/v0/b/chat-app-be1cd.appspot.com/o/images%2FO4burOdxXBQ9FH74MAyJHC1w4kd2%2FprofilePicture.jpg?alt=media&token=bcf9a0b1-5084-4de5-b7af-004a4f0b17c1",
          messageTime: '4 mins ago', //room.lastMessage
          messageText:  //room.lastMessage.createdAt
            'Hey there, this is my test for a post of my social app in React Native.',
        },
        {
          id: '2',
          userName: 'John Doe',
          userImg: require('../assets/users/user-1.jpg'),
          messageTime: '2 hours ago',
          messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
        },
        {
          id: '3',
          userName: 'Ken William',
          userImg: require('../assets/users/user-4.jpg'),
          messageTime: '1 hours ago',
          messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
        },
        {
          id: '4',
          userName: 'Selina Paul',
          userImg: require('../assets/users/user-6.jpg'),
          messageTime: '1 day ago',
          messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
        },
        {
          id: '5',
          userName: 'Christy Alex',
          userImg: require('../assets/users/user-7.jpg'),
          messageTime: '2 days ago',
          messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
        },
    
        {
          id: '6',
          userName: 'Ken William',
          userImg: require('../assets/users/user-4.jpg'),
          messageTime: '1 hours ago',
          messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
        },
        {
          id: '7',
          userName: 'Selina Paul',
          userImg: require('../assets/users/user-6.jpg'),
          messageTime: '1 day ago',
          messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
        },
        {
          id: '8',
          userName: 'Christy Alex',
          userImg: require('../assets/users/user-7.jpg'),
          messageTime: '2 days ago',
          messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
        },
      ];


    return (
        <Container>
            <FlatList 
            data={Messages}
            keyExtractor={item=>item.id}
            style={{borderBottomWidth: 0}}
            renderItem={({item}) => (
                <Card onPress={() => navigation.navigate('Chat', {userName: item.contactName})}>
                    <UserInfo>
                        <UserImgWrapper>
                            <UserImg source={item.userImg} />
                        </UserImgWrapper>
                        <TextSection>
                            <UserInfoText>
                                <UserName>{item.userName}</UserName>
                                <PostTime>{item.messageTime}</PostTime>
                            </UserInfoText>
                            <MessageText>{item.messageText}</MessageText>
                        </TextSection>
                    </UserInfo>
                </Card>
            )}
            />
            <View style={s.floatingButton}>
                <ContactsIcon/>
            </View>
      </Container>
    );
    };

    export default Home;

    const s = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
      },
      chatButton: {
        backgroundColor: colors.primary,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 50,
      },
      floatingButton: {
        flex: 1,
        padding: 5,
        paddingRight: 10,
        position: 'absolute',
        right: 5,
        bottom: 20,
      },
    });