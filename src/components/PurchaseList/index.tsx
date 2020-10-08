import React from "react";
import { FlatList, Text } from "react-native";
import { Purchase } from "../../types/Grocery";
import PurchaseItem from "../PurchaseItem";
import { Variables } from "../../styles/variables";
import styles from "./styles";

interface PurchaseListPropsProps {
  createAlert: (message: string, idPurchase: string|undefined) => void;
  purchases: Purchase[];
}

const PurchaseList: React.FC<PurchaseListPropsProps> = ({
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
          <PurchaseItem item={item} idPurchase={item.id} createAlert={createAlert} />
        )}
        keyExtractor={(item, index) => item.id as string}
      />
    </>
  );
};

export default PurchaseList;
