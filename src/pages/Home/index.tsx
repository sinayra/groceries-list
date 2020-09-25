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

  function handleAddPurchase() {
    navigation.navigate("Grocery");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.item}>
        <Text>Home page</Text>
      </View>
      <View style={styles.floatingMenuButton}>
      <TouchableOpacity
        onPress={handleAddPurchase}
      >
        <FontAwesome name="plus-circle" size={50} color="black" />
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
