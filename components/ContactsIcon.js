import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import colors from '../colors';

const ContactsIcon = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("Contacts")}
      style={{
        borderRadius: 60,
        width: 60,
        height: 60,
        backgroundColor: "#00AEFF",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MaterialCommunityIcons
        name="android-messages"
        size={30}
        color="white"
        style={{ transform: [{ scaleX: -1 }] }}
      />
    </Pressable>
  )
}

export default ContactsIcon

const styles = StyleSheet.create({})