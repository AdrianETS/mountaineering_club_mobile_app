import React from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from 'react-native';
import StorageProvider from "../services/StorageProvider";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

function LoginScreen({ navigation }) {

    let processLogin = () => {
      doLogin(user,pass)
      .then(()=> navigation.navigate('Dashboard'))
      .catch(err => onChangeErrorMessage("Your error: "+ err));
    }
  
    const [user, onChangeUser] = React.useState(""); 
    const [pass, onChangePass] = React.useState("");
    const [errorMessage, onChangeErrorMessage] = React.useState("");
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login{"\n"}</Text>
        <TextInput
        placeholder = {"user"}
        style = {{height: 40, paddingLeft: "2%", width: "30%", borderColor: "gray", borderWidth: 1}}
        onChangeText = {text => onChangeUser(text)}
        value = {user}
        />
  
       <Text>{errorMessage}{"\n"}</Text>
  
        <TextInput
        placeholder = {"password"}
        style = {{height: 40, paddingLeft: "2%", width: "30%", borderColor: "gray", borderWidth: 1}}
        onChangeText = {text => onChangePass(text)}
        value = {pass}
        />
        <Text>{"\n"}{"\n"}</Text>
        <Button title="Login" onPress={()=> processLogin()}/>
      </View>
    );
  }
  
  function doLogin(email, password){
    return new Promise((resolve, reject)=> {
      fetch('http://192.168.1.134:3001/login', {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => {
            response.json().then(json => {
              console.log(JSON.stringify(json));
                if (response.status == 200) {
                    StorageProvider.storeData("token", json.token)
                    .then(()=>StorageProvider.storeData("userName", json.userName))
                    .then(()=>resolve());
                } else {
                    reject();
                }
            })
        })
        .catch(err => reject(err));
    });
  }

  export default LoginScreen;