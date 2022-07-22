
import React from 'react';
import {SafeAreaView,StyleSheet,} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthUserProvider } from './context/AuthUserProvider';
import useUserAuth from './hooks/useUserAuth';


import Chat from "./screens/Chat"
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from "./screens/Home"

const Stack = createStackNavigator();



const ChatStack = () => {
  return(
    <Stack.Navigator defaultScreenOptions={Home}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Chat' component={Chat} />
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
  const {user, setUser} = useUserAuth();

  return(
    // Si hay un usurario loguueado entonces muestra el stack de chat
    <NavigationContainer>
      {user ? <ChatStack/> : <AuthStack/>} 
    </NavigationContainer>
  )
}

const App= () => {
  
  return (
    <AuthUserProvider>
      <RootNavigator/>
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
