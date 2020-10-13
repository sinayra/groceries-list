import React, { useEffect } from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../services/firebase";
import * as GoogleSignIn from "expo-google-sign-in";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";

import { androidClientId } from "../../config/keys.json";
import { Variables } from "../../styles/variables";
import logo from "../../assets/icon.png";

export default function Login() {
  const navigation = useNavigation();
  const variables = Variables();

  function logInSuccess() {
    navigation.navigate("Home");
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        logInSuccess();
      }
    });
  }, []);

  async function signInWithGoogle() {
    try {
      await GoogleSignIn.initAsync({
        clientId: androidClientId,
        scopes: ["profile", "email"],
      });

      const { type, user } = await GoogleSignIn.signInAsync();

      if (type === "success" && user) {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          user.auth?.idToken,
          user.auth?.accessToken
        );
        const googleProfileData = await firebase
          .auth()
          .signInWithCredential(credential);
        logInSuccess();
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          ...styles.content,
          backgroundColor: variables.BACKGROUND_COLOR,
        }}
      >
        <View style={styles.logo}>
          <Image source={logo} />
        </View>

        <RectButton
          style={styles.button}
          onPress={signInWithGoogle}
        >
          <View
            style={{
              ...styles.buttonContent,
            }}
          >
            <AntDesign
              name="google"
              style={{
                paddingLeft: 15,
              }}
              size={variables.FONT_SIZE_LARGE + 18}
              color="#FFF"
            />
            <Text
              style={{
                ...styles.buttonText,
                color: "#FFF",
                fontSize: variables.FONT_SIZE_LARGE + 5,
              }}
            >
              Faça login no Google
            </Text>
          </View>
        </RectButton>
      </View>
    </SafeAreaView>
  );
}
