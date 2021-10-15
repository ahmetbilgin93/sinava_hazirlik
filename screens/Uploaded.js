import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Divider, Appbar, Caption, Subheading } from "react-native-paper";
import firebase from "firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";

const Uploaded = ({ navigation }) => {
  const uid = firebase.auth().currentUser.uid;
  const [ders, setDers] = useState("mat");

  const _goBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Yüklediğim Sorular" />
      </Appbar.Header>
      <View style={styles.AddArea}>
        <Caption>Dersin Adı:</Caption>
        <Picker
          selectedValue={ders}
          style={{ height: 50 }}
          onValueChange={(derss, itemIndex) => {
            setDers(derss);
          }}
        >
          <Picker.Item label="Matematik" value="mat" />
          <Picker.Item label="Geometri" value="geo" />
          <Picker.Item label="Fizik" value="fiz" />
          <Picker.Item label="Kimya" value="kim" />
          <Picker.Item label="Biyoloji" value="bio" />
          <Picker.Item label="Edebiyat" value="edb" />
          <Picker.Item label="Dil Bilgisi" value="dil" />
          <Picker.Item label="Coğrafya" value="cog" />
          <Picker.Item label="Tarih" value="tar" />
          <Picker.Item label="Felsefe" value="fel" />
          <Picker.Item label="İngilizce" value="ing" />
        </Picker>
      </View>
      <Divider />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Ups", {
            itemId: 1,
            noteid: ders,
            uid: uid,
          });
        }}
      >
        <View style={styles.UpArea}>
          <Subheading>Seçilen Dersin Sorularını Göster</Subheading>
          <Text>
            <Icon name="cloud-download" size={20} color="#000" />
          </Text>
        </View>
      </TouchableOpacity>
      <Divider />
    </View>
  );
};
export default Uploaded;

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
});

