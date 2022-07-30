import {storage} from '../config/firebase';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {Text, Image} from 'react-native';
import React, {useState} from 'react';

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
 

  const imageRef = ref(storage, `${fireImagePath}/${userId}/${imageName}.jpg`);

  const snapshot = await uploadBytesResumable(imageRef, blob, {
    contentType: 'image/jpeg',
  });
  blob.close();

  const url = await getDownloadURL(snapshot.ref);
  
  return url
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
