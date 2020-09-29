import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

import GroceryList from "../../components/GroceryList";
import styles from "./styles";

export default function Home() {
  const navigation = useNavigation();
  const [grocery, setGrocery] = useState("");

  function handleAddPurchase() {
    navigation.navigate("Grocery");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          value={grocery}
          onChangeText={(grocery) => setGrocery(grocery)}
          placeholder="Search"
          placeholderTextColor="#C1BCCC"
        />

        <GroceryList filter={grocery} />
        <TouchableOpacity
          style={styles.floatingMenuButton}
          onPress={handleAddPurchase}
        >
          <FontAwesome name="plus-circle" size={50} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
