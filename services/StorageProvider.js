import React from 'react';
import * as SecureStore from 'expo-secure-store';

storeData = async (key, value) => {
    // async devuelve una promesa implícitamente y nos permite usar await 
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      // saving error
    }
  }
   
  getData = async key => {
    try {
      const loadedData = await SecureStore.getItemAsync(key);
   
      return loadedData;
    } catch (e) {
      // error reading value
    }
  }

  export default {storeData, getData};

