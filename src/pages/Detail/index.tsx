import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ToastAndroid, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import Dialog from "react-native-dialog";

import styles from "./styles";
import {
  createPricePerUnitArray,
  calculateMax,
  calculateMin,
  calculateThresholdMode,
  calculateMedian,
} from "../../utils/purchaseMath";

import { Grocery, Purchase } from "../../types/Grocery";
import PurchaseList from "../../components/PurchaseList";
import { Variables } from "../../styles/variables";
import { getPurchases, deleteGrocery, editGrocery } from "../../services/database";

interface RouteParams {
  item: Grocery;
  onPressBackButton: () => void;
}

export default function Detail() {
  const variables = Variables();
  const route = useRoute();
  const navigation = useNavigation();
  const routeParams = route.params as RouteParams;
  const { id, name } = routeParams.item;

  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [maximum, setMaximum] = useState(0);
  const [minimum, setMinimum] = useState(0);
  const [mode, setMode] = useState(0);
  const [median, setMedian] = useState(0);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [editMessage, setEditMessage] = useState(false);
  const [newName, setNewName] = useState(name);
  const [oldName, setOldName] = useState(name);

  const [message, setMessage] = useState("");
  const [idPurchase, setIdPurchase] = useState<string | undefined>("")

  async function loadPurchases() {
    const result = await getPurchases(id as string);
    setPurchases(result);
  }

  useEffect(() => {
    loadPurchases();
  }, []);

  useEffect(() => {
    const pricesPerUnit = createPricePerUnitArray(purchases);

    setMode(calculateThresholdMode(pricesPerUnit, 0.1));
    setMaximum(calculateMax(pricesPerUnit));
    setMinimum(calculateMin(pricesPerUnit));
    setMedian(calculateMedian(pricesPerUnit));

    purchases.sort(function (a, b) {
      const keyA = a.date;
      const keyB = b.date;

      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }, [purchases]);

  async function handleDeleteGrocery() {
    const result = await deleteGrocery(id as string);

    if (result === 200) {
      ToastAndroid.show("Compra deletada com sucesso", ToastAndroid.SHORT);
      navigation.navigate("Menu", { screen: "Home" });
    }
  }

  async function handleDeleteHistory(idPurchase: string | undefined) {
    const result = await deleteGrocery(id as string, idPurchase as string);

    if (result === 200) {
      ToastAndroid.show("Compra deletada com sucesso", ToastAndroid.SHORT);
      loadPurchases();
    }
  }

  function showDeleteMessage(message: string, id: string | undefined) {
    setMessage(message);
    setIdPurchase(id);
    setDeleteMessage(true);
  }

  const showEditMessage = () => {
    setEditMessage(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text
              style={{
                ...styles.title,
                color: variables.TEXT_COLOR,
                fontSize: variables.FONT_SIZE_LARGE + 10,
              }}
            >
              {oldName}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setEditMessage(true);
              }}
            >
              <Feather
                name="edit"
                size={variables.FONT_SIZE_LARGE + 10}
                color={variables.PRIMARY_COLOR}
              />
            </TouchableOpacity>

          </View>
          <View style={styles.prices}>
            <View
              style={{
                ...styles.priceItem,
                backgroundColor: variables.SECONDARY_CARD_COLOR,
              }}
            >
              <Text
                style={{ ...styles.priceText, color: variables.TEXT_COLOR }}
              >
                Max: €{maximum.toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                ...styles.priceItem,
                backgroundColor: variables.SECONDARY_CARD_COLOR,
              }}
            >
              <Text
                style={{ ...styles.priceText, color: variables.TEXT_COLOR }}
              >
                Min: €{minimum.toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                ...styles.priceItem,
                backgroundColor: variables.SECONDARY_CARD_COLOR,
              }}
            >
              <Text
                style={{ ...styles.priceText, color: variables.TEXT_COLOR }}
              >
                Preço mediano: €{median.toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                ...styles.priceItem,
                backgroundColor: variables.SECONDARY_CARD_COLOR,
              }}
            >
              <Text
                style={{ ...styles.priceText, color: variables.TEXT_COLOR }}
              >
                Preço estimado: €{mode.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        <PurchaseList createAlert={showDeleteMessage} purchases={purchases} />
      </View>
      <RectButton
        style={{
          ...styles.button,
          backgroundColor: variables.NOTIFICATION_COLOR,
        }}
        onPress={() =>
          showDeleteMessage(
            `Atenção, você está prestes a excluir o produto ${oldName}. Essa ação é irreversível. Deseja continuar?`,
            undefined
          )
        }
      >
        <Text
          style={{
            ...styles.buttonText,
            color: "#000",
            fontSize: variables.FONT_SIZE_LARGE,
          }}
        >
          Excluir
        </Text>
      </RectButton>

      <Dialog.Container visible={editMessage} onBackdropPress={() => setEditMessage(false)}>
        <Dialog.Title>Editar entrada</Dialog.Title>

        <Dialog.Input label="Digite o nome do produto" onChangeText={text => setNewName(text)} />

        <Dialog.Button onPress={() => {
          setNewName(oldName);
          setEditMessage(false);
        }} label="Cancelar" />
        <Dialog.Button onPress={() => {
          editGrocery(id, newName);
          setOldName(newName);
          setEditMessage(false);
        }} label="Editar" />

      </Dialog.Container>

      <Dialog.Container visible={deleteMessage} onBackdropPress={() => setEditMessage(false)}>
        <Dialog.Title>Excluir entrada</Dialog.Title>

        <Dialog.Description>
          {message}
        </Dialog.Description>

        <Dialog.Button onPress={() => { setNewName(name); setDeleteMessage(false); }} label="Cancelar" />
        <Dialog.Button onPress={() => {
          idPurchase
            ? handleDeleteHistory(idPurchase)
            : handleDeleteGrocery();

          setDeleteMessage(false);
        }} label="Deletar" />

      </Dialog.Container>

    </SafeAreaView>
  );
}
