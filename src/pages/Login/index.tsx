import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../services/firebase";
import * as Google from 'expo-google-app-auth';
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";

import { androidStandaloneAppClientId, webClientId } from "../../config/keys.json";
import { Variables } from "../../styles/variables";
import logo from "../../assets/icon.png";

export default function Login() {
  const navigation = useNavigation();
  const variables = Variables();
  const [showLogin, setShowLogin] = useState(false);

  function logInSuccess() {
    navigation.navigate("Home");
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setShowLogin(false);
        logInSuccess();
      }
      else{
        setShowLogin(true);
      }
    });
  }, []);

  async function signInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        androidStandaloneAppClientId,
        androidClientId: webClientId,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
          
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
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
        {showLogin &&
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
        }
      </View>
    </SafeAreaView>
  );
}
