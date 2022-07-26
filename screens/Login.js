import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput, Image,  Pressable, SafeAreaView, Alert } from 'react-native'
const backImage = require("../assets/backImage.png")
import { signIn } from "../config/firebase";

const Login = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = () => {
        //validation
        if([email, password].includes("")){
            Alert.alert("ERROR", "Email or Passwords are empty");
            return;
        }
        //function from firebase config file
        signIn(email, password); 
    }
    
        
  return (
    
    <View style={s.container}>
        <Image source={backImage} style={s.backImage} />
        <View style={s.whiteSheet}></View>
        <SafeAreaView style={s.form}>
            <Text style={s.title}>Login</Text>
            <TextInput
                style={s.input}
                placeholder="Enter email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={s.input}
                placeholder="Enter password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                value={password}
                onChangeText={setPassword}
            />

            <Pressable disabled={!password || !email} style={s.button} onPress={() => handleLogin()}>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Log In</Text>
            </Pressable>

            <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
                
                <Pressable onPress={() => navigation.navigate("SignUp")}>
                    <Text style={{color: '#f57c00', fontWeight: '600', fontSize: 14}}> Sign Up</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    </View>
    
  )
}

export default Login

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
      },
      title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "orange",
        alignSelf: "center",
        paddingBottom: 24,
      },
      input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
      },
      backImage: {
        width: "100%",
        height: 240,
        position: "absolute",
        top: 0,
        resizeMode: "cover"
      },
      whiteSheet: {
        width: '100%',
        height: '75%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
      },
      form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
      },
      button: {
        backgroundColor: '#f57c00',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
})