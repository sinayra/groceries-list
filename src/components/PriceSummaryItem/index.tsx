import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Dialog from "react-native-dialog";

import styles from "./styles"
import {
  calculateMin,
  calculateMax,
  calculateMedian,
  createPricePerUnitArray,
} from "../../utils/purchaseMath";

import { Variables } from "../../styles/variables";
import { Grocery } from "../../types/Grocery";
import { addToPurchaseList, removeFromPurchaseList, getGroceryPurchaseListInfo } from "../../services/database";


interface PriceSummaryItemProps {
  item: Grocery;
}

const PriceSummaryItem: React.FC<PriceSummaryItemProps> = ({ item }) => {
  const variables = Variables();

  const { name, purchases } = item;
  const [maximum, setMaximum] = useState(0);
  const [minimum, setMinimum] = useState(0);
  const [median, setMedian] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [newListId, setNewListId] = useState<string | undefined>(item.listId)
  const navigation = useNavigation();

  function handleSeeHistory() {
    setShowOptions(false);
    navigation.navigate("Detail", { item: item });
  }

  async function handleAddToList(value: boolean) {
    if (value === true) {
      await addToPurchaseList(item.id);
    }
    else {
      await removeFromPurchaseList(newListId);
      setNewListId(undefined);
    }

    setShowOptions(false);
    loadPurchaseListInfo();
  }

  async function loadPurchaseListInfo() {
    if (item.id) {
      const { listId } = await getGroceryPurchaseListInfo(item.id);

      if (listId !== undefined) {
        setNewListId(listId);
      }
    }
  }

  useEffect(() => {
    const pricesPerUnit = createPricePerUnitArray(purchases);

    setMedian(calculateMedian(pricesPerUnit));
    setMaximum(calculateMax(pricesPerUnit));
    setMinimum(calculateMin(pricesPerUnit));

    loadPurchaseListInfo();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleAddToList(newListId === undefined)} onLongPress={() => setShowOptions(true)} >
        <View style={styles.title}>
          {newListId !== undefined &&
            <Feather
              name="shopping-cart"
              size={variables.FONT_SIZE_LARGE + 5}
              color={variables.PRIMARY_COLOR}
              style={styles.titleIcon}
            />
          }
          <Text
            style={{
              ...styles.titleText,
              color: variables.TEXT_COLOR,
              fontSize: variables.FONT_SIZE_LARGE,
            }}
          >
            {name}
          </Text>

        </View>
        <View
          style={{ ...styles.prices, backgroundColor: variables.CARD_COLOR }}
        >
          <View style={styles.priceItem}>
            <Feather
              name="trending-down"
              size={variables.FONT_SIZE_MEDIUM}
              color={variables.GREEN_COLOR}
              style={{ paddingRight: 5 }}
            />
            <Text style={{ ...styles.price, color: variables.TEXT_COLOR }}>
              €{minimum.toFixed(2)}
            </Text>
          </View>

          <View style={styles.priceItem}>
            <Feather
              name="star"
              size={variables.FONT_SIZE_LARGE + 5}
              color={variables.YELLOW_COLOR}
              style={{ paddingRight: 5 }}
            />
            <Text style={{ ...styles.price, color: variables.TEXT_COLOR }}>
              €{median.toFixed(2)}
            </Text>
          </View>

          <View style={styles.priceItem}>
            <Feather
              name="trending-up"
              size={variables.FONT_SIZE_MEDIUM}
              color={variables.RED_COLOR}
              style={{ paddingRight: 5 }}
            />
            <Text style={{ ...styles.price, color: variables.TEXT_COLOR }}>
              €{maximum.toFixed(2)}
            </Text>
          </View>
        </View>

      </TouchableOpacity>

      <Dialog.Container visible={showOptions} footerStyle={styles.buttonBox_vertical}
        buttonSeparatorStyle={styles.buttonBox__separator_vertical} onBackdropPress={() => setShowOptions(false)}>
        <Dialog.Title>{item.name}</Dialog.Title>

        <Dialog.Button label="Ver mais detalhes" onPress={() => {
          handleSeeHistory();
        }} />
        {newListId === undefined ?
          <Dialog.Button label="Adicionar na lista de compras"
            onPress={() => {
              handleAddToList(true);
            }} />
          :
          <Dialog.Button label="Remover da lista de compras" onPress={() => {
            handleAddToList(false);
          }} />
        }

        <Dialog.Button onPress={() => setShowOptions(false)} label="Cancelar" />

      </Dialog.Container>
    </View>
  );
};

export default PriceSummaryItem;
