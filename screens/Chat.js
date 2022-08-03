import React, {
    useState,
    useLayoutEffect,
    useCallback,
    useEffect
  } from 'react';

  import { ImageBackground, Pressable, View} from 'react-native';
  import {Send, GiftedChat } from 'react-native-gifted-chat';
  
  import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot,
    doc,
    setDoc,
    updateDoc
  } from 'firebase/firestore';
  import { signOut } from 'firebase/auth';
  import auth, {database} from '../config/firebase';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import colors from '../colors';
  import useUserAuth from "../hooks/useUserAuth.js"
//import { useFocusEffect } from '@react-navigation/native';
  import "react-native-get-random-values";
  import { nanoid } from "nanoid";

  const randomId = nanoid()
  export default function Chat({navigation, route}) {

    const [messages, setMessages] = useState([]); //messages array
    const [roomHash, setRoomHash] = useState(""); 
 
    const {user} = useUserAuth(); //authenticated user from the context provider
    const contact = route.params.contact;
    const room = route.params.room;
    console.log(randomId)
    const roomId = room ? room.id : randomId`
    console.log(randomId)
    const roomRef = doc(database, "rooms", roomId)
    const roomMessagesRef =collection(database, "rooms", roomId, "messages")
    let photo;
    if(!contact.photoURL) {
      photo = require("../assets/users/empty-profile.jpg")
    } else {
      photo = contact.photoURL
    }
    const userSender = {
      name: user.displayName,
      _id: user.uid,
      avatar: user.photoURL
    }
    

    
    useEffect(()=> {
      console.log(room, "room ")
      console.log(roomId, "room id ahora")
      console.log(randomId, "random id")
    }, [roomId])
    const userExternal = contact
    
   
   
  //sign out function from firebase
  const onSignOut = async () => {
    try {
      await signOut(auth);
      console.log("signout successful")
    } catch (error) {
      console.log('Error logging out: ', error)
    }
  };

  useEffect( () => {
    (async () => {
      if(!room){
      const currUserData = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      }

      const userExternalData = {
        contactName: userExternal.contactName,
        email: userExternal.email,
        photoURL: photo
      }

      const roomData = {
        participants : [currUserData, userExternalData],
        participantsArray : [currUserData.email, userExternalData.email]
      }
      
      try {
        await setDoc(roomRef, roomData)
        console.log("room creada")
        
        const emailHash = `${currUserData.email}:${userExternalData.email}`
        setRoomHash(emailHash)
      } catch (error) {
        console.log(error)
      }

      
    }})()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={{marginRight: 10}}
          onPress={()=>onSignOut()}>

            <Icon name="sign-out" size={24} color={colors.gray} style={{marginRight: 10}}/>

        </Pressable>
      )
    });
  }, [navigation]);

  useEffect(() => {

    //here we have an observer called onSnapshot, this keep listening from firebase,
    //waiting from any changes to executes the callback inside.
   
    
    console.log(roomRef, "esto en useffect") 
    console.log(roomMessagesRef, "esto en useeffcet")
    const querySnapshot = onSnapshot(roomMessagesRef, snapshot => {
      
      const messagesFirestore = snapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
      

          return { ...message, createdAt: message.createdAt.toDate() };
        })
        
        
      appendMessages(messagesFirestore);
    });

    return ()=> querySnapshot();
  }, []);

  //on send new message function, it need a new message as arg.
  // it update the state getting the previous array of messages
  // and we pass the previous messages and the new as args 
  //to the giftedchat append method.
  const appendMessages = useCallback((messages) => {
   
    setMessages(previousMessages =>{
    
      return GiftedChat.append(previousMessages, messages)
    }
      
    );
    
  }, [messages]);

  async function onSend(messages = []) {
   
    const writes = messages.map((m) => addDoc(roomMessagesRef, m));
    const lastMessage = messages[messages.length - 1];
    writes.push(updateDoc(roomRef, { lastMessage }));
    await Promise.all(writes);
    //console.log("todo terminado")
  }


  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <Icon name='angle-double-down' size={22} color='#333' />
    );
  }

  
  return (
     <ImageBackground style={{flex: 1}} resizeMode='cover' source={require("../assets/Background-chat-image.jpg")}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={onSend} //here we pass the new message to the function
        messagesContainerStyle={{
          backgroundColor: '#fff'
        }}
        textInputStyle={{
          backgroundColor: '#fff',
          borderRadius: 20,
        }}
        alwaysShowSend
        // renderSend={renderSend}
        // scrollToBottom
        // scrollToBottomComponent={scrollToBottomComponent}
        user={userSender}
      />
   </ImageBackground>
  );
}

