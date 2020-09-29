import React, { useEffect, useState } from "react";
import { View, Text, Linking, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Entypo } from "@expo/vector-icons";
import styles from "./styles";
import {
  calculateMin,
  calculateMax,
  calculateMedian,
  createPricePerUnitArray,
} from "../../utils/purchaseMath";

export interface Purchase {
  date: number;
  price: number;
  quantity: number;
}

export interface Item {
  id: number;
  name: string;
  purchases: Purchase[];
}

interface GroceryItemProps {
  item: Item;
}

const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
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
        <Text>{name}</Text>
        <View style={styles.prices}>
          <View style={styles.priceItem}>
            <Entypo name="triangle-up" size={24} color="black" />
            <Text>R$ {maximum.toFixed(2)}</Text>
          </View>
          <View style={styles.priceItem}>
            <Entypo name="thumbs-up" size={24} color="black" />
            <Text>R$ {median.toFixed(2)}</Text>
          </View>

          <View style={styles.priceItem}>
            <Entypo name="triangle-down" size={24} color="black" />
            <Text>R$ {minimum.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GroceryItem;
