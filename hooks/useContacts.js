import { useState, useEffect } from "react";
import Contacts from 'react-native-contacts';
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
         PermissionsAndroid.request(
             PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
             {
               'title': 'Contacts',
               'message': 'This app would like to view your contacts.',
               'buttonPositive': 'Please accept bare mortal'
             }
         ).then
         (Contacts.getAll().then(contacts => {
         // contacts returned
         if(getContactInfo(contacts).length > 0){
            setContacts(getContactInfo(contacts))
         }
         }))
    }, [])
    
    return contacts
}


export default useContacts