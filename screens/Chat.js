import React, {
    useState,
    useLayoutEffect,
    useCallback
  } from 'react';
  import { Pressable} from 'react-native';
  import { GiftedChat } from 'react-native-gifted-chat';
  import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot,
    getDocs
  } from 'firebase/firestore';
  import { signOut } from 'firebase/auth';
  import {database, auth} from '../config/firebase';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import colors from '../colors';
  import useUserAuth from "../hooks/useUserAuth.js"


  export default function Chat({navigation}) {

    const [messages, setMessages] = useState([]);
    const {user} = useUserAuth();

  const onSignOut = () => {
      signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Pressable
              style={{
                marginRight: 10
              }}
              onPress={onSignOut}
            >
              <Icon name="sign-out" size={24} color={colors.gray} style={{marginRight: 10}}/>
            </Pressable>
          )
        });
      }, [navigation]);

    useLayoutEffect(() => {

        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        //onSnapshot 
        const querySnapshot = onSnapshot(q, snapshot => {
            console.log('querySnapshot unsusbscribe');
            setMessages(
                querySnapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user
                }))
            );
            });
    return querySnapshot;
      }, []);

    const onSend = useCallback(async (messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
        );
        // setMessages([...messages, ...messages]);
        const { _id, createdAt, text, user } = messages[0]; 
        try {
            const docRef = await addDoc(collection(database, 'chats'), {
                _id,
                createdAt,
                text,
                user
            });
            console.log("Document written with ID: ", docRef.id);
            
        } catch (error) {
            console.log(error)
        }   
       
       
      }, []);

      return (
        // <>
        //   {messages.map(message => (
        //     <Text key={message._id}>{message.text}</Text>
        //   ))}
        // </>
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={false}
          showUserAvatar={false}
          onSend={messages => onSend(messages)}
          messagesContainerStyle={{
            backgroundColor: '#fff'
          }}
          textInputStyle={{
            backgroundColor: '#fff',
            borderRadius: 20,
          }}
          user={{
            _id: user?.email,
            avatar: 'https://i.pravatar.cc/300'
          }}
        />
      );
}

