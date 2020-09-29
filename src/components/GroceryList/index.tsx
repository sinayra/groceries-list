import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import GroceryItem, { Item } from "../GroceryItem";

import styles from "./styles";

interface GroceryListProps {
  data: Item[];
}

const GroceryList: React.FC<GroceryListProps> = ({ data }) => {
  return (
    <ScrollView style={styles.container}>
      {data.map((item, index) => (
        <GroceryItem key={index} item={item} />
      ))}
    </ScrollView>
  );
};

export default GroceryList;
