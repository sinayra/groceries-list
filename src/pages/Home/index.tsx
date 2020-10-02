import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, SafeAreaView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

import GroceryList from "../../components/GroceryList";
import styles from "./styles";

import data from "../../services/mock";
import { Grocery } from "../../types/Grocery";
import { Variables } from "../../styles/variables";

export default function Home() {
  const variables = Variables();
  const navigation = useNavigation();
  const [filter, setFilter] = useState("");
  const [productsList] = useState<Grocery[]>(data);
  const [filteredList, setFilteredList] = useState<Grocery[]>(data);

  useEffect(() => {
    if (filter.length > 0) {
      const filterLower = filter.toLowerCase();
      const filtered = productsList.filter((p) =>
        p.name.toLowerCase().includes(filterLower)
      );

      setFilteredList(filtered);
    } else {
      setFilteredList(productsList);
    }
  }, [filter]);

  function handleAddPurchase() {
    navigation.navigate("Grocery");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          ...styles.content,
          backgroundColor: variables.BACKGROUND_COLOR,
        }}
      >
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: variables.CARD_COLOR,
            color: variables.TEXT_COLOR,
          }}
          value={filter}
          onChangeText={(filter) => setFilter(filter)}
          placeholder="Pesquisar..."
          placeholderTextColor={variables.BORDER_COLOR}
        />

        <GroceryList data={filteredList} />
      </View>
      <TouchableOpacity
        style={{ ...styles.floatingMenuButton, backgroundColor: "transparent" }}
        onPress={handleAddPurchase}
      >
        <FontAwesome
          name="plus-circle"
          size={variables.FONT_SIZE_LARGE + 30}
          color={variables.PRIMARY_COLOR}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
