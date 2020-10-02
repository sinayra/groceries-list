import React from "react";
import { FlatList } from "react-native";
import { Grocery } from "../../types/Grocery";
import GroceryItem from "../GroceryItem";

interface GroceryListProps {
  data: Grocery[];
}

const GroceryList: React.FC<GroceryListProps> = ({ data }) => {
  return (
      <FlatList
        data={data}
        renderItem={({item}: {item:Grocery}) => <GroceryItem item={item} />}
        keyExtractor={(item, index) => item.id.toString()}
      />
  );
};

export default GroceryList;
