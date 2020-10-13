import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ToastAndroid,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Event } from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AutoComplete from "../../components/AutoComplete";
import styles from "./styles";
import { displayShortDate } from "../../utils/date";
import { Variables } from "../../styles/variables";
import { setGroceries } from "../../services/database";

export default function Grocery() {
  const variables = Variables();

  const [name, setName] = useState("");
  const [id, setId] = useState<string | undefined>();
  const [date, setDate] = useState(new Date().getTime());
  const [dateInput, setDateInput] = useState(new Date());
  const [price, setPrice] = useState(0.0);
  const [priceInput, setPriceInput] = useState("");
  const [quantity, setQuantity] = useState(0.0);
  const [quantityInput, setQuantityInput] = useState("");

  const [showCalendar, setShowCalendar] = useState(false);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    if (id === undefined && name.length > 0) {
      setShowNew(true);
    } else {
      setShowNew(false);
    }
  }, [name, id]);

  function isRequiredFieldsFilled() {
    if (id === undefined || name.length === 0 || price <= 0 || quantity <= 0) {
      return false;
    }

    return true;
  }

  async function handleSavePurchase() {
    console.log(id, name, date, price, quantity);
    if (isRequiredFieldsFilled()) {
      const result = await setGroceries(id, name, date, price, quantity);

      if (result === 200) {
        ToastAndroid.show("Compra salva com sucesso", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          "Alguma coisa deu errado. Tente novamente.",
          ToastAndroid.SHORT
        );
      }

      setName("");
      setId(undefined);
      setPrice(0.0);
      setQuantity(0.0);

      setPriceInput("");
      setQuantityInput("");
    }
    else{
      ToastAndroid.show("Preencha todos os campos antes de adicionar uma compra", ToastAndroid.LONG);
    }
  }

  function handlePriceInput(val: string | undefined) {
    if (val) {
      const num = parseFloat(val as string);

      if (!isNaN(num)) {
        setPrice(num);
        setPriceInput(val);
      }
    } else {
      setQuantity(0);
      setQuantityInput("");
    }
  }

  function handleQuantityInput(val: string | undefined) {
    if (val) {
      const num = parseFloat(val as string);

      if (!isNaN(num)) {
        setQuantity(num);
        setQuantityInput(val);
      }
    } else {
      setQuantity(0);
      setQuantityInput("");
    }
  }

  function handleDateInput(ev: Event, val?: Date) {
    setShowCalendar(false);

    if (val) {
      const currentDate = val || dateInput;

      setDate(currentDate.getTime());
      setDateInput(currentDate);
    }
  }

  function handleAutoCompleteSelected(name: string, id: string | undefined) {
    setName(name);
    setId(id);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.form}>
          <Text
            style={{
              ...styles.title,
              color: variables.TEXT_COLOR,
              fontSize: variables.FONT_SIZE_LARGE + 10,
            }}
          >
            Adicionar compra
          </Text>
          <Text
            style={{
              ...styles.label,
              color: variables.TEXT_COLOR,
              fontSize: variables.FONT_SIZE_MEDIUM,
            }}
          >
            Nome do produto
          </Text>
          <TextInput
            style={{
              ...styles.input,
              backgroundColor: variables.CARD_COLOR,
              color: variables.TEXT_COLOR,
            }}
            value={name}
            onChangeText={(val) => setName(val)}
            autoCapitalize="sentences"
            placeholder="Nome do produto"
            placeholderTextColor={variables.BORDER_COLOR}
            onFocus={() => {
              setShowAutoComplete(true);
              setId("");
            }}
            onBlur={() => setShowAutoComplete(false)}
          />
          {showAutoComplete && (
            <AutoComplete
              onSelected={handleAutoCompleteSelected}
              filter={name}
            />
          )}
          {showNew && (
            <View style={styles.showNew}>
              <MaterialCommunityIcons
                name="checkbox-blank-circle"
                size={variables.FONT_SIZE_MEDIUM}
                color={variables.GREEN_COLOR}
                style={{ padding: 10 }}
              />
              <Text style={{ color: variables.TEXT_COLOR }}>
                Um novo item será criado
              </Text>
            </View>
          )}
          <Text
            style={{
              ...styles.label,
              color: variables.TEXT_COLOR,
              fontSize: variables.FONT_SIZE_MEDIUM,
            }}
          >
            Data da compra
          </Text>
          <TextInput
            style={{
              ...styles.input,
              backgroundColor: variables.CARD_COLOR,
              color: variables.TEXT_COLOR,
              textAlign: "center",
            }}
            value={displayShortDate(dateInput.getTime())}
            onTouchStart={() => setShowCalendar(true)}
            showSoftInputOnFocus={false}
          />
          {showCalendar && (
            <RNDateTimePicker
              value={dateInput}
              mode="date"
              display="default"
              onChange={handleDateInput}
            />
          )}

          <View style={styles.inputGroup}>
            <View style={styles.inputBlock}>
              <Text
                style={{
                  ...styles.label,
                  color: variables.TEXT_COLOR,
                  fontSize: variables.FONT_SIZE_MEDIUM,
                }}
              >
                Valor pago
              </Text>
              <TextInput
                style={{
                  ...styles.input,
                  backgroundColor: variables.CARD_COLOR,
                  color: variables.TEXT_COLOR,
                }}
                value={priceInput}
                onChangeText={handlePriceInput}
                placeholder="Valor do produto"
                keyboardType="decimal-pad"
                placeholderTextColor={variables.BORDER_COLOR}
              />
            </View>
            <View style={styles.inputBlock}>
              <Text
                style={{
                  ...styles.label,
                  color: variables.TEXT_COLOR,
                  fontSize: variables.FONT_SIZE_MEDIUM,
                }}
              >
                Quantidade
              </Text>
              <TextInput
                style={{
                  ...styles.input,
                  backgroundColor: variables.CARD_COLOR,
                  color: variables.TEXT_COLOR,
                }}
                value={quantityInput}
                onChangeText={handleQuantityInput}
                placeholder="Quantidade"
                keyboardType="decimal-pad"
                placeholderTextColor={variables.BORDER_COLOR}
              />
            </View>
          </View>
        </View>
        <RectButton
          style={{ ...styles.button, backgroundColor: variables.PRIMARY_COLOR }}
          onPress={handleSavePurchase}
        >
          <Text
            style={{
              ...styles.buttonText,
              fontSize: variables.FONT_SIZE_LARGE,
              color: "#000",
            }}
          >
            Salvar
          </Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
}
