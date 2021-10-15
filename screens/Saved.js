import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Divider, Appbar, Caption, Subheading } from "react-native-paper";
import firebase from "firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";

const Saved = ({ navigation }) => {
  const uid = firebase.auth().currentUser.uid;
  const [ders, setDers] = useState("mat");

  const _goBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Favori Sorularım" />
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Favs", {
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
export default Saved;

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
