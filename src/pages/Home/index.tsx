import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, SafeAreaView, TextInput, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

import GroceryList from "../../components/GroceryList";
import styles from "./styles";

import { getGroceries } from "../../services/database";
import { Grocery } from "../../types/Grocery";
import { Variables } from "../../styles/variables";

export default function Home() {
  const variables = Variables();
  const navigation = useNavigation();
  const [filter, setFilter] = useState("");
  const [productsList, setProductsList] = useState<Grocery[]>([]);
  const [filteredList, setFilteredList] = useState<Grocery[]>([]);

  async function loadFromDatabase() {
    const result = await getGroceries();
    setFilter("");

    if (result) {
      ToastAndroid.show("Firebase carregado com sucesso", ToastAndroid.SHORT);
      setProductsList(result);
      setFilteredList(result);
    }
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      loadFromDatabase();
    });
  }, []);

  useEffect(() => {
    if (productsList && filter.length > 0) {
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
