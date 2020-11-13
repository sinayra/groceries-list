import React, { useState, useEffect } from "react";
import { View, SafeAreaView, TextInput, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GroceryCheckList from "../../components/GroceryCheckList";
import styles from "./styles";

import { getGroceries, getPurchaseList } from "../../services/database";
import { Grocery } from "../../types/Grocery";
import { Variables } from "../../styles/variables";
import { createPaidPriceArray, calculateThresholdMode } from "../../utils/purchaseMath";
import SearchGroceryInput from "../../components/SearchGroceryInput";

export default function List() {
    const variables = Variables();
    const navigation = useNavigation();
    const [filter, setFilter] = useState("");
    const [purchaseList, setPurchaseList] = useState<Grocery[]>([]);
    const [productsList, setProductsList] = useState<Grocery[]>([]);
    const [filteredList, setFilteredList] = useState<Grocery[]>([]);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        navigation.addListener("focus", () => {
          loadFromDatabase();
        });
      }, []);

    function calculateTotal(){
        let acc = 0;

        purchaseList.forEach((elem) => {
            const purchaseHistory = createPaidPriceArray(elem.purchases);
            const mode = calculateThresholdMode(purchaseHistory, 0.1);

            if(elem.listQuantity && mode){
                acc += mode * elem.listQuantity;
            }
        });

        setTotal(acc);
    }

    async function loadFromDatabase() {
        const groceries = await getGroceries();
        const list = await getPurchaseList();

        if (groceries) {
            setProductsList(groceries);
            setFilteredList(groceries);
        }

        if(list){
            setPurchaseList(list);
        }

    }

    useEffect(() => {
        calculateTotal();
    }, [purchaseList]);

    useEffect(() => {
        loadFromDatabase();
    }, []);


    function handleChangeFilter(value: string){
        setFilter(value);
      }
    
      function handleChangeFilteredList(value: Grocery[]){
        setFilteredList(value);
      }

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    ...styles.content,
                    backgroundColor: variables.BACKGROUND_COLOR,
                }}
            >
                <Text style={{ fontSize: variables.FONT_SIZE_SMALL, color: variables.TEXT_COLOR }}>Há {purchaseList.length} itens na Lista de Compras. </Text>
                <GroceryCheckList showList={purchaseList} canBeAddedToList={false} reload={loadFromDatabase} />
            </View>
            <View
                style={{
                    ...styles.priceContent,
                    backgroundColor: variables.CARD_COLOR,
                }}
            >
                <Text style={{ fontSize: variables.FONT_SIZE_LARGE, color: variables.TEXT_COLOR }}>Total aproximado: </Text>
                <Text style={{ fontSize: variables.FONT_SIZE_LARGE + 10, color: variables.PRIMARY_COLOR }}>€{total.toFixed(2)}</Text>
            </View>
            <View
                style={{
                    ...styles.content,
                    backgroundColor: variables.BACKGROUND_COLOR,
                }}
            >
                <SearchGroceryInput list={productsList} onChangeValue={handleChangeFilter} onChangeFilter={handleChangeFilteredList} />

                <GroceryCheckList showList={filteredList} purchaseList={purchaseList} canBeAddedToList={true} reload={loadFromDatabase} filter={filter} />
            </View>

        </SafeAreaView>
    );
}
