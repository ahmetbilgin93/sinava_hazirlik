import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import firebase from "firebase";
import auth from "@react-native-firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onSignUpPressed = async () => {
    try {
      let response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (response && response.user) {
        Alert.alert("Kayıt Başarılı ✅", "İyi Çalışmalar");
        const userId = firebase.auth().currentUser.uid;
        firebase
          .database()
          .ref("users/" + userId)
          .update({ name: name });

        firebase
          .database()
          .ref("users/" + userId)
          .update({ uid: userId });

        firebase
          .database()
          .ref("users/" + userId)
          .update({ email: email });

        firebase
          .database()
          .ref("users/" + userId)
          .update({ password: password });

        navigation.reset({
          routes: [{ name: "TabScreen" }],
        });
      }
    } catch (err) {
      alert(err);
    } /*
    ,
    });*/
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Yeni Üyelik</Header>
      <TextInput
        label="Ad Soyad"
        returnKeyType="next"
        onChangeText={(name) => setName(name)}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        onChangeText={(email) => setEmail(email)}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Şifre"
        returnKeyType="done"
        onChangeText={(password) => setPassword(password)}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Üye Ol
      </Button>
      <View style={styles.row}>
        <Text>Zaten Hesabınız Var Mı? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default RegisterScreen;
