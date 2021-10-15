import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { Avatar, Card, Divider, Appbar } from "react-native-paper";
import firebase from "firebase";

const ProfileScreen = ({ navigation }) => {
  const uid = firebase.auth().currentUser.uid;
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

  var msDiff = new Date("June 26, 2021").getTime() - new Date().getTime(); //Future date - current date
  var daysTill = Math.floor(msDiff / (1000 * 60 * 60 * 24));
  console.log(daysTill);

  return (
    <View>
      <Appbar.Header style={{ paddingHorizontal: 10, paddingVertical: 35 }}>
        <Appbar.Content
          style={{ paddingHorizontal: 20, paddingVertical: 30 }}
          title={name}
          subtitle="Profilinizi düzenleyin ve inceleyin"
        />
        <Appbar.Action icon="logout" onPress={OutButton} />
      </Appbar.Header>
      <Text style={styles.welcome}>Sınava {daysTill} Gün Kaldı!</Text>
      <Divider />
      <Card>
        <Pressable onPress={() => navigation.navigate("Statistic")}>
          <Card.Title
            title="İstatistikler"
            subtitle="Gidişatını kontrol et"
            left={(props) => <Avatar.Icon {...props} icon="file-chart" />}
          />
        </Pressable>
      </Card>
      <Divider />

      <Card>
        <Pressable onPress={() => navigation.navigate("Program")}>
          <Card.Title
            title="Ders Programım"
            subtitle="Hemen kendine bir program ayarla"
            left={(props) => (
              <Avatar.Icon {...props} icon="format-list-checks" />
            )}
          />
        </Pressable>
      </Card>
      <Divider />

      <Card>
        <Pressable onPress={() => navigation.navigate("Saved")}>
          <Card.Title
            title="Favorilerim"
            subtitle="Kaybetmek istemediğin sorular ve çözümler"
            left={(props) => (
              <Avatar.Icon {...props} icon="bookmark-multiple" />
            )}
          />
        </Pressable>
      </Card>
      <Divider />

      <Card>
        <Pressable onPress={() => navigation.navigate("Uploaded")}>
          <Card.Title
            title="Yüklemelerim"
            subtitle="Yüklediğin sorular ve çözümler"
            left={(props) => <Avatar.Icon {...props} icon="buffer" />}
          />
        </Pressable>
      </Card>
      <Divider />

      <Card>
        <Pressable onPress={() => navigation.navigate("Settings")}>
          <Card.Title
            title="Ayarlar"
            subtitle="Profilini düzenle."
            left={(props) => <Avatar.Icon {...props} icon="account-edit" />}
          />
        </Pressable>
      </Card>
      <Divider />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "white",
  },
});
