import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import GroceryItem from "../GroceryItem";

import styles from "./styles";
import data from "../../services/mock";

interface GroceryListProps {
  filter: string;
}

const GroceryList: React.FC<GroceryListProps> = ({ filter }) => {
  return (
    <ScrollView style={styles.container}>
      <Text>Grocery List</Text>
      {data.map((item, index) => (
        <GroceryItem key={index} item={item} />
      ))}
    </ScrollView>
  );
};

export default GroceryList;
