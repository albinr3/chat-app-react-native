import React, {
    useState,
    useLayoutEffect,
    useCallback
  } from 'react';

  import { Pressable, View} from 'react-native';
  import {Send, GiftedChat } from 'react-native-gifted-chat';
  import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot,
  } from 'firebase/firestore';
  import { signOut } from 'firebase/auth';
  import auth, {database} from '../config/firebase';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import colors from '../colors';
  import useUserAuth from "../hooks/useUserAuth.js"


  export default function Chat({navigation}) {

    const [messages, setMessages] = useState([]); //messages array
    const {user} = useUserAuth(); //authenticated user from the context provider
   
  //sign out function from firebase
  const onSignOut = async () => {
    try {
      await signOut(auth);
      console.log("signout successful")
    } catch (error) {
      console.log('Error logging out: ', error)
    }
  };

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

  useLayoutEffect(() => {
    //here we get the chat colletion or we create it ffrom firebase
    const collectionRef = collection(database, 'chats'); 

    //here we do a query selecting all the messages from chats, order by date.
    const newQuery = query(collectionRef, orderBy('createdAt', 'desc'));

    //here we have an observer called onSnapshor, this keep listening from firebase,
    //waiting from any changes to executes the callback inside.
    const querySnapshot = onSnapshot(newQuery, snapshot => {
      console.log('Chats updated');
      //now we will set the messages in the state from the database
      setMessages(
        //here we iterate over the list of messages obtained from the query.
        //and we create a new list and inside it we create a new object with the info of each message.
        snapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
        }))
      );
    });

    return querySnapshot;
  }, []);

  //on send new message function, it need a new message as arg.
  // it update the state getting the previous array of messages
  // and we pass the previous messages and the new as args 
  //to the giftedchat append method.
  const onSend = useCallback(async (newMessage = []) => {
    setMessages(previousMessages =>{
      GiftedChat.append(previousMessages, newMessage)
    });
    
    //now that we updated the state with the new message,
    //we will send the new message to the firestore database

    //we destruct the info from the new message array
    const { _id, createdAt, text, user } = newMessage[0]; 

    //the we add it to the firestore
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
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={messages => onSend(messages)} //here we pass the new message to the function
      messagesContainerStyle={{
        backgroundColor: '#fff'
      }}
      textInputStyle={{
        backgroundColor: '#fff',
        borderRadius: 20,
      }}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      user={{
        _id: user?.email,
        avatar: 'https://i.pravatar.cc/300'
      }}
    />
  );
}

