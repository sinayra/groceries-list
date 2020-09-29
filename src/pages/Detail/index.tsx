import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import styles from "./styles";
import {
  createPricePerUnitArray,
  calculateAverage,
  calculateMax,
  calculateMin,
  calculateThresholdMode,
  calculateMedian,
} from "../../utils/purchaseMath";
import { displayCompleteDate } from "../../utils/date"

export interface Purchase {
  date: number;
  price: number;
  quantity: number;
}

export interface Item {
  name: string;
  purchases: Purchase[];
}

interface RouteParams {
  item: Item;
}

export default function Product() {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;
  const { name, purchases } = routeParams.item;
  const [maximum, setMaximum] = useState(0);
  const [minimum, setMinimum] = useState(0);
  const [mode, setMode] = useState(0);
  const [median, setMedian] = useState(0);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    const pricesPerUnit = createPricePerUnitArray(purchases);

    setAverage(calculateAverage(pricesPerUnit));
    setMode(calculateThresholdMode(pricesPerUnit, 0.1));
    setMaximum(calculateMax(pricesPerUnit));
    setMinimum(calculateMin(pricesPerUnit));
    setMedian(calculateMedian(pricesPerUnit));

    purchases.sort(function (a, b) {
      const keyA = a.date;
      const keyB = b.date;

      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text>{name}</Text>

        <View style={styles.prices}>
          <View style={styles.prices}>
            <View style={styles.priceItem}>
              <Text>Max: R${maximum.toFixed(2)}</Text>
            </View>

            <View style={styles.priceItem}>
              <Text>Min: R$ {minimum.toFixed(2)}</Text>
            </View>

            <View style={styles.priceItem}>
              <Text>Preço mediano: R${median.toFixed(2)}</Text>
            </View>

            <View style={styles.priceItem}>
              <Text>Preço estimado: R${mode.toFixed(2)}</Text>
            </View>
            
          </View>
        </View>
        <View style={styles.history}>
          {purchases.map((elem, index) => (
            <View key={index} style={styles.historyItem}>
              <Text>Data de compra: {displayCompleteDate(elem.date)}</Text>
              <Text>
                Valor por unidade: R${(elem.price / elem.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}
