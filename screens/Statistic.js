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
  DataTable,
} from "react-native-paper";
import firebase from "firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { set } from "react-native-reanimated";

const Statistic = ({ navigation }) => {
  const _goBack = () => {
    navigation.goBack();
  };

  const uid = firebase.auth().currentUser.uid;
  const mail = firebase.auth().currentUser.email;
  const [md, setMd] = useState();
  const [gd, setGd] = useState();
  const [fd, setFd] = useState();
  const [kd, setKd] = useState();
  const [bd, setBd] = useState();
  const [ed, setEd] = useState();
  const [dd, setDd] = useState();
  const [td, setTd] = useState();
  const [cd, setCd] = useState();
  const [fed, setFed] = useState();
  const [id, setId] = useState();

  const [my, setMy] = useState();
  const [gy, setGy] = useState();
  const [fy, setFy] = useState();
  const [ky, setKy] = useState();
  const [by, setBy] = useState();
  const [ey, setEy] = useState();
  const [dy, setDy] = useState();
  const [ty, setTy] = useState();
  const [cy, setCy] = useState();
  const [fey, setFey] = useState();
  const [iy, setIy] = useState();

  const [mt, setMt] = useState();
  const [gt, setGt] = useState();
  const [ft, setFt] = useState();
  const [kt, setKt] = useState();
  const [bt, setBt] = useState();
  const [et, setEt] = useState();
  const [dt, setDt] = useState();
  const [tt, setTt] = useState();
  const [ct, setCt] = useState();
  const [fet, setFet] = useState();
  const [it, setIt] = useState();

  useEffect(() => {
    const onValueChange = firebase
      .database()
      .ref("stats/" + uid)
      .on("value", (snapshot) => {
        console.log("User data: ", snapshot.child("mat/d").val());
        const d = snapshot.child("mat/d").val();
        const y = snapshot.child("mat/y").val();
        const t = snapshot.child("mat/t").val();
        setMd(d);
        setMy(y);
        setMt(t);
        const d1 = snapshot.child("geo/d").val();
        const y1 = snapshot.child("geo/y").val();
        const t1 = snapshot.child("geo/t").val();
        setGd(d1);
        setGy(y1);
        setGt(t1);
        const d2 = snapshot.child("fiz/d").val();
        const y2 = snapshot.child("fiz/y").val();
        const t2 = snapshot.child("fiz/t").val();
        setFd(d2);
        setFy(y2);
        setFt(t2);
        const d3 = snapshot.child("kim/d").val();
        const y3 = snapshot.child("kim/y").val();
        const t3 = snapshot.child("kim/t").val();
        setKd(d3);
        setKy(y3);
        setKt(t3);
        const d4 = snapshot.child("bio/d").val();
        const y4 = snapshot.child("bio/y").val();
        const t4 = snapshot.child("bio/t").val();
        setBd(d4);
        setBy(y4);
        setBt(t4);
        const d5 = snapshot.child("edb/d").val();
        const y5 = snapshot.child("edb/y").val();
        const t5 = snapshot.child("edb/t").val();
        setEd(d5);
        setEy(y5);
        setEt(t5);
        const d6 = snapshot.child("dil/d").val();
        const y6 = snapshot.child("dil/y").val();
        const t6 = snapshot.child("dil/t").val();
        setDd(d6);
        setDy(y6);
        setDt(t6);
        const d7 = snapshot.child("tar/d").val();
        const y7 = snapshot.child("tar/y").val();
        const t7 = snapshot.child("tar/t").val();
        setTd(d7);
        setTy(y7);
        setTt(t7);
        const d8 = snapshot.child("cog/d").val();
        const y8 = snapshot.child("cog/y").val();
        const t8 = snapshot.child("cog/t").val();
        setCd(d8);
        setCy(y8);
        setCt(t8);
        const d9 = snapshot.child("fel/d").val();
        const y9 = snapshot.child("fel/y").val();
        const t9 = snapshot.child("fel/t").val();
        setFed(d9);
        setFey(y9);
        setFet(t9);
        const d10 = snapshot.child("ing/d").val();
        const y10 = snapshot.child("ing/y").val();
        const t10 = snapshot.child("ing/t").val();
        setId(d10);
        setIy(y10);
        setIt(t10);
      });

    // Stop listening for updates when no longer required
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
        <Appbar.Content title="Ders İstatistiklerim" />
      </Appbar.Header>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Dersler</DataTable.Title>
          <DataTable.Title numeric>Çözülen</DataTable.Title>
          <DataTable.Title numeric>Doğru</DataTable.Title>
          <DataTable.Title numeric>Yanlış</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Matematik</DataTable.Cell>
          <DataTable.Cell numeric>{mt ? mt : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{md ? md : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{my ? my : 0}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Geometri</DataTable.Cell>
          <DataTable.Cell numeric>{gt ? gt : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{gd ? gd : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{gy ? gy : 0}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Fizik</DataTable.Cell>
          <DataTable.Cell numeric>{ft ? ft : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{fd ? fd : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{fy ? fy : 0}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Kimya</DataTable.Cell>
          <DataTable.Cell numeric>{kt ? kt : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{kd ? kd : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{ky ? ky : 0}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Biyoloji</DataTable.Cell>
          <DataTable.Cell numeric>{bt ? bt : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{bd ? bd : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{by ? by : 0}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Edebiyat</DataTable.Cell>
          <DataTable.Cell numeric>{et ? et : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{ed ? ed : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{ey ? ey : 0}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Dil Bilgisi</DataTable.Cell>
          <DataTable.Cell numeric>{dt ? dt : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{dd ? dd : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{dy ? dy : 0}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Tarih</DataTable.Cell>
          <DataTable.Cell numeric>{tt ? tt : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{td ? td : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{ty ? ty : 0}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Coğrafya</DataTable.Cell>
          <DataTable.Cell numeric>{ct ? ct : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{cd ? cd : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{cy ? cy : 0}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Felsefe</DataTable.Cell>
          <DataTable.Cell numeric>{fet ? fet : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{fed ? fed : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{fey ? fey : 0}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>İngilizce</DataTable.Cell>
          <DataTable.Cell numeric>{it ? it : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{id ? id : 0}</DataTable.Cell>
          <DataTable.Cell numeric>{iy ? iy : 0}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
};
export default Statistic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
