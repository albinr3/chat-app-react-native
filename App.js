
import React from 'react';
import {StyleSheet,} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthUserProvider } from './context/AuthUserProvider';
import useUserAuth from './hooks/useUserAuth';


import Chat from "./screens/Chat"
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from "./screens/Home"
import Profile from "./screens/Profile"

const Stack = createStackNavigator();



const ChatStack = () => {
  return(
    <Stack.Navigator defaultScreenOptions={Profile}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00AEFF",
          shadowOpacity: 0,
          elevation: 0
        },
        headerTintColor: "white"

    }}
    >
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Chat' component={Chat}
        options={({route}) => ({
          title: route.params.userName
        })}
      />
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
