import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from '@react-navigation/native';

import GroceryList from "../../components/GroceryList";
import styles from "./styles";

import data from "../../services/mock";
import { Grocery } from "../../types/Grocery";
import { ScrollView } from "react-native-gesture-handler";
import variables from "../../styles/variables";

export default function Home() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [filter, setFilter] = useState("");
  const [productsList] = useState<Grocery[]>(data);
  const [filteredList, setFilteredList] = useState<Grocery[]>(data);

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
      <ScrollView style={{...styles.content, backgroundColor: colors.background}}>
        <TextInput
          style={{...styles.input, backgroundColor: colors.card, color: colors.text}}
          value={filter}
          onChangeText={(filter) => setFilter(filter)}
          placeholder="Pesquisar..."
          placeholderTextColor={colors.border}
        />

        <GroceryList
          data={filteredList}
        />
      </ScrollView>
      <TouchableOpacity
          style={{...styles.floatingMenuButton, backgroundColor: "transparent"}}
          onPress={handleAddPurchase}
        >
          <FontAwesome name="plus-circle" size={variables.FONT_SIZE_LARGE + 30} color={colors.primary}/>
        </TouchableOpacity>
    </SafeAreaView>
  );
}
