import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import styles from "./styles";
import data from "../../services/mock";
import { Grocery } from "../../types/Grocery";
import { Variables } from "../../styles/variables";

interface AutoCompleteProps {
  onSelected: (name: string, id: number) => void;
  filter: string;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ onSelected, filter }) => {
  const variables = Variables();
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
  }, [filteredList]);

  return (
    <>
      {filteredList.map((item, index) => (
        <TouchableHighlight
          key={index}
          onPress={() => {
            onSelected(item.name, item.id);
          }}
        >
          <View
            style={{
              ...styles.item,
              backgroundColor: variables.CARD_COLOR,
              borderColor: variables.BORDER_COLOR,
            }}
          >
            <Text
              style={{
                ...styles.name,
                color: variables.TEXT_COLOR,
                fontSize: variables.FONT_SIZE_SMALL,
              }}
            >
              {item.name}
            </Text>
          </View>
        </TouchableHighlight>
      ))}
    </>
  );
};

export default AutoComplete;
