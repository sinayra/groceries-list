import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Item } from "../GroceryItem";

import styles from "./styles";
import data from "../../services/mock";

interface AutoCompleteProps {
  onSelected: (name: string, id: number) => void;
  filter: string;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ onSelected, filter }) => {
  const [productsList] = useState<Item[]>(data);
  const [filteredList, setFilteredList] = useState<Item[]>(data);

  useEffect(() => {
    if (filter.length > 0) {
      const filterLower = filter.toLowerCase();
      const filtered = productsList.filter((p) =>
        p.name.toLowerCase().includes(filterLower)
      );

      setFilteredList(filtered);
      
    } else {
      setFilteredList(productsList);
    }
  }, [filter]);

  useEffect(() => {
    if (filteredList.length === 0) {
      onSelected(filter, 0);
    }
  },[filteredList])

  return (
    <>
      {filteredList.map((item, index) => (
        <TouchableHighlight
          key={index}
          onPress={() => {
            onSelected(item.name, item.id);
          }}
        >
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        </TouchableHighlight>
      ))}
    </>
  );
};

export default AutoComplete;
