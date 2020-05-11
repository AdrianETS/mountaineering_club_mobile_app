import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import StorageProvider from "../services/StorageProvider";
import MembersList from "./MembersList";


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

function getExcursionList() {
  return new Promise((resolve, reject) => {
    StorageProvider.getData("token")
      .then(token => fetch('http://192.168.1.134:3001/excursions/list?token=' + token))
        .then(res => res.json())
        .then((json) => {
          console.log(json);
          resolve(json);
        })
  })
}

function onClickItem(id, navigation){
  navigation.navigate('ExcursionView', {_id: id});
}

function Dashboard({ navigation }) {

  const [userName, onChangeUserName] = React.useState("");
  const [excursionsList, onChangeexcursionList] = React.useState("");
  //useEfect es un hook que se ejecuta después del renderizado. Es equivalente al componentDidMount y componentDidUpdate
  React.useEffect(() => {
    StorageProvider.getData("userName")
      .then(value => onChangeUserName(value))
      .then(() => getExcursionList())
      .then(excursions => onChangeexcursionList(excursions));
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to dashboard: {userName}</Text>
      <FlatList
        data={excursionsList}
        renderItem={
          ({item}) => 
              <TouchableOpacity 
                 onPress={() => onClickItem(item._id, navigation)} 
              >
               <Text style={styles.item}>{item.name}</Text>
              </TouchableOpacity>}

      />
    </View>
  );
}


export default Dashboard;