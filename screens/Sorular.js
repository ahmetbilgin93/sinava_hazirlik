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
  ActivityIndicator,
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
import { NavigationHelpersContext } from "@react-navigation/native";
import { set } from "react-native-reanimated";

const Sorular = ({ navigation, route }) => {
  const uid = firebase.auth().currentUser.uid;
  const mail = firebase.auth().currentUser.email;
  const { ders, itemId, konu } = route.params;
  console.log(itemId, ders, konu);

  const [dif, setDif] = useState();
  const [rn, setRn] = useState();
  const [soru, setSoru] = useState();
  const [isim, setisim] = useState();
  const [kitap, setKitap] = useState();
  const [point, setPoint] = useState();
  const [coz, setCoz] = useState(true);
  const [puan, setPuan] = useState();
  const [currentDate, setCurrentDate] = useState("");
  const [dogru, setDogru] = useState();
  const [y, setY] = useState();
  const [t, setT] = useState();
  const [vo, setVo] = useState();
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);
  const [d, setD] = useState(false);
  const [e, setE] = useState(false);
  const [cevap, setCevap] = useState();
  const [sonuc, setSonuc] = useState();
  const [cevapDogru, setCevapDogru] = useState(false);
  const [cevapYanlis, setCevapYanlis] = useState(false);
  const [yuzde, setYuzde] = useState();
  const [gor, setGor] = useState("");
  const [favtop, setFavTop] = useState();
  const [faved, setFaved] = useState(false);

  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var gunsonucu = date + "" + month + "" + year;

  var sorularBurada = "qs/" + ders + "/" + konu + "/";

  const DERS = ders.toUpperCase();
  console.log(DERS, DERS, DERS, DERS);

  const _goBack = () => {
    navigation.goBack();
  };

  firebase
    .database()
    .ref("qs/" + ders + "/" + konu)
    .once("value")
    .then((snapshot) => {
      const toplamSoru = snapshot.child("total").val();
      setDif(toplamSoru);
    });

  const addFav = () => {
    firebase
      .database()
      .ref("favs/" + uid + "/" + ders + "/total")
      .once("value")
      .then((snapshot) => {
        console.log(snapshot.val());
        const favtops = snapshot.val() + 1;
        console.log(favtops);

        firebase
          .database()
          .ref("favs/" + uid + "/" + ders + "/")
          .update({
            total: favtops,
          });
        firebase
          .database()
          .ref("favs/" + uid + "/" + ders + "/" + favtops)
          .update({
            ref: "qs/" + ders + "/" + konu + "/" + itemId,
          });
      });
    setFaved(true);
  };

  //const randumm = () => {
  //var diff = Math.floor(Math.random() * dif) + 1;
  firebase
    .database()
    .ref("qs/" + ders + "/" + konu + "/" + itemId + "/base")
    .once("value")
    .then((snapshot) => {
      const bases = snapshot.val();
      setSoru(bases);
      //Alert.alert("oldu mu?" + dif);
    });

  firebase
    .database()
    .ref(sorularBurada + itemId + "/name")
    .once("value")
    .then((snapshot) => {
      const isims = snapshot.val();
      setisim(isims);
    });
  firebase
    .database()
    .ref(sorularBurada + itemId + "/points")
    .once("value")
    .then((snapshot) => {
      const points = snapshot.val();
      setPoint(points);
    });
  firebase
    .database()
    .ref(sorularBurada + itemId + "/cevap")
    .once("value")
    .then((snapshot) => {
      const sonucs = snapshot.val();
      setSonuc(sonucs);
    });

  firebase
    .database()
    .ref(sorularBurada + itemId + "/d")
    .once("value")
    .then((snapshot) => {
      const dogrus = snapshot.val();
      setDogru(dogrus);
    });
  firebase
    .database()
    .ref(sorularBurada + itemId + "/y")
    .once("value")
    .then((snapshot) => {
      const ys = snapshot.val();
      setY(ys);
    });
  firebase
    .database()
    .ref(sorularBurada + itemId + "/t")
    .once("value")
    .then((snapshot) => {
      const ts = snapshot.val();
      setT(ts);
      const hesapla = Math.floor((dogru / t) * 100);
      setYuzde(Math.floor((dogru / t) * 100));
    });
  firebase
    .database()
    .ref(sorularBurada + itemId + "/vote")
    .once("value")
    .then((snapshot) => {
      const vs = snapshot.val();
      setVo(vs);
    });
  firebase
    .database()
    .ref(sorularBurada + itemId + "/id")
    .once("value")
    .then((snapshot) => {
      const idd = snapshot.val();
      setRn(idd);
    });

  //setRn(diff);
  //};

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={konu} />
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
            <View>
              <Subheading>Yükleyen: {isim}</Subheading>
            </View>
            <View>
              <Subheading>Sorunun Puanı: {point}</Subheading>
            </View>
          </View>
          <View style={styles.titleArea}>
            <View>
              <Subheading>Yanıtlayan Kişi Sayısı: {t}</Subheading>
            </View>
            <View>
              <Subheading>Doğruluk Yüzdesi: %{yuzde}</Subheading>
            </View>
          </View>
          <View style={styles.titleArea}>
            <TouchableOpacity
              disabled={faved}
              onPress={() => {
                addFav();
              }}
            >
              <View style={styles.UpArea}>
                <Text>
                  <Icon name="bookmark-plus" size={20} color="#000" />
                </Text>
                <Subheading>Favoriye Ekle</Subheading>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFaved(false);
                if (itemId < dif) {
                  setSoru(null);
                  navigation.navigate("Sorular", {
                    itemId: itemId + 1,
                    ders: ders,
                    konu: konu,
                  });
                } else {
                  setSoru(null);
                  navigation.navigate("Sorular", {
                    itemId: 1,
                    ders: ders,
                    konu: konu,
                  });
                }
              }}
            >
              <View style={styles.UpArea}>
                <Text>
                  <Icon name="autorenew" size={20} color="#000" />
                </Text>
                <Subheading>Yeni Soru</Subheading>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const cevapAdresi = "qs" + ders + "" + konu + "" + itemId;
                navigation.navigate("Answers", {
                  itemId: 1,
                  otherParam: rn,
                });
              }}
            >
              <View style={styles.UpArea}>
                <Text>
                  <Icon name="eye-settings" size={20} color="#000" />
                </Text>
                <Subheading>Çözümlere Bak</Subheading>
              </View>
            </TouchableOpacity>
          </View>
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
          <View style={styles.AddArea}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ zIndex: 5 }}
                onPress={() => {
                  if (!a) {
                    setA(true);
                    setB(false);
                    setC(false);
                    setD(false);
                    setE(false);
                  }
                  setCevap("A");
                }}
              >
                <View style={styles.cevap}>
                  <View style={styles.sec}>
                    <Checkbox
                      color="#560CCE"
                      status={a ? "checked" : "unchecked"}
                    />
                  </View>
                  <View>
                    <Title>A</Title>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ zIndex: 5 }}
                onPress={() => {
                  if (!b) {
                    setA(false);
                    setB(true);
                    setC(false);
                    setD(false);
                    setE(false);
                  }
                  setCevap("B");
                }}
              >
                <View style={styles.cevap}>
                  <View style={styles.sec}>
                    <Checkbox
                      color="#560CCE"
                      status={b ? "checked" : "unchecked"}
                    />
                  </View>
                  <View>
                    <Title>B</Title>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ zIndex: 5 }}
                onPress={() => {
                  if (!c) {
                    setA(false);
                    setB(false);
                    setC(true);
                    setD(false);
                    setE(false);
                  }
                  setCevap("C");
                }}
              >
                <View style={styles.cevap}>
                  <View style={styles.sec}>
                    <Checkbox
                      color="#560CCE"
                      status={c ? "checked" : "unchecked"}
                    />
                  </View>
                  <View>
                    <Title>C</Title>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ zIndex: 5 }}
                onPress={() => {
                  if (!d) {
                    setA(false);
                    setB(false);
                    setC(false);
                    setD(true);
                    setE(false);
                  }
                  setCevap("D");
                }}
              >
                <View style={styles.cevap}>
                  <View style={styles.sec}>
                    <Checkbox
                      color="#560CCE"
                      status={d ? "checked" : "unchecked"}
                    />
                  </View>
                  <View>
                    <Title>D</Title>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ zIndex: 5 }}
                onPress={() => {
                  if (!e) {
                    setA(false);
                    setB(false);
                    setC(false);
                    setD(false);
                    setE(true);
                  }
                  setCevap("E");
                }}
              >
                <View style={styles.cevap}>
                  <View style={styles.sec}>
                    <Checkbox
                      color="#560CCE"
                      status={e ? "checked" : "unchecked"}
                    />
                  </View>
                  <View>
                    <Title>E</Title>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              if (coz) {
                firebase
                  .database()
                  .ref("program/" + uid)
                  .once("value")
                  .then(function (snapshot) {
                    const yenimi = snapshot.child(gunsonucu).exists();
                    if (!yenimi) {
                      firebase
                        .database()
                        .ref("program/" + uid + "/" + gunsonucu + "/" + DERS)
                        .set(1);
                    } else {
                      firebase
                        .database()
                        .ref("program/" + uid + "/" + gunsonucu + "/" + DERS)
                        .transaction(function (add) {
                          return add + 1;
                        });
                    }
                  });
              }
              if (sonuc == cevap) {
                setPuan(51);
                setCevapDogru(true);
                setCoz(true);
                firebase
                  .database()
                  .ref("qs/" + ders + "/" + konu + "/" + itemId)
                  .update({
                    d: dogru + 1,
                    t: t + 1,
                  });

                firebase
                  .database()
                  .ref("stats/" + uid + "/" + ders + "/d")
                  .transaction(function (add) {
                    return add + 1;
                  });
                firebase
                  .database()
                  .ref("stats/" + uid + "/" + ders + "/t")
                  .transaction(function (add) {
                    return add + 1;
                  });
              } else {
                setT(t + 1);
                setY(y + 1);
                setCoz(false);
                firebase
                  .database()
                  .ref("qs/" + ders + "/" + konu + "/" + itemId)
                  .update({
                    y: y + 1,
                    t: t + 1,
                  });
                firebase
                  .database()
                  .ref("stats/" + uid + "/" + ders + "/y")
                  .transaction(function (add) {
                    return add + 1;
                  });
                firebase
                  .database()
                  .ref("stats/" + uid + "/" + ders + "/t")
                  .transaction(function (add) {
                    return add + 1;
                  });
                setGor("");
                setCevapYanlis(!cevapYanlis);
              }
            }}
          >
            <View style={styles.UpAreas}>
              <Subheading style={{ color: "white" }}>Cevapla</Subheading>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={cevapDogru}
        onRequestClose={() => {
          setCevapDogru(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={(styles.modalText, { fontSize: 20, marginBottom: 25 })}
            >
              TEBRİKLER CEVAP DOĞRU
            </Text>
            <Text style={styles.modalText}>Soruyu Değerlendirin:</Text>
            <Slider
              style={{ width: 250, height: 40 }}
              minimumValue={1}
              value={51}
              step={1}
              maximumValue={100}
              minimumTrackTintColor="#560CCE"
              maximumTrackTintColor="#1A0A0A"
              onValueChange={(vv) => setPuan(vv)}
            />
            <Text>{puan} PUAN</Text>
            {/*
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
              onChangeText={(text) => setPuan(text)}
            />*/}
            <Divider style={{ marginTop: 20 }} />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setFaved(false);
                firebase
                  .database()
                  .ref(sorularBurada + itemId)
                  .update({
                    vote: vo + 1,
                    points: Math.floor((point * vo + puan) / (vo + 1)),
                  });
                if (itemId < dif) {
                  setSoru(null);
                  navigation.navigate("Sorular", {
                    itemId: itemId + 1,
                    ders: ders,
                    konu: konu,
                  });
                } else {
                  setSoru(null);
                  navigation.navigate("Sorular", {
                    itemId: 1,
                    ders: ders,
                    konu: konu,
                  });
                }
                setCevapDogru(!cevapDogru);
              }}
            >
              <Text style={styles.textStyled}>Sıradaki Soruya Geç</Text>
            </TouchableHighlight>
            <Divider style={{ marginTop: 20 }} />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                firebase
                  .database()
                  .ref(sorularBurada + itemId)
                  .update({
                    vote: vo + 1,
                    points: Math.floor((point * vo + puan) / (vo + 1)),
                  });

                navigation.navigate("Cyukle", {
                  itemId: itemId,
                  otherParam: rn,
                });
                setCevapDogru(!cevapDogru);
              }}
            >
              <Text style={styles.textStyled}>Çözümünüzü Yükleyin</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={cevapYanlis}
        onRequestClose={() => {
          setGor(sonuc);
          setCevapYanlis(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={(styles.modalText, { fontSize: 20 })}>
              Cevabınız Yanlış
            </Text>
            <Divider style={{ marginTop: 20 }} />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setGor("");
                navigation.navigate("Answers", {
                  itemId: 1,
                  otherParam: rn,
                });
                setCevapYanlis(!cevapYanlis);
              }}
            >
              <Text style={styles.textStyled}>Çözümlere Bak</Text>
            </TouchableHighlight>
            <Divider style={{ marginTop: 10 }} />

            <Divider style={{ marginTop: 10 }} />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setGor(sonuc);
              }}
            >
              <Text style={styles.textStyled}>Doğru Cevabı Görüntüle</Text>
            </TouchableHighlight>
            <Text style={{ fontSize: 21 }}>{gor}</Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setCevapYanlis(!cevapYanlis);
              }}
            >
              <Text style={styles.textStyled}>Soruya Dön </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Sorular;

const styles = StyleSheet.create({
  UpArea: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  UpAreas: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#560CCE",
    textShadowColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleArea: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  AddArea: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingLeft: 30,
    marginTop: 3,
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
  textStyled: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: 200,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
