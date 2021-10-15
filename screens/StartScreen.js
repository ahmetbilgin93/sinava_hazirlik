import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

const StartScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Hoş Geldiniz</Header>
    <Paragraph>Sıanvlara Hazırlanmanın En Kolay Yolu.</Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate("LoginScreen")}>
      Giriş Yap
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate("RegisterScreen")}
    >
      Üye Ol
    </Button>
  </Background>
);

export default StartScreen;
