import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Divider, Appbar, Caption, Subheading } from "react-native-paper";
import firebase from "firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";

const Konu = ({ navigation }) => {
  const uid = firebase.auth().currentUser.uid;

  const _goBack = () => {
    navigation.goBack();
  };

  const [name, setName] = useState();
  const [soru, setSoru] = useState();
  const [ders, setDers] = useState("mat");
  const [konu, setKonu] = useState("");
  const [baslik, setBaslik] = useState("Matematik");

  const [image, setImage] = useState();
  const [base, setBase] = useState();

  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);
  const [d, setD] = useState(false);
  const [e, setE] = useState(false);
  const [cevap, setCevap] = useState();

  const [dif, setDif] = useState();

  const [isYuklendi, setIsYuklendi] = useState(true);

  const [mat, setMat] = useState(true);
  const [geo, setGeo] = useState(false);
  const [fiz, setFiz] = useState(false);
  const [kim, setKim] = useState(false);
  const [bio, setBio] = useState(false);
  const [edb, setEdb] = useState(false);
  const [dil, setDil] = useState(false);
  const [tar, setTar] = useState(false);
  const [cog, setCog] = useState(false);
  const [fel, setFel] = useState(false);
  const [ing, setIng] = useState(false);

  useEffect(() => {
    if (ders == "mat") {
      setMat(true);
      setGeo(false);
      setFiz(false);
      setKim(false);
      setBio(false);
      setEdb(false);
      setDil(false);
      setTar(false);
      setCog(false);
      setFel(false);
      setIng(false);
      setBaslik("Matematik");
    }
    if (ders == "geo") {
      setMat(false);
      setGeo(true);
      setFiz(false);
      setKim(false);
      setBio(false);
      setEdb(false);
      setDil(false);
      setTar(false);
      setCog(false);
      setFel(false);
      setIng(false);
      setBaslik("Geometri");
    }
    if (ders == "fiz") {
      setMat(false);
      setGeo(false);
      setFiz(true);
      setKim(false);
      setBio(false);
      setEdb(false);
      setDil(false);
      setTar(false);
      setCog(false);
      setFel(false);
      setIng(false);
      setBaslik("Fizik");
    }
    if (ders == "kim") {
      setMat(false);
      setGeo(false);
      setFiz(false);
      setKim(true);
      setBio(false);
      setEdb(false);
      setDil(false);
      setTar(false);
      setCog(false);
      setFel(false);
      setIng(false);
      setBaslik("Kimya");
    }
    if (ders == "bio") {
      setMat(false);
      setGeo(false);
      setFiz(false);
      setKim(false);
      setBio(true);
      setEdb(false);
      setDil(false);
      setTar(false);
      setCog(false);
      setFel(false);
      setIng(false);
      setBaslik("Biyoloji");
    }
    if (ders == "edb") {
      setMat(false);
      setGeo(false);
      setFiz(false);
      setKim(false);
      setBio(false);
      setEdb(true);
      setDil(false);
      setTar(false);
      setCog(false);
      setFel(false);
      setIng(false);
      setBaslik("Edebiyat");
    }
    if (ders == "dil") {
      setMat(false);
      setGeo(false);
      setFiz(false);
      setKim(false);
      setBio(false);
      setEdb(false);
      setDil(true);
      setTar(false);
      setCog(false);
      setFel(false);
      setIng(false);
      setBaslik("Dil Bilgisi");
    }
    if (ders == "tar") {
      setMat(false);
      setGeo(false);
      setFiz(false);
      setKim(false);
      setBio(false);
      setEdb(false);
      setDil(false);
      setTar(true);
      setCog(false);
      setFel(false);
      setIng(false);
      setBaslik("Tarih");
    }
    if (ders == "cog") {
      setMat(false);
      setGeo(false);
      setFiz(false);
      setKim(false);
      setBio(false);
      setEdb(false);
      setDil(false);
      setTar(false);
      setCog(true);
      setFel(false);
      setIng(false);
      setBaslik("Co??rafya");
    }
    if (ders == "fel") {
      setMat(false);
      setGeo(false);
      setFiz(false);
      setKim(false);
      setBio(false);
      setEdb(false);
      setDil(false);
      setTar(false);
      setCog(false);
      setFel(true);
      setIng(false);
      setBaslik("Felsefe");
    }
    if (ders == "ing") {
      setMat(false);
      setGeo(false);
      setFiz(false);
      setKim(false);
      setBio(false);
      setEdb(false);
      setDil(false);
      setTar(false);
      setCog(false);
      setFel(false);
      setIng(true);
      setBaslik("??ngilizce");
    }
  });

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Ders ve Konu Se??imi" />
      </Appbar.Header>

      <View style={styles.AddArea}>
        <Caption>Dersin Ad??:</Caption>
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
          <Picker.Item label="Co??rafya" value="cog" />
          <Picker.Item label="Tarih" value="tar" />
          <Picker.Item label="Felsefe" value="fel" />
          <Picker.Item label="??ngilizce" value="ing" />
        </Picker>
      </View>
      <Divider />

      {mat ? (
        <View style={styles.AddArea}>
          <Caption>Konu:</Caption>
          <Picker
            selectedValue={konu}
            style={{ height: 50 }}
            onValueChange={(konu, itemIndex) => {
              setKonu(konu);
            }}
          >
            <Picker.Item label="Konu Se??imi Yap??n??z" value="" />
            <Picker.Item label="K??meler" value="K??meler" />
            <Picker.Item label="Say??lar" value="Say??lar" />
            <Picker.Item label="Fonksiyonlar" value="Fonksiyonlar" />
            <Picker.Item label="Polinomlar" value="Polinomlar" />
            <Picker.Item label="Trigonometri" value="Trigonometri" />
            <Picker.Item label="Diziler" value="Diziler" />
            <Picker.Item label="Seriler" value="Seriler" />
            <Picker.Item label="T??rev" value="T??rev" />
            <Picker.Item label="??ntegral" value="??ntegral" />
          </Picker>
        </View>
      ) : (
        <View></View>
      )}
      {geo ? (
        <View style={styles.AddArea}>
          <Caption>Konu:</Caption>
          <Picker
            selectedValue={konu}
            style={{ height: 50 }}
            onValueChange={(konu, itemIndex) => setKonu(konu)}
          >
            <Picker.Item label="Konu Se??imi Yap??n??z" value="" />
            <Picker.Item label="A????lar" value="A????lar" />
            <Picker.Item label="????genler" value="????genler" />
            <Picker.Item
              label="Geometrik ??ekiller"
              value="Geometrik ??ekiller"
            />
            <Picker.Item label="Uzay" value="bio" />
            <Picker.Item
              label="???? Boyutlu Cisimler"
              value="???? Boyutlu Cisimler"
            />
          </Picker>
        </View>
      ) : (
        <View></View>
      )}
      {fiz ? (
        <View style={styles.AddArea}>
          <Caption>Konu:</Caption>
          <Picker
            selectedValue={konu}
            style={{ height: 50 }}
            onValueChange={(konu, itemIndex) => setKonu(konu)}
          >
            <Picker.Item label="Konu Se??imi Yap??n??z" value="" />
            <Picker.Item label="Madde" value="Madde" />
            <Picker.Item label="Newton Kanunlar??" value="Newton Kanunlar??" />
            <Picker.Item label="Kuvvet" value="Kuvvet" />
            <Picker.Item label="Hareket" value="Hareket" />
            <Picker.Item label="Kald??rma Kuvveti" value="Kald??rma Kuvveti" />
            <Picker.Item label="Bas??n??" value="Bas??n??" />
            <Picker.Item label="Elektrik" value="Elektrik" />
          </Picker>
        </View>
      ) : (
        <View></View>
      )}
      {kim ? (
        <View style={styles.AddArea}>
          <Caption>Konu:</Caption>
          <Picker
            selectedValue={konu}
            style={{ height: 50 }}
            onValueChange={(konu, itemIndex) => setKonu(konu)}
          >
            <Picker.Item label="Konu Se??imi Yap??n??z" value="" />
            <Picker.Item
              label="Maddenin Temel Halleri"
              value="Maddenin Temel Halleri"
            />
            <Picker.Item label="Atomlar" value="Atomlar" />
            <Picker.Item label="Periyodik Tablo" value="Periyodik Tablo" />
            <Picker.Item label="Asit-Baz" value="Asit-Baz" />
            <Picker.Item label="Organik Kimya" value="Organik Kimya" />
          </Picker>
        </View>
      ) : (
        <View></View>
      )}
      {bio ? (
        <View style={styles.AddArea}>
          <Caption>Konu:</Caption>
          <Picker
            selectedValue={konu}
            style={{ height: 50 }}
            onValueChange={(konu, itemIndex) => setKonu(konu)}
          >
            <Picker.Item label="Konu Se??imi Yap??n??z" value="" />
            <Picker.Item label="H??cre" value="H??cre" />
            <Picker.Item
              label="Tek H??creli Canl??lar"
              value="Tek H??creli Canl??lar"
            />
            <Picker.Item label="Memeli Hayvanlar" value="Memeli Hayvanlar" />
            <Picker.Item label="??nsanlar" value="??nsanlar" />
            <Picker.Item label="Sindirim Sistemi" value="Sindirim Sistemi" />
            <Picker.Item label="Dola????m Sistemi" value="Dola????m Sistemi" />
          </Picker>
        </View>
      ) : (
        <View></View>
      )}
      {edb ? (
        <View style={styles.AddArea}>
          <Caption>Konu:</Caption>
          <Picker
            selectedValue={konu}
            style={{ height: 50 }}
            onValueChange={(konu, itemIndex) => setKonu(konu)}
          >
            <Picker.Item label="Konu Se??imi Yap??n??z" value="" />
            <Picker.Item label="Anlam Bilgisi " value="Anlam Bilgisi" />
            <Picker.Item label="??iir Bilgisi" value="??iir Bilgisi" />
            <Picker.Item label="Divan Edebiyat?? " value="Divan Edebiyat??" />
            <Picker.Item
              label="Tanzimat Edebiyat??"
              value="Tanzimat Edebiyat??"
            />
          </Picker>
        </View>
      ) : (
        <View></View>
      )}
      {dil ? (
        <View style={styles.AddArea}>
          <Caption>Konu:</Caption>
          <Picker
            selectedValue={konu}
            style={{ height: 50 }}
            onValueChange={(konu, itemIndex) => setKonu(konu)}
          >
            <Picker.Item label="Konu Se??imi Yap??n??z" value="" />
            <Picker.Item label="??mla Kurallar??" value="??mla Kurallar??" />
            <Picker.Item
              label="Noktalama ????aretleri"
              value="Noktalama ????aretleri"
            />
            <Picker.Item label="Yaz??m Hatalar??" value="Yaz??m Hatalar??" />
            <Picker.Item label="Anlat??m Bozuklu??u" value="Anlat??m Bozuklu??u" />
          </Picker>
        </View>
      ) : (
        <View></View>
      )}
      {tar ? (
        <View style={styles.AddArea}>
          <Caption>Konu:</Caption>
          <Picker
            selectedValue={konu}
            style={{ height: 50 }}
            onValueChange={(konu, itemIndex) => setKonu(konu)}
          >
            <Picker.Item label="Konu Se??imi Yap??n??z" value="" />
            <Picker.Item
              label="??lk T??rk Uygarl??klar??"
              value="??lk T??rk Uygarl??klar??"
            />
            <Picker.Item label="Orta ??a??" value="Orta ??a??" />
            <Picker.Item label="Sel??uklular" value="Sel??uklular" />
            <Picker.Item label="Osmanl??lar" value="Osmanl??lar" />
            <Picker.Item label="Cumhuriyet D??nemi" value="Cumhuriyet D??nemi" />
            <Picker.Item label="Atat??rk" value="Atat??rk" />
          </Picker>
        </View>
      ) : (
        <View></View>
      )}
      {cog ? (
        <View style={styles.AddArea}>
          <Caption>Konu:</Caption>
          <Picker
            selectedValue={konu}
            style={{ height: 50 }}
            onValueChange={(konu, itemIndex) => setKonu(konu)}
          >
            <Picker.Item label="Konu Se??imi Yap??n??z" value="" />
            <Picker.Item label="D??nyan??n ??ekli" value="D??nyan??n ??ekli" />
            <Picker.Item label="Marmara B??lgesi" value="Marmara B??lgesi" />
            <Picker.Item label="G??ller" value="G??ller" />
            <Picker.Item label="Ovalar" value="Ovalar" />
            <Picker.Item
              label="T??rkiye Co??rafyas??"
              value="T??rkiye Co??rafyas??"
            />
            <Picker.Item label="Enlem/Boylam" value="Enlem/Boylam" />
          </Picker>
        </View>
      ) : (
        <View></View>
      )}
      {fel ? (
        <View style={styles.AddArea}>
          <Caption>Konu:</Caption>
          <Picker
            selectedValue={konu}
            style={{ height: 50 }}
            onValueChange={(konu, itemIndex) => setKonu(konu)}
          >
            <Picker.Item label="Konu Se??imi Yap??n??z" value="" />
            <Picker.Item label="Felsefeye Giri??" value="Felsefeye Giri??" />
            <Picker.Item label="Ahlak Felsefesi" value="Ahlak Felsefesi" />
            <Picker.Item label="Varl??k Felsefesi" value="Varl??k Felsefesi" />
            <Picker.Item label="Bilim Felsefesi" value="Bilim Felsefesi" />
            <Picker.Item label="??nl?? Filozoflar" value="??nl?? Filozoflar" />
          </Picker>
        </View>
      ) : (
        <View></View>
      )}
      {ing ? (
        <View style={styles.AddArea}>
          <Caption>Konu:</Caption>
          <Picker
            selectedValue={konu}
            style={{ height: 50 }}
            onValueChange={(konu, itemIndex) => setKonu(konu)}
          >
            <Picker.Item label="Konu Se??imi Yap??n??z" value="" />
            <Picker.Item label="Geni?? Zaman" value="Geni?? Zaman" />
            <Picker.Item label="??imdiki Zaman" value="??imdiki Zaman" />
            <Picker.Item label="Ge??mi?? Zaman" value="Ge??mi?? Zaman" />
            <Picker.Item label="Gelecek Zaman" value="Gelecek Zaman" />
            <Picker.Item label="If Clause" value="Trigonometri" />
            <Picker.Item label="When/While" value="When/While" />
            <Picker.Item label="Reading" value="Reading" />
            <Picker.Item label="Kelime Bilgisi" value="Kelime Bilgisi" />
          </Picker>
        </View>
      ) : (
        <View></View>
      )}
      <TouchableOpacity
        onPress={() => {
          if (konu != "") {
            navigation.navigate("Sorular", {
              itemId: 1,
              ders: ders,
              konu: konu,
            });
          } else {
            Alert.alert("Konu se??imi yap??n??z.");
          }
        }}
      >
        <View style={styles.UpArea}>
          <Subheading>????zmeye Ba??la</Subheading>
          <Text>
            <Icon name="cloud-download" size={20} color="#000" />
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Konu;

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
