import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

import { Item } from '../../components/GroceryItem';

import GroceryList from "../../components/GroceryList";
import styles from "./styles";

import data from "../../services/mock";

export default function Home() {
  const navigation = useNavigation();
  const [filter, setFilter] = useState("");
  const [productsList] = useState<Item[]>(data);
  const [filteredList, setFilteredList] = useState<Item[]>(data);

  useEffect(() => {
    if (filter.length > 0) {
      const filterLower = filter.toLowerCase();
      const filtered = productsList.filter(p => p.name.toLowerCase().includes(filterLower));

      setFilteredList(filtered);
    } else {
      setFilteredList(productsList);
    }
  }, [filter])

  function handleAddPurchase() {
    navigation.navigate("Grocery");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          value={filter}
          onChangeText={(filter) => setFilter(filter)}
          placeholder="Pesquisar..."
          placeholderTextColor="#C1BCCC"
        />

        <GroceryList
          data={filteredList}
        />
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
