import { initializeApp, getApps} from 'firebase/app';
import {initializeAuth, getAuth} from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_APIKEY, 
    REACT_APP_AUTHDOMAIN,
    REACT_APP_PROJECTID,
    REACT_APP_STORAGEBUCKET,
    REACT_APP_MESSAGINGSENDERID,
    REACT_APP_APPID

} from "@env"
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
}  else {
    auth = getAuth();
}

export default auth;
export const database = initializeFirestore(firebaseApp, {
    experimentalForceLongPolling: true,
  });

