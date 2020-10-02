import React from "react";
import { FlatList, Text } from "react-native";
import { Purchase } from "../../types/Grocery";
import PurchaseItem from "../PurchaseItem";
import { Variables } from "../../styles/variables";
import styles from "./styles";

interface PurchaseListPropsProps {
  createAlert: (message: string, index: number) => void;
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
        renderItem={({ item, index }: { item: Purchase; index: number }) => (
          <PurchaseItem item={item} index={index} createAlert={createAlert} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

export default PurchaseList;
