import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import StorageProvider from "../services/StorageProvider";

function getMemberInfo(id) {
    return new Promise((resolve, reject) => {
        StorageProvider.getData("token")
        .then(token => fetch('http://192.168.1.134:3001/members/' + id + '?token=' + token))
            .then(res => res.json())
            .then(json => resolve(json))
    })
}

function editMember(member) {
    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:3001/members?token=' + this.getTokenFromLocalStorage(), {
            method: 'PUT',
            body: JSON.stringify({
                _id: member._id,
                name: member.name,
                surname: member.surname,
                birthDate: member.birthDate,
                clubId: member.clubId,
                licenseNumber: member.licenseNumber,
                type: member.type,
                password: member.password,
                responsibilityAgreementSigned: (member.responsibilityAgreementSigned === "true" && true) || false
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(json => resolve(json));
    })
}



function EditMemberInfo({route, navigation}){
    const { _id } = route.params;
    const [userInfo, onChangeUserInfo] = React.useState({});
    const handleMemberName = (text) =>{
        userInfo && (userInfo.name = text);
        onChangeUserInfo(userInfo);
    }

    React.useEffect(() => {
        getMemberInfo(_id)
        .then(userInfo => onChangeUserInfo(userInfo))
      }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Name{"\n"}</Text>
        <TextInput
        placeholder = {"name"}
        style = {{height: 40, paddingLeft: "2%", width: "30%", borderColor: "gray", borderWidth: 1}}
        onChangeText = {handleMemberName}
        value = {userInfo.name}
        />
        <Text>{"\n"}</Text>
        <Text>Surname{"\n"}</Text>
        <TextInput
        placeholder = {"Surname"}
        style = {{height: 40, paddingLeft: "2%", width: "30%", borderColor: "gray", borderWidth: 1}}
        value = {userInfo.surname}
        />
        <Text>{"\n"}</Text>
        <Text>Email{"\n"}</Text>
        <TextInput
        placeholder = {"Email"}
        style = {{height: 40, paddingLeft: "2%", width: "30%", borderColor: "gray", borderWidth: 1}}
        value = {userInfo.email}
        />
        <Text>{"\n"}</Text>
        </View>
      );
}

export default EditMemberInfo;