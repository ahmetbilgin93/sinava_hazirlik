import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
  Alert,
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

const AddScreen = ({ navigation }) => {
  const _goBack = () => {
    navigation.goBack();
  };
  const uid = firebase.auth().currentUser.uid;

  const [name, setName] = useState();
  const [soru, setSoru] = useState();
  const [ders, setDers] = useState("mat");
  const [konu, setKonu] = useState("");

  const [image, setImage] = useState();
  const [base, setBase] = useState();
  const [type, setType] = useState();

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
    .ref("qs/" + ders + "/" + konu)
    .once("value")
    .then((snapshot) => {
      console.log("TOTAL data: ", snapshot.child("total").val());
      const asd = snapshot.child("total").val();
      setDif(asd);
      console.log(dif);
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
    }
  });

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
    if (image && cevap && konu != "") {
      setIsYuklendi(false);
      const uploadUri = image;
      let fileType = uploadUri.substring(uploadUri.lastIndexOf(".") + 1);

      firebase
        .database()
        .ref("qs/" + ders + "/" + konu)
        .once("value")
        .then((snapshot) => {
          const total = snapshot.child("total").val();
          setSoru(total);
          console.log("soru sayısı:            " + soru);
        });

      try {
        await firebase
          .database()
          .ref("qs/" + ders + "/" + konu + "/" + (dif + 1))
          .update({
            base: base,
            ders: ders,
            name: name,
            type: image.substring(image.lastIndexOf(".") + 1),
            id: uid + new Date().getTime(),
            vote: 0,
            points: 0,
            cevap: cevap,
            t: 0,
            d: 0,
            y: 0,
          });

        firebase
          .database()
          .ref("qs/" + ders + "/" + konu)
          .update({ total: dif + 1 });

        addUps();
      } catch (e) {
        console.log(e);
      }

      setImage(null);
      setIsYuklendi(true);
      setCevap("");
      setA(false);
      setB(false);
      setC(false);
      setD(false);
      setE(false);
    } else {
      Alert.alert("Tüm Alanları Doldurun");
    }
  };

  const addUps = () => {
    firebase
      .database()
      .ref("myqs/" + uid + "/" + ders + "/total")
      .once("value")
      .then((snapshot) => {
        const favtops = snapshot.val() + 1;
        firebase
          .database()
          .ref("myqs/" + uid + "/" + ders + "/total")
          .set(favtops);
        const uzanti = "qs/" + ders + "/" + konu + "/" + (dif + 1);
        firebase
          .database()
          .ref("myqs/" + uid + "/" + ders + "/" + favtops + "/ref")
          .set(uzanti);
      });
  };

  return (
    <View>
      <Appbar.Header style={{ paddingHorizontal: 10, paddingVertical: 35 }}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content
          style={{ paddingHorizontal: 20, paddingVertical: 30 }}
          title="Yeni Soru Ekle"
          /*subtitle="Sorunuzun fotoğrafını çekin ve herkesle paylaşın"*/
        />
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
            <Picker.Item label="Konu Seçimi Yapınız" value="" />
            <Picker.Item label="Kümeler" value="Kümeler" />
            <Picker.Item label="Sayılar" value="Sayılar" />
            <Picker.Item label="Fonksiyonlar" value="Fonksiyonlar" />
            <Picker.Item label="Polinomlar" value="Polinomlar" />
            <Picker.Item label="Trigonometri" value="Trigonometri" />
            <Picker.Item label="Diziler" value="Diziler" />
            <Picker.Item label="Seriler" value="Seriler" />
            <Picker.Item label="Türev" value="Türev" />
            <Picker.Item label="İntegral" value="İntegral" />
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
            <Picker.Item label="Konu Seçimi Yapınız" value="" />
            <Picker.Item label="Açılar" value="Açılar" />
            <Picker.Item label="Üçgenler" value="Üçgenler" />
            <Picker.Item
              label="Geometrik Şekiller"
              value="Geometrik Şekiller"
            />
            <Picker.Item label="Uzay" value="bio" />
            <Picker.Item
              label="Üç Boyutlu Cisimler"
              value="Üç Boyutlu Cisimler"
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
            <Picker.Item label="Konu Seçimi Yapınız" value="" />
            <Picker.Item label="Madde" value="Madde" />
            <Picker.Item label="Newton Kanunları" value="Newton Kanunları" />
            <Picker.Item label="Kuvvet" value="Kuvvet" />
            <Picker.Item label="Hareket" value="Hareket" />
            <Picker.Item label="Kaldırma Kuvveti" value="Kaldırma Kuvveti" />
            <Picker.Item label="Basınç" value="Basınç" />
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
            <Picker.Item label="Konu Seçimi Yapınız" value="" />
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
            <Picker.Item label="Konu Seçimi Yapınız" value="" />
            <Picker.Item label="Hücre" value="Hücre" />
            <Picker.Item
              label="Tek Hücreli Canlılar"
              value="Tek Hücreli Canlılar"
            />
            <Picker.Item label="Memeli Hayvanlar" value="Memeli Hayvanlar" />
            <Picker.Item label="İnsanlar" value="İnsanlar" />
            <Picker.Item label="Sindirim Sistemi" value="Sindirim Sistemi" />
            <Picker.Item label="Dolaşım Sistemi" value="Dolaşım Sistemi" />
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
            <Picker.Item label="Konu Seçimi Yapınız" value="" />
            <Picker.Item label="Anlam Bilgisi " value="Anlam Bilgisi" />
            <Picker.Item label="Şiir Bilgisi" value="Şiir Bilgisi" />
            <Picker.Item label="Divan Edebiyatı " value="Divan Edebiyatı" />
            <Picker.Item
              label="Tanzimat Edebiyatı"
              value="Tanzimat Edebiyatı"
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
            <Picker.Item label="Konu Seçimi Yapınız" value="" />
            <Picker.Item label="İmla Kuralları" value="İmla Kuralları" />
            <Picker.Item
              label="Noktalama İşaretleri"
              value="Noktalama İşaretleri"
            />
            <Picker.Item label="Yazım Hataları" value="Yazım Hataları" />
            <Picker.Item label="Anlatım Bozukluğu" value="Anlatım Bozukluğu" />
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
            <Picker.Item label="Konu Seçimi Yapınız" value="" />
            <Picker.Item
              label="İlk Türk Uygarlıkları"
              value="İlk Türk Uygarlıkları"
            />
            <Picker.Item label="Orta Çağ" value="Orta Çağ" />
            <Picker.Item label="Selçuklular" value="Selçuklular" />
            <Picker.Item label="Osmanlılar" value="Osmanlılar" />
            <Picker.Item label="Cumhuriyet Dönemi" value="Cumhuriyet Dönemi" />
            <Picker.Item label="Atatürk" value="Atatürk" />
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
            <Picker.Item label="Konu Seçimi Yapınız" value="" />
            <Picker.Item label="Dünyanın Şekli" value="Dünyanın Şekli" />
            <Picker.Item label="Marmara Bölgesi" value="Marmara Bölgesi" />
            <Picker.Item label="Göller" value="Göller" />
            <Picker.Item label="Ovalar" value="Ovalar" />
            <Picker.Item
              label="Türkiye Coğrafyası"
              value="Türkiye Coğrafyası"
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
            <Picker.Item label="Konu Seçimi Yapınız" value="" />
            <Picker.Item label="Felsefeye Giriş" value="Felsefeye Giriş" />
            <Picker.Item label="Ahlak Felsefesi" value="Ahlak Felsefesi" />
            <Picker.Item label="Varlık Felsefesi" value="Varlık Felsefesi" />
            <Picker.Item label="Bilim Felsefesi" value="Bilim Felsefesi" />
            <Picker.Item label="Ünlü Filozoflar" value="Ünlü Filozoflar" />
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
            <Picker.Item label="Konu Seçimi Yapınız" value="" />
            <Picker.Item label="Geniş Zaman" value="Geniş Zaman" />
            <Picker.Item label="Şimdiki Zaman" value="Şimdiki Zaman" />
            <Picker.Item label="Geçmiş Zaman" value="Geçmiş Zaman" />
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

      <View style={styles.AddArea}>
        <Caption>Sorunun Doğru Cevabı:</Caption>

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
      <Divider />
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

      <Divider />

      <Divider />

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
            <Subheading>Soru Yükle</Subheading>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.UpArea}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Subheading>YÜKLENİYOR...</Subheading>
        </View>
      )}

      <Divider />
      {/* <View>
          <Image
            source={{ uri: `data:${type}/${tipi};base64,${soru}` }}
            style={{
              width: 200,
              height: 200,
              justifyContent: "center",
              alignSelf: "center",
              marginVertical: 30,
            }}
          />
        </View> */}
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
});

export default AddScreen;
