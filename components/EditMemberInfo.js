import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import StorageProvider from "../services/StorageProvider";
import Constants from "../utils/Constants";

function getMemberInfo(id) {
    return new Promise((resolve, reject) => {
        StorageProvider.getData("token")
            .then(token => fetch(Constants.url + id + '?token=' + token))
            .then(res => res.json())
            .then(json => resolve(json))
    })
}

function editMember(member, navigation) {
    //return new Promise((resolve, reject) => {
        StorageProvider.getData("token")
            .then(token => fetch(Constants.url + 'members?token=' + token, {
                method: 'PUT',
                body: JSON.stringify({
                    _id: member._id,
                    name: member.name,
                    surname: member.surname,
                    email: member.email,
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
            }))
            .then(res => res.json())
            .then(()=>navigation.navigate('Dashboard'))
    
}

handleMemberAttribute = (text, attribute, onChangeUserInfo) =>{
    //userInfo && (userInfo[attribute] = text);
    /*buscamos el attribute por la key. userInfo.attribute sería incorrecto porque crearía uno nuevo
    Esta la forma dinámica de JS para acceder al atributo de un objeto
    */
    onChangeUserInfo(prevState => ({ ...prevState, [attribute]: text }));
}


function EditMemberInfo({ route, navigation }) {
    const { _id } = route.params;
    const [userInfo, onChangeUserInfo] = React.useState({});

    const handleMemberName = text => {
        userInfo && (userInfo.name = text);
        onChangeUserInfo(prevState => ({ ...prevState, name: text }));
    }

    const handleMemberSurname = text => {
        userInfo && (userInfo.surname = text);
        onChangeUserInfo(prevState => ({ ...prevState, surname: text }));
    }

    const handleMemberEmail = text => {
        userInfo && (userInfo.email = text);
        onChangeUserInfo(prevState => ({ ...prevState, email: text }));
    }

    const handleMemberBirthDate = text => {
        userInfo && (userInfo.birthDate = text);
        onChangeUserInfo(prevState => ({ ...prevState, birthDate: text }));
    }

    const handleMemberClubId = text => {
        userInfo && (userInfo.clubId = text);
        onChangeUserInfo(prevState => ({ ...prevState, clubId: text }));
    }

    const handleMemberLicenseNumber = text => {
        userInfo && (userInfo.licenseNumber = text);
        onChangeUserInfo(prevState => ({ ...prevState, licenseNumber: text }));
    }

    const handleMemberType = text => {
        userInfo && (userInfo.type = text);
        onChangeUserInfo(prevState => ({ ...prevState, type: text }));
    }

    const handleMemberResponsibility = text => {
        userInfo && (userInfo.responsibilityAgreementSigned = text);
        onChangeUserInfo(prevState => ({ ...prevState, responsibilityAgreementSigned: text }));
    }

    const handleMemberPassword = text => {
        userInfo && (userInfo.password = text);
        onChangeUserInfo(prevState => ({ ...prevState, password: text }));
    }

    React.useEffect(() => {
        getMemberInfo(_id)
            .then(userInfo => onChangeUserInfo(userInfo))
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView
                scrollEnabled={true}
            >
                <Text>Name{"\n"}</Text>
                <TextInput
                    placeholder={"name"}
                    style={{ height: 40, paddingLeft: "2%", width: "70%", borderColor: "gray", borderWidth: 1 }}
                    onChangeText={text => handleMemberAttribute(text, "name", onChangeUserInfo)}
                    value={userInfo.name}
                />
                <Text>Surname{"\n"}</Text>
                <TextInput
                    placeholder={"Surname"}
                    style={{ height: 40, paddingLeft: "2%", width: "70%", borderColor: "gray", borderWidth: 1 }}
                    onChangeText={handleMemberSurname}
                    value={userInfo.surname}
                />
                <Text>Email{"\n"}</Text>
                <TextInput
                    placeholder={"Email"}
                    style={{ height: 40, paddingLeft: "2%", width: "70%", borderColor: "gray", borderWidth: 1 }}
                    onChangeText={handleMemberEmail}
                    value={userInfo.email}
                />
                <Text>Birth Date{"\n"}</Text>
                <TextInput
                    placeholder={"Email"}
                    style={{ height: 40, paddingLeft: "2%", width: "70%", borderColor: "gray", borderWidth: 1 }}
                    onChangeText={handleMemberBirthDate}
                    value={userInfo.birthDate}
                />
                <Text>Club Id{"\n"}</Text>
                <TextInput
                    placeholder={"Club Id"}
                    style={{ height: 40, paddingLeft: "2%", width: "70%", borderColor: "gray", borderWidth: 1 }}
                    onChangeText={handleMemberClubId}
                    value={userInfo.clubId}
                />
                <Text>License Number{"\n"}</Text>
                <TextInput
                    placeholder={"Club Id"}
                    style={{ height: 40, paddingLeft: "2%", width: "70%", borderColor: "gray", borderWidth: 1 }}
                    onChangeText={handleMemberLicenseNumber}
                    value={userInfo.licenseNumber}
                />
                <Text>Type{"\n"}</Text>
                <TextInput
                    placeholder={"Club Id"}
                    style={{ height: 40, paddingLeft: "2%", width: "70%", borderColor: "gray", borderWidth: 1 }}
                    onChangeText={handleMemberType}
                    value={userInfo.type}
                />
                <Text>Resposibility agreement signed?{"\n"}</Text>
                <TextInput
                    placeholder={"Responsibility agreement? True/False"}
                    style={{ height: 40, paddingLeft: "2%", width: "70%", borderColor: "gray", borderWidth: 1 }}
                    onChangeText={handleMemberResponsibility}
                    value={String(userInfo.responsibilityAgreementSigned)}
                />
                <Text>Password{"\n"}</Text>
                <TextInput
                    placeholder={"Pass"}
                    style={{ height: 40, paddingLeft: "2%", width: "70%", borderColor: "gray", borderWidth: 1 }}
                    onChangeText={handleMemberPassword}
                    value={""}
                />
                <Text>{"\n"}</Text>
                <Button title="Edit info" Style={{ paddingBottom: 20 }} onPress={() => editMember(userInfo, navigation)} />
            </ScrollView>
        </View>
    );
}

export default EditMemberInfo;