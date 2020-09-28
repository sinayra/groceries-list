import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";

export interface Purchase {
  date: Date;
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

  console.log(routeParams)

  function handleNavigationBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.item}>
        <Text>Product page</Text>
      </View>

      <View style={styles.floatingMenuButton}>
        <TouchableOpacity onPress={handleNavigationBack}>
          <FontAwesome name="step-backward" size={50} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
