import * as React from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer, useLinkProps } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profilss from "./screens/ProfileScreen";
import Testss from "./screens/TestScreen";
import Addss from "./screens/AddScreen";
import Statss from "./screens/Statistic";
import Programss from "./screens/Program";
import Savedss from "./screens/Saved";
import Upss from "./screens/Uploaded";
import Settingss from "./screens/Settings";
import Answ from "./screens/Answers";
import Favs from "./screens/Favs";
import Ups from "./screens/Ups";
import Konu from "./screens/Konu";
import Soru from "./screens/Sorular";
import Cyukle from "./screens/Cyukle";

import {} from "firebase";

import { FontAwesome } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StartScreen from "./screens/StartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import { UserProvider } from "./context/UserContext";

function TestScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Testler Burada!</Text>
    </View>
  );
}

function AddScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>SORU EKLE SORU EKLE Burada!</Text>
      <Button
        title="Go to Tests!"
        onPress={() => navigation.navigate("Tests")}
      />
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>PROFİLİNE BAK!</Text>
      <Button
        title="EKLEMEYE GİT"
        onPress={() => navigation.navigate("Adds")}
      />
    </View>
  );
}

const AddStack = createStackNavigator();
function AddStackScreen() {
  return (
    <AddStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AddStack.Screen name="Tests" component={Addss} />
      <AddStack.Screen name="Profile" component={ProfileScreen} />
      <AddStack.Screen name="Test" component={TestScreen} />
    </AddStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Profile" component={Profilss} />
      <ProfileStack.Screen name="Statistic" component={Statss} />
      <ProfileStack.Screen name="Program" component={Programss} />
      <ProfileStack.Screen name="Saved" component={Savedss} />
      <ProfileStack.Screen name="Uploaded" component={Upss} />
      <ProfileStack.Screen name="Settings" component={Settingss} />
      <ProfileStack.Screen name="Favs" component={Favs} />
      <ProfileStack.Screen name="Ups" component={Ups} />
    </ProfileStack.Navigator>
  );
}

const TestStack = createStackNavigator();
function TestStackScreen() {
  return (
    <TestStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TestStack.Screen name="Konu" component={Konu} />
      <TestStack.Screen name="Sorular" component={Soru} />
      <TestStack.Screen name="Answers" component={Answ} />
      <TestStack.Screen name="Cyukle" component={Cyukle} />
    </TestStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          title: "Profil",
        }}
      />
      <Tab.Screen
        name="Test"
        component={TestStackScreen}
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="school" color={color} size={size} />
          ),
          title: "Çalış",
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddStackScreen}
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-box-multiple"
              color={color}
              size={size}
            />
          ),
          title: "Ekle",
        }}
      />
    </Tab.Navigator>
  );
}

const AuthStack = createStackNavigator();
function AuthStackScreen() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="StartScreen" component={StartScreen} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <AuthStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <AuthStack.Screen name="TabScreen" component={TabScreen} />
    </AuthStack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      {UserProvider.isLoggedIn ? <TabScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}
