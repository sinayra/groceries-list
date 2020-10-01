import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";

import styles from "./styles";
import data from "../../services/mock";
import { Grocery } from "../../types/Grocery";
import { ExtendedTheme } from "../../types/ExtendedTheme";

interface AutoCompleteProps {
  onSelected: (name: string, id: number) => void;
  filter: string;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ onSelected, filter }) => {
  const { colors } = useTheme() as ExtendedTheme;
  const [productsList] = useState<Grocery[]>(data);
  const [filteredList, setFilteredList] = useState<Grocery[]>(data);

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
          <View style={{...styles.item, backgroundColor: colors.card, borderColor: colors.border}}>
            <Text style={{...styles.name, color: colors.primary}}>{item.name}</Text>
          </View>
        </TouchableHighlight>
      ))}
    </>
  );
};

export default AutoComplete;
