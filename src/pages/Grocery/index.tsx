import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Modal,
  TouchableHighlight,
  ToastAndroid
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Event } from "@react-native-community/datetimepicker";
import styles from "./styles";

import { displayShortDate } from "../../utils/date";

export default function Home() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(0);
  const [dateInput, setDateInput] = useState(new Date());
  const [price, setPrice] = useState(0.0);
  const [priceInput, setPriceInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [quantity, setQuantity] = useState(0.0);

  const [showCalendar, setShowCalendar] = useState(false);

  function handleSavePurchase() {
    ToastAndroid.show("not implemented", ToastAndroid.SHORT);

    setName("");
    setDate(0);
    setPrice(0.0);
    setQuantity(0.0);

    setDateInput(new Date());
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
    }
  }

  function handleQuantityInput(val: string | undefined) {
    if (val) {
      const num = parseFloat(val as string);

      if (!isNaN(num)) {
        setQuantity(num);
        setQuantityInput(val);
      }
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Nome do produto</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(val) => setName(val)}
                placeholder="Nome do produto"
                placeholderTextColor="#C1BCCC"
              />
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>Data da compra</Text>
              <TextInput
                style={styles.input}
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
            </View>
          </View>
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

      </View>
    </SafeAreaView>
  );
}
