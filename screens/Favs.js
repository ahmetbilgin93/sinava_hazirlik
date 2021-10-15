import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Appbar } from "react-native-paper";
import firebase from "firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Favs = ({ route, navigation }) => {
  const { itemId, noteid, uid } = route.params;
  const [dif, setDif] = useState();
  const [puan, setPuan] = useState();
  const [name, setName] = useState();
  const [cevap, setCevap] = useState();
  const [toplam, setToplam] = useState();
  const [soru, setSoru] = useState();
  const [engelleg, setEngelleg] = useState();
  const [engellei, setEngellei] = useState(false);
  const [Qotal, setQotal] = useState();
  const _goBack = () => {
    navigation.goBack();
  };

  firebase
    .database()
    .ref("favs/" + uid)
    .once("value")
    .then((snapshot) => {
      const yenimi = snapshot.child(noteid).exists();
      if (!yenimi) {
        firebase
          .database()
          .ref("favs/" + uid + "/" + noteid + "/total")
          .set(0);
        Alert.alert(
          "Favori Sorunuz Yok",
          "Bu derse ait favori sorularınız yok.",
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
        const uzanti = "favs/" + uid + "/" + noteid + "/" + itemId;
        firebase
          .database()
          .ref("favs/" + uid + "/" + noteid + "/total")
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
        <Appbar.Content title="Favoriler" />
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
            <Text>Yükleyen: {name}</Text>
            <Text>Puanı: {puan}</Text>
          </View>
          <View style={styles.titleArea}>
            <Text>Doğru Cevap: {cevap}</Text>
            <Text>Doğru Çözülme Yüzdesi: %{toplam}</Text>
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
                  navigation.navigate("Favs", {
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
                  navigation.navigate("Favs", {
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

export default Favs;

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
