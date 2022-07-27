import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import React, {useState} from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateProfile } from "firebase/auth";
import useUserAuth from "../hooks/useUserAuth.js";
import { pickImage, uploadImage } from "../Helpers/Helper.js";


const Profile = ({navigation}) => {
  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const {user} = useUserAuth()

  const handlePress = async () => {
    const imagePath = await pickImage()
    const url = await uploadImage(imagePath, user.uid)
    setSelectedImage(url)
    console.log("Uploaded image!!")
  }

  return (
    <>
    <View>
      
      <Pressable style={{padding: 20, backgroundColor: "red", justifyContent: "center"}} onPress={()=>handlePress()}>
        <Text>Profile</Text>
      </Pressable>

    </View>

    
    </>
  )
}

export default Profile

