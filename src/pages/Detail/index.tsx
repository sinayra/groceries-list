import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
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

import { useTheme } from "@react-navigation/native";
import { Grocery } from "../../types/Grocery";
import { ExtendedTheme } from "../../types/ExtendedTheme";
import PurchaseList from "../../components/PurchaseList";

interface RouteParams {
  item: Grocery;
}

export default function Detail() {
  const { colors } = useTheme() as ExtendedTheme;

  const route = useRoute();
  const routeParams = route.params as RouteParams;
  const { id, name, purchases } = routeParams.item;
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

  function handleDeleteGrocery() {
    console.log(id);
    ToastAndroid.show("not implemented", ToastAndroid.SHORT);
  }

  function handleDeleteHistory(index: number) {
    console.log(purchases[index]);
    ToastAndroid.show("not implemented", ToastAndroid.SHORT);
  }

  function createAlert(message: string, purchaseArrayIndex: number) {
    Alert.alert(
      "Excluir entrada",
      message,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () =>
            purchaseArrayIndex >= 0
              ? handleDeleteHistory(purchaseArrayIndex)
              : handleDeleteGrocery(),
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={{ ...styles.title, color: colors.text }}>{name}</Text>
          </View>
          <View style={styles.prices}>
            <View
              style={{
                ...styles.priceItem,
                backgroundColor: colors.secondaryCard,
              }}
            >
              <Text style={{ ...styles.priceText, color: colors.text }}>
                Max: R${maximum.toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                ...styles.priceItem,
                backgroundColor: colors.secondaryCard,
              }}
            >
              <Text style={{ ...styles.priceText, color: colors.text }}>
                Min: R$ {minimum.toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                ...styles.priceItem,
                backgroundColor: colors.secondaryCard,
              }}
            >
              <Text style={{ ...styles.priceText, color: colors.text }}>
                Preço mediano: R${median.toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                ...styles.priceItem,
                backgroundColor: colors.secondaryCard,
              }}
            >
              <Text style={{ ...styles.priceText, color: colors.text }}>
                Preço estimado: R${mode.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        <PurchaseList createAlert={createAlert} purchases={purchases} />
      </View>
      <RectButton
        style={{ ...styles.button, backgroundColor: colors.notification }}
        onPress={() =>
          createAlert(
            `Atenção, você está prestes a excluir o produto ${name}. Essa ação é irreversível. Deseja continuar?`,
            -1
          )
        }
      >
        <Text style={{ ...styles.buttonText, color: colors.text }}>
          Excluir
        </Text>
      </RectButton>
    </SafeAreaView>
  );
}
