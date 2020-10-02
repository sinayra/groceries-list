import React from "react";
import { FlatList } from "react-native";
import { Purchase } from "../../types/Grocery";
import PurchaseItem from "../PurchaseItem";

interface PurchaseListPropsProps {
  createAlert: (message: string, index: number) => void;
  purchases: Purchase[];
}

const PurchaseList: React.FC<PurchaseListPropsProps> = ({
  createAlert,
  purchases,
}) => {
  return (
    <FlatList
      data={purchases}
      renderItem={({ item, index }: { item: Purchase; index: number }) => (
        <PurchaseItem item={item} index={index} createAlert={createAlert} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default PurchaseList;
