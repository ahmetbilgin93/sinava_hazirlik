import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
  Modal,
  TouchableHighlight,
} from "react-native";
import {
  Title,
  Divider,
  Appbar,
  Caption,
  Subheading,
  Checkbox,
} from "react-native-paper";
import firebase from "firebase";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

const Cyukle = ({ navigation, route }) => {
  const { itemId, otherParam } = route.params;
  const _goBack = () => {
    navigation.goBack();
  };
  const uid = firebase.auth().currentUser.uid;

  const [isYuklendi, setIsYuklendi] = useState(true);
  const [name, setName] = useState();
  const [cevap, setCevap] = useState();
  const [vote, setVote] = useState();
  const [points, setPoints] = useState();
  const [toplam, setToplam] = useState();
  const [bitti, setBitti] = useState(false);

  const [image, setImage] = useState();
  const [base, setBase] = useState();
  const [type, setType] = useState();

  firebase
    .database()
    .ref("users/" + uid)
    .once("value")
    .then((snapshot) => {
      console.log("User data: ", snapshot.child("name").val());
      const isim = snapshot.child("name").val();
      setName(isim);
      console.log(name);
    });

  firebase
    .database()
    .ref("as/" + otherParam)
    .once("value")
    .then((snapshot) => {
      console.log("TOTAL data: ", snapshot.child("total").val());
      const asd = snapshot.child("total").val();
      setToplam(asd);
    });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Galeriden soru yükleyebilmek için izin vermeniz gerekiyor.");
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Kamera ile soru yükleyebilmek için izin vermeniz gerekiyor.");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 0.2,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      console.log("image: " + image);
      setBase(result.base64);
      setType(result.type);
    }
  };

  const camImage = async () => {
    let resultcam = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 0.2,
    });
    if (!resultcam.cancelled) {
      setImage(resultcam.uri);
      console.log("image: " + image);
      setBase(resultcam.base64);
      setType(resultcam.type);
    }
  };

  const onSave = async () => {
    setIsYuklendi(false);

    const konum = toplam + 1;

    firebase;
    try {
      await firebase
        .database()
        .ref("as/" + otherParam + "/" + konum + "/base")
        .set(base);
      firebase
        .database()
        .ref("as/" + otherParam + "/" + konum + "/name")
        .set(name);
      firebase
        .database()
        .ref("as/" + otherParam + "/" + konum + "/vote")
        .set(0);
      firebase
        .database()
        .ref("as/" + otherParam + "/" + konum + "/points")
        .set(0);

      firebase
        .database()
        .ref("as/" + otherParam + "/total")
        .set(konum);
    } catch (e) {
      console.log(e);
    }
    setImage(null);
    setIsYuklendi(true);
    setBitti(true);
  };

  return (
    <View>
      <Appbar.Header style={{ paddingHorizontal: 10, paddingVertical: 35 }}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content
          style={{ paddingHorizontal: 20, paddingVertical: 30 }}
          title="Yeni Çözüm Ekle"
        />
      </Appbar.Header>

      <View style={styles.titleArea}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.UpArea}>
            <Text>
              <Icon name="book-open" size={20} color="#000" />
            </Text>
            <Subheading>Galeriden Seç</Subheading>
          </View>
        </TouchableOpacity>
        <View></View>
        <View></View>
        <TouchableOpacity onPress={camImage}>
          <View style={styles.UpArea}>
            <Text>
              <Icon name="camera-enhance" size={20} color="#000" />
            </Text>
            <Subheading>Kamerayla Çek</Subheading>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 160,
              height: 120,
              justifyContent: "center",
              alignSelf: "center",
              marginVertical: 30,
            }}
          />
        )}
      </View>
      {isYuklendi ? (
        <TouchableOpacity onPress={onSave}>
          <View style={styles.UpArea}>
            <Text>
              <Icon name="cloud-upload" size={20} color="#000" />
            </Text>
            <Subheading>Çözüm Yükle</Subheading>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.UpArea}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Subheading>YÜKLENİYOR...</Subheading>
        </View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={bitti}
        onRequestClose={() => {
          setBitti(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>ÇÖZÜMÜNÜZ YÜKLENDİ</Text>
            <Divider style={{ marginTop: 20 }} />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                _goBack();
                setBitti(!bitti);
              }}
            >
              <Text style={styles.textStyle}>Geri Dön</Text>
            </TouchableHighlight>
            <Divider style={{ marginTop: 20 }} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  AddArea: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingLeft: 30,
    marginTop: 3,
  },
  UpArea: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  addicon: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "blue",
  },

  but: {
    marginTop: 5,
    padding: 10,
  },
  inputWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 1200,
    backgroundColor: "#2e64e515",
  },
  cevap: {
    flex: 1,
    /*justifyContent: "space-between",*/
    /*alignItems: "stretch",*/
    /* alignContent: "space-between",*/
    backgroundColor: "white",
    marginBottom: 50,
    zIndex: 1,
  },
  sec: {
    paddingHorizontal: 10,
    marginLeft: 5,
    zIndex: 5,
  },
  harf: {
    marginRight: 100,
    zIndex: 2,
  },
  titleArea: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 3,
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Cyukle;
