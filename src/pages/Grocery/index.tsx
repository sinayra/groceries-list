import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  ToastAndroid,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Event } from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";

import AutoComplete from "../../components/AutoComplete";
import styles from "./styles";
import { displayShortDate } from "../../utils/date";
import { Item } from "../../components/GroceryItem";

export default function Home() {
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
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
    if (id == 0 && name.length > 0) {
      setShowNew(true);
    } else {
      setShowNew(false);
    }
  }, [name, id]);

  function handleSavePurchase() {
    console.log(id, name, date, price, quantity);
    ToastAndroid.show("not implemented", ToastAndroid.SHORT);

    setName("");
    setId(0);
    setPrice(0.0);
    setQuantity(0.0);

    setPriceInput("");
    setQuantityInput("");
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

  function handleAutoCompleteSelected(name: string, id: number) {
    setName(name);
    setId(id);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Nome do produto</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(val) => setName(val)}
            placeholder="Nome do produto"
            placeholderTextColor="#C1BCCC"
            onFocus={() => {
              setShowAutoComplete(true);
              setId(0);
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
              <AntDesign name="warning" size={24} color="black" />
              <Text>Um novo item será criado</Text>
            </View>
          )}
          <Text style={styles.label}>Data da compra</Text>
          <TextInput
            style={{ ...styles.input, textAlign: "center" }}
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
              <Text style={styles.label}>Valor pago</Text>
              <TextInput
                style={styles.input}
                value={priceInput}
                onChangeText={handlePriceInput}
                placeholder="Valor do produto"
                keyboardType="decimal-pad"
                placeholderTextColor="#C1BCCC"
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Quantidade</Text>
              <TextInput
                style={styles.input}
                value={quantityInput}
                onChangeText={handleQuantityInput}
                placeholder="Quantidade"
                keyboardType="decimal-pad"
                placeholderTextColor="#C1BCCC"
              />
            </View>
          </View>
        </View>
        <RectButton style={styles.button} onPress={handleSavePurchase}>
          <Text style={styles.buttonText}>Salvar</Text>
        </RectButton>
      </ScrollView>
    </SafeAreaView>
  );
}
