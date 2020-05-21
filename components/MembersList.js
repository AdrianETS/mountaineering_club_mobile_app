import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, SafeAreaView, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import StorageProvider from "../services/StorageProvider";
import Constants from "../utils/Constants";
import ApiService from "../services/ApiService";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

function getMemberList() {
    return new Promise((resolve, reject) => {
        StorageProvider.getData("token")
            .then(token => fetch(Constants.url + 'members/list?token=' + token))
            .then(res => res.json())
            .then((json) => resolve(json));
    })
}

function MembersList() {

    const [membersList, onChangemembersList] = React.useState([]);

    React.useEffect(() => {
        getMemberList()
            .then(value => {
                let arrayOfMembers = [];
                arrayOfMembers.push(value);
                onChangemembersList(arrayOfMembers);
                console.log(membersList);
            });
    });

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>List of members:
                {membersList.map(
                member => member.name
            )}
            </Text>
        </View>
    );

}

export default MembersList;







