import React from "react";
import { View, Text, Linking } from "react-native";

import { Entypo } from '@expo/vector-icons'; 
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

interface GroceryItemProps {
  item: Item;
}

const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  const { name, purchases } = item;
  const pricesPerUnit = [];
  let maximum = 0, mininum = Number.MAX_SAFE_INTEGER;

  for (const purchase of purchases) {
    const price = purchase.price / purchase.quantity;
    pricesPerUnit.push(price);

    if(price > maximum){
      maximum = price;
    }
    
    if (price < mininum){
      mininum = price;
    }

  }

  pricesPerUnit.sort();
  let current = {
    value: pricesPerUnit[0],
    count: 1
  };
  let best = {
    value: 0,
    count: 0
  }

  for(let i = 1; i < pricesPerUnit.length; i++){
    if(pricesPerUnit[i] != current.value){
      if (current.value > best.value){
        best = current;
      }

      current.value = pricesPerUnit[i];
      current.count = 1;
    }
    else{
      current.count++;
    }
  }

  if (current.value > best.value){
    best = current;
  }
  const mode = best.value;

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <View style={styles.prices}>
        <View style={styles.priceItem}>
          <Entypo name="triangle-up" size={24} color="black" />
          <Text>R$ {maximum.toFixed(2)}</Text>
        </View>
        <View style={styles.priceItem}>
        <Entypo name="thumbs-up" size={24} color="black" />
          <Text>R$ {mode.toFixed(2)}</Text>
        </View>

        <View style={styles.priceItem}>
          <Entypo name="triangle-down" size={24} color="black" />
          <Text>R$ {mininum.toFixed(2)}</Text>
        </View>
        
      </View>
    </View>
  );
};

export default GroceryItem;
