import React from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from 'react-native';
import Dashboard from "./components/Dashboard";
import LoginScreen from "./components/Login";
import MembersList from './components/MembersList';
import ExcursionView from "./components/ExcursionView";
import EditMemberInfo from "./components/EditMemberInfo";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ExcursionView" component={ExcursionView} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="List of Members" component={MembersList} />
        <Stack.Screen name="EditUserData" component={EditMemberInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;