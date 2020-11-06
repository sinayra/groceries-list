import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import styles from "./styles"
import {
  calculateMin,
  calculateMax,
  calculateMedian,
  createPricePerUnitArray,
} from "../../utils/purchaseMath";

import { Variables } from "../../styles/variables";
import { Grocery } from "../../types/Grocery";

const PriceSummaryItem = ({ item }: { item: Grocery }) => {
  const variables = Variables();

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
        <Text
          style={{
            ...styles.title,
            color: variables.TEXT_COLOR,
            fontSize: variables.FONT_SIZE_LARGE,
          }}
        >
          {name}
        </Text>
        <View
          style={{ ...styles.prices, backgroundColor: variables.CARD_COLOR }}
        >
          <View style={styles.priceItem}>
            <Feather
              name="trending-down"
              size={variables.FONT_SIZE_MEDIUM}
              color={variables.GREEN_COLOR}
              style={{ paddingRight: 5 }}
            />
            <Text style={{ ...styles.price, color: variables.TEXT_COLOR }}>
              €{minimum.toFixed(2)}
            </Text>
          </View>

          <View style={styles.priceItem}>
            <Feather
              name="star"
              size={variables.FONT_SIZE_LARGE + 5}
              color={variables.YELLOW_COLOR}
              style={{ paddingRight: 5 }}
            />
            <Text style={{ ...styles.price, color: variables.TEXT_COLOR }}>
              €{median.toFixed(2)}
            </Text>
          </View>

          <View style={styles.priceItem}>
            <Feather
              name="trending-up"
              size={variables.FONT_SIZE_MEDIUM}
              color={variables.RED_COLOR}
              style={{ paddingRight: 5 }}
            />
            <Text style={{ ...styles.price, color: variables.TEXT_COLOR }}>
              €{maximum.toFixed(2)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PriceSummaryItem;
