import React, { useState, useEffect } from "react";
import { View, SafeAreaView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import PriceSummaryList from "../../components/PriceSummaryList";
import styles from "./styles";

import { getGroceries } from "../../services/database";
import { Grocery } from "../../types/Grocery";
import { Variables } from "../../styles/variables";
import SearchGroceryInput from "../../components/SearchGroceryInput";

export default function Home() {
  const variables = Variables();
  const navigation = useNavigation();
  const [filter, setFilter] = useState("");
  const [productsList, setProductsList] = useState<Grocery[]>([]);
  const [filteredList, setFilteredList] = useState<Grocery[]>([]);

  async function loadFromDatabase() {
    const result = await getGroceries();

    if (result) {
      setProductsList(result);
      setFilteredList(result);
    }
  }

  function hangleChangeFilterValue(value: string){
    setFilter(value);
  }

  function handleChangeFilteredList(value: Grocery[]){
    setFilteredList(value);
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      loadFromDatabase();
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          ...styles.content,
          backgroundColor: variables.BACKGROUND_COLOR,
        }}
      >
        <SearchGroceryInput list={productsList} onChangeFilter={handleChangeFilteredList} onChangeValue={hangleChangeFilterValue} />

        <PriceSummaryList data={filteredList} filter={filter} />
      </View>
    </SafeAreaView>
  );
}
