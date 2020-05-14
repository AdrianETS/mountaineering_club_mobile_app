import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import StorageProvider from "../services/StorageProvider";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        padding: 10,
        fontSize: 14,
        height: 44,
    },
});

function getExcursionInfo(id) {
    return new Promise((resolve, reject) => {
        StorageProvider.getData("token")
            .then(token => fetch('http://192.168.1.134:3001/excursions/' + id + '?token=' + token))
            .then(res => res.json())
            .then((json) => {
                resolve(json)
            })
    })
}

function editExcursion(excursion) {
    return new Promise((resolve, reject) => {
        StorageProvider.getData("token")
            .then(token => fetch('http://192.168.1.134:3001/excursions?token=' + token, {
                method: 'PUT',
                body: JSON.stringify({
                    _id: excursion._id,
                    name: excursion.name,
                    date: excursion.date,
                    users_id: excursion.users_id
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }))
            .then(res => res.json())
            .then(json => resolve(json));
    })
}

function checkUserIsInExcursion(users) {
    return new Promise((resolve, reject) => {
        StorageProvider.getData("_id")
            .then(_id => {
                console.log("The _id value is: " + _id);
                resolve(users.some(user => user == _id))
            })
    })
}

function addUserToExcursion(excursion) {
    return new Promise((resolve, reject) => {
        StorageProvider.getData("_id")
            .then(_id => {
                excursion.users_id.push(_id);
                return excursion;
            })
            .then(excursion => {
                console.log("2Excursion ids: " + JSON.stringify(excursion));
                return editExcursion(excursion)
            })
            .then(excursion => {
                console.log("edit excursion nos devuelve: " + JSON.stringify(excursion));
                resolve(excursion);
            })
    })
}

function deleteUserFromExcursion(excursion) {
    return new Promise((resolve, reject) => {
        StorageProvider.getData("_id")
            .then(_id => {
                excursion.users_id = excursion.users_id.filter(id => id != _id);
                return excursion;
            })
            .then(excursion => {
                console.log("4Excursion ids: " + JSON.stringify(excursion));
                return editExcursion(excursion)
            })
            .then(excursion => resolve(excursion));
    })
}

function handleAdd(excursionInfo, onChangeexcursionInfo, onChangeuserIsAdded) {
    addUserToExcursion(excursionInfo)
        .then(updatedExcursion => onChangeexcursionInfo(updatedExcursion))
        .then(() => onChangeuserIsAdded(true))
}

function handleDelete(excursionInfo, onChangeexcursionInfo, onChangeuserIsAdded) {
    deleteUserFromExcursion(excursionInfo)
        .then(updatedExcursion => onChangeexcursionInfo(updatedExcursion))
        .then(() => onChangeuserIsAdded(false))
}

function ExcursionView({ route, navigation }) {
    const { _id } = route.params;
    const [excursionInfo, onChangeexcursionInfo] = React.useState("");
    const [userIsAdded, onChangeuserIsAdded] = React.useState(null);

    React.useEffect(() => {
        getExcursionInfo(_id)
            .then(excursion => {
                onChangeexcursionInfo(excursion);
                return excursion;
            })
            .then(excursion => {
                console.log("2checkUserIsInExcursion " + JSON.stringify(excursion.users_id))
                return checkUserIsInExcursion(excursion.users_id);
            })
            .then(result => {
                console.log("The result is: " + result);
                onChangeuserIsAdded(result);
            })
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.item}>{excursionInfo.name}</Text>
            <Text style={styles.item}>{excursionInfo.date}</Text>
            {userIsAdded == null ? <Text></Text> : userIsAdded ?
                <Button title="Delete" onPress={() => handleDelete(excursionInfo, onChangeexcursionInfo, onChangeuserIsAdded)} />
                : <Button title="Add" onPress={() => handleAdd(excursionInfo, onChangeexcursionInfo, onChangeuserIsAdded)} />}
            <FlatList
                data={excursionInfo && excursionInfo.members_info.map(member => member.name)}
                renderItem={
                    ({ item }) =>
                        <Text style={styles.item}>{item}</Text>
                }
            />

        </View>
    );

}

export default ExcursionView;