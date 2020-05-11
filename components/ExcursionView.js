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


function ExcursionView({ route, navigation }) {
    const { _id } = route.params;
    const [excursionInfo, onChangeexcursionInfo] = React.useState("");

    React.useEffect(() => {
        getExcursionInfo(_id)
            .then(excursion => {
                console.log(excursion);
                onChangeexcursionInfo(excursion);
            })
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.item}>{excursionInfo.name}</Text>
            <Text style={styles.item}>{excursionInfo.date}</Text>
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