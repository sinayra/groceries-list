import React from "react";
import { FlatList, Text } from "react-native";
import { Purchase } from "../../types/Grocery";
import PurchaseHistoryItem from "../PurchaseHistoryItem";
import { Variables } from "../../styles/variables";
import styles from "./styles";

interface PurchaseHistoryListProps {
  createAlert: (message: string, idPurchase: string|undefined) => void;
  purchases: Purchase[];
}

const PurchaseHistoryList: React.FC<PurchaseHistoryListProps> = ({
  createAlert,
  purchases,
}) => {
  const variables = Variables();
  return (
    <>
      <Text
        style={{ ...styles.subtitle, fontSize: variables.FONT_SIZE_LARGE + 3 }}
      >
        Histórico de compras
      </Text>
      <FlatList
        data={purchases}
        renderItem={({ item }: { item: Purchase}) => (
          <PurchaseHistoryItem item={item} idPurchase={item.id} createAlert={createAlert} />
        )}
        keyExtractor={(item, index) => item.id as string}
      />
    </>
  );
};

export default PurchaseHistoryList;
