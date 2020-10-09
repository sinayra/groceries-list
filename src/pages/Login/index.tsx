import React, { useEffect } from "react";
import { SafeAreaView, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../services/firebase";
import * as GoogleSignIn from "expo-google-sign-in";
import styles from "./styles";

import { androidClientId } from "../../config/keys.json";

export default function Login() {
  const navigation = useNavigation();

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
      <Button title="Sign in with Google" onPress={signInWithGoogle} />
    </SafeAreaView>
  );
}
