import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, SafeAreaView, TextInput, ToastAndroid, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./styles";

import { Variables } from "../../styles/variables";

interface GroceryListProps {
    focus: "Home" | "Add" | "List";
  }

  const Menu: React.FC<GroceryListProps> = ({ focus }) => {
  const variables = Variables();
  const navigation = useNavigation();

  function handleHome() {
    navigation.navigate("Home");
  }

  function handleAddPurchase() {
    navigation.navigate("Grocery");
  }

  function handleListPurchase() {
    navigation.navigate("List");
  }

  return (

      <View style={{...styles.content}}>
        
        <TouchableOpacity
          style={{ ...styles.button, borderColor: variables.BORDER_COLOR, backgroundColor: variables.CARD_COLOR }}
          onPress={handleListPurchase}
        >
          <FontAwesome
            name="list-ul"
            size={variables.FONT_SIZE_LARGE + 30}
            color={focus === "List" ? variables.TEXT_COLOR : variables.PRIMARY_COLOR}
          />
          <Text style={{fontSize: variables.FONT_SIZE_SMALL, color: variables.TEXT_COLOR}}>Lista de compras</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.button, borderColor: variables.BORDER_COLOR, backgroundColor: variables.CARD_COLOR }}
          onPress={handleHome}
        >
          <FontAwesome
            name="home"
            size={variables.FONT_SIZE_LARGE + 30}
            color={focus === "Home" ? variables.TEXT_COLOR : variables.PRIMARY_COLOR}
          />
          <Text style={{fontSize: variables.FONT_SIZE_SMALL, color: variables.TEXT_COLOR}}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.button, borderColor: variables.BORDER_COLOR, backgroundColor: variables.CARD_COLOR }}
          onPress={handleAddPurchase}
        >
          <FontAwesome
            name="plus-circle"
            size={variables.FONT_SIZE_LARGE + 30}
            color={focus === "Add" ? variables.TEXT_COLOR : variables.PRIMARY_COLOR}
          />
          <Text style={{fontSize: variables.FONT_SIZE_SMALL, color: variables.TEXT_COLOR}}>Adicionar</Text>
        </TouchableOpacity>

      </View>
  );
}

export default Menu;
