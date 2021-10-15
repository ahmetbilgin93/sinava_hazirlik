import React, { useState, useEffect } from "react";
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
  ActivityIndicator,
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
import { Row } from "native-base";
import { set } from "react-native-reanimated";

const Ups = ({ route, navigation }) => {
  const { itemId, noteid, uid } = route.params;
  const [dif, setDif] = useState();
  const [puan, setPuan] = useState();
  const [name, setName] = useState();
  const [cevap, setCevap] = useState();
  const [toplam, setToplam] = useState();
  const [t, setT] = useState();
  const [soru, setSoru] = useState();
  const [engelleg, setEngelleg] = useState();
  const [engellei, setEngellei] = useState(false);
  const [Qotal, setQotal] = useState();
  const [kontrol, setKontrol] = useState(false);
  const _goBack = () => {
    navigation.goBack();
  };

  firebase
    .database()
    .ref("myqs/" + uid)
    .once("value")
    .then((snapshot) => {
      const yenimi = snapshot.child(noteid).exists();
      if (!yenimi) {
        firebase
          .database()
          .ref("myqs/" + uid + "/" + noteid + "/total")
          .set(0);
        Alert.alert(
          "Yüklediğiniz Sorunuz Yok",
          "Bu derse ait yüklediğiniz sorularınız yok.",
          [
            {
              text: "Geri Dön",
              onPress: () => {
                _goBack();
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        const uzanti = "myqs/" + uid + "/" + noteid + "/" + itemId;
        firebase
          .database()
          .ref("myqs/" + uid + "/" + noteid + "/total")
          .once("value")
          .then((snapshot) => {
            const tot = snapshot.val();
            setQotal(tot);
          });
        console.log(Qotal + "TOTALSSSS");
        if (Qotal > 0) {
          firebase
            .database()
            .ref(uzanti)
            .once("value")
            .then((snapshot) => {
              const asd = snapshot.child("ref").val();

              setDif(asd);
              console.log(dif);
              if (itemId == 1) {
                setEngelleg(true);
              } else {
                setEngelleg(false);
              }

              if (itemId == Qotal) {
                setEngellei(true);
              } else {
                setEngellei(false);
              }
            });

          firebase
            .database()
            .ref(dif)
            .once("value")
            .then((snapshot) => {
              const pict = snapshot.child("base").val();
              setSoru(pict);
              const points = snapshot.child("points").val();
              setPuan(points);
              const isim = snapshot.child("name").val();
              setName(isim);
              const dcevap = snapshot.child("cevap").val();
              setCevap(dcevap);
              const dogrus = snapshot.child("d").val();
              const toplams = snapshot.child("t").val();
              setT(toplams);
              const oran = Math.floor((dogrus / toplams) * 100);
              setToplam(oran);
            });
        }
      }
    });

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Yüklemelerim" />
      </Appbar.Header>
      {!soru ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 150,
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View>
          <View style={styles.titleArea}>
            <Text>Cevaplayan Kişi Sayısı: {t}</Text>
            <Text>Puanı: {puan}</Text>
          </View>
          <View style={styles.titleArea}>
            <Text>Doğru Çözülme Yüzdesi: %{toplam}</Text>
            <Text>Doğru Cevap: {cevap}</Text>
          </View>
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

          <View style={styles.titleArea}>
            <TouchableOpacity
              disabled={engelleg}
              onPress={() => {
                setSoru(null);
                if (itemId > 1) {
                  navigation.navigate("Ups", {
                    itemId: itemId - 1,
                    otherParam: noteid,
                    uid: uid,
                  });
                } else {
                  Alert.alert("ilk sorudasın geriye gidemezsin.");
                }
              }}
            >
              <View style={styles.titleArea}>
                <Text style={{ fontSize: 20 }}>
                  <Icon name="arrow-left" size={24} color="#000" /> Önceki Soru
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.titleArea}>
              <Text style={{ fontSize: 20 }}>
                {itemId}/{Qotal}
              </Text>
            </View>

            <TouchableOpacity
              disabled={engellei}
              onPress={() => {
                console.log(Qotal, itemId);
                if (itemId < Qotal) {
                  setSoru(null);
                  navigation.navigate("Ups", {
                    itemId: itemId + 1,
                    otherParam: noteid,
                    uid: uid,
                  });
                } else {
                  console.log("son sorudasın ileriye gidemezsin.");
                }
              }}
            >
              <View style={styles.titleArea}>
                <Text style={{ fontSize: 20 }}>
                  Sonraki Soru{" "}
                  <Icon style={{}} name="arrow-right" size={24} color="#000" />
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!Qotal ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 150,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>Soru Yok</Text>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default Ups;

const styles = StyleSheet.create({
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
    paddingHorizontal: 10,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
