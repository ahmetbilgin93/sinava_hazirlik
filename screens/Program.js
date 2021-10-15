import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Alert,
} from "react-native";
import { Appbar, DataTable } from "react-native-paper";
import firebase from "firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Program = ({ navigation }) => {
  const _goBack = () => {
    navigation.goBack();
  };

  const [duzenle, setDuzenle] = useState(false);
  const [hedefDers, setHedefDers] = useState();
  const [hedefSayi, setHedefSayi] = useState();

  const uid = firebase.auth().currentUser.uid;
  const [mat, setMat] = useState();
  const [geo, setGeo] = useState();
  const [fiz, setFiz] = useState();
  const [kim, setKim] = useState();
  const [bio, setBio] = useState();
  const [edb, setEdb] = useState();
  const [dil, setDil] = useState();
  const [tar, setTar] = useState();
  const [cog, setCog] = useState();
  const [fel, setFel] = useState();
  const [ing, setIng] = useState();

  const [mh, setMh] = useState();
  const [gh, setGh] = useState();
  const [fh, setFh] = useState();
  const [kh, setKh] = useState();
  const [bh, setBh] = useState();
  const [eh, setEh] = useState();
  const [dh, setDh] = useState();
  const [th, setTh] = useState();
  const [ch, setCh] = useState();
  const [feh, setFeh] = useState();
  const [ih, setIh] = useState();

  const [mc, setMC] = useState();
  const [gc, setGC] = useState();
  const [fc, setFC] = useState();
  const [kc, setKC] = useState();
  const [bc, setBC] = useState();
  const [ec, setEC] = useState();
  const [dc, setDC] = useState();
  const [tc, setTC] = useState();
  const [cc, setCC] = useState();
  const [fec, setFEC] = useState();
  const [ic, setIC] = useState();

  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var gunsonucu = date + "" + month + "" + year;
  var tarih = date + "/" + month + "/" + year;
  console.log(gunsonucu);

  useEffect(() => {
    const onValueChange = firebase
      .database()
      .ref("program/" + uid + "/" + gunsonucu)
      .on("value", (snapshot) => {
        const c = snapshot.child("MAT").val();
        setMC(c);
        const c2 = snapshot.child("GEO").val();
        setGC(c2);
        const c3 = snapshot.child("FIZ").val();
        setFC(c3);
        const c4 = snapshot.child("KIM").val();
        setKC(c4);
        const c5 = snapshot.child("BIO").val();
        setBC(c5);
        const c6 = snapshot.child("EDB").val();
        setEC(c6);
        const c7 = snapshot.child("DIL").val();
        setDC(c7);
        const c8 = snapshot.child("TAR").val();
        setTC(c8);
        const c9 = snapshot.child("COG").val();
        setCC(c9);
        const c10 = snapshot.child("FEL").val();
        setFEC(c10);
        const c11 = snapshot.child("ING").val();
        setIC(c11);

        const h = snapshot.child("mat").val();
        setMh(h);
        const h2 = snapshot.child("geo").val();
        setGh(h2);
        const h3 = snapshot.child("fiz").val();
        setFh(h3);
        const h4 = snapshot.child("kim").val();
        setKh(h4);
        const h5 = snapshot.child("bio").val();
        setBh(h5);
        const h6 = snapshot.child("edb").val();
        setEh(h6);
        const h7 = snapshot.child("dil").val();
        setDh(h7);
        const h8 = snapshot.child("tar").val();
        setTh(h8);
        const h9 = snapshot.child("cog").val();
        setCh(h9);
        const h10 = snapshot.child("fel").val();
        setFeh(h10);
        const h11 = snapshot.child("ing").val();
        setIh(h11);

        console.log(mh);
        console.log(mc);
      });

    return () =>
      firebase
        .database()
        .ref("stats/" + uid + "mat")
        .off("value", onValueChange);
  }, [uid]);

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Günlük Programım" />
      </Appbar.Header>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>{tarih}</DataTable.Title>
          <DataTable.Title numeric style={{ marginLeft: 50 }}>
            Çözülen
          </DataTable.Title>
          <DataTable.Title numeric style={{ marginRight: 10 }}>
            Hedef
          </DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Matematik</DataTable.Cell>
          <DataTable.Cell numeric>{mc ? mc : 0}</DataTable.Cell>
          <DataTable.Cell numeric>
            <TouchableOpacity
              onPress={() => {
                setHedefDers("Matematik");
                setDuzenle(true);
              }}
            >
              <Text>
                {mh ? mh : 0 + "   "}{" "}
                <Icon name="circle-edit-outline" size={20} color="#000" />
              </Text>
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Geometri</DataTable.Cell>
          <DataTable.Cell numeric>{gc ? gc : 0}</DataTable.Cell>
          <DataTable.Cell numeric>
            <TouchableOpacity
              onPress={() => {
                setHedefDers("Geometri");
                setDuzenle(true);
              }}
            >
              <Text>
                {gh ? gh : 0 + "   "}{" "}
                <Icon name="circle-edit-outline" size={20} color="#000" />
              </Text>
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Fizik</DataTable.Cell>
          <DataTable.Cell numeric>{fc ? fc : 0}</DataTable.Cell>
          <DataTable.Cell numeric>
            <TouchableOpacity
              onPress={() => {
                setHedefDers("Fizik");
                setDuzenle(true);
              }}
            >
              <Text>
                {fh ? fh : 0 + "   "}{" "}
                <Icon name="circle-edit-outline" size={20} color="#000" />
              </Text>
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Kimya</DataTable.Cell>
          <DataTable.Cell numeric>{kc ? kc : 0}</DataTable.Cell>
          <DataTable.Cell numeric>
            <TouchableOpacity
              onPress={() => {
                setHedefDers("Kimya");
                setDuzenle(true);
              }}
            >
              <Text>
                {kh ? kh : 0 + "   "}{" "}
                <Icon name="circle-edit-outline" size={20} color="#000" />
              </Text>
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Biyoloji</DataTable.Cell>
          <DataTable.Cell numeric>{bc ? bc : 0}</DataTable.Cell>
          <DataTable.Cell numeric>
            <TouchableOpacity
              onPress={() => {
                setHedefDers("Biyoloji");
                setDuzenle(true);
              }}
            >
              <Text>
                {bh ? bh : 0 + "   "}{" "}
                <Icon name="circle-edit-outline" size={20} color="#000" />
              </Text>
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Edebiyat</DataTable.Cell>
          <DataTable.Cell numeric>{ec ? ec : 0}</DataTable.Cell>
          <DataTable.Cell numeric>
            <TouchableOpacity
              onPress={() => {
                setHedefDers("Edebiyat");
                setDuzenle(true);
              }}
            >
              <Text>
                {eh ? eh : 0 + "   "}{" "}
                <Icon name="circle-edit-outline" size={20} color="#000" />
              </Text>
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Dil Bilgisi</DataTable.Cell>
          <DataTable.Cell numeric>{dc ? dc : 0}</DataTable.Cell>
          <DataTable.Cell numeric>
            <TouchableOpacity
              onPress={() => {
                setHedefDers("Dil Bilgisi");
                setDuzenle(true);
              }}
            >
              <Text>
                {dh ? dh : 0 + "   "}{" "}
                <Icon name="circle-edit-outline" size={20} color="#000" />
              </Text>
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Tarih</DataTable.Cell>
          <DataTable.Cell numeric>{tc ? tc : 0}</DataTable.Cell>
          <DataTable.Cell numeric>
            <TouchableOpacity
              onPress={() => {
                setHedefDers("Tarih");
                setDuzenle(true);
              }}
            >
              <Text>
                {th ? th : 0 + "   "}{" "}
                <Icon name="circle-edit-outline" size={20} color="#000" />
              </Text>
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Coğrafya</DataTable.Cell>
          <DataTable.Cell numeric>{cc ? cc : 0}</DataTable.Cell>
          <DataTable.Cell numeric>
            <TouchableOpacity
              onPress={() => {
                setHedefDers("Coğrafya");
                setDuzenle(true);
              }}
            >
              <Text>
                {ch ? ch : 0 + "   "}{" "}
                <Icon name="circle-edit-outline" size={20} color="#000" />
              </Text>
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Felsefe</DataTable.Cell>
          <DataTable.Cell numeric>{fec ? fec : 0}</DataTable.Cell>
          <DataTable.Cell numeric>
            <TouchableOpacity
              onPress={() => {
                setHedefDers("Felsefe");
                setDuzenle(true);
              }}
            >
              <Text>
                {feh ? feh : 0 + "   "}{" "}
                <Icon name="circle-edit-outline" size={20} color="#000" />
              </Text>
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>İngilizce</DataTable.Cell>
          <DataTable.Cell numeric>{ic ? ic : 0}</DataTable.Cell>
          <DataTable.Cell numeric>
            <TouchableOpacity
              onPress={() => {
                setHedefDers("İngilizce");
                setDuzenle(true);
              }}
            >
              <Text>
                {ih ? ih : 0 + "   "}{" "}
                <Icon name="circle-edit-outline" size={20} color="#000" />
              </Text>
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={duzenle}
        onRequestClose={() => {
          setDuzenle(!duzenle);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {hedefDers} Dersi İçin Hedef Soru Sayısı Giriniz
            </Text>
            <TextInput
              style={{
                height: 40,
                width: 200,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                borderBottomColor: "gray",
                borderWidth: 1,
                borderTopColor: "white",
                borderLeftColor: "white",
                borderRightColor: "white",
                marginBottom: 15,
              }}
              keyboardType="numeric"
              label="Hedef"
              onChangeText={(text) => setHedefSayi(text)}
            />

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                if (hedefSayi != null) {
                  if (hedefSayi <= 1000 && hedefSayi >= 0) {
                    if (hedefDers == "Matematik") {
                      firebase
                        .database()
                        .ref("program/" + uid + "/" + gunsonucu + "/mat")
                        .set(hedefSayi);
                    }

                    if (hedefDers == "Geometri") {
                      firebase
                        .database()
                        .ref("program/" + uid + "/" + gunsonucu + "/geo")
                        .set(hedefSayi);
                    }

                    if (hedefDers == "Fizik") {
                      firebase
                        .database()
                        .ref("program/" + uid + "/" + gunsonucu + "/fiz")
                        .set(hedefSayi);
                    }

                    if (hedefDers == "Kimya") {
                      firebase
                        .database()
                        .ref("program/" + uid + "/" + gunsonucu + "/kim")
                        .set(hedefSayi);
                    }

                    if (hedefDers == "Biyoloji") {
                      firebase
                        .database()
                        .ref("program/" + uid + "/" + gunsonucu + "/bio")
                        .set(hedefSayi);
                    }

                    if (hedefDers == "Edebiyat") {
                      firebase
                        .database()
                        .ref("program/" + uid + "/" + gunsonucu + "/edb")
                        .set(hedefSayi);
                    }

                    if (hedefDers == "Dil Bilgisi") {
                      firebase
                        .database()
                        .ref("program/" + uid + "/" + gunsonucu + "/dil")
                        .set(hedefSayi);
                    }

                    if (hedefDers == "Tarih") {
                      firebase
                        .database()
                        .ref("program/" + uid + "/" + gunsonucu + "/tar")
                        .set(hedefSayi);
                    }

                    if (hedefDers == "Coğrafya") {
                      firebase
                        .database()
                        .ref("program/" + uid + "/" + gunsonucu + "/cog")
                        .set(hedefSayi);
                    }

                    if (hedefDers == "Felsefe") {
                      firebase
                        .database()
                        .ref("program/" + uid + "/" + gunsonucu + "/fel")
                        .set(hedefSayi);
                    }

                    if (hedefDers == "İngilizce") {
                      firebase
                        .database()
                        .ref("program/" + uid + "/" + gunsonucu + "/ing")
                        .set(hedefSayi);
                    }
                  } else {
                    Alert.alert("0 ile 1000 arası değer giriniz.");
                  }
                }
                setHedefSayi(null);
                setDuzenle(!duzenle);
              }}
            >
              <Text style={styles.textStyled}>Kaydet</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Program;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsArea: {
    backgroundColor: "white",
    padding: 10,
    paddingBottom: 10,
    marginTop: 10,
    alignItems: "center",
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
  textStyled: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: 200,
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
  titleArea: {
    backgroundColor: "white",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 0,
    flexDirection: "row",
  },
});
