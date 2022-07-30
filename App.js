
import React from 'react';
import {StyleSheet, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthUserProvider } from './context/AuthUserProvider';
import useUserAuth from './hooks/useUserAuth';


import Chat from "./screens/Chat"
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from "./screens/Home"
import Profile from "./screens/Profile"
import Photo from "./screens/Photo"
import Contacts from "./screens/Contacts"

import ChatHeader from './components/ChatHeader';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        return{
          tabBarLabel: () => {
            if(route.name === "Photo") {
              return <MaterialCommunityIcons name="camera" size={25} color="white"/>
            } else {
              return (
                <Text style={{ color: "white", fontSize: 18}}>
                  {route.name.toLocaleUpperCase()}
                </Text>
              );
            }
          },
          tabBarShowIcon: true,
          tabBarLabelStyle: {
            color: "white",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "white",
          },
          tabBarStyle: {
            backgroundColor: "#00AEFF",
          },
          
        }
      }}
      initialRouteName="Home"
    >
      <Tab.Screen name='Photo' component={Photo}/>
      <Tab.Screen name='Home' component={Home}/>
    </Tab.Navigator>
  )
}
const ChatStack = () => {
  const {user} = useUserAuth();
  return(
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00AEFF",
          shadowOpacity: 0,
          elevation: 0
        },
        headerTintColor: "white"

    }}
    >
      {!user.displayName && (
        <Stack.Screen name='Profile' component={Profile} />
      )}

      <Stack.Screen name='HomeTab' component={HomeTab} />
      
      <Stack.Screen name='Chat' component={Chat}
        options={{headerTitle: (props) => <ChatHeader {...props}/>}}
      />

      <Stack.Screen name='Contacts' options= {{ title: "Select Contact" }} component={Contacts}/>
    </Stack.Navigator>
  )
}

const AuthStack = () => {
  return(
    <Stack.Navigator defaultScreenOptions={Login} screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='SignUp' component={SignUp}/>
    </Stack.Navigator>
  )
}

const RootNavigator = () => {
  
  const {user,} = useUserAuth();
  return(
    // if there is a logged user then show chat stack
    <NavigationContainer>
      {user ? <ChatStack/> : <AuthStack/>} 
    </NavigationContainer>
  )
}

const App= () => {
  
  return (
    <AuthUserProvider>
      {useUserAuth.loading ? <Text>Loading...</Text> : <RootNavigator/>}
    </AuthUserProvider>
    
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
