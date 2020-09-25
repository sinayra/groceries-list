import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";

export default function Home() {
  const navigation = useNavigation();

  function handleNavigationBack() {
    navigation.goBack();
  }

  function handleSavePurchase() {
    console.info("not implemented");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.item}>
        <Text>Grocery page</Text>
      </View>

      <View style={styles.floatingMenuButton}>
        <TouchableOpacity onPress={handleNavigationBack}>
          <FontAwesome name="step-backward" size={50} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSavePurchase}>
          <FontAwesome name="save" size={50} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