/*import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
  Image,
  TouchableHighlight,
  Modal,
} from "react-native";
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  Divider,
  Appbar,
  Caption,
  Headline,
  Subheading,
  Checkbox,
} from "react-native-paper";
import firebase from "firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { set } from "react-native-reanimated";

const Uploaded = ({ navigation }) => {
  const uid = firebase.auth().currentUser.uid;
  const mail = firebase.auth().currentUser.email;
  const [name, setName] = useState();
  const [dif, setDif] = useState();
  const [rn, setRn] = useState();
  const [soru, setSoru] = useState();
  const [konu, setKonu] = useState();
  const [isim, setisim] = useState();
  const [kitap, setKitap] = useState();
  const [point, setPoint] = useState();
  const [puan, setPuan] = useState();
  const [ders, setDers] = useState("mat");
  const [derss, setDerss] = useState("Matematik");
  const [dogru, setDogru] = useState();
  const [y, setY] = useState();
  const [t, setT] = useState();
  const [vo, setVo] = useState();
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);
  const [d, setD] = useState(false);
  const [e, setE] = useState(false);
  const [s, setS] = useState(1);
  const [cevap, setCevap] = useState();
  const [sonuc, setSonuc] = useState();
  const [cevapDogru, setCevapDogru] = useState(false);
  const [startnew, setstartnew] = useState(true);
  const [favtop, setFavTop] = useState();
  const [ref, setRef] = useState();

  const _goBack = () => {
    navigation.goBack();
  };

  firebase
    .database()
    .ref("myqs/" + uid + "/" + ders + "/" + s + "/ref")
    .once("value")
    .then((snapshot) => {
      const reff = snapshot.val();
      setRef(reff);
    });

  const getFav = () => {
    const ss = s + 1;
    firebase
      .database()
      .ref("myqs/" + uid + "/" + ders + "/" + ss + "/ref")
      .once("value")
      .then((snapshot) => {
        const reff = snapshot.val();
        setRef(reff);
        //Alert.alert("oldu mu?" + dif);
      });
    firebase
      .database()
      .ref(ref + "/base")
      .once("value")
      .then((snapshot) => {
        const bases = snapshot.val();
        setSoru(bases);
        //Alert.alert("oldu mu?" + dif);
      });
    firebase
      .database()
      .ref(ref + "/cevap")
      .once("value")
      .then((snapshot) => {
        const bases = snapshot.val();
        setCevap(bases);
        //Alert.alert("oldu mu?" + dif);
      });
    firebase
      .database()
      .ref(ref + "/points")
      .once("value")
      .then((snapshot) => {
        const bases = snapshot.val();
        setPuan(bases);
        //Alert.alert("oldu mu?" + dif);
      });
    firebase
      .database()
      .ref(ref + "/d")
      .once("value")
      .then((snapshot) => {
        const bases = snapshot.val();
        setDogru(bases);
        //Alert.alert("oldu mu?" + dif);
      });
    firebase
      .database()
      .ref(ref + "/y")
      .once("value")
      .then((snapshot) => {
        const bases = snapshot.val();
        setY(bases);
        //Alert.alert("oldu mu?" + dif);
      });
    firebase
      .database()
      .ref(ref + "/kitap")
      .once("value")
      .then((snapshot) => {
        const bases = snapshot.val();
        setKitap(bases);
        //Alert.alert("oldu mu?" + dif);
      });
    firebase
      .database()
      .ref(ref + "/konu")
      .once("value")
      .then((snapshot) => {
        const bases = snapshot.val();
        setKonu(bases);
        //Alert.alert("oldu mu?" + dif);
      });
    setS(ss);
  };

  const getExFav = () => {
    const ss = s - 1;
    firebase
      .database()
      .ref("myqs/" + uid + "/" + ders + "/" + ss + "/ref")
      .once("value")
      .then((snapshot) => {
        const reff = snapshot.val();
        setRef(reff);
        //Alert.alert("oldu mu?" + dif);
      });
    firebase
      .database()
      .ref(ref + "/base")
      .once("value")
      .then((snapshot) => {
        const bases = snapshot.val();
        setSoru(bases);
        //Alert.alert("oldu mu?" + dif);
      });
    firebase
      .database()
      .ref(ref + "/cevap")
      .once("value")
      .then((snapshot) => {
        const bases = snapshot.val();
        setCevap(bases);
        //Alert.alert("oldu mu?" + dif);
      });
    firebase
      .database()
      .ref(ref + "/points")
      .once("value")
      .then((snapshot) => {
        const bases = snapshot.val();
        setPuan(bases);
        //Alert.alert("oldu mu?" + dif);
      });
    firebase
      .database()
      .ref(ref + "/d")
      .once("value")
      .then((snapshot) => {
        const bases = snapshot.val();
        setDogru(bases);
        //Alert.alert("oldu mu?" + dif);
      });
    firebase
      .database()
      .ref(ref + "/y")
      .once("value")
      .then((snapshot) => {
        const bases = snapshot.val();
        setY(bases);
        //Alert.alert("oldu mu?" + dif);
      });
    firebase
      .database()
      .ref(ref + "/kitap")
      .once("value")
      .then((snapshot) => {
        const bases = snapshot.val();
        setKitap(bases);
        //Alert.alert("oldu mu?" + dif);
      });
    firebase
      .database()
      .ref(ref + "/konu")
      .once("value")
      .then((snapshot) => {
        const bases = snapshot.val();
        setKonu(bases);
        //Alert.alert("oldu mu?" + dif);
      });
    setS(ss);
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Yüklediğim Sorularım" />
      </Appbar.Header>
      <View style={styles.AddArea}>
        <Caption>Dersin Adı:</Caption>
        <Picker
          selectedValue={ders}
          style={{ height: 50 }}
          onValueChange={(ders, itemIndex) => setDers(ders)}
        >
          <Picker.Item label="Matematik" value="mat" />
          <Picker.Item label="Geometri" value="geo" />
          <Picker.Item label="Fizik" value="fiz" />
          <Picker.Item label="Kimya" value="kim" />
          <Picker.Item label="Biyoloji" value="bio" />
          <Picker.Item label="Edebiyat" value="edb" />
          <Picker.Item label="Dil Bilgisi" value="dil" />
          <Picker.Item label="Coğrafya" value="cog" />
          <Picker.Item label="Tarih" value="tar" />
          <Picker.Item label="Felsefe" value="fel" />
          <Picker.Item label="İngilizce" value="ing" />
        </Picker>
      </View>
      <Divider />
      <TouchableOpacity onPress={getFav}>
        <View style={styles.UpArea}>
          <Text>
            <Icon name="cloud-download" size={20} color="#000" />
          </Text>
          <Subheading>Seçilen Dersin Sorularını Göster</Subheading>
        </View>
      </TouchableOpacity>
      <Divider />
      <View>
        <Image
          source={{ uri: `data:image/jpg;base64,${soru}` }}
          style={{
            width: 400,
            height: 300,
            justifyContent: "center",
            alignSelf: "center",
            marginVertical: 10,
          }}
        />
      </View>
      <View style={styles.titleArea}>
        <View>
          <Subheading
            style={{ fontWeight: "bold", fontSize: 30, color: "gainsboro" }}
          >
            |
          </Subheading>
        </View>
        <View>
          <Subheading>Konu: {konu}</Subheading>
        </View>
        <View>
          <Subheading
            style={{ fontWeight: "bold", fontSize: 30, color: "gainsboro" }}
          >
            |
          </Subheading>
        </View>
        <View>
          <Subheading>Kaynak: {kitap}</Subheading>
        </View>
        <View>
          <Subheading
            style={{ fontWeight: "bold", fontSize: 30, color: "gainsboro" }}
          >
            |
          </Subheading>
        </View>
        <View>
          <Subheading>Cevap: {cevap}</Subheading>
        </View>
        <View>
          <Subheading
            style={{ fontWeight: "bold", fontSize: 30, color: "gainsboro" }}
          >
            |
          </Subheading>
        </View>
      </View>
      <View style={styles.titleArea}>
        <View>
          <Subheading
            style={{ fontWeight: "bold", fontSize: 30, color: "gainsboro" }}
          >
            |
          </Subheading>
        </View>
        <View>
          <Subheading>Doğru Cevap Oranı: {d}</Subheading>
        </View>
        <Subheading
          style={{ fontWeight: "bold", fontSize: 30, color: "gainsboro" }}
        >
          |
        </Subheading>
        <View>
          <Subheading>Sorunun Puanı: {puan}</Subheading>
        </View>
        <Subheading
          style={{ fontWeight: "bold", fontSize: 30, color: "gainsboro" }}
        >
          |
        </Subheading>
      </View>
      <View style={styles.titleArea}>
        <TouchableOpacity
          onPress={() => {
            if (s > 1) {
              setS(s - 1);
              getExFav();
            } else {
              console.log("hata");
            }
          }}
        >
          <View style={styles.titleArea}>
            <Text>
              <Icon name="arrow-left-thick" size={27} color="#000" />
            </Text>

            <Subheading>Önceki Soru </Subheading>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (s < 11) {
              setS(s + 1);
              getFav();
            } else {
              console.log("hata");
            }
          }}
        >
          <View style={styles.titleArea}>
            <Subheading>Sonraki Soru</Subheading>
            <Text>
              <Icon name="arrow-right-thick" size={28} color="#000" />
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Uploaded;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
  titleArea: {
    backgroundColor: "white",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
*/
