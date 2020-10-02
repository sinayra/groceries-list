import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";
import {
  calculateMin,
  calculateMax,
  calculateMedian,
  createPricePerUnitArray,
} from "../../utils/purchaseMath";

import variables from "../../styles/variables";
import { ExtendedTheme } from "../../types/ExtendedTheme";
import { Grocery } from "../../types/Grocery";

const GroceryItem = ({item}:{item:Grocery}) => {
  const { colors } = useTheme() as ExtendedTheme;

  const { name, purchases } = item;
  const [maximum, setMaximum] = useState(0);
  const [minimum, setMinimum] = useState(0);
  const [median, setMedian] = useState(0);
  const navigation = useNavigation();

  function handleSeeHistory() {
    navigation.navigate("Detail", { item: item });
  }

  useEffect(() => {
    const pricesPerUnit = createPricePerUnitArray(purchases);

    setMedian(calculateMedian(pricesPerUnit));
    setMaximum(calculateMax(pricesPerUnit));
    setMinimum(calculateMin(pricesPerUnit));
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSeeHistory}>
        <Text style={{ ...styles.title, color: colors.text }}>{name}</Text>
        <View style={{ ...styles.prices, backgroundColor: colors.card }}>
          <View style={styles.priceItem}>
            <Feather
              name="trending-down"
              size={variables.FONT_SIZE_MEDIUM}
              color={colors.green}
              style={{ paddingRight: 5 }}
            />
            <Text style={{...styles.price, color: colors.text}}>R$ {minimum.toFixed(2)}</Text>
          </View>

          <View style={styles.priceItem}>
            <Feather
              name="star"
              size={variables.FONT_SIZE_LARGE + 5}
              color={colors.yellow}
              style={{ paddingRight: 5 }}
            />
            <Text style={{...styles.price, color: colors.text}}>R$ {median.toFixed(2)}</Text>
          </View>

          <View style={styles.priceItem}>
            <Feather
              name="trending-up"
              size={variables.FONT_SIZE_MEDIUM}
              color={colors.red}
              style={{ paddingRight: 5 }}
            />
            <Text style={{...styles.price, color: colors.text}}>R$ {maximum.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GroceryItem;
