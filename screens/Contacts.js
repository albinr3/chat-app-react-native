import { View, Pressable, FlatList, Image, StyleSheet } from "react-native";
import React, {useState, useEffect} from 'react'
import useContacts from '../hooks/useContacts'
import useUserAuth from "../hooks/useUserAuth";
import ListContact from "../components/ListContact"
import { database } from "../config/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Contacts = ({route}) => {
  const contacts = useContacts()
  const imageToSend = route.params && route.params.imageToSend;


  return (

    <FlatList 
    data={contacts}
    keyExtractor={item=>item.id}
    style={{borderBottomWidth: 0}}
    renderItem={({item}) => (
        <ContactPreview contact={item} imageToSend={imageToSend}/>
    )}
    />  

  )
}

function ContactPreview({ contact, imageToSend }) {
    const { unfilteredRooms } = useUserAuth();
    
    const [user, setUser] = useState(contact);
   
  
    useEffect(() => {
      const q = query(
        collection(database, "users"),
        where("email", "==", contact.email)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.docs.length) {
          const userDoc = snapshot.docs[0].data();
          setUser((prevUser) => ({ ...prevUser, userDoc }));
        }
      });
      return () => unsubscribe();
    }, []);

    
    return (
        <ListContact 
        contact={user} 
        room={unfilteredRooms.find(room => room.participantsArray.includes(contact.email))}
        imageToSend={imageToSend}/> 
    );
  }

export default Contacts

const styles = StyleSheet.create({})