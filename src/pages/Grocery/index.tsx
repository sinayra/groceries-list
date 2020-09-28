import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import styles from "./styles";

export default function Home() {
  function handleSavePurchase() {
    console.info("not implemented");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.form}>
          <Text>Grocery page</Text>
        </View>
        <RectButton style={styles.button} onPress={handleSavePurchase}>
          <Text style={styles.buttonText}>Salvar</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
}
