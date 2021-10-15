import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Divider, Appbar, Caption, Subheading } from "react-native-paper";
import firebase from "firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Settings = ({ navigation }) => {
  const uid = firebase.auth().currentUser.uid;

  const _goBack = () => {
    navigation.goBack();
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  const [name, setName] = useState();
  const [mail, setMail] = useState();
  const [yeni, setYeni] = useState();
  const [eski, setEski] = useState();
  const [simdi, setSimdi] = useState();
  const userId = firebase.auth().currentUser.uid;

  useEffect(() => {
    const onValueChange = firebase
      .database()
      .ref(`/users/${uid}`)
      .on("value", (snapshot) => {
        console.log("User data: ", snapshot.child("name").val());
        const isim = snapshot.child("name").val();
        console.log("User data: ", snapshot.child("email").val());
        const mail = snapshot.child("email").val();
        setName(isim);
        setMail(mail);
        console.log(name);
        console.log(mail);
      });
    return () =>
      firebase.database().ref(`/users/${uid}`).off("value", onValueChange);
  }, [uid]);

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Profili Düzenle" />
      </Appbar.Header>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>İsminizi Giriniz:</Text>
            <TextInput
              style={{
                height: 40,
                width: 240,
                borderBottomColor: "gray",
                borderWidth: 1,
                borderTopColor: "white",
                borderLeftColor: "white",
                borderRightColor: "white",
                marginBottom: 15,
              }}
              label="Ad Soyad"
              onChangeText={(text) => setName(text)}
            />

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                if (name != null) {
                  setModalVisible(!modalVisible);
                  firebase
                    .database()
                    .ref("users/" + userId)
                    .update({ name: name });
                }
              }}
            >
              <Text style={styles.textStyle}>Kaydet</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <Divider />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View style={styles.settingsArea}>
          <Caption>Ad Soyad</Caption>
          <View style={styles.editarea}>
            <View>
              <Subheading>{name}</Subheading>
            </View>
            <View style={styles.editicon}>
              <Text>
                <Icon name="circle-edit-outline" size={20} color="#000" />
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Divider />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible(!modalVisible2);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Mailinizi Giriniz:</Text>
            <TextInput
              style={{
                height: 40,
                width: 240,
                borderBottomColor: "gray",
                borderWidth: 1,
                borderTopColor: "white",
                borderLeftColor: "white",
                borderRightColor: "white",
                marginBottom: 15,
              }}
              label="Mail"
              onChangeText={(text) => setMail(text)}
            />

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                if (mail != null) {
                  setModalVisible2(!modalVisible2);

                  firebase
                    .auth()
                    .currentUser.updateEmail(mail)
                    .then(function () {
                      firebase
                        .database()
                        .ref("users/" + userId)
                        .update({ email: mail });
                    })
                    .catch(function (error) {
                      console.log("Olmadı");
                    });
                }
              }}
            >
              <Text style={styles.textStyle}>Kaydet</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Pressable
        onPress={() => {
          setModalVisible2(true);
        }}
      >
        <View style={styles.settingsArea}>
          <Caption>Email</Caption>
          <View style={styles.editarea}>
            <View>
              <Subheading>{mail}</Subheading>
            </View>
            <View style={styles.editicon}>
              <Text>
                <Icon name="circle-edit-outline" size={20} color="#000" />
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
      <Divider />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(!modalVisible3);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTextt}>Şimdiki Şifrenizi Giriniz:</Text>
            <TextInput
              style={{
                height: 40,
                width: 240,
                borderBottomColor: "gray",
                borderWidth: 1,
                borderTopColor: "white",
                borderLeftColor: "white",
                borderRightColor: "white",
                marginBottom: 15,
              }}
              label="Eski Şifre"
              onChangeText={(text) => setEski(text)}
              secureTextEntry
            />
            <Text style={styles.modalTextt}>Yeni Şifreyi Giriniz:</Text>
            <TextInput
              style={{
                height: 40,
                width: 240,
                borderBottomColor: "gray",
                borderWidth: 1,
                borderTopColor: "white",
                borderLeftColor: "white",
                borderRightColor: "white",
                marginBottom: 15,
              }}
              label="Yeni Şifre"
              onChangeText={(text) => setYeni(text)}
              secureTextEntry
            />

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                if (yeni != null) {
                  firebase
                    .database()
                    .ref("users/" + uid + "/password")
                    .once("value")
                    .then((snapshot) => {
                      const simdiki = snapshot.val();
                      setSimdi(simdiki);
                    });
                  if (eski == simdi) {
                    console.log("aynılar");
                    setModalVisible3(!modalVisible3);
                    firebase
                      .auth()
                      .currentUser.updatePassword(yeni)
                      .then(() => {
                        console.log("Oldu");
                        firebase
                          .database()
                          .ref("users/" + userId)
                          .update({ password: yeni });
                      })
                      .catch(function (error) {
                        console.log("OLMADIII");
                      });
                  } else {
                    Alert.alert("Mevcut şifreyi hatalı girdiniz.");
                  }
                }
              }}
            >
              <Text style={styles.textStyle}>Kaydet</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Pressable
        onPress={() => {
          setModalVisible3(true);
        }}
      >
        <View style={styles.settingsArea}>
          <Caption>Şifre</Caption>
          <View style={styles.editarea}>
            <View>
              <Subheading>Şifreyi Değiştir</Subheading>
            </View>
            <View style={styles.editicon}>
              <Text>
                <Icon name="circle-edit-outline" size={20} color="#000" />
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
      <Divider />
    </View>
  );
};
export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsArea: {
    backgroundColor: "white",
    padding: 10,
    paddingBottom: 40,
  },
  editicon: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "blue",
  },
  editarea: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
    alignContent: "space-between",
    backgroundColor: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: 200,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalTextt: {
    marginBottom: 0,
    paddingTop: 20,
    textAlign: "center",
  },
});
