import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  BackHandler,
  Pressable,
  Alert,
} from "react-native";
import {
  Checkbox,
  FAB,
  List,
  Card,
  Avatar,
  Divider,
  Appbar,
} from "react-native-paper";
import firebase from "firebase";
import Addss from "./AddScreen";

const TestScreen = ({ navigation }) => {
  const _goBack = () => {
    navigation.goBack();
  };
  const uid = firebase.auth().currentUser.uid;
  const mail = firebase.auth().currentUser.email;
  const [name, setName] = useState();

  useEffect(() => {
    const onValueChange = firebase
      .database()
      .ref(`/users/${uid}`)
      .on("value", (snapshot) => {
        console.log("User data: ", snapshot.child("name").val());
        const isim = snapshot.child("name").val();
        setName(isim);
        console.log(name);
      });

    // Stop listening for updates when no longer required
    return () =>
      firebase.database().ref(`/users/${uid}`).off("value", onValueChange);
  }, [uid]);

  const OutButton = () => {
    Alert.alert(
      "Çıkış Yap",
      "Çıkış yapmak istediğinize emin misiniz?",
      [
        {
          text: "Hayır",
          onPress: () => console.log({ name: name }),
          style: "cancel",
        },
        {
          text: "Evet",
          onPress: () => {
            try {
              firebase.auth().signOut();

              navigation.reset({
                index: 0,
                routes: [{ name: "StartScreen" }],
              });
              return true;
            } catch (err) {
              Alert.alert("Error @logOut: ", err);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View>
      <Appbar.Header style={{ paddingHorizontal: 10, paddingVertical: 35 }}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content
          style={{ paddingHorizontal: 20, paddingVertical: 30 }}
          title="Dersler"
          subtitle="Soru Çözmeye Başlamak İçim Ders Seç"
        />
      </Appbar.Header>
      <ScrollView>
        <Divider />
        <Card>
          <Pressable onPress={() => navigation.navigate("Matematik")}>
            <Card.Title
              title="Matematik"
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
            />
          </Pressable>
        </Card>
        <Divider />

        <Card>
          <Pressable onPress={() => navigation.navigate("Geometri")}>
            <Card.Title
              title="Geometri"
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
            />
          </Pressable>
        </Card>
        <Divider />

        <Card>
          <Pressable onPress={() => navigation.navigate("Fizik")}>
            <Card.Title
              title="Fizik"
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
            />
          </Pressable>
        </Card>
        <Divider />

        <Card>
          <Pressable onPress={() => navigation.navigate("Kimya")}>
            <Card.Title
              title="Kimya"
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
            />
          </Pressable>
        </Card>
        <Divider />

        <Card>
          <Pressable onPress={() => navigation.navigate("Biyoloji")}>
            <Card.Title
              title="Biyoloji"
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
            />
          </Pressable>
        </Card>
        <Divider />

        <Card>
          <Pressable onPress={() => navigation.navigate("Edebiyat")}>
            <Card.Title
              title="Edebiyat"
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
            />
          </Pressable>
        </Card>
        <Divider />

        <Card>
          <Pressable onPress={() => navigation.navigate("DilBilgisi")}>
            <Card.Title
              title="Dil Bilgisi"
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
            />
          </Pressable>
        </Card>
        <Divider />

        <Card>
          <Pressable onPress={() => navigation.navigate("Tarih")}>
            <Card.Title
              title="Tarih"
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
            />
          </Pressable>
        </Card>
        <Divider />

        <Card>
          <Pressable onPress={() => navigation.navigate("Cografya")}>
            <Card.Title
              title="Coğrafya"
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
            />
          </Pressable>
        </Card>
        <Divider />

        <Card>
          <Pressable onPress={() => navigation.navigate("Konu")}>
            <Card.Title
              title="Felsefe"
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
            />
          </Pressable>
        </Card>
        <Divider />

        <Card>
          <Pressable onPress={() => navigation.navigate("Konu")}>
            <Card.Title
              title="İngilizce"
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
            />
          </Pressable>
        </Card>
        <Divider />
      </ScrollView>
    </View>
  );
};

export default TestScreen; /*{
      return(
          <NavigationContainer>
                <RootStack.Navigator>
              <RootStack.Screen name="Tests" component={TestStackScreen} />
          </RootStack.Navigator>

          </NavigationContainer>
          
              
      )
  }*/
