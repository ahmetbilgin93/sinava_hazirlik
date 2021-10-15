import * as React from "react";
import { Text, View, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Profilss from "./screens/ProfileScreen";
import Testss from "./screens/TestScreen";
import Addss from "./screens/AddScreen";
import AddScreen from "./screens/AddScreen";
import TestScreen from "./screens/TestScreen";
import Navigation from "./Navigation";
import * as firebase from "firebase";
import { UserProvider } from "./context/UserContext";
import { FirebaseProvider } from "./context/FirebaseContext";

/*
var firebaseConfig = {
  apiKey: "AIzaSyCM5AHXlM63nMFfRQp6JXDhOGIQovWDdKU",
  authDomain: "sinav-db21.firebaseapp.com",
  projectId: "sinav-db21",
  storageBucket: "sinav-db21.appspot.com",
  messagingSenderId: "897610990138",
  appId: "1:897610990138:web:b7bfed03eea46fb4dbab03",
  measurementId: "G-ND3N4GEVCB",
};*/
// Initialize Firebase/*

/*
function NotificationsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: 'white',
        labelStyle: { fontSize: 12, paddingTop: 5 },
        style: { backgroundColor: 'dodgerblue',
      marginTop:20 },
      }}
    >
      <Tab.Screen
        name="Profil"
        component={Profilss}
        options={{ tabBarLabel: 'Profil' }}
      />
      <Tab.Screen
        name="Test"
        component={Testss}
        options={{ tabBarLabel: 'Test Çöz' }}
      />
      <Tab.Screen
        name="Ekle"
        component={Addss}
        options={{ tabBarLabel: 'Soru Ekle' }}
      />
    </Tab.Navigator>
  );
}



  const TestSack =createStackNavigator();

  function TestStackScreen() {
    return (
      <TestStack.Navigator>
        <TestStack.Screen name="Tests" component={Testss} />
      </TestStack.Navigator>
    );
  }

const RootStack = createStackNavigator();
*/
export default function App() {
  return (
    <FirebaseProvider>
      <UserProvider>
        <Navigation />
      </UserProvider>
    </FirebaseProvider>
  );
}
