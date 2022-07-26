import {storage} from '../config/firebase';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {Text, Image} from 'react-native';
import React, {useState} from 'react';
import { nanoid }from 'nanoid'



//function to select an image from the device
export async function pickImage() {
  const options = {
    storageOptions: {
      path: 'images',
      mediaType: 'photo',
    },
    includeBase64: false,
  };
  const result = await launchImageLibrary(options);
  const imagePath = result
  return imagePath
}

export const takeImage = async () => {
  const options = {
    saveToPhotos: true,
    mediaType: 'photo',
    includeBase64: false,
  };
  const result = await launchCamera(options)
  return result
}

//function to upload an image from the device to firebase
export async function uploadImage(imagePath, userId, fireImagePath, imageName) {
  
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', imagePath, true);
    xhr.send(null);
  });
 
  const fileName = imageName || nanoid();
  
  const imageRef = ref(storage, `${fireImagePath}/${userId}/${fileName}.jpg`);

  const snapshot = await uploadBytesResumable(imageRef, blob, {
    contentType: 'image/jpeg',
  });
  blob.close();

  const url = await getDownloadURL(snapshot.ref);
  
  return {url, fileName}
}
const Helper = () => {
  
  return (
    <>
      <Text>hola {imageNew}</Text>
      <Image source={{uri: imageNew}} />
    </>
  );
};
export default Helper;
