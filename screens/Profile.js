import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  StyleSheet
} from "react-native";
import React, {useState} from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateProfile } from "firebase/auth";
import useUserAuth from "../hooks/useUserAuth.js";
import { pickImage, uploadImage } from "../Helpers/Helper.js";
import { database } from "../config/firebase.js";
import { setDoc, doc} from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";


const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);


  const {user} = useUserAuth()
  const navigation = useNavigation()

  const handlePress = async () => {
    let photoUrl;
    if(selectedImage) {
      //here we upload the image to firebase and the get the url
      const url = await uploadImage(selectedImage, user.uid, "images", "profilePicture")
      photoUrl = url
      console.log("Uploaded image!!")
    }

    //here we create an object with the info of the user
    const userData = {
      displayName,
      email: user.email,
    };
    
    if (photoUrl) {
      userData.photoURL = photoUrl;
    }

    //here we create the user on the database
    await Promise.all([
      updateProfile(user, userData), //this update your firebase profile

      //and this creates a firestore doc with your profile info
      setDoc(doc(database, "users", user.uid), { ...userData, uid: user.uid }),
    ]);
    
    console.log("User created successfully")
    navigation.navigate("HomeTab");
  }

  //this function select the image and then storage the local uri
  const handlePicture = async () => {
    const imagePath = await pickImage()
    if(!imagePath.didCancel) {
      setSelectedImage(imagePath.assets[0].uri)
    }
  }

  return (
    <>
    <View style={s.container}>
      <Text style={{ fontSize: 22, color: "blue" }}>
        Profile Info
      </Text>
      <Text style={{ fontSize: 14, color: "#3C3C3C", marginTop: 20 }}>
        Please provide your name and an optional profile photo
      </Text>
      <Pressable
        onPress={() => handlePicture()}
        style={{
          marginTop: 30,
          borderRadius: 120,
          width: 120,
          height: 120,
          backgroundColor: "#ece5dd",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!selectedImage ? (
          <MaterialCommunityIcons
            name="camera-plus"
            color="#717171"
            size={45}
          />
        ) : (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: "100%", height: "100%", borderRadius: 120 }}
          />
        )}
      </Pressable>
      <TextInput
        placeholder="Type your name"
        value={displayName}
        onChangeText={setDisplayName}
        style={{
          borderBottomColor: "blue",
          marginTop: 40,
          borderBottomWidth: 2,
          width: "100%",
        }}
      />
      <View style={{ marginTop: "auto", width: 120 }}>
        <Pressable
          style={{backgroundColor:"blue", borderRadius: 5, padding: 10}}
          onPress={handlePress}
          disabled={!displayName}
        >
          <Text style={{color: "white", textAlign: "center"}}>Next</Text>
        </Pressable>
      </View>
    </View>
    </>
  )
}

export default Profile

const s = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: 30,
    padding: 20,
  }
  
  
})

