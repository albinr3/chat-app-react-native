import { useState, useEffect } from "react";
import Contacts from 'react-native-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid } from 'react-native';


const useContacts = () => {
    const [contacts, setContacts] = useState([]);
    
    useEffect(() => {
        //this function get the email and the name of every contact
        const getContactInfo = (contacts) => {
            const contactsEmail= contacts.filter(contacto => contacto.emailAddresses.length !== 0).map(contacto => ({
                contactName: contacto.displayName,
                id: contacto.rawContactId,
                email: contacto.emailAddresses[0].email
            }
             ))
             return contactsEmail
         }
         //here get the permission and read all the contacts
         const requestContactsPermission = async () => {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.',
                'buttonPositive': 'Please accept bare mortal'
                }
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                (Contacts.getAll().then(contacts => {
                    // contacts returned
                    if(getContactInfo(contacts).length > 0){

                        //first we save them to the storage to use them again
                      //  const saveContacts = async () => {
                      //       try {
                      //           await AsyncStorage.setItem(
                      //             "contacts", JSON.stringify(getContactInfo(contacts))
                      //           );
                      //           console.log("contactos guardados")
                      //         } catch (error) {
                      //           console.log(error)
                      //         }
                      //   }
                        // saveContacts()
                       setContacts(getContactInfo(contacts))
                    }
                    }).catch(e => {
                       console.log(e)
                    }))
              } else {
                console.log("Camera permission denied");
              }
            } catch (err) {
              console.warn(err);
            }
          };

         requestContactsPermission()
    }, [])
    
    return contacts
}


export default useContacts