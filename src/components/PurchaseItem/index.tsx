import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";
import { displayCompleteDate, displayShortDate } from "../../utils/date";

import variables from "../../styles/variables";
import { ExtendedTheme } from "../../types/ExtendedTheme";
import { Purchase } from "../../types/Grocery";

interface PurchaseItemPropsProps {
  createAlert: (message: string, index: number) => void;
  item: Purchase;
  index: number;
}

const PurchaseItem: React.FC<PurchaseItemPropsProps> = ({
  item,
  index,
  createAlert,
}) => {
  const { colors } = useTheme() as ExtendedTheme;

  return (
    <View style={{ ...styles.historyItem, backgroundColor: colors.card }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.text }}>
          {displayCompleteDate(item.date)}
        </Text>
        <Text style={{ color: colors.text }}>
          Valor por unidade: R${(item.price / item.quantity).toFixed(2)}
        </Text>
        <Text style={{ color: colors.text }}>
          Valor pago: R${(item.price).toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          createAlert(
            `Atenção, você está prestes a excluir a compra de ${displayShortDate(
              item.date
            )}. Essa ação é irreversível. Deseja continuar?`,
            index
          )
        }
      >
        <Feather
          name="trash-2"
          size={variables.FONT_SIZE_LARGE + 10}
          color={colors.yellow}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PurchaseItem;
