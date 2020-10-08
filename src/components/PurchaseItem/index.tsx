import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";
import { displayCompleteDate, displayShortDate } from "../../utils/date";

import { Variables } from "../../styles/variables";
import { Purchase } from "../../types/Grocery";

interface PurchaseItemPropsProps {
  createAlert: (message: string, idPurchase: string|undefined) => void;
  item: Purchase;
  idPurchase: string|undefined;
}

const PurchaseItem: React.FC<PurchaseItemPropsProps> = ({
  item,
  idPurchase,
  createAlert,
}) => {
  const variables = Variables();

  return (
    <View
      style={{ ...styles.historyItem, backgroundColor: variables.CARD_COLOR }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: variables.TEXT_COLOR }}>
          {displayCompleteDate(item.date)}
        </Text>
        <Text style={{ color: variables.TEXT_COLOR }}>
          Valor por unidade: R${(item.price / item.quantity).toFixed(2)}
        </Text>
        <Text style={{ color: variables.TEXT_COLOR }}>
          Valor pago: R${item.price.toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          createAlert(
            `Atenção, você está prestes a excluir a compra de ${displayShortDate(
              item.date
            )}. Essa ação é irreversível. Deseja continuar?`,
            idPurchase
          )
        }
      >
        <Feather
          name="trash-2"
          size={variables.FONT_SIZE_LARGE + 10}
          color={variables.YELLOW_COLOR}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PurchaseItem;
