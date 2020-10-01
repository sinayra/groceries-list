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
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import AutoComplete from "../../components/AutoComplete";
import styles from "./styles";
import { displayShortDate } from "../../utils/date";
import variables from "../../styles/variables";
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from "../../types/ExtendedTheme";

export default function Grocery() {
  const { colors } = useTheme() as ExtendedTheme;

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
      <View style={styles.content}>
        <View style={styles.form}>
          <Text style={{...styles.title, color: colors.text}}>Adicionar compra</Text>
          <Text style={{...styles.label, color: colors.text}}>Nome do produto</Text>
          <TextInput
            style={{...styles.input, backgroundColor: colors.card, color: colors.text}}
            value={name}
            onChangeText={(val) => setName(val)}
            placeholder="Nome do produto"
            placeholderTextColor={colors.border}
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
              <MaterialCommunityIcons name="checkbox-blank-circle" size={variables.FONT_SIZE_MEDIUM} color={colors.green} style={{padding: 10}} />
              <Text style={{color: colors.text}}>Um novo item será criado</Text>
            </View>
          )}
          <Text style={{...styles.label, color: colors.text}}>Data da compra</Text>
          <TextInput
            style={{ ...styles.input, backgroundColor: colors.card, color: colors.text, textAlign: "center" }}
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
              <Text style={{...styles.label, color: colors.text}}>Valor pago</Text>
              <TextInput
                style={{...styles.input, backgroundColor: colors.card, color: colors.text}}
                value={priceInput}
                onChangeText={handlePriceInput}
                placeholder="Valor do produto"
                keyboardType="decimal-pad"
                placeholderTextColor={colors.border}
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={{...styles.label, color: colors.text}}>Quantidade</Text>
              <TextInput
                style={{...styles.input, backgroundColor: colors.card, color: colors.text}}
                value={quantityInput}
                onChangeText={handleQuantityInput}
                placeholder="Quantidade"
                keyboardType="decimal-pad"
                placeholderTextColor={colors.border}
              />
            </View>
          </View>
        </View>
        <RectButton style={{...styles.button, backgroundColor: colors.primary}} onPress={handleSavePurchase}>
          <Text style={{...styles.buttonText, color: '#000'}}>Salvar</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
}
