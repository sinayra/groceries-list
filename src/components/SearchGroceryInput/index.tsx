import React, { useState, useEffect } from "react";
import { TextInput } from "react-native";

import styles from "./styles";
import { Grocery } from "../../types/Grocery";
import { Variables } from "../../styles/variables";

interface SearchGroceryInputProps {
  onChangeFilter: (value: Grocery[]) => void;
  onChangeValue: (value: string) => void;
  list: Grocery[]
}

const SearchGroceryInput: React.FC<SearchGroceryInputProps> = ({ onChangeFilter: setFiltered, list, onChangeValue }) => {
  const variables = Variables();
  const [filter, setFilter] = useState("");

  function search() {
    const filterLower = filter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const filtered = list.filter((p) => {
      const name = (p.name.toLowerCase()).normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      return name.includes(filterLower)
    }
    );

    setFiltered(filtered);
    onChangeValue(filter);
  }

  useEffect(() => {
    if (filter.length > 0) {
      search();
    } else {
      setFiltered(list);
      onChangeValue("");
    }
  }, [filter]);

  useEffect(() => {
    if (filter.length > 0) {
      search();
    }
  }, [list])

  useEffect(() => {
    if (filter.length > 0) {
      const filterLower = filter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      const filtered = list.filter((p) => {
        const name = (p.name.toLowerCase()).normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        return name.includes(filterLower)
      }
      );

      setFiltered(filtered);
      onChangeValue(filter);

    } else {
      setFiltered(list);
      onChangeValue("");
    }
  }, [filter]);


  return (
    <TextInput
      style={{
        ...styles.input,
        backgroundColor: variables.CARD_COLOR,
        color: variables.TEXT_COLOR,
      }}
      value={filter}
      onChangeText={(filter) => setFilter(filter)}
      placeholder="Pesquisar..."
      placeholderTextColor={variables.BORDER_COLOR}
    />
  );
};

export default SearchGroceryInput;
