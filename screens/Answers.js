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
import { set } from "react-native-reanimated";

const Answer = ({ route, navigation }) => {
  const { itemId, otherParam } = route.params;
  const [dif, setDif] = useState();
  const [puan, setPuan] = useState();
  const [votes, setVotes] = useState();
  const [point, setPoint] = useState();
  const [name, setName] = useState();
  const [toplam, setToplam] = useState();

  const [Y1, setY1] = useState(false);
  const [Y2, setY2] = useState(false);
  const [Y3, setY3] = useState(false);
  const [Y4, setY4] = useState(false);

  const [engelleg, setEngelleg] = useState();
  const [engellei, setEngellei] = useState(false);
  const [bitti, setBitti] = useState(false);

  const [bekle, setBekle] = useState(false);

  const uid = firebase.auth().currentUser.uid;
  const _goBack = () => {
    navigation.goBack();
  };
  const uzanti = otherParam + "/" + itemId;
  console.log(itemId, uzanti);

  firebase
    .database()
    .ref("as/" + uzanti + "/base")
    .once("value")
    .then((snapshot) => {
      const asd = snapshot.val();
      setDif(asd);
    });
  firebase
    .database()
    .ref("as/" + uzanti + "/name")
    .once("value")
    .then((snapshot) => {
      const isim = snapshot.val();
      setName(isim);
      if (itemId == 1) {
        setEngelleg(true);
      } else {
        setEngelleg(false);
      }

      if (itemId == toplam) {
        setEngellei(true);
      } else {
        setEngellei(false);
      }
    });
  firebase
    .database()
    .ref("as/" + uzanti + "/vote")
    .once("value")
    .then((snapshot) => {
      const vo = snapshot.val();
      setVotes(vo);
    });
  firebase
    .database()
    .ref("as/" + uzanti + "/points")
    .once("value")
    .then((snapshot) => {
      const po = snapshot.val();
      setPoint(po);
    });
  firebase
    .database()
    .ref("as/" + otherParam + "/total")
    .once("value")
    .then((snapshot) => {
      const tops = snapshot.val();
      setToplam(tops);

      if (tops == null) {
        setBitti(true);
      }
    });
  console.log(toplam);

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Çözümler" />
      </Appbar.Header>
      <View>
        <View style={styles.titleArea}>
          <View>
            <Subheading>Yükleyen: {name}</Subheading>
          </View>
          <View>
            <Subheading>Çözümün Puanı: {point}</Subheading>
          </View>
        </View>
        {dif ? (
          <Image
            source={{ uri: `data:image/jpg;base64,${dif}` }}
            style={{
              width: 400,
              height: 300,
              justifyContent: "center",
              alignSelf: "center",
              marginVertical: 10,
            }}
          />
        ) : (
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
        )}
        <View style={styles.titleArea}>
          <Text>Çözümü Puanla</Text>
          <Slider
            style={{ width: 250, height: 20 }}
            minimumValue={1}
            value={51}
            step={1}
            maximumValue={100}
            minimumTrackTintColor="#560CCE"
            maximumTrackTintColor="#1A0A0A"
            onValueChange={(vv) => {
              setPuan(vv);
              if (puan > 10) {
                setY1(true);
                if (puan > 40) {
                  setY2(true);
                  if (puan > 60) {
                    setY3(true);
                    if (puan > 80) {
                      setY4(true);
                    } else setY4(false);
                  } else setY3(false);
                } else setY2(false);
              } else setY1(false);
            }}
          />
          <Text>{puan}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            const xyz = (point * votes + puan) / (votes + 1);
            firebase
              .database()
              .ref("as/" + uzanti)
              .update({
                vote: votes + 1,
                points: Math.floor(xyz),
              }); /*navigation.navigate("Sorular", {
              itemId: 1,
              ders: ders,
              konu: konu,
            });*/
          }}
        >
          <View style={styles.UpArea}>
            <Subheading>{puan} PUAN VER!</Subheading>
            <Text>
              {Y1 ? <Icon name="star" size={20} color="#000" /> : <View></View>}
              {Y2 ? <Icon name="star" size={20} color="#000" /> : <View></View>}
              {Y3 ? <Icon name="star" size={20} color="#000" /> : <View></View>}
              {Y4 ? <Icon name="star" size={20} color="#000" /> : <View></View>}
              <Icon name="star" size={20} color="#000" />
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.titleArea}>
          <TouchableOpacity
            disabled={engelleg}
            onPress={() => {
              setDif(null);
              if (itemId > 1) {
                navigation.navigate("Answers", {
                  itemId: itemId - 1,
                  otherParam: otherParam,
                });
              } else {
                Alert.alert("ilk çözümdesin geriye gidemezsin.");
              }
            }}
          >
            <View style={styles.titleArea}>
              <Text style={{ fontSize: 20 }}>
                <Icon name="arrow-left" size={24} color="#000" /> Önceki
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.titleArea}>
            <Text style={{ fontSize: 20 }}>
              {itemId}/{toplam}
            </Text>
          </View>

          <TouchableOpacity
            disabled={engellei}
            onPress={() => {
              console.log(toplam, itemId);
              if (itemId < toplam) {
                setDif(null);
                navigation.navigate("Answers", {
                  itemId: itemId + 1,
                  otherParam: otherParam,
                });
              } else {
                console.log("Son çözümdesin ileriye gidemezsin.");
              }
            }}
          >
            <View style={styles.titleArea}>
              <Text style={{ fontSize: 20 }}>
                Sonraki{" "}
                <Icon style={{}} name="arrow-right" size={24} color="#000" />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        //transparent={true}
        visible={bitti}
        presentationStyle="fullScreen"
        onRequestClose={() => {
          setBitti(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={(styles.modalText, { fontSize: 20, marginBottom: 30 })}
            >
              SİSTEMDE YÜKLÜ ÇÖZÜM YOK
            </Text>
            <Divider style={{ marginTop: 20 }} />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                _goBack();
                setBitti(!bitti);
              }}
            >
              <Text style={styles.textStyled}>Geri Dön</Text>
            </TouchableHighlight>
            <Divider style={{ marginTop: 20 }} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Answer;

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
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
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
  textStyled: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: 200,
  },
});
