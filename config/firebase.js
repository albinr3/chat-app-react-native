import {initializeApp, getApps} from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {initializeFirestore} from 'firebase/firestore';
import {getReactNativePersistence} from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {
  REACT_APP_APIKEY,
  REACT_APP_AUTHDOMAIN,
  REACT_APP_PROJECTID,
  REACT_APP_STORAGEBUCKET,
  REACT_APP_MESSAGINGSENDERID,
  REACT_APP_APPID,
} from '@env';
// Firebase config
const firebaseConfig = {
  apiKey: REACT_APP_APIKEY,
  authDomain: REACT_APP_AUTHDOMAIN,
  projectId: REACT_APP_PROJECTID,
  storageBucket: REACT_APP_STORAGEBUCKET,
  messagingSenderId: REACT_APP_MESSAGINGSENDERID,
  appId: REACT_APP_APPID,
};
// initialize firebase

let firebaseApp;
let auth;

if (getApps().length < 1) {
  firebaseApp = initializeApp(firebaseConfig);
  auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  auth = getAuth();
}

export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('Success Login!');
  } catch (error) {
    Alert.alert('Login Error', error.message);
    console.log(error);
  }
};

export const signUp = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("Success created account!")
} catch (error) {
    Alert.alert("Sign Up Error", error.message)
    console.log(error)
}
}

export const storage = getStorage(firebaseApp);
export default auth;
export const database = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
});
